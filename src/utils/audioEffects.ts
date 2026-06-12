// Custom Web Audio API Synthesizer Context to create beautiful cyberpunk real-time audio cascades
// Handles auto-unlock policies across modern web preview engines seamlessly.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    // Initialize Web Audio Context
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  
  // Try to resume if suspended (browser security blocks un-triggered playback)
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Low-level synth generator helper
function playSynthTone(
  freqs: number[], 
  type: OscillatorType = 'sine', 
  duration = 0.5, 
  gainEnvelope = [0, 0.1, 0] // start, peak, end
) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    masterGain.gain.setValueAtTime(gainEnvelope[0], ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(gainEnvelope[1], ctx.currentTime + 0.05);
    masterGain.gain.exponentialRampToValueAtTime(Math.max(gainEnvelope[2], 0.0001), ctx.currentTime + duration);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + duration);
    filter.connect(masterGain);

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      // Add slight pitch sweep down to make it sound premium and spatial
      osc.frequency.exponentialRampToValueAtTime(freq * 0.75, ctx.currentTime + duration);
      
      osc.connect(filter);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    });
  } catch (error) {
    // Silently proceed so we don't block main UI thread
    console.warn("Audio feedback synth unavailable", error);
  }
}

// Cybernetic Audio Library API
export const cyberAudio = {
  // Opening boot sequence chime
  playBootChime() {
    // Warm synthetic major-seventh cosmic chord sequence (C - E - G - B)
    const activeCtx = getAudioContext();
    if (!activeCtx) return;
    const now = activeCtx.currentTime;

    const playHarmonic = (freq: number, delay: number, dur: number, vol: number) => {
      setTimeout(() => {
        try {
          const ctx = getAudioContext();
          if (!ctx) return;
          const osc = ctx.createOscillator();
          const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
          const gainNode = ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + dur);

          gainNode.gain.setValueAtTime(0, ctx.currentTime);
          gainNode.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.08);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);

          if (panner) {
            // Alternate left-right stereo separation
            panner.pan.setValueAtTime(Math.sin(freq) * 0.5, ctx.currentTime);
            osc.connect(panner);
            panner.connect(gainNode);
          } else {
            osc.connect(gainNode);
          }

          gainNode.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + dur);
        } catch {}
      }, delay * 1000);
    };

    // Arpeggiated sequence
    playHarmonic(130.81, 0.0, 1.2, 0.12); // C3
    playHarmonic(164.81, 0.15, 1.1, 0.10); // E3
    playHarmonic(196.00, 0.30, 0.9, 0.10); // G3
    playHarmonic(246.94, 0.45, 0.8, 0.08); // B3
    playHarmonic(329.63, 0.60, 0.7, 0.06); // E4
  },

  // Scroll down navigation transition chord
  playScrollTransition() {
    // Smooth dual tone sweep representing section transitions
    playSynthTone([220, 440], 'sine', 0.4, [0, 0.08, 0]);
  },

  // Interactive diagnostic bleep - rewritten to be an ultra-subtle, warm premium tactile tap
  playDiagnosticTick() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Soft, low-frequency organic click (pure cozy hardware feel, not annoying)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.025);

      // Filter out high-frequency glare
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, ctx.currentTime);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.002);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.025);
    } catch {}
  },

  // Cyber link click - redesigned as a luxurious, soft double-tap feedback
  playTerminalLinkClick() {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const playTap = (freq: number, delay: number, volume: number) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.8, ctx.currentTime + delay + 0.04);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(350, ctx.currentTime + delay);

        gainNode.gain.setValueAtTime(0, ctx.currentTime + delay);
        gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.003);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 0.04);

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.04);
      };

      // Play soft double micro-tap
      playTap(261.63, 0, 0.035); // Middle C harmonic
      playTap(329.63, 0.015, 0.025); // E-natural harmonic
    } catch {}
  },

  // AI Chat sent signal sound
  playChatSent() {
    playSynthTone([440, 880], 'sine', 0.2, [0, 0.06, 0]);
  },

  // AI Chat response packet sound
  playChatReceived() {
    // Double beep packet signal
    setTimeout(() => {
      playSynthTone([523.25], 'sine', 0.12, [0, 0.04, 0]); // C5
    }, 0);
    setTimeout(() => {
      playSynthTone([659.25], 'sine', 0.15, [0, 0.05, 0]); // E5
    }, 120);
  },

  // Synthesis-powered welcoming voice greeting
  speakWelcome() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        // Cancel any active speech signals to prevent queue collision
        window.speechSynthesis.cancel();

        const msgStr = "Link established. Welcome to Ruthvik's professional portfolio.";
        const utterance = new SpeechSynthesisUtterance(msgStr);
        
        // Get all available system-native/local voices.
        // We prioritize local speech synthesizers and avoid Google natural/online cloud voices
        // to maintain a local cybernetic, high-fidelity embedded hardware feel.
        const voices = window.speechSynthesis.getVoices();
        
        // Find local, non-Google English voice first
        let preferredVoice = voices.find(v => 
          v.lang.startsWith("en") && 
          !v.name.toLowerCase().includes("google") && 
          (v.localService === true || v.name.includes("Daniel") || v.name.includes("Zira") || v.name.includes("David"))
        );

        // Fallback: any system-native English voice that isn't Google
        if (!preferredVoice) {
          preferredVoice = voices.find(v => 
            v.lang.startsWith("en") && 
            !v.name.toLowerCase().includes("google")
          );
        }

        // Fallback 2: Any English voice
        if (!preferredVoice) {
          preferredVoice = voices.find(v => v.lang.startsWith("en"));
        }
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        // Cybernetic mechanical settings
        utterance.rate = 1.05; // Slightly faster for high-tech cadence
        utterance.pitch = 1.1; // Balanced frequency parameters
        utterance.volume = 0.85;

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("Speech synthesis error bypassed:", err);
      }
    }
  }
};
