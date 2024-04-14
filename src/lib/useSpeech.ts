import { useState } from "react";

import { createSpeechEngine, PlayingState, SpeechEngine } from "./speech";

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState([0, 0]);

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const [speechEngine, setSpeechEngine] = useState<SpeechEngine | null>(null);

  const options = {
    onBoundary: () => {},
    onEnd: () => {},
    onStateUpdate: () => {},
  };

  useState(() => {
    const engine = createSpeechEngine(options);
    setSpeechEngine(engine);
  });

  const play = () => {
    if (!speechEngine) return;

    speechEngine.load(sentences[currentSentenceIdx]);
    speechEngine.play();
    setPlaybackState("playing");
  };

  const pause = () => {
    if (!speechEngine) return;

    speechEngine.pause();
    setPlaybackState("paused");
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };
