import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs'; //'/api/blogs';



let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};


const removeToken = () => token = null;



const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};



const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};


const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
};


const remove = async (id, newObject) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.delete(`${baseUrl}/${id}`,  config, newObject);
    return response.data;
};



const blogService = { getAll, create, update, remove, setToken, removeToken };
export default blogService;
