import { Modal, Button, Text, Tooltip } from "@nextui-org/react";
import { BsEye } from 'react-icons/bs';
import React, { useState } from 'react';


function ModalClientDetails({ client }) {

    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Tooltip content="Detalhes">
                <Button css={{ m: 5 }} onPress={() => setVisible(true)} auto>
                    <BsEye />
                </Button>
            </Tooltip>

            <Modal
                closeButton
                open={visible}
                onClose={() => setVisible(false)}
            >
                <Modal.Header>
                    <Text size={20} >{client.name}</Text>
                </Modal.Header>
                <Modal.Body>

                    <Text>CPF: {client.CPF}</Text>
                    <Text>Telefone:{client.telephone}</Text>
                    <Text>Profissão: {client.profession}</Text>
                    <Text>Endereço: {client.address}</Text>
                    <Text>Data de nascimento: {client.birthDate}</Text>

                </Modal.Body>
                <Modal.Footer>
                    <Button shadow auto flat color="error" onPress={() => setVisible(false)}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default ModalClientDetails;