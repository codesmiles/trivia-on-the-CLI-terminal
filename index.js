#!/usr/bin/env node

import { welcome } from "./config/greetings.mjs";
import { difficultyAns, amountAns } from "./config/trivialQuestions.mjs";
import { handleAnswer } from "./config/answerCheck.mjs";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import axios from "axios";
import { observable,from } from "rxjs";

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


    // const observable = from(resObj.response);
    // const subscription = observable.subscribe(
    //   x => { inquirer.prompt({
    //       //suppose to have a variable name of answers
    //       type: "list",
    //       name: `current_question`, //observe
    //       message: x.question,
    //       choices: [x.correctAnswer,...x.incorrectAnswers],
    //     });
    //      handleAnswer(answers.current_question === x.correctAnswer);});
    // // Later:
    // subscription.unsubscribe();

    
      // let observer = {
      //   next: (value) => {
      //     console.log(value);
      //   },
      //   error: (error) => {
      //     console.log(error);
      //   },
      //   complete: () => {
      //     console.log("completed");
      //   },
      // };
      // observable
      //   .create((obs) => {
      //     obs.next("a val");
      //   })
      //   .subscribe(observer);

///////////////////////////////////////////////////////////////////////////////

    //  incoming data
    res.data.forEach((opt, index, arr) => {
      let valObj = {
        opt,
        question: opt.question,
        correctAnswer: opt.correctAnswer,
        incorrectAnswers: opt.incorrectAnswers,
        pushOPtionsVal: options.push(
          this.correctAnswer,
          ...this.incorrectAnswers
        ),
        optionsSort: options.sort(() => 0.5 - Math.random()),
        emptyOptionsArr: options.splice(0, options.length),
      };
      let answers = await inquirer.prompt({
        //suppose to have a variable name of answers
        type: "list",
        name: `current_question`, //observe
        message: question,
        choices: [],
      });
      // check if a question option has been selected
      if (answers.current_question) {
        return handleAnswer(answers.current_question === valObj.correctAnswer);
      }

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
