import '../Screens.css';

import { Collapse, Image, Row, Text } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getBook } from '../../../services/BookService';
import { getLoansByBook } from '../../../services/LoanService';
import { getClient } from '../../../services/ClientService';
import NewLoan from '../loan/NewLoan';
import RemoveBook from './RemoveBook';
import UpdateBook from './UpdateBook';

import LoanUpdate from '../loan/LoanUpdate';
import RemoveLoan from '../loan/RemoveLoan';

function LoanCollapse({ loan, refresh }) {

    const [client, setClient] = useState({})

    useEffect(() => {
        getClient(loan.client).then(data => setClient(data))
    }, [])

    function dateLocal(date) {
        const toDate = new Date(date)
        return toDate.toLocaleString()
    }

    return (
        <Collapse title={client.name || "-"} subtitle={`Data de retorno: ${dateLocal(loan.returnDate)}`}>
            <Text>
                Data de aluguel: {dateLocal(loan.rentalDate)}
            </Text>
            <Text> Valor: {loan.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} </Text>
            <Text> Devolvido: {loan.returned ? "Sim" : "Não"} </Text>

            <Row wrap='wrap' >
                <LoanUpdate loan={loan} refresh={refresh}/>
                <RemoveLoan id={loan.id} refresh={refresh}/>
            </Row>
        </Collapse>
    )

}

function BookDetails() {
    const params = useParams();
    const [book, setBook] = useState({})
    const [loans, setLoans] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        get()
    }, [])

    async function get() {

        const bookData = await getBook(params.id)
        const loansDate = await getLoansByBook(bookData.id)

        setBook(bookData)
        setLoans(loansDate.results)

    }

    return (
        <div >

            <div className='cardBookDetails'>

                <div style={{ margin: 10 }}>
                    <Image
                        src={`http://127.0.0.1:8000${book.image}/`}
                        objectFit="none"
                        alt="Default Image"
                        width={250}
                        height={350}
                    />
                </div>

                <div className='bookDetails'>

                    <Text h2 >{book.title}</Text>
                    <Text size={23}> Autor: {book.author}</Text>
                    <Text >ISBN: {book.isbn}</Text>
                    <Text css={{ wordBreak: 'break-all' }} blockquote >Sinopse: "{book.synopsis}"</Text>

                    <Row wrap='wrap' >



                        <NewLoan
                            bookId={book.id}
                        />

                        <UpdateBook
                            id={book.id}
                            buttonText="Editar livro"
                            refresh={() => {
                                getBook(params.id).then(data => setBook(data))
                            }}
                        />

                        <RemoveBook
                            title={book.title}
                            id={book.id}
                            buttonText="Remover livro"
                            refresh={() => navigate('/')}
                        />

                    </Row>

                </div>

            </div>

            <hr />

            <div className='loanContainer'>

                <h2>Empréstimo</h2>

                <hr />

                <h2>Empréstimos anteriores</h2>

                {loans.length > 0 ?
                    <Collapse.Group>
                        {loans.map(loan => {
                            return (
                                <LoanCollapse key={loan.id} loan={loan} refresh={get}/>
                            )
                        })}
                    </Collapse.Group>

                    : <Text>Sem empréstimos</Text>
                }

            </div>

        </div>
    );
}


export default BookDetails;