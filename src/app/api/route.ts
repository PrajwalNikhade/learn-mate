// import OpenAI from 'openai';
// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//     try {
//         console.log('API route called');
        
//         // Parse request body
//         let body;
//         try {
//             body = await req.json();
//         } catch (parseError) {
//             console.error('Failed to parse request body:', parseError);
//             return NextResponse.json(
//                 { error: "Invalid JSON in request body" }, 
//                 { status: 400 }
//             );
//         }

//         console.log('Request body:', body);
//         const { message } = body;

//         // Validate input
//         if (!message || !Array.isArray(message)) {
//             console.error('Invalid message format:', message);
//             return NextResponse.json(
//                 { error: "Invalid message format. Expected an array of messages." }, 
//                 { status: 400 }
//             );
//         }

//         // Check for API key
//         if (!process.env.OPENROUTER_API_KEY) {
//             console.error('OPENROUTER_API_KEY not found in environment variables');
//             return NextResponse.json(
//                 { error: "OpenRouter API key not configured. Please check your environment variables." }, 
//                 { status: 500 }
//             );
//         }

//         console.log('Initializing OpenRouter API...');
        
        
//   const openai = new OpenAI({
//     apiKey: process.env.OPENROUTER_API_KEY,
//     baseURL: "https://openrouter.ai/api/v1",
//   });


//         // Format messages for OpenRouter
//         const formattedMessages = message.map((m: any) => ({
//             role: m.role === 'model' ? 'model' : 'user',
//             parts: [{ text: m.content }]
//         }));

//         console.log('Formatted messages:', formattedMessages);
//         console.log('Calling OpenRouter API...');

//         // Generate content
//     const completion = await openai.chat.completions.create({
//       model: 'openai/gpt-4o',
//       messages: formattedMessages,
//     });
//     const responseText = completion.choices[0].message.content;



//         // Extract response





//         if (!responseText) {
//             throw new Error('Empty response from OpenRouter API');
//         }

//     return NextResponse.json({ text: responseText });

//     } catch (error: any) {
//         console.error('API Error:', error);
//         console.error('Error stack:', error.stack);
        
//         // Handle specific error types
//         if (error?.message?.includes('API key not valid')) {
//             return NextResponse.json(
//                 { error: "Invalid API key. Please check your OpenRouter API key." }, 
//                 { status: 401 }
//             );
//         }
        
//         if (error?.message?.includes('quota')) {
//             return NextResponse.json(
//                 { error: "API quota exceeded. Please try again later." }, 
//                 { status: 429 }
//             );
//         }

//         if (error?.message?.includes('SAFETY')) {
//             return NextResponse.json(
//                 { error: "Content was blocked due to safety filters. Please rephrase your question." }, 
//                 { status: 400 }
//             );
//         }

//         return NextResponse.json(
//             { error: error.message || "An unexpected error occurred while processing your request." }, 
//             { status: 500 }
//         );
//     }
// }