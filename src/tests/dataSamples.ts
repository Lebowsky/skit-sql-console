import { IHttpProvider } from "../models/httpProvider"

export const sqlTablesResponse = `
  type | name | tbl_name | rootpage | sql\r
  table | RS_classifier_units | RS_classifier_units | 2 | CREATE TABLE RS_classifier_units (
      id TEXT NOT NULL PRIMARY KEY,
      code    TEXT NOT NULL,
      name    TEXT NOT NULL
    )\r
  table | RS_types_goods | RS_types_goods | 5 | CREATE TABLE RS_types_goods (
      id TEXT NOT NULL PRIMARY KEY,
      name TEXT NOT NULL,
      use_mark BOOLEAN  DEFAULT FALSE
    )\r\n
`

// export const MockHttpProvider: IHttpProvider = {
//   get: () => {return new Promise((resolve, _reject) => {resolve([null, null])})},
//   post() {
//     return new Promise((resolve, _reject) => {resolve([sqlTablesResponse, null])})
//   }
// }