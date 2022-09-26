import { getToken } from './TokenService'
import api from './api'

export async function postLoan(loan) {
    try {
        const token = getToken()

        const response = await api.post("/loan/", loan,
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

export async function getLoans() {
    try {
        const token = getToken()

        const response = await api.get("/loan/",
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

        return response.data

    } catch (error) {
        console.log(error);
    }
}

export async function putLoan(id, loan) {
    try {
        const token = getToken()

        const response = await api.put(`/loan/${id}/`, loan,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

        return response.status

    } catch (error) {
        console.log(error);
    }
}

export async function deleteLoan(id) {
    try {
        const token = getToken()

        const response = await api.delete(`/loan/${id}/`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

        return response.status

    } catch (error) {
        console.log(error);
    }
}

export async function getLoansByBook(bookId) {
    try {
        const token = getToken()

        const response = await api.get(`/loan/?book=${bookId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

        return response.data

    } catch (error) {
        console.log(error);
    }
}
