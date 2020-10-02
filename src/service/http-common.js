import axios from "axios";

export default axios.create({
    baseURL: "http://cser.vn",
    headers: {
        "Content-type": "application/json"
    }
});