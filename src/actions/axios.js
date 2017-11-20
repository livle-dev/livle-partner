import axios from 'axios';
axios.defaults.baseURL = 'https://05jaeecklb.execute-api.ap-northeast-2.amazonaws.com/dev';
axios.defaults.headers = { Authorization: localStorage.getItem('token') };

export default axios
