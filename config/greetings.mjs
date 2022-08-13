import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export const welcome = async ()=> {
  const rainbowTitle = chalkAnimation.rainbow(
    "WELCOME TO YOUR QUIZ GAME ON THE CLI \n"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")}
    If you get any question wrong, you will be ${chalk.bgRed("killed")}
    So try get all the questions right boss
    `);
}

