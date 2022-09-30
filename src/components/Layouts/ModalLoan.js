import { Modal, Text, Checkbox, Radio, Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getClients, getClient } from "../../services/ClientService";
import CustomInput from "./CustomInput";
import DateInput from "./DateInput";
import { BsPlusCircleFill, BsSearch } from 'react-icons/bs';

function ModalLoan({ title, visible, setVisible, actionSubmit, loanUpdate }) {

    const [clients, setClients] = useState([]);
    const [loan, setLoan] = useState(loanUpdate || {});
    const [search, setSearch] = useState('')
    const [totalClients, setTotalClients] = useState(0);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (loanUpdate)
            getClient(loanUpdate.client).then(data => setClients(data))
        else
            listClients()
    }, [])

    function setValue(key, value) {

        let loanTemp = loan
        loanTemp[key] = value
        setLoan(loanTemp)

    }

    async function submit() {
        await actionSubmit(loan)
    }

    async function listClients(offsetValue = 0, name = '') {

        const data = await getClients(offsetValue, name)
        setTotalClients(data.count)

        offsetValue === 0 ? setClients(data.results) : setClients(clients.concat(data.results))

    }

    

    async function pagination() {

        listClients(offset + 10, search)
        setOffset(offset + 10)

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
                <Text id="modal-title" size={18}>
                    {title} empréstimo
                </Text>
            </Modal.Header>

            <Modal.Body>

                <hr />

                <Input
                    underlined
                    labelPlaceholder="Buscar cliente"
                    value={search}
                    contentRight={<BsSearch/>}
                    onChange={event => {
                        listClients(0, event.target.value,)
                        setSearch(event.target.value)
                        setOffset(0)
                    }}
                    css={{
                        mt: 15
                    }}
                />

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
                            <>
                                <Radio.Group
                                    onChange={(value => setValue('client', value))}
                                    css={{ m: 5 }}
                                    label="Clientes"
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
                                {totalClients !== clients.length && <Button
                                    auto
                                    light
                                    rounded
                                    css={{
                                        m: 'auto',
                                        p: 10,
                                        h: 60,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    onPress={pagination}
                                >
                                    <Text size={40}  >
                                        <BsPlusCircleFill />
                                    </Text>
                                </Button>}
                            </>
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

                {loanUpdate &&
                    <Checkbox
                        onChange={(value) => setValue("returned", value)}
                        defaultSelected={loan.returned}>
                        Devolvido
                    </Checkbox>}

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