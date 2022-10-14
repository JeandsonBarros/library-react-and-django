import '../Screens.css';

import { Button, Collapse, Input, Loading, Row, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { BsPlusCircleFill, BsSearch } from 'react-icons/bs';

import { getBook } from '../../../services/BookService';
import { getClient } from '../../../services/ClientService';
import { getLoans } from '../../../services/LoanService';
import Alert from '../../Layouts/Alert';
import ModalClientDetails from '../../Layouts/ModalClientDetails';
import LoanUpdate from './LoanUpdate';
import RemoveLoan from './RemoveLoan';

function LoanCollapse({ loan, refresh }) {

    const [client, setClient] = useState({})
    const [book, setBook] = useState({})

    useEffect(() => {
        console.log(loan.client);
        getClient(loan.client).then(data => setClient(data))
        getBook(loan.book).then(data => setBook(data.data))
    }, [])

    function dateLocal(date) {
        const toDate = new Date(date)
        return toDate.toLocaleString()
    }

    return (
        <Collapse title={book.title || "Carregando..."} subtitle={`Data de retorno: ${dateLocal(loan.returnDate)}`}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Text size={20}> Cliente: {client.name} </Text>
                <ModalClientDetails client={client} />
            </div>
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

function Loans() {

    const [loans, setLoans] = useState([]);
    const [loansFilter, setLoansFilter] = useState('all');
    const [offset, setOffset] = useState(0);

    const [msg, setMsg] = useState('')
    const [alertVisible, setAlerVisible] = useState(false)

    const [search, setSearch] = useState('');

    const [totalLoans, setTotalLoans] = useState(0);

    const [progressVisible, setProgressVisible] = useState(false);

    useEffect(() => {
        listLoans()
    }, [])

    async function listLoans(offsetValue = 0, filter = 'all', title = '') {

        setProgressVisible(true)

        let data = await getLoans(offsetValue, filter, title)

        if (typeof (data) === 'string') {
            setMsg(data)
            setAlerVisible(true)
            setProgressVisible(true)

            return
        }

        setTotalLoans(data.count)
        offsetValue === 0 ? setLoans(data.results) : setLoans(loans.concat(data.results))

        setProgressVisible(false)
    }

    async function pagination() {

        listLoans(offset + 10, loansFilter, search)
        setOffset(offset + 10)

    }

    function refresh(msg) {

        setMsg(msg)
        setAlerVisible(true)

        listLoans(0, loansFilter, search)
        setOffset(0)

        window.scroll({
            top: 0,
            behavior: 'smooth'
        })

    }

    function actionFilter(filter) {
        setLoansFilter(filter)
        listLoans(0, filter, search)
        setOffset(0)
    }

    return (
        <div>

            <Row wrap='wrap' justify='space-between'>

                <Button.Group css={{ mt: 40 }}>

                    <Button
                        onPress={() => actionFilter('all')}
                        flat={loansFilter === 'all'}>
                        Todos
                    </Button>

                    <Button
                        onPress={() => actionFilter('true')}
                        flat={loansFilter === 'true'}>
                        Devolvidos
                    </Button>

                    <Button
                        onPress={() => actionFilter('false')}
                        flat={loansFilter === 'false'}>
                        Não devolvidos
                    </Button>

                </Button.Group>

                <Input
                    underlined
                    labelPlaceholder='Busacar empréstimo'
                    contentRight={<BsSearch />}
                    css={{ mt: 40 }}
                    onChange={event => {
                        listLoans(0, loansFilter, event.target.value)
                        setOffset(0)
                        setSearch(event.target.value)
                    }}
                />

            </Row>

            <hr />

            <Alert
                visible={alertVisible}
                setVisible={setAlerVisible}
                text={msg} />

            {loans.length > 0 ? <Collapse.Group>
                {loans.map(loan => {
                    return (
                        <LoanCollapse
                            key={loan.id}
                            loan={loan}
                            refresh={refresh}
                        />
                    )
                })}
            </Collapse.Group>
                :
                <Text>Sem empréstimos</Text>

            }

            {progressVisible && <Loading className='d-flex flex-row justify-content-center mt-4' />}

            <div className='d-flex flex-row justify-content-center mt-4'>
                {(totalLoans !== loans.length && totalLoans > 0) &&
                    <Button
                        shadow
                        auto
                        css={{mb:20}}
                        onPress={pagination}
                    >
                        <BsPlusCircleFill style={{ padding: 10, fontSize: 50 }} />
                    </Button>}
            </div>

        </div>);
}

export default Loans;