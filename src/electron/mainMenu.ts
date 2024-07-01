import { Menu, MenuItemConstructorOptions } from "electron"

const template: MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
      {role: 'quit'}
    ]
  },
  {
    label: 'Tools',
    submenu: [
      {
        label: 'SQL console',
        click() {
          console.log('run SQL console')
        }
      },
    ]
  }
]

export const menu = Menu.buildFromTemplate(template)
