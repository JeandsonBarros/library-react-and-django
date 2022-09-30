import '../styles/Styles.css'
import { Button, Modal, Input } from "@nextui-org/react";
import CustomInput from './CustomInput';
import DateInput from './DateInput';
import { useState } from 'react';

function ModalClient({ submitAction, title, visible, setVisible, clientUpdate }) {

    const [client, setClient] = useState(clientUpdate || {})

    function setValue(key, value) {

        let clientTemp = client
        clientTemp[key] = value
        setClient(clientTemp)

    }

    async function submiteFuntion(event) {
        /*  event.preventDefault() */

        await submitAction(client)
        setVisible(false)
    }

    return (


        <Modal
            blur
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={() => setVisible(false)}
            css={{ margin: 10 }}
        >
            <Modal.Header>
                <h3>{title} cliente</h3>
            </Modal.Header>

            <Modal.Body>

                <hr />

                <CustomInput
                    placeholder="Nome"
                    setValue={text => setValue('name', text)}
                    value={client.name}
                />

                <CustomInput
                    placeholder="CPF"
                    setValue={text => setValue('CPF', text)}
                    value={client.CPF}
                    type="number"
                />

                <CustomInput
                    placeholder="Profissão"
                    setValue={text => setValue('profession', text)}
                    value={client.profession}
                />

                <CustomInput
                    placeholder="Endereço"
                    setValue={text => setValue('address', text)}
                    value={client.address}
                />

                <CustomInput
                    placeholder="Telefone"
                    setValue={text => setValue('telephone', text)}
                    value={client.telephone}
                    type="number"
                />

                <DateInput
                    label="Data de nascimento"
                    value={client.birthDate || ''}
                    setValue={value => setValue('birthDate', value)}
                />

                <hr />

            </Modal.Body>
            <Modal.Footer>
                <Button onPress={submiteFuntion} css={{ margin: 10 }} shadow auto>{title}</Button>
                <Button
                    css={{ margin: 10 }}
                    color="error"
                    shadow
                    auto
                    onPress={() => setVisible(false)}
                >
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default ModalClient;