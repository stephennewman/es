'use client';

import { useState } from 'react';
import { VoiceRecorder, cleanupTranscript } from '@/lib/voice-utils';
import { supabase } from '@/lib/supabase';

interface VoiceRecordButtonProps {
  entryId: string;
  onRecorded: () => void;
}

export default function VoiceRecordButton({ entryId, onRecorded }: VoiceRecordButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recorder] = useState(() => new VoiceRecorder());
  const [error, setError] = useState<string | null>(null);

  async function handleRecord() {
    if (isRecording) {
      // Stop recording
      try {
        setIsProcessing(true);
        const { transcript } = await recorder.stopRecording();
        
        if (!transcript || transcript.trim().length === 0) {
          setError('No speech detected. Please try again.');
          setIsProcessing(false);
          setIsRecording(false);
          return;
        }

        // Cleanup transcript with AI
        const { title, summary, themes } = await cleanupTranscript(transcript);

        // Get next order for daily items
        const { data: existingItems } = await supabase
          .from('daily_items')
          .select('item_order')
          .eq('entry_id', entryId)
          .order('item_order', { ascending: false })
          .limit(1);

        const nextOrder = existingItems && existingItems.length > 0 
          ? existingItems[0].item_order + 1 
          : 0;

        // Create daily item
        const { data: dailyItem, error: itemError } = await supabase
          .from('daily_items')
          .insert({
            entry_id: entryId,
            type: 'voice',
            content: title,
            completed: false,
            item_order: nextOrder,
          })
          .select()
          .single();

        if (itemError) throw itemError;

        // Create voice memo
        const { error: memoError } = await supabase
          .from('voice_memos')
          .insert({
            entry_id: entryId,
            item_id: dailyItem.id,
            raw_transcript: transcript,
            cleaned_summary: summary,
            title: title,
            themes: themes,
          });

        if (memoError) throw memoError;

        setIsRecording(false);
        setIsProcessing(false);
        setError(null);
        onRecorded();
      } catch (err) {
        console.error('Error processing voice memo:', err);
        setError('Failed to save voice memo. Please try again.');
        setIsProcessing(false);
        setIsRecording(false);
      }
    } else {
      // Start recording
      try {
        setError(null);
        await recorder.startRecording();
        setIsRecording(true);
      } catch (err: any) {
        console.error('Error starting recording:', err);
        setError(err.message || 'Failed to start recording');
      }
    }
  }

  return (
    <div className="fixed bottom-20 right-6 z-40">
      <button
        onClick={handleRecord}
        disabled={isProcessing}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
          isRecording
            ? 'bg-red-600 hover:bg-red-700 animate-pulse'
            : isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-black dark:bg-white hover:scale-110'
        }`}
        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
      >
        {isProcessing ? (
          <svg
            className="w-6 h-6 text-white dark:text-black animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : isRecording ? (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="6" width="12" height="12" />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-white dark:text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        )}
      </button>
      
      {error && (
        <div className="absolute bottom-16 right-0 w-64 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg shadow-lg">
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          <button
            onClick={() => setError(null)}
            className="text-xs text-red-600 dark:text-red-400 hover:underline mt-1"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

