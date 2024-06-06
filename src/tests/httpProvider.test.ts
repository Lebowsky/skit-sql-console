import { HttpProvider } from "../services/httpProvider";
import { SQLQueryManager } from "../services/sqlQueryService"

describe('testing sqlQueryService', () => {
  test('SQL query should return data', async() => {
    const sut = new SQLQueryManager('localhost', 'SimpleTest', new HttpProvider())
    const result = await sut.sendQuery('SELECT * FROM RS_docs')
    console.log(result[1])
  })
})