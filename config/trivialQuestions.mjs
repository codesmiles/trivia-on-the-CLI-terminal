import inquirer from "inquirer";
// import { handleAnswer } from "./answerCheck.mjs";


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


export {difficultyAns, amountAns};

// async function getAns (question,correctAnswer,...options){
// let answers = await inquirer.prompt({
//   //suppose to have a variable name of answers
//   type: "list",
//   name: `current_question`, //observe
//   message: question,
//   choices:[].push(options),
// });
// return handleAnswer(answers.current_question === correctAnswer);
// }

        // return options.splice(0, options.length) // to empty an array