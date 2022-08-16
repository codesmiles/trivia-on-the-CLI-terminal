#!/usr/bin/env node

import { welcome } from "./config/greetings.mjs";
import inquirer from "inquirer";
import { handleAnswer } from "./config/answerCheck.mjs";
import figlet from "figlet";
import gradient from "gradient-string";
import axios from "axios";
// import { difficultyAns, amountAns } from "./config/trivialQuestions.mjs";
import event from "events";
// import events from "promise-events";

const emitter = new event.EventEmitter();
let playerName, difficultyAns, amountAns;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function askName() {
  const answers = await inquirer.prompt({
    //suppose to have a variable name of answers
    type: "input",
    name: "player_name",
    message: "What is your name senior?",
    default() {
      return `Nameless Comrade🙄🙄`;
    },
  });
  playerName = answers.player_name; // answers.player_name
}
await welcome(); //top level await
await askName();

const difficulty = async () => {
  const answers = await inquirer.prompt({
    type: "list",
    name: "difficulty",
    message: "select your difficulty",
    choices: ["easy", "medium", "hard"],
  });
  return (difficultyAns = answers.difficulty);
};

await difficulty();

const amount = async () => {
  const answers = await inquirer.prompt({
    type: "input",
    name: "amount",
    message:
      "State the number of questions you want to answer not more than 20",
    default() {
      return 10;
    },
  });
  return (amountAns = answers.amount);
};
await amount();

// AXIOS GET QUIZ FROM API
const options = [];

axios
  .get(
    `https://the-trivia-api.com/api/questions?categories=general_knowledge&limit=${amountAns}&region=NG&difficulty=${difficultyAns}`
  )
  .then((res) => {
    ////////////////////////  incoming data //////////////////////////
    for (const opt of res.data) {
      let valObj = {
        opt,
        question: opt.question,
        correctAnswer: opt.correctAnswer,
        incorrectAnswers: opt.incorrectAnswers,
        pushOPtionsVal() {
          return options.push(opt.correctAnswer, ...opt.incorrectAnswers);
        },
        optionsSort() {
          return options.sort(() => 0.5 - Math.random());
        },
        emptyOptionsArr() {
          return options.splice(0, options.length);
        },
      };

      // console.log(valObj.correctAnswer);
      valObj.pushOPtionsVal();

      emitter.on("event", (val) => {
        inquirer
          .prompt({
            type: "list",
            name: `current_question`, //observe
            message: val.question,
            choices: val.optionsSort(),
          })
          .then((ans) => {
            handleAnswer(ans.current_question, valObj.correctAnswer);
          })
          .catch((err) => console.log(err));
      });

      return emitter.emit("event", valObj), valObj.emptyOptionsArr();
      //  while (options.length > 0) {
      //   emitter.emit("event", valObj);
      //   valObj.emptyOptionsArr();
      //   if (options.length !== 0) {
      //     sleep(100000);
      //     valObj.emptyOptionsArr();

      // }
      // }
    }
  })
  .catch((err) => {
    console.error(err);
  });

async function winner() {
  console.clear();
  const msg = `congrats ${playerName}`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

async function loser() {
  console.clear();
  const msg = `pele ${playerName}`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

// await winner();
// await loser();
