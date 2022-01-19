import axios from "axios";
import * as config from '../config/config.json'
const baseUrl = config.url

const request = {
    post: async (url: string, params: object = {}, headers : object) => {
        try {
            let { data } = await axios.post(baseUrl + url, params, {headers: headers});
            return data;
        } catch (e) {
            console.log(e?.message);
            return null;
        }
    },
    get: async (url: string, headers: object = {}, params: object = {}) => {
        try {
            let { data } = await axios.get(baseUrl + url, {headers: headers, params: params});
            return data;
        } catch (e) {
            console.log(e?.message);
            return null;
        }
    },
    put: async (url: string, params: object = {}, headers : object) => {
        try {
            let { data } = await axios.put(baseUrl + url, params, {headers: headers});
            return data;
        } catch (e) {
            console.log(e?.message);
            return null;
        }
    },
    delete: async (url: string, headers : object) => {
        try {
            let { data } = await axios.delete(baseUrl + url, { data: {headers: headers}});
            return data;
        } catch (e) {
            console.log(e);
            return null;
        }
    },
}

export default request;