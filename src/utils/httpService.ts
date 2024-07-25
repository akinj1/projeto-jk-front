import axios from "axios";
import Cookies from "js-cookie";

export class HttpService {
  private baseUrl
  private instance

  constructor() {
    this.baseUrl = import.meta.env.VITE_URL_BASE;
    this.instance = axios.create({ baseURL: this.baseUrl });
  }

  get defaultHeaders() {
    const retorno = {
      'Authorization': "Bearer " + Cookies.get("token"),
      'Content-Type': 'application/json',
    };

    return retorno;
  }

  async request(data: { method?: string, url?: string, customHeaders?: object, data?: object }) {
    const config = {
      method: data.method,
      url: data.url,
      headers: this.defaultHeaders,
      data: data.data
    };
    if (data.customHeaders) {
      config["headers"] = { ...this.defaultHeaders, ...data.customHeaders };
    }
    return this.instance(config);
  }

  get(url: string, customHeaders?: object) {
    return this.request({ method: "get", url: url, customHeaders: customHeaders });
  }

  post(url: string, data?: object, customHeaders?: object) {
    return this.request({ method: 'post', url: url, data: data, customHeaders: customHeaders });
  }

  put(url: string, data?: object, customHeaders?: object) {
    return this.request({ method: 'put', url: url, data: data, customHeaders: customHeaders });
  }

  delete(url: string, customHeaders?: object) {
    return this.request({ method: 'delete', url: url, customHeaders: customHeaders });
  }
}

export const httpService = new HttpService();