import '../Screens.css';

import { Collapse, Image, Progress, Row, Text } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getBook } from '../../../services/BookService';
import { getClient } from '../../../services/ClientService';
import { getLoansByBook } from '../../../services/LoanService';
import Alert from '../../Layouts/Alert';
import LoanUpdate from '../loan/LoanUpdate';
import NewLoan from '../loan/NewLoan';
import RemoveLoan from '../loan/RemoveLoan';
import RemoveBook from './RemoveBook';
import UpdateBook from './UpdateBook';


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
        <Collapse title={client.name || "Carregando..."} subtitle={`Data de retorno: ${dateLocal(loan.returnDate)}`}>
            <Text>
                Data de aluguel: {dateLocal(loan.rentalDate)}
            </Text>
            <Text> Valor: {loan.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} </Text>
            <Text> Devolvido: {loan.returned ? "Sim" : "Não"} </Text>

            <Row wrap='wrap' >
                <LoanUpdate loan={loan} refresh={refresh} />
                <RemoveLoan id={loan.id} refresh={refresh} />
            </Row>
        </Collapse>
    )

}

function BookDetails() {

    const params = useParams();
    const [book, setBook] = useState({})


    const [loansReturned, setLoansReturned] = useState([])
    const [loansNoReturned, setLoansNoReturned] = useState([])

    const [msg, setMsg] = useState('')
    const [alertVisible, setAlerVisible] = useState(false)
    const [progressVisible, setProgressVisible] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        get()
    }, [])

    async function get(offsetValue = 0) {

        setProgressVisible(true)

        const responseBook = await getBook(params.id)

        if (responseBook.status !== 200){
            setProgressVisible(false)
            return navigate("*")
        }

        const responseLoansReturned = await getLoansByBook(offsetValue, responseBook.data.id, 'true')
        const responseLoansNoReturned = await getLoansByBook(offsetValue, responseBook.data.id, 'false')

        setBook(responseBook.data)

        setLoansReturned(responseLoansReturned.results)
        setLoansNoReturned(responseLoansNoReturned.results)

        setProgressVisible(false)

    }

    async function refresh(msg) {

        setMsg(msg)
        setAlerVisible(true)

        await get()

        window.scroll({
            top: 0,
            behavior: 'smooth'
        })

    }

    return (
        <div >

            {progressVisible && <Progress indeterminated value={50} />}

            <Alert
                visible={alertVisible}
                setVisible={setAlerVisible}
                text={msg} />

            <div className='cardBookDetails'>

                <div style={{ margin: 10 }}>
                    <Image
                        src={book.image ? `http://127.0.0.1:8000${book.image}` : require('../../imgs/default_image.png')}
                        objectFit="none"
                        alt="Default Image"
                        width={250}
                        height={350}
                    />
                </div>

                <div className='bookDetails'>

                    <Text h2 css={{ wordWrap: 'break-word' }} >{book.title}</Text>
                    <Text size={23}> Autor: {book.author}</Text>
                    <Text >ISBN: {book.isbn}</Text>
                    <Text css={{ wordBreak: 'break-all' }} blockquote >Sinopse: "{book.synopsis}"</Text>

                    <Row wrap='wrap' >

                        <NewLoan
                            bookId={book.id}
                            refresh={refresh}
                        />

                        {book.id && <UpdateBook
                            id={book.id}
                            buttonText="Editar livro"
                            refresh={refresh}
                            book={book}
                        />}

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

                <h2>Empréstimos não retornados</h2>

                {loansNoReturned.length > 0 ?
                    <Collapse.Group>
                        {loansNoReturned.map(loan => {
                            return (
                                <LoanCollapse key={loan.id} loan={loan} refresh={refresh} />
                            )
                        })}
                    </Collapse.Group>

                    : <Text>Sem empréstimos não retornados</Text>
                }

                <hr />

                <h2>Empréstimos retornados</h2>

                {loansReturned.length > 0 ?
                    <Collapse.Group>
                        {loansReturned.map(loan => {
                            return (
                                <LoanCollapse key={loan.id} loan={loan} refresh={refresh} />
                            )
                        })}
                    </Collapse.Group>

                    : <Text>Sem empréstimos retornados</Text>
                }

            </div>

        </div>
    );
}


export default BookDetails;