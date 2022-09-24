import { setToken, getToken } from "./TokenService";
import api from './api'

export async function login(username, password) {
    try {
        const response = await api.post('/auth/login/', { username, password })

        if (response.status === 200) {
            setToken(response.data.access)
            return 200
        } else {
            return "Verifique se as credenciais estão corretas."
        }

    } catch (error) {
        console.log(error);
        return "Erro ao logar, verifique se as credenciais estão corretas."
    }
}

export async function register(user) {
    try {

        const response = await api.post('/auth/register/', user)

        if (response.status === 201) {
            setToken(response.data.access)
            return 201
        } else {
            return 'Erro ao cadastrar-se'
        }

    } catch (error) {
        console.log(error);
        return 'Erro ao cadastrar-se'
    }
}