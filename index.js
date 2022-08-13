#!/usr/bin/env node

import { welcome } from "./config/greetings.mjs";
import { difficultyAns, amountAns } from "./config/trivialQuestions.mjs";
import { handleAnswer } from "./config/answerCheck.mjs";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import axios from "axios";

let playerName;
// const sleep = (ms = 2000) => new Promise((r)=>setTimeout(r,ms));

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


// AXIOS GET QUIZ FROM API
const options = [];

  axios
    .get(
      `https://the-trivia-api.com/api/questions?categories=general_knowledge&limit=${amountAns}&region=NG&difficulty=${difficultyAns}`
    )
    .then((res) => {
    //  incoming data
     res.data.forEach((opt) => {
        options.push(opt.correctAnswer, ...opt.incorrectAnswers);
        console.log(options.sort(() => 0.5 - Math.random()), opt);
        options.splice(0, options.length) // to empty an array
        // incoming questions

    });
    
    })
    .catch((err) => {
      console.error(err);
    });


async function winner() {
  console.clear();
  const msg = `congratulation ${playerName}\n $1 , 0 0 0 , 0 0 0`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

// await welcome(); //top level await
// await askName();
// await questions();
// await winner();

