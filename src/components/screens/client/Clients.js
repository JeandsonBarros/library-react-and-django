import ModalClient from "../../Layouts/ModalClient";
import RemoveClient from "./RemoveClient";
import ModalClientDetails from "../../Layouts/ModalClientDetails";
import UpdateClient from "./UpdateClient";
import React, { useState, useEffect } from 'react';
import { Button, Table, Row } from "@nextui-org/react";
import { postClient, getClients } from '../../../services/ClientService'

import { BsPlusCircleFill } from 'react-icons/bs';

function Clients() {

    const [visible, setVisible] = useState(false);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        listClients()
    }, [])

    async function listClients() {
        const data = await getClients()
        setClients(data.results)
    }

    async function saveClient(client) {

        await postClient(client)
        await listClients()

    }

    return (
        <div>

            <Button css={{ mt: 10, mb: 10 }} onPress={() => setVisible(true)} shadow auto>
                <span style={{ marginRight: 5 }}> Novo cliente </span> <BsPlusCircleFill />
            </Button>

            <ModalClient
                title="Cadastrar"
                setVisible={setVisible}
                visible={visible}
                submitAction={saveClient}
            />

            <div style={{ overflowX: 'auto', borderRadius: 10 }} className="shadow">
                <Table
                    aria-label="Example table with static content"
                    css={{
                        height: "auto",
                        minWidth: "100%",
                    }}
                >
                    <Table.Header>

                        <Table.Column>NOME</Table.Column>
                        <Table.Column>CPF</Table.Column>
                        <Table.Column>TELEFONE</Table.Column>
                        <Table.Column>AÇÕES</Table.Column>

                    </Table.Header>
                    <Table.Body>

                        {clients.map(client => {
                            return (
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
                                                refresh={listClients}
                                            />

                                            <RemoveClient
                                                id={client.id}
                                                clientName={client.name}
                                                refresh={listClients}
                                            />

                                        </Row>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}

                    </Table.Body>
                </Table>
            </div>

        </div>);
}

export default Clients;