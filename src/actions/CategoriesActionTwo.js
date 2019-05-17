import Constants from "../constants/Constants";
import axios from "axios";
import * as types from "../constants/ActionTypes";


export default async function getCategoriesTwo(id) {
    const url = `${Constants.URL.wc}products/categories?parent=${id}&per_page=100&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`;
    console.log("tu as des datas");
    return axios.get(url)
}