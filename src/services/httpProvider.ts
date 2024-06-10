import { responseType } from "../models/httpProvider"
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
  public async get(url: string, params: { [key: string]: string } = {}, timeout = 5) {
    this.__setUrl(url, params)
    this.__timeout = timeout * 1000
    this.__options = { ...this.__options, method: 'GET' }
    return await this.__fetch()
  }
  public async post(url: string, data?: JSONValue, params?: { [key: string]: string }, timeout = 5) {
    this.__setUrl(url, params)
    this.__timeout = timeout * 1000
    this.__options = { ...this.__options, method: 'POST', body: JSON.stringify(data) }
    return await this.__fetch()
  }
  private async __fetch(): Promise<responseType> {
    try {
      const controller = new AbortController()
      setTimeout(() => controller.abort(), this.__timeout)

      const resp = await fetch(this.__url, { ...this.__options, ...{ signal: controller.signal } })
      const contentType = resp.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return [await resp.json(), null]
      } else {
        return [await resp.text(), null]
      }
    } catch (err) {
      return ([null, err.toString()])
    }
  }

  private __setUrl(url: string, params?: { [key: string]: string }) {
    if (params) {
      this.__url = `${url}?${new URLSearchParams(params)}`
    } else {
      this.__url = url
    }
  }
}