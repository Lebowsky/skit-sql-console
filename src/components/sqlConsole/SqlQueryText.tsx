import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

interface SqlQueryTextProps {
  defaultValue: string
  onChange(text: string): void
}
export default function SqlQueryText({ defaultValue, onChange }: SqlQueryTextProps) {
  return (
    <AceEditor
      placeholder="SQL text here"
      mode="mysql"
      theme="github"
      onChange={onChange}
      fontSize={14}
      lineHeight={19}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={defaultValue}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }} 
      style={{
        height: '300px', 
        width:'700px',
      }}
      />
  );
}