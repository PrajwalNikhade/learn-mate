import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
// Dynamically import GoogleGenerativeAI to avoid potential SSR issues
async function getGeminiAI() {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    return GoogleGenerativeAI;
}

export async function POST(req: NextRequest) {
    console.log('Chat API route hit!');
    
    try {
        // Parse request body
        const body = await req.json();
        const { message } = body;

        console.log('Received message:', message);

        // Validate input
        if (!message || !Array.isArray(message)) {
            return NextResponse.json(
                { error: "Invalid message format. Expected an array of messages." }, 
                { status: 400 }
            );
        }

        // Check for API key
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('GEMINI_API_KEY not found in environment variables');
            return NextResponse.json(
                { error: "Gemini API key not configured. Please set GEMINI_API_KEY in your .env.local file." }, 
                { status: 500 }
            );
        }

        console.log('API key found, length:', apiKey.length);

        try {
            // Initialize Gemini AI
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

            // Format messages for Gemini
            const formattedMessages = message.map((m: any) => ({
                role: m.role === 'model' ? 'model' : 'user',
                parts: [{ text: String(m.content) }]
            }));

            console.log('Sending to Gemini:', formattedMessages);

            // Generate content
            const result = await model.generateContent({
                contents: formattedMessages
            });

            const response = result.response;
            const text = response.text();

            if (!text) {
                throw new Error('Empty response from Gemini API');
            }

            console.log('Gemini response:', text.substring(0, 100) + '...');

            return NextResponse.json({ reply: text });

        } catch (geminiError: any) {
            console.error('Gemini API Error:', geminiError);
            
            // Handle specific Gemini errors
            if (geminiError.message?.includes('API key not valid')) {
                return NextResponse.json(
                    { error: "Invalid Gemini API key. Please check your API key." }, 
                    { status: 401 }
                );
            }
            
            if (geminiError.message?.includes('quota')) {
                return NextResponse.json(
                    { error: "API quota exceeded. Please try again later." }, 
                    { status: 429 }
                );
            }

            if (geminiError.message?.includes('safety') || geminiError.message?.includes('SAFETY')) {
                return NextResponse.json(
                    { error: "Content was blocked by safety filters. Please rephrase your question." }, 
                    { status: 400 }
                );
            }

            // For development, return more detailed error info
            return NextResponse.json(
                { 
                    error: "Gemini API Error: " + geminiError.message,
                    details: process.env.NODE_ENV === 'development' ? geminiError.stack : undefined
                }, 
                { status: 500 }
            );
        }

    } catch (error: any) {
        console.error('General API Error:', error);
        return NextResponse.json(
            { 
                error: "Server error: " + error.message,
                details: process.env.NODE_ENV === 'development' ? error.stack : undefined
            }, 
            { status: 500 }
        );
    }
}

// Test endpoint
export async function GET() {
    return NextResponse.json({ 
        message: "Chat API route is working!",
        hasApiKey: !!process.env.GEMINI_API_KEY,
        keyLength: process.env.GEMINI_API_KEY?.length || 0,
        timestamp: new Date().toISOString()
    });
}