#!/usr/bin/env node

import { welcome } from "./src/greetings.mjs";

import questions from "./src/trivialQuestions.mjs";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";


 let playerName;
// const sleep = (ms = 2000) => new Promise((r)=>setTimeout(r,ms));

async function askName(){
    const answers = await inquirer.prompt({  //suppose to have a variable name of answers
        type: "input",
        name: "player_name",
        message: "What is your name?",
        default(){
            return `player`;
        },
    });
    playerName = answers.player_name; // answers.player_name
}


const amount = async () => {
    const answers = await inquirer.prompt({
      type: "input",
      name: "amount",
      message: "State the number of questions you want to answer",
      default(){
        return 10
      }
    });
    console.log(answers.amount);
  };  


async function winner() {
  console.clear();
  const msg = `congratulation ${playerName}\n $1 , 0 0 0 , 0 0 0`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}



await amount();
// await welcome(); //top level await
// await askName();
// await questions();
// await winner();