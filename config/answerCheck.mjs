import { createSpinner } from "nanospinner";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
// import playerName from "./intro.mjs";

export async function handleAnswer(isCorrect) {
    const spinner = createSpinner("checking answer....").start();
    await sleep();
  
    if (isCorrect) {
      spinner.success({
        text: `Nice one comrade. You got it corectly`,
      });
    } else {
      spinner.error({ text: `💀💀💀 Wrong boss,you lose boss ` });
      process.exit(1);
    }
  };

