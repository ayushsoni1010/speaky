import { useEffect, useState } from "react";
import "./App.css";
import "./styles/global.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { useSpeech } from "./hooks/useSpeech";
import { fetchContent, parseContentIntoSentences } from "./lib/content";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import Hero from "./components/Hero";

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
    <BrowserRouter>
      <div className="h-screen max-w-screen-xl m-auto">
        <Header />
        <Hero />
        {/* <h1>Text to speech</h1>
        <div>
          <CurrentlyReading
            sentences={sentences}
            currentWordRange={currentWordIndex}
            currentSentenceIdx={0}
          />
        </div>
        <div>
          <Controls play={play} pause={pause} loadNewContent={getParseResult} />
        </div> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
