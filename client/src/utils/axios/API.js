import axios from "axios";

const search = () => axios.get("/api/secret");

export default search;