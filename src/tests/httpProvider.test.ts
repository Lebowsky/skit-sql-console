import { HttpProvider } from "../services/httpProvider";

describe('testing index file', () => {
  test('empty string should result in zero', async() => {
    const sut = new HttpProvider()
    const data = await sut.get('http://localhost:8000')
    expect(data).toBe({ detail: 'Not Found' })
  })
})