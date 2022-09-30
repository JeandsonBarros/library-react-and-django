import { getToken } from './TokenService'
import api from './api'

export async function postLoan(loan) {
    try {

        const check = await getLoansByBook(0, loan.book, 'false')

        if (check.results.length > 0)
            return "Este livro está indisponível, pois já foi emprestado. "

        const response = await api.post("/loan/", loan,
            {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

        return response.status === 201 ? 'Empréstimo cadastrado' : 'Erro ao cadastrar empréstimo'

    } catch (error) {
        console.log(error);
        return 'Erro ao cadastrar empréstimo'
    }
}

export async function getLoans(offset = 0, returned = 'all', title = '') {
    try {

        let url = '/loan/?limit=10&offset=0'

        if (returned === 'all')
            url = `/loan/?limit=10&offset=${offset}&title=${title}`
        else
            url = `/loan/?limit=10&offset=${offset}&returned=${returned}&title=${title}`

        const response = await api.get(url,
            {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

        return response.data

    } catch (error) {
        console.log(error);
        return 'Erro ao listar empréstimos.'
    }
}

export async function putLoan(id, loan) {
    try {

        const response = await api.put(`/loan/${id}/`, loan,
            {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

        return response.status === 200 ? 'Empréstimo atualizado.' : 'Erro ao atualizar empréstimo.'

    } catch (error) {
        console.log(error);
        return 'Erro ao atualizar empréstimo.'
    }
}

export async function deleteLoan(id) {
    try {

        const response = await api.delete(`/loan/${id}/`,
            {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

        return response.status === 204 ? 'Empréstimo removido.' : 'Erro ao remover empréstimo'

    } catch (error) {
        console.log(error);
        return 'Erro ao remover empréstimo'
    }
}

export async function getLoansByBook(offset = 0, bookId, returned = 'all') {
    try {

        let url = ''

        if (returned === 'all')
            url = `/loan/?limit=10&offset=${offset}&book=${bookId}`
        else
            url = `/loan/?limit=10&offset=${offset}&book=${bookId}&returned=${returned}`

        const response = await api.get(url,
            {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

        return response.data

    } catch (error) {
        console.log(error);
        return 'Erro ao listar empréstimos.'
    }
}
