import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';


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
        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            console.error('OPENROUTER_API_KEY not found in environment variables');
            return NextResponse.json(
                { error: "OpenRouter API key not configured. Please set OPENROUTER_API_KEY in your .env.local file." }, 
                { status: 500 }
            );
        }

        console.log('API key found, length:', apiKey.length);

        try {
            // Initialize Gemini AI
            const openai = new OpenAI({
                apiKey: apiKey,
                baseURL: "https://openrouter.ai/api/v1"
            });
            const model = 'openai/gpt-4o';

            // Format messages for Gemini
            const formattedMessages = message.map((m: any) => ({
                role: m.role === 'model' ? 'assistant' : 'user',
                content: m.content
            }));

            console.log('Sending to OpenRouter:', formattedMessages);

            const completion = await openai.chat.completions.create({
                model: model,
                messages: formattedMessages,
                max_tokens: 2000
            });
            const text = completion.choices[0].message.content;

            if (!text) {
                throw new Error('Empty response from OpenRouter API');
            }

            console.log('OpenRouter API response received');

            return NextResponse.json({ reply: text });

        } catch (openRouterError: any) {
            console.error('OpenRouter API Error:', openRouterError);
            
            // Handle specific OpenRouter errors
            if (openRouterError.message?.includes('API key not valid')) {
                return NextResponse.json(
                    { error: "Invalid API key. Please check your OpenRouter API key." }, 
                    { status: 401 }
                );
            }
            




            // For development, return more detailed error info
            return NextResponse.json(
                { 
                    error: "OpenRouter API Error: " + openRouterError.message,
                    details: process.env.NODE_ENV === 'development' ? openRouterError.stack : undefined
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
        hasApiKey: !!process.env.OPENROUTER_API_KEY,
        keyLength: process.env.OPENROUTER_API_KEY?.length || 0,
        timestamp: new Date().toISOString()
    });
}