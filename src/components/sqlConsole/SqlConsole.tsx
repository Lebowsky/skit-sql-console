import '@blueprintjs/core/lib/css/blueprint.css'
import { Button, InputGroup } from "@blueprintjs/core";
import { SideMenu } from "./SideMenu";
import { useSqlConsole } from '../../context/SqlConsoleContext';
import { ISqlConsoleContext } from '../../models/contextProvider';

export function SqlConsole() {
  

  return (
    <div>
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
    <div style={{ display: 'flex' }}>
      <InputGroup placeholder="device host..." value={host} onChange={(e) => setHost(e.target.value)} />
      <InputGroup placeholder="database name..." value={databaseName} onChange={(e) => setDatabaseName(e.target.value)}/>
      <Button text={'Connect'} onClick={handleConnect}/>
    </div>
  )
}

function Body() {
  const { sideMenu } = useSqlConsole() as ISqlConsoleContext
  
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {sideMenu && <SideMenu sideMenu={sideMenu} key={Math.random()}/>}
      <Content />
    </div>
  )
}

function Content() {
  return (
    <div>
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