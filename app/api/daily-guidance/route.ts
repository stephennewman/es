import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { Principle } from '@/lib/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { weakAreas } = await request.json();

    if (!weakAreas || weakAreas.length === 0) {
      return NextResponse.json(
        { error: 'No weak areas provided' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a coach helping a married man improve his emotional safety in his marriage and family.

Based on the user's weak areas from recent practice scenarios, generate 3 personalized daily principles to focus on.

User's weak areas: ${weakAreas.join(', ')}

For each principle, provide:
- title: A clear, actionable statement (6-10 words)
- description: A brief explanation of why this matters (one sentence)

Return JSON array of 3 principles: [{ "title": "...", "description": "..." }]

Make these specific to the weak areas. For example:
- If "defensiveness" is a weak area, focus on curiosity, breathing, listening
- If "listening" is a weak area, focus on presence, questions, not fixing
- If "regulation" is a weak area, focus on pausing, naming emotions, breathing

Be direct. Be practical. Be encouraging but honest.`,
        },
        {
          role: 'user',
          content: `Generate 3 principles targeting these weak areas: ${weakAreas.join(', ')}`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    
    // Transform AI response into Principle format
    const principles: Principle[] = (result.principles || []).map((p: any, index: number) => ({
      id: `ai-${Date.now()}-${index}`,
      category: 'regulation', // Default category
      title: p.title,
      description: p.description,
    }));

    // Ensure we have exactly 3 principles
    if (principles.length !== 3) {
      throw new Error('Invalid number of principles returned');
    }

    return NextResponse.json({ principles });
  } catch (error) {
    console.error('Error generating daily guidance:', error);
    return NextResponse.json(
      { error: 'Failed to generate guidance' },
      { status: 500 }
    );
  }
}

