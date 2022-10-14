import { setToken, getToken, removeToken } from "./TokenService";
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
            const status = await login(user.username, user.password)
            return status === 200 ? 201 : status
        } else {
            return 'Erro ao cadastrar-se'
        }

    } catch (error) {

        if (error.response.data.username)
            return 'Nome de usuário invalido.'

        if (error.response.data.email)
            return 'E-mail invalido.'

        if (error.response.data.password)
            return 'Esta senha é muito comum ou possui caracteres insuficientes.'

        return 'Erro ao cadastrar-se'
    }
}

export async function updateUser(user) {
    try {

        await api.patch('/auth/user/', user,
            {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

        return "Dados atualizados com sucesso!"

    } catch (error) {

        if (error.response.data.username)
            return 'Nome de usuário invalido.'

        if (error.response.data.email)
            return 'E-mail invalido.'

        if (error.response.data.password)
            return 'Esta senha é muito comum ou possui caracteres insuficientes.'

        return 'Erro ao atualizar'
    }
}

export async function getUser() {
    try {

        const response = await api.get("/auth/user/",
            {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

        return response.data
    } catch (error) {
        console.log(error);
        return { username: 'Indisponível', email: 'Indisponível' }
    }
}

export async function deleteUser() {
    try {

        const response = await api.delete("/auth/user/",
            {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
        logout()
        return response.status
    } catch (error) {
        console.log(error);
        return error.status
    }
}

export function logout() {
    removeToken()
}