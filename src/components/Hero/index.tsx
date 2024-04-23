import { AudioLines, Pause, Play } from "lucide-react";
import Button from "../Button";
import { useSpeech } from "../../hooks/useSpeech";

const SENTENCE = [
  "It's not a mis-statement to say that whatever's happening has nothing to do with people",
  "but the giants who only care about their business and not about the overall well being of humans.",
];

const Hero: React.FunctionComponent = () => {
  const { play, pause, currentWordIndex, currentSentenceIndex, playingState } =
    useSpeech(SENTENCE);

  return (
    <div className="hero-container-wrapper h-4/5 flex items-center justify-between">
      <div className="space-y-6">
        <h1 className="text-6xl max-w-xl font-medium leading-tight">
          The text-to-speech that's life like than any out there.
        </h1>
        <p className="text-lg max-w-lg">
          With over 10k+ voice demos, give your presentations and videos and
          more. We ensure you get what you are looking for. Our AI aims to learn
          your patterns.
        </p>
        <Button>Get Started</Button>
      </div>
      <div className="flex flex-col gap-6 items-center justify-center relative">
        <img
          src="/hero-hexagons-light.svg"
          alt="Hero Hexagons Light"
          className="absolute right-0"
        />
        <SpeechControls play={play} pause={pause} />
        <AudioControls />
      </div>
    </div>
  );
};

const SpeechControls = ({
  play,
  pause,
}: {
  play: () => void;
  pause: () => void;
}) => {
  return (
    <div className="h-fit w-96 backdrop-blur-sm bg-white/50 shadow-sm rounded-xl bg-clip-padding backdrop-filter bg-opacity-10 border border-gray-100/60 relative -left-32 p-4 space-y-3">
      <div className="border-b-gray-200 border-b w-full flex items-center gap-4 h-7">
        <select name="" id="" className="bg-transparent text-sm">
          <option value="rishi">Rishi</option>
        </select>
        <select name="" id="" className="bg-transparent text-sm">
          <option value="english">English (United States)</option>
        </select>
      </div>
      <div>
        <div className="font-medium text-2xl tracking-wide">
          <span className="text-indigo-300">
            It's not a mis-statement to say that whatever's happening has
            nothing to do with people but the giants
          </span>{" "}
          who only care about their business and not about the overall well
          being of humans.
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <div
            className="w-6 h-6 inline-flex items-center rounded-full p-[5px] justify-center bg-indigo-300 cursor-pointer"
            onClick={play}
          >
            <Play className="fill-white text-white" />
          </div>
          <div
            className="w-6 h-6 inline-flex items-center rounded-full p-[5px] justify-center bg-indigo-300 cursor-pointer"
            onClick={pause}
          >
            <Pause className="fill-white text-white" />
          </div>
          <div className="inline-flex items-center rounded-full p-1 justify-center bg-transparent">
            <AudioLines className="fill-white text-indigo-300 animate-pulse" />
          </div>
        </div>
        <div className="text-indigo-300 text-base font-medium">50/120</div>
      </div>
    </div>
  );
};

const AudioControls: React.FunctionComponent = () => {
  return (
    <div className="h-40 w-80 backdrop-blur-sm bg-white/50 shadow-sm rounded-xl bg-clip-padding backdrop-filter  bg-opacity-10 border border-gray-100 p-4 space-y-4">
      <SpeechAttribute name="Pitch" value="0" />
      <SpeechAttribute name="Speed" value="+1.2" />
      <div className="flex justify-start gap-10 relative">
        <SpeechOption label="Breathing" />
        <SpeechOption label="Live pauses" />
      </div>
    </div>
  );
};

const SpeechAttribute: React.FunctionComponent<{
  name: string;
  value: string;
}> = ({ name, value }) => {
  return (
    <div className="flex justify-between flex-col gap-1.5 relative">
      <h3 className="text-base font-medium">{name}</h3>
      <span className="right-0 absolute text-sm text-gray-400">{value}</span>
      <div className="w-full h-2 rounded-md bg-white relative overflow-hidden">
        <span
          className={`h-2 ${
            name === "Pitch" ? "w-1/2" : "w-2/3"
          } rounded-md gradient absolute`}
        ></span>
      </div>
    </div>
  );
};

const SpeechOption: React.FunctionComponent<{ label: string }> = ({
  label,
}) => {
  return (
    <div className="inline-flex gap-2 items-center">
      <div className="relative flex items-center rounded-full cursor-pointer">
        <input
          type="checkbox"
          className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all checked:border-indigo-400 checked:bg-indigo-400 checked:before:bg-indigo-400 hover:before:opacity-10"
          id={label}
          checked
        />
        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              fill-rule="evenodd"
              className="bg-gradient-to-tr"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </span>
      </div>
      <label
        className="relative flex items-center cursor-pointer"
        htmlFor={label}
      >
        {label}
      </label>
    </div>
  );
};

export default Hero;
