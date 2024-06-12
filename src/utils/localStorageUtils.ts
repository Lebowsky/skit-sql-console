export const updateStorageData = (storageKey: string, value: {[key: string]: string}) => {
  try{
    const prev = getStorageData(storageKey)
    localStorage.setItem(storageKey, JSON.stringify({...prev, ...value}))
  } catch (err) {
    console.log(`Update local storage has error:\n${err}`)
  }
}

export const getStorageData = (storageKey: string) => {
  try {
    return JSON.parse(localStorage.getItem(storageKey))
  } catch {
    return {}
  }
}