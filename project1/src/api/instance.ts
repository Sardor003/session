import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://recipe-1e1c2-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default instance;
