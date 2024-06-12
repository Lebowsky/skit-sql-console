import { Button, Drawer, InputGroup, Position } from "@blueprintjs/core"
import { useSqlConsole } from "../../../context/SqlConsoleContext"
import { ISqlConsoleContext } from "../../../models/contextProvider"
import { useState } from "react"
import { currentStates, deviceStatuses } from "../../../models/sqlConsoleModels"

interface ConnectSettingsProps {
  show: boolean
}

export function ConnectSettings({ show }: ConnectSettingsProps) {
  const { host, setHost, databaseName, setDatabaseName, connectToDevice, setCurrentState, deviceStatus } = useSqlConsole() as ISqlConsoleContext
  const [isOpen, setIsOpen] = useState(show)

  const handleConnect = async () => {
    const result = await connectToDevice()
    setIsOpen(!result)
    setCurrentState(result ? currentStates.editor : currentStates.readOnly)
  }
  const handleClose = () => {
    setIsOpen(false);
    setCurrentState(deviceStatus === deviceStatuses.notConnected ? currentStates.readOnly : currentStates.editor)
  }

  return (
    <ConnectSettingsDrawer isOpen={isOpen} handleClose={handleClose}>
      <div className='sql-connect-settings-wrapper'>
        <InputGroup placeholder="device host..." value={host} onChange={(e) => setHost(e.target.value)} />
        <InputGroup placeholder="database name..." value={databaseName} onChange={(e) => setDatabaseName(e.target.value)} />
        <Button text={'Connect'} onClick={handleConnect} style={{ width: '100%' }} />
      </div>
    </ConnectSettingsDrawer>
  )
}

interface ConnectSettingsDrawerProps {
  children: React.ReactNode
  isOpen: boolean
  handleClose(): void
}
function ConnectSettingsDrawer({ children, isOpen, handleClose }: ConnectSettingsDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      position={Position.TOP}
      size={'250px'}
      onClose={handleClose}
    >
      {children}
    </Drawer>
  )
}