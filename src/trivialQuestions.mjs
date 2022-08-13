import inquirer from "inquirer";
import { handleAnswer } from "./answerCheck.mjs";
import axios from "axios"

let difficultyAns,amountAns;

const difficulty = async () => {
    const answers = await inquirer.prompt({
      type: "list",
      name: "difficulty",
      message: "select your difficulty",
      choices: ["easy","medium","hard"],
    });
    return difficultyAns = answers.difficulty;
  };  

// await difficulty

  const amount = async () => {
    const answers = await inquirer.prompt({
      type: "input",
      name: "amount",
      message: "State the number of questions you want to answer",
      default(){
        return 10
      }
    });
    return amountAns = answers.amount;
  };  
// await amount;

axios.get(`https://opentdb.com/api.php?amount=${amountAns}&category=9&difficulty=${difficultyAns}&type=multiple`).then((res)=>{}).catch((err)=>{console.error(err)})




const questions = async () => {
  const answers = await inquirer.prompt({
    //suppose to have a variable name of answers
    type: "list",
    name: "Question_1",
    message: "What is your name?",
    choices: ["codesmiles", "mike", "comrade", "vawlence boss"],
  });
  return handleAnswer(answers.Question_1 === "codesmiles");
};

export default questions;





