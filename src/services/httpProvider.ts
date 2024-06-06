import { JSONValue } from "../models/jsonTypes"
import {net} from 'electron'

export class HttpProvider {
  private __url: string
  private __options: RequestInit

  constructor(){
    this.__options = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }
  public async get(url: string, params?: { [key: string]: string }) {
    this.__setUrl(url, params)
    this.__options = {...this.__options, method: 'GET'}
    return await this.__fetch()
  }

  public async post(url: string,  data?: JSONValue, params?: { [key: string]: string }){
    this.__setUrl(url, params)
    this.__options = {...this.__options, method: 'POST', body: JSON.stringify(data)}
    return await this.__fetch()
  }
  private async __fetch(): Promise<any[] | [any, any]> {
    return fetch(this.__url, this.__options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`
            Network response was not ok
            status: ${response.status}
            url:${response.url}
          `);
        }
        return response.json();
      })
      .then(data => {
        return [data, null]
      })
      .catch(error => {
        return [null, error]
      });
  }

  private __setUrl(url: string, params?: { [key: string]: string }){
    if (params){
      this.__url =  `${url}?${new URLSearchParams(params)}`
    } else {
      this.__url = url
    }
  }
}