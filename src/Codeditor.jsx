import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Button, Switch } from "antd";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URL, API_HEADER } from "./secret";
import Langselect from "./Langselect";
import templateFunc from "./template";

export default function Codeditor({ editorID }) {
  const editorRef = useRef(null);
  const inputRef = useRef();
  const outputRef = useRef();
  const [getTemplate, setTemplate] = useState("");
  const [getTheme, setTheme] = useState(1);
  const [isRunning, setRunning] = useState(0);
  const [getLanguage, setLanguage] = useState(
    localStorage.getItem("codex-lang")
      ? JSON.parse(localStorage.getItem("codex-lang"))
      : ["cpp", "cpp"]
  ); // if previously arrived than load that language else default is cpp

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  useEffect(() => {
    const lang = getLanguage[1];
    const data = localStorage.getItem("codex-" + lang + "-code");
    !data ? setTemplate(templateFunc(lang)) : setTemplate(data); // if code is been saved before than load it, otherwise load the template
  }, getLanguage);

  const saveOnLocalStorage = (val) => {
    const lang = getLanguage[1];
    localStorage.setItem(
      "codex-" + lang + "-code",
      editorRef.current.getValue()
    );
  };

  const handleCompile = async () => {
    // const data = {
    //   language: getLanguage[0],
    //   version: "latest",
    //   code: editorRef.current.getValue(),
    //   input: inputRef.current.value,
    // };
    const data = {
      language: getLanguage[0],
      code: editorRef.current.getValue(),
      input: inputRef.current.value,
    };

    setRunning(1);
    try {
      // const response = await axios.post(API_URL, data, { headers: API_HEADER });
      const response = await axios.post(API_URL, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      outputRef.current.innerText = response.data.output
        ? response.data.output
        : response.data.error;
    } catch (error) {
      toast.error(error.message);
    }
    setRunning(0);
  };
  return (
    <div className="codeditor">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        theme={getTheme ? "dark" : "light"}
        transition={Slide}
      />
      <div
        className="code-panel"
        style={{ backgroundColor: `${getTheme ? "#161819" : "#f2f2f2"}` }}
      >
        <div className="code-main">
          <div className="editor-controls">
            <Langselect setLanguage={setLanguage} getTheme={getTheme} />
            <div className="theme-run">
              <Switch
                style={{ border: `1px solid ${getTheme ? "white" : "black"}` }}
                checkedChildren="light"
                unCheckedChildren="dark"
                onChange={() => setTheme((prev) => !prev)}
              />
              <Button
                onClick={handleCompile}
                className="run-btn"
                loading={isRunning}
              >
                {isRunning ? "Running" : "Run Code"}
              </Button>
            </div>
          </div>
          <div className="editor" autoFocus>
            <Editor
              width="100%"
              height="100%"
              theme={getTheme ? "vs-dark" : "light"}
              language={getLanguage[1]}
              onMount={handleEditorDidMount}
              onChange={saveOnLocalStorage} // save code on local storage
              value={getTemplate} //set Template of language
            />
          </div>
        </div>
        <div className="inp-oup">
          <div className="output-panel">
            <p
              className="txt-lbl"
              style={{ color: `${getTheme ? "white" : "black"}` }}
            >
              Output
            </p>
            <div
              className="oup"
              ref={outputRef}
              style={{
                color: `${getTheme ? "white" : "black"}`,
                backgroundColor: `${getTheme ? "#1e1e1e" : "white"}`,
              }}
            ></div>
          </div>
          <div className="input-panel">
            <p
              className="txt-lbl"
              style={{ color: `${getTheme ? "white" : "black"}` }}
            >
              Input
            </p>
            <textarea
              ref={inputRef}
              name=""
              id=""
              className="inp"
              placeholder={`example:\n5\n1 2 3 4 5`}
              style={{
                color: `${getTheme ? "white" : "black"}`,
                backgroundColor: `${getTheme ? "#1e1e1e" : "white"}`,
              }}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
