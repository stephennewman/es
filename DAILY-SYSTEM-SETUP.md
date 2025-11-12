# Daily ES Journal System - Setup Guide

## What's Been Built

A complete daily journal and learning system with 4 main sections:
- **Daily Log**: Continuous feed with auto-dated entries, daily principles, tasks, notes, and voice memos
- **Principles**: Reference library of 60+ emotional safety principles
- **Learn**: Situational practice scenarios with adaptive feedback
- **Voice**: Voice memo recording with AI transcription and organization

## Setup Instructions

### 1. Database Setup (Supabase)

Run the SQL schema in your Supabase project:

```bash
# Open Supabase SQL Editor and run:
cat supabase-schema.sql
```

This creates all necessary tables:
- `user_profile` - User baseline scores and weak areas
- `daily_entries` - Daily log entries with dates and principles
- `daily_items` - Tasks, notes, and voice memo references
- `template_items` - Customizable daily template
- `voice_memos` - Voice memo metadata and transcripts
- `learn_scenarios` - Practice scenarios (pre-populated from code)
- `learn_responses` - User answers for tracking patterns

### 2. Environment Variables

Your `.env.local` is already configured with:
- OpenAI API key (for voice transcription and AI guidance)
- Anthropic API key (optional, for alternative AI)
- Supabase URL and keys

### 3. Install Dependencies

Already installed:
- `@supabase/supabase-js` - Database client
- `openai` - AI integration

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` - it will redirect to `/daily`

## Key Features

### Daily Log (`/daily`)
- Auto-generates today's entry on first visit
- Shows 3 personalized principles at top of each day (AI-generated based on your Learn patterns)
- Template items auto-populate daily (customizable)
- Quick-add interface for tasks (checkbox) or notes (dash)
- Floating voice record button (only on today's entry)
- Infinite scroll showing past entries

### Principles Library (`/principles`)
- 60+ principles across 7 categories
- Filter by category
- Examples and descriptions for each principle

### Learn Section (`/learn`)
- 4 categories: Understanding Yourself, Understanding Her, Toddlers (2-3), Teen (14)
- 25+ scenarios per category
- Multiple choice with immediate feedback
- Tracks your responses to identify weak areas
- Informs personalized daily principles

### Voice Memos (`/voice`)
- Record voice memos from daily log
- Browser Web Speech API for initial transcription
- OpenAI cleans up transcript and generates title + themes
- Search by title, content, or theme
- Audio not stored (privacy-first)

### Adaptive AI Guidance
- Analyzes your Learn responses to find patterns
- Identifies weak areas (defensiveness, listening, regulation, etc.)
- Generates personalized daily principles targeting your specific struggles
- Falls back to random principles if insufficient data

## Mobile Optimization

- Mobile-first design with bottom navigation
- Optimized for phone usage (your primary use case)
- Fixed bottom nav that persists across all pages
- Touch-friendly tap targets
- Responsive layouts

## Data Privacy

- All data stored in your Supabase instance
- Voice audio not retained (only transcripts)
- No external data sharing
- Single-user application (no authentication needed)

## Customization

### Template Items
The default template includes:
- Pray, Read, Workout, Stretch, Breathe
- Breakfast, Lunch, Dinner
- One-on-one with 14yo
- Play with toddlers
- Check-in with wife

Users can customize via template_items table (UI for this can be added later).

### Adding More Scenarios
Edit `/lib/scenarios-data.ts` to add more learning scenarios.

### Adding More Principles
Edit `/lib/principles-data.ts` to add more principles.

## Next Steps

1. **Populate Scenarios**: The code has ~25 scenarios. Consider adding more as you think of real situations.

2. **Template Editor UI**: Build a settings page to customize daily template items.

3. **Export Functionality**: Add ability to export journal entries or voice memos.

4. **Streaks & Stats**: Track daily completion streaks and learning progress.

5. **Integration with Assessment**: Connect the 59 baseline score more explicitly with daily tracking.

## Troubleshooting

### Voice Recording Not Working
- Ensure microphone permissions are granted
- Use Chrome/Edge (best Web Speech API support)
- Check browser console for errors

### AI Features Not Working
- Verify OpenAI API key is set correctly
- Check API key has sufficient credits
- Review `/api/voice-transcribe` and `/api/daily-guidance` logs

### Database Errors
- Ensure Supabase schema is fully applied
- Check RLS policies are set correctly (currently allowing all operations)
- Verify environment variables match your Supabase project

## Architecture Notes

- **Next.js 16** with App Router
- **React 19** for UI
- **Tailwind CSS v4** for styling
- **Supabase** for database
- **OpenAI GPT-4o-mini** for AI features
- **Web Speech API** for voice recognition
- Client-side state management (no Redux/Zustand needed for single-user app)

The baseline 40-question assessment remains at `/assessment` and can still be accessed directly.

