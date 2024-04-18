import React, { createContext, useState } from "react";
import runChat from "../Config/gemini"; // Assuming `runChat` function is defined

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");  

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prevData) => prevData + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setInput("");
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setPrevPrompts([...prevPrompts, prompt]); // Corrected: Use `prompt` instead of `input`

    let response;
    if (prompt !== undefined) {
      response = await runChat(prompt);
    } else {
      response = await runChat(input);
      setRecentPrompt(input);
    }

    const responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    const finalResponse = newResponse.split("*").join("</br>");
    setResultData(finalResponse);

    const newResponseArray = newResponse.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    newChat,
    setInput
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
};

export default ContextProvider;