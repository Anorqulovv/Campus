import axios from "axios"

// const URL = import.meta.env.VITE_DB_URL
const instance = () => axios.create({baseURL: "http://localhost:7000/api"})

export default instance