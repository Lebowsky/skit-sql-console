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

  public async post(url: string,  data: any, params?: { [key: string]: string }){
    this.__setUrl(url, params)
    this.__options = {...this.__options, method: 'POST', body: JSON.stringify(data)}
    return await this.__fetch()
  }
  private async __fetch() {
    return fetch(this.__url, this.__options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok\t' + response.status + this.__url );
        }
        return response.json();
      })
      .then(data => {
        return data
      })
      .catch(error => {
        console.error('Fetch error:', error);
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