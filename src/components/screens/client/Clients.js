import { Button, Input, Loading, Row, Table } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { BsPlusCircleFill, BsSearch } from 'react-icons/bs';

import { getClients, postClient } from '../../../services/ClientService';
import Alert from '../../Layouts/Alert';
import ModalClient from '../../Layouts/ModalClient';
import ModalClientDetails from '../../Layouts/ModalClientDetails';
import RemoveClient from './RemoveClient';
import UpdateClient from './UpdateClient';

function Clients() {

    const [visible, setVisible] = useState(false);
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState('')
    const [totalClients, setTotalClients] = useState(0);
    const [offset, setOffset] = useState(0);
    const [msg, setMsg] = useState('')
    const [alertVisible, setAlerVisible] = useState(false)
    const [progressVisible, setProgressVisible] = useState(false);

    useEffect(() => {
        listClients()
    }, [])

    async function listClients(offsetValue = 0, name = '') {

        setProgressVisible(true)

        const data = await getClients(offsetValue, name)
        setTotalClients(data.count)

        if (typeof (data) === 'string') {
            setMsg(data)
            setAlerVisible(true)
            setProgressVisible(false)

            return
        }

        offsetValue === 0 ? setClients(data.results) : setClients(clients.concat(data.results))

        setProgressVisible(false)

    }

    async function saveClient(client) {

        const data = await postClient(client)
        await refresh(data)

    }

    async function pagination() {

        listClients(offset + 10, search)
        setOffset(offset + 10)

    }

    function refresh(msg) {

        setMsg(msg)
        setAlerVisible(true)

        listClients(0, search)

        setOffset(0)

        window.scroll({
            top: 0,
            behavior: 'smooth'
        })

    }

    return (
        <div>

            <Row css={{ mb: 10 }} wrap='wrap' justify='space-between'>

                <Button css={{ mt: 40 }} onPress={() => setVisible(true)} shadow auto>
                    <span style={{ marginRight: 5 }}> Novo cliente </span> <BsPlusCircleFill />
                </Button>

                <Input
                    width='200px'
                    underlined
                    labelPlaceholder='Buscar cliente'
                    value={search}
                    contentRight={<BsSearch />}
                    css={{ mt: 40 }}
                    onChange={event => {
                        listClients(0, event.target.value,)
                        setSearch(event.target.value)
                        setOffset(0)
                    }}
                />

            </Row>

            <hr />

            <Alert
                setVisible={setAlerVisible}
                visible={alertVisible}
                text={msg}
            />

            <ModalClient
                title="Cadastrar"
                setVisible={setVisible}
                visible={visible}
                submitAction={saveClient}
            />

            <div style={{ overflowX: 'auto', borderRadius: 10, margin: 10, }} >
                <Table
                    compact
                    aria-label="Table clients"
                    css={{
                        height: "auto",
                        minWidth: "100%",
                    }}
                    color="secondary"
                >
                    <Table.Header>

                        <Table.Column>NOME</Table.Column>
                        <Table.Column>CPF</Table.Column>
                        <Table.Column>TELEFONE</Table.Column>
                        <Table.Column>AÇÕES</Table.Column>

                    </Table.Header>
                    <Table.Body>

                        {clients.map(client => (
                            <Table.Row key={client.id}>
                                <Table.Cell>{client.name}</Table.Cell>
                                <Table.Cell>{client.CPF}</Table.Cell>
                                <Table.Cell>{client.telephone}</Table.Cell>
                                <Table.Cell>
                                    <Row>

                                        <ModalClientDetails
                                            client={client}
                                        />

                                        <UpdateClient
                                            id={client.id}
                                            client={client}
                                            refresh={refresh}
                                        />
                                        
                                        <RemoveClient
                                            id={client.id}
                                            clientName={client.name}
                                            refresh={refresh}
                                        />

                                    </Row>
                                </Table.Cell>
                            </Table.Row>
                        ))}

                    </Table.Body>

                </Table>

                {progressVisible && <Loading className='d-flex flex-row justify-content-center mt-4' indeterminated value={50} />}



                <div className='d-flex flex-row justify-content-center mt-4'>
                    {(totalClients !== clients.length && totalClients > 0) && <Button
                        auto
                        shadow
                        css={{mb:20}}
                        onPress={pagination}
                    >

                        <BsPlusCircleFill style={{ padding: 10, fontSize: 50 }} />

                    </Button>}
                </div>

            </div>

        </div>);
}

export default Clients;