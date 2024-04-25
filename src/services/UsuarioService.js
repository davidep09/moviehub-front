import axios from 'axios';

const USUARIOS_API_URL = 'http://localhost:8080/users';

export const findAll = async () => {
    try {
        return await axios.get(USUARIOS_API_URL);
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const findById = async (id) => {
    try {
        return await axios.get(`${USUARIOS_API_URL}/${id}`);
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const create = async ({id, username, password, email, name, lastname, birthday}) => {
    try {
        return await axios.post(USUARIOS_API_URL, {
            id,
            username,
            password,
            email,
            name,
            lastname,
            birthday,
            role: 0
        });
    } catch (error) {
        console.error(error);
    }
    return undefined;
}

export const update = async ({id, username, password, email, name, lastname, birthday}) => {
    try {
        return await axios.put(`${USUARIOS_API_URL}/${id}`, {
            id,
            username,
            password,
            email,
            name,
            lastname,
            birthday,
            role: 0
        });
    } catch (error) {
        console.error(error);
    }
    return undefined;
}