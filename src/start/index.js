import React, { useState } from "react";
import "./index.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Main, Main2, Formwrapper, SubmitButton } from "./style";
import ReactHtmlParser from "html-react-parser";

function MainPage() {
  const [Content, setContent] = useState({
    title: "",
    content: "",
  });
  const [viewContent, setViewContent] = useState([]);
  const getValue = (e) => {
    const { name, value } = e.target;
    setContent({
      ...Content,
      [name]: value,
    });
    console.log(Content);
  };
  return (
    <Main>
      <h1>hello my note</h1>
      <Main2>
        {viewContent.map((element) => (
          <div>
            <h2>{element.title}</h2>
            <div>{ReactHtmlParser(element.content)}</div>
          </div>
        ))}
      </Main2>
      <Formwrapper>
        <input
          className="title-input"
          style={{ width: "500px", height: "40px", margin: "10px" }}
          type="text"
          placeholder="제목"
          onChange={getValue}
          name="title"
        />
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setContent({
              ...Content,
              content: data,
            });
            console.log(Content);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </Formwrapper>
      <SubmitButton
        onClick={() => {
          setViewContent(viewContent.concat({ ...Content }));
        }}
      >
        입력
      </SubmitButton>
    </Main>
  );
}
export default MainPage;
