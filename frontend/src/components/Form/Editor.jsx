import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = ({ value, setValue }) => {
  return (
    <div className="App px-6">
      <h2 className="">متن مقاله</h2>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ data });
          setValue(data);
        }}
      />
    </div>
  );
};

export default Editor;
