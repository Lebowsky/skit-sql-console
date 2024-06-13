import { IHttpProvider } from "../models/httpProvider";
import { SQLQueryManager } from "../services/sqlQueryService"
import { sqlTablesResponse } from "./dataSamples";

describe('testing sqlQueryService', () => {
  // test.skip('SQL query should return error', async() => {
  //   const provider: IHttpProvider = {
  //     get: () => {return new Promise((resolve, _reject) => {resolve([null, null])})},
  //     post() {
  //       return new Promise((resolve, _reject) => {resolve([null, 'TypeError: fetch failed'])})
  //     }
  //   }
  //   const sut = new SQLQueryManager('unknownHost', 'SimpleKeep', provider)
  //   const [result, err] = await sut.sendQuery('SELECT * FROM RS_docs')
  //   expect(err).toBe('Error: TypeError: fetch failed')
  // }) 

  // test.skip('SQL query should return data', async() => {
  //   const provider: IHttpProvider = {
  //     get: () => {return new Promise((resolve, _reject) => {resolve([null, null])})},
  //     post() {
  //       return new Promise((resolve, _reject) => {resolve([sqlTablesResponse, null])})
  //     }
  //   }
  //   const sut = new SQLQueryManager('10.24.24.23', 'SimpleKeep', provider)
    
  //   const [tableData, err] = await sut.sendQuery('')
  //   expect(tableData).toBeTruthy()
  //   expect(tableData.type).toEqual(['table', 'table'])
  //   expect(tableData.name).toEqual(['RS_classifier_units', 'RS_types_goods'])
  //   expect(tableData.tbl_name).toEqual(['RS_classifier_units', 'RS_types_goods'])
  //   expect(tableData.rootpage).toEqual(['2', '5'])
  //   expect(tableData.sql[0]).toEqual(`CREATE TABLE RS_classifier_units (
  //     id TEXT NOT NULL PRIMARY KEY,
  //     code    TEXT NOT NULL,
  //     name    TEXT NOT NULL
  //   )`)
  // })
})



