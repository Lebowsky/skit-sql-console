import { JSONValue } from "./jsonTypes"

export type responseType = [string | null | JSONValue, string | null]

export interface IHttpProvider {
  get(url: string, params?: { [key: string]: string }): Promise<string>
  post(url: string, data?: JSONValue, params?: { [key: string]: string }): Promise<string>
}
