import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `You are a helpful and knowledgeable loan assistant. Your role is to:
1. Help users understand different types of loans
2. Explain loan terms and conditions
3. Guide users through the loan application process
4. Provide general advice about loans and financing
5. Answer questions about interest rates and repayments

Keep your responses concise, professional, and focused on loan-related topics.
Do not provide specific financial advice or make promises about loan approvals.
Always encourage users to speak with a financial advisor for personalized advice.`;

export async function POST(req: Request) {
  try {
    const { message, messages } = await req.json();

    const chatHistory = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }));

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        ...chatHistory,
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({
      message: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error in chat route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
