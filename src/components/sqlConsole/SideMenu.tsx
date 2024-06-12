import { useSqlConsole } from "../../context/SqlConsoleContext"
import { TreeMetadata } from "./TreeMetadata"
import { ISqlConsoleContext } from "../../models/contextProvider"
import { Button, InputGroup } from "@blueprintjs/core"

export function SideMenu() {
  const { sideMenu, deviceStatus } = useSqlConsole() as ISqlConsoleContext
  return (
    <div>
      {sideMenu.length === 0 && <ConnectSettings />}
      {sideMenu.length > 0 && <TreeMetadata sideMenu={sideMenu} key={Math.random()} />}
    </div>
  )
}

function ConnectSettings() {
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
      <Button text={'Connect'} onClick={handleConnect} style={{ width: '100%' }} />
    </div>
  )
}