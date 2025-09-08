import { GoogleGenerativeAI } from '@google/generative-ai';
// import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextRequest){
    try{
        const {message}=await req.json();

        if(!process.env.GEMINI_API_KEY){
            return NextResponse.json({error:"Gemini API key not found"},{status:500});
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
        const result = await model.generateContent(
            {
                contents: message.map((m: any) => ({
                    role: m.role,
                    parts: [{ text: m.content }]
                }))
            }
        );
        
        const text = result.response.text();
        return NextResponse.json({reply:text});
    }
    catch(error:any){
            console.log(error);
            return NextResponse.json({error:error.message},{status:500});
        
    }
}
