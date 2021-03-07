import axios from 'axios';

const instance = axios.create({
    baseURL: `https://burger-builder-react-fb3ca-default-rtdb.firebaseio.com/`
})

export default instance;