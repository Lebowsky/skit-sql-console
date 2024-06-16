import { Button } from "@blueprintjs/core"
import { useSqlConsole } from "../../../context/SqlConsoleContext"
import { ISqlConsoleContext } from "../../../models/contextProvider"
import { SqlTable } from "./SqlTable"
import SqlQueryText from "./SqlQueryText"
import { currentStates, deviceStatuses } from "../../../models/sqlConsoleModels"

export function Content() {
  const { sqlText, setSqlText } = useSqlConsole() as ISqlConsoleContext
  const handleSqlText = (text: string) => setSqlText(text)

  return (
    <div className='sql-console-content'>
      <div className='sql-console-header'>
        <div className='sql-console-header-left'>
          <ButtonsGroup />
          <SqlQueryText defaultValue={sqlText} onChange={(e) => handleSqlText(e)} />
        </div>
        <div className='sql-console-header-right'>
          {/* <QueryParamsTable/> */}
        </div>
      </div>
      <SqlTable />
    </div>
  )
}

function ButtonsGroup() {
  const {
    sendQuery,
    deviceStatus,
    currentState,
    setCurrentState,
  } = useSqlConsole() as ISqlConsoleContext

  const handleExecute = () => sendQuery()
  const handleConnect = () => setCurrentState(currentStates.settings)
  const handleTables = () => setCurrentState(currentStates.tables)

  const diabled = currentState === currentStates.readOnly || deviceStatus === deviceStatuses.executing

  return (
    <div style={{ padding: '15px 15px 0px 15px', width: 500, display: 'flex', justifyContent: 'space-between' }}>
      <Button text={'Execute'} onClick={handleExecute} disabled={diabled}></Button>
      <Button text={'New'} disabled></Button>
      <Button text={'Open'} disabled></Button>
      <Button text={'Save'} disabled></Button>
      <Button text={'Tables'} onClick={handleTables} disabled={diabled}></Button>
      <Button text={'Settings'} disabled></Button>
      <Button text={'Connect...'} onClick={handleConnect} disabled={deviceStatus === deviceStatuses.executing}></Button>
    </div>
  )
}