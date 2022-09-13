import React from "react";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

export default function AddJson() {
  return (
    <div>
      <JSONInput
        id="a_unique_id"
        // placeholder={sampleObject}
        // colors={darktheme}
        locale={locale}
        height="550px"
      />
    </div>
  );
}
