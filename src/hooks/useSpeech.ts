import { useEffect, useRef, useState } from "react";
import { createSpeechEngine, PlayingState, SpeechEngine } from "../lib/speech";

/*
  @descriptiond
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/

const useSpeech = (sentences: Array<string>) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [playingState, setPlayingState] = useState<PlayingState>("ended");
  const speechEngineRef = useRef<SpeechEngine | null>(null);

  useEffect(() => {
    const options = {
      onBoundary: (e: SpeechSynthesisEvent) => {
        if (e.name === "word" && e.charIndex === currentWordIndex + 1) {
          setCurrentWordIndex(currentWordIndex + 1);
        } else if (
          e.name === "sentence" &&
          currentSentenceIndex < sentences.length - 1
        ) {
          setCurrentWordIndex(0);
          setCurrentSentenceIndex(currentSentenceIndex + 1);
        }
      },
      onEnd: (e: SpeechSynthesisEvent) => {
        setPlayingState("ended");
      },
      onStateUpdate: (state: PlayingState) => {
        setPlayingState(state);
      },
    };

    speechEngineRef.current = createSpeechEngine(options);

    return () => {
      if (speechEngineRef.current) {
        speechEngineRef.current?.pause();
      }
    };
  }, [currentSentenceIndex, currentWordIndex, sentences]);

  const play = () => {
    if (!speechEngineRef.current) return;
    speechEngineRef.current?.load(sentences.join(" "));
    speechEngineRef.current?.play();
    setPlayingState("paused");
  };

  const pause = () => {
    if (!speechEngineRef.current) return;
    speechEngineRef.current?.pause();
    setPlayingState("paused");
  };

  return {
    play,
    pause,
    currentWordIndex,
    currentSentenceIndex,
    playingState,
  };
};

export { useSpeech };
