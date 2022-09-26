import { Modal, Text, Checkbox, Radio, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getClients, getClient } from "../../services/ClientService";
import CustomInput from "./CustomInput";
import DateInput from "./DateInput";

function ModalLoan({ title, visible, setVisible, actionSubmit, loanUpdate }) {

    const [clients, setClients] = useState([]);
    const [loan, setLoan] = useState(loanUpdate || {});

    useEffect(() => {
        if (loanUpdate)
            getClient(loanUpdate.client).then(data => setClients(data))
        else
            getClients().then(data => setClients(data.results))
    }, [])

    function setValue(key, value) {

        let loanTemp = loan
        loanTemp[key] = value
        setLoan(loanTemp)

    }

    async function submit() {
        await actionSubmit(loan)
    }


    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={() => setVisible(false)}
            css={{ margin: 10 }}
        >

            <Modal.Header>
                <Text id="modal-title" size={18}>
                    {title} empréstimo
                </Text>
            </Modal.Header>

            <Modal.Body>

                <hr />

                <div style={{ overflowY: 'auto', maxHeight: 300 }} >

                    <div>

                        {loanUpdate ?
                            <Radio.Group
                                onChange={(value => setValue('client', value))}
                                css={{ m: 5 }}
                                label="Cliente"
                                defaultValue={clients.id}
                                orientation="vertical">
                                <Radio size="sm" value={clients.id} description={`CPF: ${clients.CPF}`}>
                                    {clients.name}
                                </Radio>
                            </Radio.Group>
                            :
                            <Radio.Group
                                onChange={(value => setValue('client', value))}
                                css={{ m: 5 }}
                                label="Cliente"
                                orientation="vertical">
                                {
                                    clients.map(client => {
                                        return (
                                            <Radio size="sm" key={client.id} value={client.id} description={`CPF: ${client.CPF}`} >
                                                {client.name}
                                            </Radio>
                                        )
                                    })
                                }
                            </Radio.Group>
                        }

                    </div>


                </div>
                <hr />

                <CustomInput
                    placeholder="Valor"
                    type="number"
                    setValue={value => setValue('value', value)}
                    value={loan.value}
                />

                <DateInput
                    label="Data de retorno"
                    setValue={value => setValue('returnDate', value)}
                    value={loan.returnDate}
                />

                {loanUpdate && <Checkbox defaultSelected={false}>Devolvido</Checkbox>}

                <hr />

            </Modal.Body>

            <Modal.Footer>
                <Button shadow auto onPress={submit} >{title}</Button>
                <Button shadow auto onPress={() => setVisible(false)} color="error">Cancelar</Button>
            </Modal.Footer>

        </Modal>
    );
}

export default ModalLoan;