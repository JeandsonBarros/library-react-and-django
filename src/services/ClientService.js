import { getToken } from './TokenService'
import api from './api';


export async function getClients(offset = 0, name = '') {
    try {

        const response = await api.get(`/client/?limit=10&offset=${offset}&name=${name}`,
            {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

        return response.data

    } catch (error) {
        return 'Erro ao listar clientes.'

    }
}

export async function getClient(id) {
    try {

        const response = await api.get(`/client/${id}/`,
            {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
        return response.data

    } catch (error) {
        console.log(error);

        if (error.response.status === 404)
            alert("Cliente não encontrado")
        else
            console.log("Erro ao buscar cliente")
    }
}

export async function postClient(client) {
    try {

        const response = await api.post(`/client/`, client,
            {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

        return response.status === 201 ? 'Cliente cadastrado!' : 'Erro ao cadastrar cliente'

    } catch (error) {
        console.log(error);
        return 'Erro ao cadastrar cliente'
    }
}

export async function putClient(id, client) {
    try {

        const response = await api.put(`/client/${id}/`, client,
            {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

        return response.status === 200 ? 'Cliente atualizado!' : 'Erro ao editar clientes'

    } catch (error) {
        return 'Erro ao editar clientes'
    }
}

export async function deleteClient(id) {
    try {


        const response = await api.delete(`/client/${id}/`,
            {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

        return response.status === 204 ? 'Cliente removido!' : 'Erro ao remover cliente!'

    } catch (error) {
        return 'Erro ao deletar cliente!'
    }
}