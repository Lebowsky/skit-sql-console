import '@blueprintjs/core/lib/css/blueprint.css'
import './sqlConsole.css'

import { Content } from './content/Content';
import { ConnectSettings } from './settingsMenu/ConnectSettings';
import { useSqlConsole } from '../../context/SqlConsoleContext';
import { ISqlConsoleContext } from '../../models/contextProvider';
import { currentStates } from '../../models/sqlConsoleModels';
import { TreeMetadata } from './treeMetadata/TreeMetadata';

export function SqlConsole() {
  const { currentState, sideMenu } = useSqlConsole() as ISqlConsoleContext
  return (
    <div className='sql-console-wrapper'>
      {currentState===currentStates.settings && <ConnectSettings show={currentState===currentStates.settings}/>}
      <TreeMetadata sideMenu={sideMenu} show={currentState===currentStates.tables} key={Math.random()}/>
      <Content />
    </div>
  )
}