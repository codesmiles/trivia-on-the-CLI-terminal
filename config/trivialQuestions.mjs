import inquirer from "inquirer";
import { handleAnswer } from "./answerCheck.mjs";
import axios from "axios";

let difficultyAns, amountAns;

const difficulty = async () => {
  const answers = await inquirer.prompt({
    type: "list",
    name: "difficulty",
    message: "select your difficulty",
    choices: ["easy", "medium", "hard"],
  });
  return (difficultyAns = answers.difficulty);
};

// await difficulty();

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
// await amount();

// axios
//   .get(
//     `https://the-trivia-api.com/api/questions?categories=general_knowledge&limit=${amountAns}&region=NG&difficulty=${difficultyAns}`
//   )
//   .then((res) => {
//     const options = [].sort((a,b)=>0.5 - Math.random());


//     res.data.map((opt) => {      
//       options.push(opt.correctAnswer, ...opt.incorrectAnswers)

//       const questionire = async () => {
//         const answers = await inquirer.prompt({
//           //suppose to have a variable name of answers
//           type: "list",
//           name: "Question_1",
//           message: opt.question,
//           choices: options,
//         });
//         return handleAnswer(answers.Question_1 === opt.correctAnswer),options.splice(0,options.length);
//       };
      
//       // ans.incorrectAnswers
//       // ans.correctAnswer
//       // ans.question
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// export default questions;


