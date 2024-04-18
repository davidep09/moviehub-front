import axios from 'axios';

const USUARIOS_API_URL = 'http://localhost:8080/usuarios';

class UsuarioService {
    getAllUsuarios() {
        return axios.get('http://localhost:8080/usuarios', {
            withCredentials: true
        })
    }

    getUsuario(id) {
        return axios.get(USUARIOS_API_URL + '/' + id);
    }

    createUsuario(usuario) {
        return axios.post(USUARIOS_API_URL, usuario);
    }
}

export default new UsuarioService();