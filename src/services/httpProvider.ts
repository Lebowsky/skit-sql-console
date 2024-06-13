import { JSONValue } from "../models/jsonTypes"
import { net } from 'electron'

export class HttpProvider {
  private __url: string
  private __options: RequestInit
  private __timeout: number

  constructor() {
    this.__options = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }
  public async get(
    url: string,
    params: { [key: string]: string } = {},
    timeout = 5
  ): Promise<string> {
    this.__setUrl(url, params)
    this.__timeout = timeout * 1000
    this.__options = { ...this.__options, method: 'GET' }
    return await this.__fetch()
  }
  public async post(
    url: string,
    data?: JSONValue,
    params?: { [key: string]: string },
    timeout = 5
  ): Promise<string> {
    this.__setUrl(url, params)
    this.__timeout = timeout * 1000
    this.__options = { ...this.__options, method: 'POST', body: JSON.stringify(data) }
    return await this.__fetch()
  }
  private async __fetch(): Promise<string> {
    const controller = new AbortController()
    const signal = controller.signal;

    setTimeout(() => controller.abort(), this.__timeout)
    return await net.fetch(this.__url, { signal })
      .then(response => {
        if (response.ok) {
          return response.text()
        }
        throw new Error(`Request error. Status: ${response.status}`)
      })
      .then(responseText => {
        return responseText
      })
  }

  private __setUrl(url: string, params?: { [key: string]: string }) {
    if (params) {
      this.__url = `${url}?${new URLSearchParams(params)}`
    } else {
      this.__url = url
    }
  }
}