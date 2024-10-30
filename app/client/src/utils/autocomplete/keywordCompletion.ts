import {$t} from "locale/index";
import type { Completion, TernCompletionResult } from "./CodemirrorTernService";

export const getCompletionsForKeyword = (
  completion: Completion<TernCompletionResult>,
  cursorHorizontalPos: number,
) => {
  const keywordName = completion.text;
  // indentation needs to be positive number
  const indentation = cursorHorizontalPos < 0 ? 0 : cursorHorizontalPos;
  const indentationSpace = " ".repeat(indentation);

  const completions = [];

  switch (keywordName) {
    // loops
    case "for":
      completions.push({
        ...completion,
        name: "for-loop",
        text: `for(let i=0;i < array.length;i++){\n${indentationSpace}\tconst element = array[i];\n${indentationSpace}}`,
        render: (element: HTMLElement) => {
          element.setAttribute("keyword", $t('keywordCompletion.8f2a3031ef8d4bbf'));
          element.innerHTML = completion.text;
        },
      });
      completions.push({
        ...completion,
        name: "for-in-loop",
        text: `for(const key in object) {\n${indentationSpace}}`,
        render: (element: HTMLElement) => {
          element.setAttribute("keyword", $t('keywordCompletion.190b16a1232ffa71'));
          element.innerHTML = "forin";
        },
      });
      completions.push({
        ...completion,
        name: "for-of-loop",
        text: `for(const iterator of object){\n${indentationSpace}}`,
        render: (element: HTMLElement) => {
          element.setAttribute("keyword", $t('keywordCompletion.91f42540b85ee2c9'));
          element.innerHTML = "forof";
        },
      });
      break;

    case "while":
      completions.push({
        ...completion,
        name: "while-loop",
        text: `while(condition){\n${indentationSpace}}`,
        render: (element: HTMLElement) => {
          element.setAttribute("keyword", $t('keywordCompletion.a2ab7c2dbb4cba97'));
          element.innerHTML = completion.text;
        },
      });
      break;

    case "do":
      completions.push({
        ...completion,
        name: "do-while-statement",
        text: `do{\n\n${indentationSpace}} while (condition);`,
        render: (element: HTMLElement) => {
          element.setAttribute("keyword", "do-While Statement");
          element.innerHTML = completion.text;
        },
      });
      break;

    // conditional statement
    case "if":
      completions.push({
        ...completion,
        name: "if-statement",
        text: `if(condition){\n\n${indentationSpace}}`,
        render: (element: HTMLElement) => {
          element.setAttribute("keyword", $t('keywordCompletion.257c224b9697d57b'));
          element.innerHTML = completion.text;
        },
      });

      break;
    case "switch":
      completions.push({
        ...completion,
        name: "switch-statement",
        text: `switch(key){\n${indentationSpace}\tcase value:\n${indentationSpace}\t\tbreak;\n${indentationSpace}\tdefault:\n${indentationSpace}\t\tbreak;\n${indentationSpace}}`,
        render: (element: HTMLElement) => {
          element.setAttribute("keyword", $t('keywordCompletion.9a95f50310ee82c7'));
          element.innerHTML = completion.text;
        },
      });

      break;
    case "function":
      completions.push({
        ...completion,
        name: "function-statement",
        text: `function name(params){\n\n${indentationSpace}}`,
        render: (element: HTMLElement) => {
          element.setAttribute("keyword", $t('keywordCompletion.a372ac33e5de5c91'));
          element.innerHTML = completion.text;
        },
      });

      break;
    case "try":
      completions.push({
        ...completion,
        name: "try-catch",
        text: `try{\n\n${indentationSpace}}catch(error){\n\n${indentationSpace}}`,
        render: (element: HTMLElement) => {
          element.setAttribute("keyword", $t('keywordCompletion.b4b7d8ca26223f5c'));
          element.innerHTML = "try-catch";
        },
      });
      break;

    case "throw":
      completions.push({
        ...completion,
        name: "throw-exception",
        text: `throw new Error("");`,
        render: (element: HTMLElement) => {
          element.setAttribute("keyword", $t('keywordCompletion.683dd66085c74a82'));
          element.innerHTML = completion.text;
        },
      });
      break;
    case "new":
      completions.push({
        ...completion,
        name: "new-statement",
        text: `const name = new type(arguments);`,
        render: (element: HTMLElement) => {
          element.setAttribute("keyword", $t('keywordCompletion.c9eca7d7e29ebe03'));
          element.innerHTML = completion.text;
        },
      });
      break;
    case "async":
      completions.push(
        {
          ...completion,
          name: "async-function",
          text: `async function() {\n\n${indentationSpace}}`,
          render: (element: HTMLElement) => {
            element.setAttribute("keyword", $t('keywordCompletion.7183b7dcb8e14de4'));
            element.innerHTML = completion.text;
          },
        },
        {
          ...completion,
          name: "async-arrow-function",
          text: `async () => {\n\n${indentationSpace}}`,
          render: (element: HTMLElement) => {
            element.setAttribute("keyword", $t('keywordCompletion.2bc73f1429f13f14'));
            element.innerHTML = completion.text;
          },
        },
      );
      break;
  }

  return completions;
};
