import '@blueprintjs/core/lib/css/blueprint.css'
import { Button } from "@blueprintjs/core";
import { useSqlConsole } from '../../context/SqlConsoleContext';
import { ISqlConsoleContext } from '../../models/contextProvider';
import SqlQueryText from './SqlQueryText';
import { SqlTable } from './SqlTable';
import { SideMenu } from './SideMenu';

export function SqlConsole() {
  return (
    <div style={{ display: 'flex' }}>
      <SideMenu/>
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
    <div style={{ 
      background: 'grey', 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column'
    }}>
      <div style={{ padding: '15px 15px 0px 15px' }}>
        <SqlTextEditor></SqlTextEditor>
        <div style={{ paddingTop: 10 }}>
          <Button text={'Execute'} onClick={handleExecute}></Button>
        </div>
      </div>

      <div style={{ padding: 15 }}>
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
    <div>
      <SqlQueryText defaultValue={sqlText} onChange={(e) => handleSqlText(e)}></SqlQueryText>
    </div>
  )
}