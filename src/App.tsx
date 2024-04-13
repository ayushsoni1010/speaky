import { useEffect, useState } from "react";
import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { useSpeech } from "./lib/useSpeech";
import { fetchContent, parseContentIntoSentences } from "./lib/content";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentSentenceIdx, currentWordRange, playbackState, play, pause } =
    useSpeech(sentences);

  const getParseResult = async () => {
    const string = await fetchContent();
    const parsedContent = await parseContentIntoSentences(string);
    setSentences(parsedContent!);
  };

  useEffect(() => {
    getParseResult();
  }, []);

  // I am able to get the parsed sentences from the data and crafted the useSpeach hook through consoles, but there are some local console issues that I can fit it if i had some more time to handle them.

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading
          sentences={sentences}
          currentWordRange={currentWordRange}
          currentSentenceIdx={currentSentenceIdx}
        />
      </div>
      <div>
        <Controls
          play={play}
          pause={pause}
          loadNewContent={getParseResult}
          state={playbackState}
        />
      </div>
    </div>
  );
}

export default App;
