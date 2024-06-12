import { Button } from "@blueprintjs/core"
import { useSqlConsole } from "../../../context/SqlConsoleContext"
import { ISqlConsoleContext } from "../../../models/contextProvider"
import { SqlTable } from "./SqlTable"
import SqlQueryText from "./SqlQueryText"
import { currentStates, deviceStatuses } from "../../../models/sqlConsoleModels"

export function Content() {
  const { sendQuery, deviceStatus, currentState, setCurrentState } = useSqlConsole() as ISqlConsoleContext

  const handleExecute = () => sendQuery()
  const handleConnect = () => setCurrentState(currentStates.settings)
  const handleTables = () => setCurrentState(currentStates.tables)

  return (
    <div className='sql-console-content'>
      <div style={{ padding: '15px 15px 0px 15px', width: 500, display: 'flex', justifyContent: 'space-between' }}>
        <Button text={'Connect...'} onClick={handleConnect}></Button>
        <Button text={'Execute'} onClick={handleExecute} disabled={currentState === currentStates.readOnly}></Button>
        <Button text={'New'} disabled></Button>
        <Button text={'Open'} disabled></Button>
        <Button text={'Save'} disabled></Button>
        <Button text={'Tables'} onClick={handleTables} disabled={currentState === currentStates.readOnly}></Button>
        <Button text={'Settings'} disabled></Button>
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