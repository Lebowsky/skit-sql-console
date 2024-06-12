import '@blueprintjs/core/lib/css/blueprint.css'
import { Button, InputGroup } from "@blueprintjs/core";
import { SideMenu } from "./SideMenu";
import { useSqlConsole } from '../../context/SqlConsoleContext';
import { ISqlConsoleContext } from '../../models/contextProvider';
import { deviceStatuses } from '../../models/sqlConsoleModels';

export function SqlConsole() {
  return (
    <div style={{height: '90vh'}}>
      <Header></Header>
      <Body></Body>
    </div>
  )
}

function Header() {
  const { host, setHost, databaseName, setDatabaseName, connectToDevice } = useSqlConsole() as ISqlConsoleContext
  function handleConnect(){
    connectToDevice()
  }
  return (
    <div style={{ display: 'flex', width: 500, justifyContent: 'space-between', padding: 15}}>
      <InputGroup placeholder="device host..." value={host} onChange={(e) => setHost(e.target.value)} />
      <InputGroup placeholder="database name..." value={databaseName} onChange={(e) => setDatabaseName(e.target.value)}/>
      <Button text={'Connect'} onClick={handleConnect}/>
    </div>
  )
}

function Body() {
  const { sideMenu, deviceStatus } = useSqlConsole() as ISqlConsoleContext
  
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {sideMenu && <SideMenu sideMenu={sideMenu} key={Math.random()}/>}
      {deviceStatus == deviceStatuses.connected && <Content />}
    </div>
  )
}

function Content() {
  return (
    <div style={{background: 'grey', width: '100%'}}>
      <SqlTextEditor></SqlTextEditor>
      <SqlTable></SqlTable>
    </div>
  )
}

function SqlTextEditor() {
  return (
    <div>

    </div>
  )
}

function SqlTable() {
  return (
    <div>

    </div>
  )
}