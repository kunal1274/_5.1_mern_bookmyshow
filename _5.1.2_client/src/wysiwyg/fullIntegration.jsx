// src/components/WYSIWYGEditor.js
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const WYSIWYGEditor = () => {
  const [editorHtml, setEditorHtml] = useState("");

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const quill = this.reactQuillRef.getEditor();
      const range = quill.getSelection();
      quill.insertEmbed(range.index, "image", data.url);
    };
  };

  return (
    <div>
      <ReactQuill
        value={editorHtml}
        onChange={handleChange}
        modules={{ ...WYSIWYGEditor.modules, imageHandler: handleImageUpload }}
        formats={WYSIWYGEditor.formats}
        placeholder="Write something amazing..."
      />
    </div>
  );
};

WYSIWYGEditor.modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    handlers: {
      image: handleImageUpload,
    },
  },
  clipboard: {
    matchVisual: false,
  },
};

WYSIWYGEditor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default WYSIWYGEditor;
