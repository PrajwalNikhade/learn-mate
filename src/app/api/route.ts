import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        console.log('API route called');
        
        // Parse request body
        let body;
        try {
            body = await req.json();
        } catch (parseError) {
            console.error('Failed to parse request body:', parseError);
            return NextResponse.json(
                { error: "Invalid JSON in request body" }, 
                { status: 400 }
            );
        }

        console.log('Request body:', body);
        const { message } = body;

        // Validate input
        if (!message || !Array.isArray(message)) {
            console.error('Invalid message format:', message);
            return NextResponse.json(
                { error: "Invalid message format. Expected an array of messages." }, 
                { status: 400 }
            );
        }

        // Check for API key
        if (!process.env.GEMINI_API_KEY) {
            console.error('GEMINI_API_KEY not found in environment variables');
            return NextResponse.json(
                { error: "Gemini API key not configured. Please check your environment variables." }, 
                { status: 500 }
            );
        }

        console.log('Initializing Gemini AI...');
        
        // Initialize Gemini AI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

        // Format messages for Gemini
        const formattedMessages = message.map((m: any) => ({
            role: m.role === 'model' ? 'model' : 'user',
            parts: [{ text: m.content }]
        }));

        console.log('Formatted messages:', formattedMessages);
        console.log('Calling Gemini API...');

        // Generate content
        const result = await model.generateContent({
            contents: formattedMessages
        });

        console.log('Gemini API response received');

        // Extract response
        const response = await result.response;
        const text = response.text();

        console.log('Generated text:', text);

        if (!text) {
            throw new Error('Empty response from Gemini API');
        }

        return NextResponse.json({ reply: text });

    } catch (error: any) {
        console.error('API Error:', error);
        console.error('Error stack:', error.stack);
        
        // Handle specific error types
        if (error?.message?.includes('API key not valid')) {
            return NextResponse.json(
                { error: "Invalid API key. Please check your Gemini API key." }, 
                { status: 401 }
            );
        }
        
        if (error?.message?.includes('quota')) {
            return NextResponse.json(
                { error: "API quota exceeded. Please try again later." }, 
                { status: 429 }
            );
        }

        if (error?.message?.includes('SAFETY')) {
            return NextResponse.json(
                { error: "Content was blocked due to safety filters. Please rephrase your question." }, 
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: error.message || "An unexpected error occurred while processing your request." }, 
            { status: 500 }
        );
    }
}