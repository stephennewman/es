import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { transcript } = await request.json();

    if (!transcript || transcript.trim().length === 0) {
      return NextResponse.json(
        { error: 'No transcript provided' },
        { status: 400 }
      );
    }

    // Use OpenAI to clean up transcript and extract key info
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are helping a man process his voice memos about emotional safety, marriage, and parenting. 
          
Given a raw voice memo transcript, extract:
1. A short title (6-8 words max)
2. A cleaned up summary (1-2 sentences)
3. An array of relevant theme tags (2-4 tags like "defensiveness", "breathing", "wife", "daughters", "work stress", etc.)

Return JSON: { "title": "...", "summary": "...", "themes": ["..."] }`,
        },
        {
          role: 'user',
          content: transcript,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json({
      title: result.title || 'Voice memo',
      summary: result.summary || transcript.slice(0, 200),
      themes: result.themes || [],
    });
  } catch (error) {
    console.error('Error processing transcript:', error);
    return NextResponse.json(
      { error: 'Failed to process transcript' },
      { status: 500 }
    );
  }
}

