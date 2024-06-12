import '@blueprintjs/core/lib/css/blueprint.css'
import { Button, InputGroup } from "@blueprintjs/core";
import { SideMenu } from "./SideMenu";
import { useSqlConsole } from '../../context/SqlConsoleContext';
import { ISqlConsoleContext } from '../../models/contextProvider';
import { deviceStatuses } from '../../models/sqlConsoleModels';
import SqlQueryText from './SqlQueryText';
import { SqlTable } from './SqlTable';

export function SqlConsole() {
  return (
    <div style={{ }}>
      {/* <Header></Header> */}
      <Body></Body>
    </div>
  )
}

function Body() {
  const { sideMenu, deviceStatus } = useSqlConsole() as ISqlConsoleContext

  return (
    <div style={{ display: 'flex' }}>
      <div>
        {sideMenu.length === 0 && <Header></Header>}
        {sideMenu.length > 0 &&
        <SideMenu sideMenu={sideMenu} key={Math.random()} />}
      </div>

      {<Content />}
    </div>
  )
}

function Header() {
  const { host, setHost, databaseName, setDatabaseName, connectToDevice } = useSqlConsole() as ISqlConsoleContext
  function handleConnect() {
    connectToDevice()
  }
  return (
    <div style={{ 
      margin: '10px', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      height: '100px', 
      width: 300,
    }}>
        <InputGroup placeholder="device host..." value={host} onChange={(e) => setHost(e.target.value)} />
        <InputGroup placeholder="database name..." value={databaseName} onChange={(e) => setDatabaseName(e.target.value)} />
        <Button text={'Connect'} onClick={handleConnect} style={{width: '100%'}}/>
    </div>
  )
}



function Content() {
  return (
    <div style={{ background: 'grey', width: '100%', display: 'flex', flexDirection: 'column'}}>
      <div style={{ padding: '15px 15px 0px 15px' }}>
        <SqlTextEditor></SqlTextEditor>
        <div style={{ paddingTop: 10 }}>
          <Button text={'Execute'}></Button>
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