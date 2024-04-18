import React, { useContext, useState } from "react";
import "./main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput } = useContext(Context);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {!showResult && (
          <>
            <div className="greet">
              <p>
                <span>Hello, Yomal.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Give me tips for how to grow my YouTube channel</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>Suggest beaches to visit in a city, including details</p>
                <img src={assets.bulb_icon} alt="Bulb Icon" />
              </div>
              <div className="card">
                <p>Explain how something works like an engineer</p>
                <img src={assets.message_icon} alt="Message Icon" />
              </div>
              <div className="card">
                <p>Recommend new types of water sports, including pros & cons</p>
                <img src={assets.code_icon} alt="Code Icon" />
              </div>
            </div>
          </>
        )}
        {showResult && (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
        <div className="search-box">
            <input onChange={handleChange} value={inputValue} type="text" placeholder="Enter a prompt here" />
            <div>
            <img src={assets.gallery_icon} alt="Gallery Icon" />
            <img src={assets.mic_icon} alt="Mic Icon" />
            {inputValue ? (
                <img onClick={() => { setInput(inputValue); onSent(inputValue); }} src={assets.send_icon} alt="Send Icon" />
            ) : null}
            </div>
        </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
