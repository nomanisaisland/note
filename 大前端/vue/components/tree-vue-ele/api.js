import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000'

export const getTreeList = () => {
    return axios.get('/getTreeList')
}