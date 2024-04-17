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
}

export default new UsuarioService();