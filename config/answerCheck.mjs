import { createSpinner } from "nanospinner";

const rest = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export async function handleAnswer(currQue,correctAnswer) {
    const spinner = createSpinner("checking answer....").start();
    await rest();
  
    if (currQue === correctAnswer) {
      spinner.success({
        text: `Nice one comrade. You got it corectly`,
      });
    } else {
      spinner.error({ text: `💀💀💀 Wrong boss,you lose boss ` });
      process.exit(1);
    }
  };

