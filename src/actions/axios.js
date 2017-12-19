import axios from 'axios';
import { ENDPOINT } from '../Constants';
axios.defaults.baseURL = ENDPOINT;
axios.defaults.headers = { Authorization: localStorage.getItem('token') };

export default axios;
