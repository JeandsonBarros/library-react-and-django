import { getToken } from './TokenService'
import api from './api';

export async function getClients(){
    try {
        const token = getToken()

        const response = await api.get(`/client/`, { headers: { 'Authorization': `Bearer ${token}` } })

        return response.data

    } catch (error) {
        console.log(error);
    }
}

export async function getClient(id){
    try {
        const token = getToken()

        const response = await api.get(`/client/${id}/`, { headers: { 'Authorization': `Bearer ${token}` } })
        return response.data

    } catch (error) {
        console.log(error);
    }
}

export async function postClient(client){
    try {
        const token = getToken()

        const response = await api.post(`/client/`, client, { headers: { 'Authorization': `Bearer ${token}` } })

        console.log(response);

    } catch (error) {
        console.log(error);
    }
}

export async function putClient(id, client){
    try {
        const token = getToken()

        const response = await api.put(`/client/${id}/`, client, { headers: { 'Authorization': `Bearer ${token}` } })


    } catch (error) {
        console.log(error);
    }
}

export async function deleteClient(id){
    try {
        const token = getToken()

        const response = await api.delete(`/client/${id}/`, { headers: { 'Authorization': `Bearer ${token}` } })

        console.log(response);

    } catch (error) {
        console.log(error);
    }
}