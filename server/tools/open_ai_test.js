



//This file is for testing the OpenAI API. It is not used in the project.
//You can run it by typing "node open_ai_test.js" in the terminal.
//It will prompt you for input and then return a response from the API in cmd-line.


import dotenv from "dotenv";
dotenv.config();
import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}));

//.then(res => {
    //console.log(res.data.choices[0].message.content)
//})

const ui = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

ui.prompt();
ui.on("line", async input => {
    const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input}]
    })
    console.log(res.data.choices[0].message.content)
    ui.prompt();
})