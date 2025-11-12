// Voice recording and transcription utilities

export class VoiceRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private recognition: any = null;
  private transcript: string = '';

  async startRecording(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioChunks = [];
      this.transcript = '';

      // Start Web Speech API recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event: any) => {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              this.transcript += event.results[i][0].transcript + ' ';
            }
          }
        };

        this.recognition.start();
      }

      // Also record audio (though we won't keep it)
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();
    } catch (error) {
      console.error('Error starting recording:', error);
      throw new Error('Failed to start recording. Please check microphone permissions.');
    }
  }

  async stopRecording(): Promise<{ transcript: string; duration: number }> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('No active recording'));
        return;
      }

      const startTime = Date.now();

      this.mediaRecorder.onstop = () => {
        const duration = Math.round((Date.now() - startTime) / 1000);
        
        // Stop speech recognition
        if (this.recognition) {
          this.recognition.stop();
        }

        // Stop all tracks
        if (this.mediaRecorder?.stream) {
          this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }

        resolve({
          transcript: this.transcript.trim(),
          duration,
        });
      };

      this.mediaRecorder.stop();
    });
  }

  isRecording(): boolean {
    return this.mediaRecorder?.state === 'recording';
  }
}

export async function cleanupTranscript(rawTranscript: string): Promise<{
  title: string;
  summary: string;
  themes: string[];
}> {
  try {
    const response = await fetch('/api/voice-transcribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript: rawTranscript }),
    });

    if (!response.ok) {
      throw new Error('Failed to cleanup transcript');
    }

    return await response.json();
  } catch (error) {
    console.error('Error cleaning up transcript:', error);
    // Fallback: generate simple title and summary
    return {
      title: generateSimpleTitle(rawTranscript),
      summary: rawTranscript.slice(0, 200) + (rawTranscript.length > 200 ? '...' : ''),
      themes: [],
    };
  }
}

function generateSimpleTitle(text: string): string {
  // Take first 6 words as title
  const words = text.split(' ').slice(0, 6);
  let title = words.join(' ');
  if (text.split(' ').length > 6) {
    title += '...';
  }
  return title || 'Voice memo';
}

