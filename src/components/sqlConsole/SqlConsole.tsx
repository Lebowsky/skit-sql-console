import '@blueprintjs/core/lib/css/blueprint.css'
import './sqlConsole.css'
import { Button } from "@blueprintjs/core";
import { useSqlConsole } from '../../context/SqlConsoleContext';
import { ISqlConsoleContext } from '../../models/contextProvider';
import SqlQueryText from './SqlQueryText';
import { SqlTable } from './SqlTable';
import { SideMenu } from './SideMenu';

export function SqlConsole() {
  return (
    <div className='sql-console-wrapper'>
      <SideMenu />
      <Content />
    </div>
  )
}

function Content() {
  const { sendQuery } = useSqlConsole() as ISqlConsoleContext

  function handleExecute() {
    sendQuery()
  }
  return (
    <div className='sql-console-content'>
      <div 
      style={{ padding: '15px 0px 0px 15px' }}
      >
        <Button text={'Execute'} onClick={handleExecute}></Button>
      </div>
      <div className='sql-text-editor-wrapper'>
        <SqlTextEditor></SqlTextEditor>
      </div>

      <div className='sql-table-wrapper'>
        <SqlTable></SqlTable>
      </div>
    </div>
  )
}

function SqlTextEditor() {
  const { sqlText, setSqlText } = useSqlConsole() as ISqlConsoleContext

  function handleSqlText(text: string) {
    setSqlText(text)
  }

  return (
    <SqlQueryText defaultValue={sqlText} onChange={(e) => handleSqlText(e)}></SqlQueryText>
  )
}