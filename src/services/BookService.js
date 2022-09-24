import { getToken } from './TokenService'
import api from './api';


export async function getBooks() {
    try {

        const token = getToken();
        const response = await api.get('/book/', { headers: { 'Authorization': `Bearer ${token}` } })

        return response.data;

    } catch (error) {
        console.log(error);
    }
}

export async function getBook(id) {
    try {

        const token = getToken();
        const response = await api.get(`/book/${id}/`, { headers: { 'Authorization': `Bearer ${token}` } })
        
        return response.data;

    } catch (error) {
        console.log(error);
    }
}

export async function postBook(book) {
    try {

        const token = getToken();
        const response = await api.post('/book/', book,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export async function putBook(id, book){
    try {

        const token = getToken();
        const response = await api.put(`/book/${id}/`, book,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

        console.log(response);
    } catch (error) {
        console.log(error);
    }

}

export async function deleteBook(id){
    try {

        const token = getToken();
        const response = await api.put(`/book/${id}/`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

        console.log(response);
    } catch (error) {
        console.log(error);
    }

}