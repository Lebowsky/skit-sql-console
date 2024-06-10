import '@blueprintjs/core/lib/css/blueprint.css'
import { Button, InputGroup } from "@blueprintjs/core";
import { SideMenu } from "./SideMenu";

export function SqlConsole() {
  // const { sqlTableData, isConnected } = useSqlConsole() as ISqlConsoleContext
  // const sqlScreenData = JSON.parse(localStorage.getItem('sqlScreenData'))
  // let sqlQueryText = '', deviceHost = '', sqlBaseName = ''
  // if (sqlScreenData) {
  //   ({ sqlQueryText, deviceHost, sqlBaseName } = sqlScreenData)
  // }

  // const [host, setHost] = useState(deviceHost)
  // const [baseName, setBaseName] = useState(sqlBaseName)

  // async function handleConnect() {
  //   sendQuery(SQL_QUERY_GET_TABLES, 'system')
  // }

  // async function sendQuery(sqlText: string, type: queryType = 'user') {
  //   await window.electronAPI.sendQuery(
  //     {
  //       host: host,
  //       baseName: baseName,
  //       sqlText: sqlText,
  //       queryType: type
  //     }
  //   )
  // }

  return (
    <div>
      <Header></Header>
      <Body></Body>
    </div>
  )
}

function Header() {
  return (
    <div style={{ display: 'flex' }}>
      <InputGroup placeholder="device host..." />
      <InputGroup placeholder="database name..." />
      <Button text={'Connect'} />
    </div>
  )
}

function Body() {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <SideMenu />
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