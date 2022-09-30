import ModalClient from "../../Layouts/ModalClient";
import RemoveClient from "./RemoveClient";
import ModalClientDetails from "../../Layouts/ModalClientDetails";
import UpdateClient from "./UpdateClient";
import React, { useState, useEffect } from 'react';
import { Button, Table, Row, Input } from "@nextui-org/react";
import { postClient, getClients } from '../../../services/ClientService'
import Alert from '../../Layouts/Alert'
import { BsPlusCircleFill } from 'react-icons/bs';

function Clients() {

    const [visible, setVisible] = useState(false);
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState('')
    const [totalClients, setTotalClients] = useState(0);
    const [offset, setOffset] = useState(0);
    const [msg, setMsg] = useState('')
    const [alertVisible, setAlerVisible] = useState(false)

    useEffect(() => {
        listClients()
    }, [])

    async function listClients(offsetValue = 0, name = '') {

        const data = await getClients(offsetValue, name)
        setTotalClients(data.count)

        if (typeof (data) === 'string') {
            setMsg(data)
            setAlerVisible(true)

            return
        }

        offsetValue === 0 ? setClients(data.results) : setClients(clients.concat(data.results))

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

                {(totalClients !== clients.length && totalClients > 0) && <Button
                    auto
                    shadow
                    css={{
                        m: '20px auto',
                        p: 10,
                        h: 60,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={pagination}
                >

                    <BsPlusCircleFill style={{ fontSize: 40 }} />

                </Button>}
            </div>

        </div>);
}

export default Clients;