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
    <div className='sql-text-editor-wrapper'>
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
        minLines={10}
        // maxLines={Infinity}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        style={{
          // height: '300px', 
          height: '100%',
          width: '100%',
        }}
      />
    </div>
  );
}