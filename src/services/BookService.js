import { getToken } from './TokenService'
import api from './api';

export async function getBooks(offset = 0, title = '') {
    try {

        const response = await api.get(`/book/?limit=10&offset=${offset}&title=${title}`,
            {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

        return response.data;

    } catch (error) {
        console.log(error);
        //alert("Erro ao listar livros")
        return "Erro ao listar livros"
    }
}

export async function getBook(id) {
    try {

        const response = await api.get(`/book/${id}/`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'multipart/form-data'
            }
        })

        return response;

    } catch (error) {
        return 'Erro ao buscar dados do livro.';
    }
}

export async function postBook(book) {
    try {

        await api.post('/book/', book, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'multipart/form-data'
            }
        })

        return 'Novo livro adicionado!'

    } catch (error) {
        return "Erro ao salvar livro!"
    }
}

export async function putBook(id, book) {
    try {

        if (typeof (book.image) == 'string')
            delete book.image

        await api.put(`/book/${id}/`, book, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'multipart/form-data'
            }
        })

        return 'Livro atualizado com sucesso!'

    } catch (error) {
        return "Error ao atualizar livro."
    }

}

export async function deleteBook(id) {
    try {

        await api.delete(`/book/${id}/`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'multipart/form-data'
            }
        })

        return 'Livro removido!'

    } catch (error) {
        return ("Error ao deletar livro!")
    }

}