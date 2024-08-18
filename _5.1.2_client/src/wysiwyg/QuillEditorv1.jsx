// src/components/WYSIWYGEditorV1.js
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const WYSIWYGEditorV1 = () => {
  const [editorHtml, setEditorHtml] = useState("");

  // Function to handle changes in the editor
  const handleChange = (html) => {
    setEditorHtml(html);
  };

  // Regex to detect URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Function to convert plain text URLs into anchor tags
  const linkifyText = (text) => {
    return text.replace(urlRegex, function (url) {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
  };

  // Handle pasted text and convert links
  const handlePastedText = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("Text");
    const linkifiedText = linkifyText(pastedData);
    const quill = reactQuillRef.getEditor();
    const range = quill.getSelection();
    quill.clipboard.dangerouslyPasteHTML(range.index, linkifiedText);
  };

  // Handle image uploads
  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);

      // Assuming your server is running and has an endpoint to handle the upload
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const quill = reactQuillRef.getEditor();
      const range = quill.getSelection();
      quill.insertEmbed(range.index, "image", data.url);
    };
  };

  let reactQuillRef = null;

  return (
    <div>
      <ReactQuill
        value={editorHtml}
        onChange={handleChange}
        modules={{
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
        }}
        formats={[
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
        ]}
        placeholder="Write something amazing..."
        ref={(el) => {
          reactQuillRef = el;
        }}
        onPaste={handlePastedText}
      />
    </div>
  );
};

export default WYSIWYGEditorV1;
