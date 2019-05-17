import Constants from "../constants/Constants";
import axios from "axios";
import * as types from "../constants/ActionTypes";


export function getCategories() {
    return (dispatch) => {
        const url = `${Constants.URL.wc}products/categories?per_page=100&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`;

        return axios.get(url).then(response => {
            let categories = [];
            for (const category in response.data) {
                if (!response.data[category]._links.hasOwnProperty("up") && response.data[category].name !== "Uncategorized") {
                    categories.push(response.data[category]);
                }
            }
            dispatch({
                    type: types.GET_CATEGORIES_SUCCESS,
                    categories: categories,
                }
            )
        }).catch(err => {
            console.log(err.error);
        })
    };
}