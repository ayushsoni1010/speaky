import { useEffect, useState } from "react";
import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { useSpeech } from "./lib/useSpeech";
import { fetchContent, parseContentIntoSentences } from "./lib/content";

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { play, pause, currentWordIndex, currentSentenceIndex, playingState } =
    useSpeech(sentences);

  const getParseResult = async () => {
    try {
      const string = await fetchContent();
      const parsedContent = await parseContentIntoSentences(string);
      setSentences(parsedContent!);
    } catch (error) {
      console.error("Error fetching or parsing content:", error);
    }
  };

  useEffect(() => {
    getParseResult();
  }, []);

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading
          sentences={sentences}
          currentWordRange={currentWordIndex}
          currentSentenceIdx={0}
        />
      </div>
      <div>
        <Controls play={play} pause={pause} loadNewContent={getParseResult} />
      </div>
    </div>
  );
}

export default App;
