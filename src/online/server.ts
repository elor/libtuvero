import axios from "axios";
import config from "../config";

const server = {
  /**
   * Retrieve an object from the tuvero cloud
   *
   * @param path The path. Defaults to "/".
   * @param timeout Optional. Timeout in milliseconds.
   */
  get(path: string = "/", timeout: number = config.online.api.timeout): Promise<Object> {
    return axios.get(`${config.online.api.baseUrl}/${path}`, { timeout });
  },

  /**
   * Update an object in the Tuvero Cloud
   *
   * @param path The path to the object
   * @param data A data object to post to the server.
   * @param timeout Optional.
   */
  post(path: string, data: Object, timeout: number = config.online.api.timeout): Promise<Object> {
    return axios.post(`${config.online.api.baseUrl}/${path}`, data, { timeout });
  },

  /**
   * Create an Object in the Tuvero Cloud
   *
   * @param path The path to the object class (since there's no object reference yet)
   * @param data The Object to create on the server
   * @param timeout Optional. Timeout in milliseconds.
   */
  put(path: string, data: Object, timeout: number = config.online.api.timeout): Promise<Object> {
    return axios.put(`${config.online.api.baseUrl}/${path}`, data, { timeout });
  },

  /**
   * Delete an Object from the Tuvero Cloud
   *
   * @param path The path
   * @param timeout Optional. Timeout in milliseconds.
   */
  delete(path: string = "/", timeout: number = config.online.api.timeout): Promise<Object> {
    return axios.delete(`${config.online.api.baseUrl}/${path}`, { timeout });
  }
};

export default server;
