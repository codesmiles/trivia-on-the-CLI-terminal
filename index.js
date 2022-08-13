#!/usr/bin/env node

import { welcome } from "./config/greetings.mjs";
// import questions from "./config/trivialQuestions.mjs";
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
            return `Senior Comrade`;
        },
    });
    playerName = answers.player_name; // answers.player_name
}


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