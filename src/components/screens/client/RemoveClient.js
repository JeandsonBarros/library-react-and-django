import ModalConfirm from "../../Layouts/ModalConfirm";
import React, { useState } from 'react';
import { Button, Tooltip } from "@nextui-org/react";
import { BsTrashFill } from 'react-icons/bs';
import { deleteClient } from '../../../services/ClientService'

function RemoveClient({ id, clientName, refresh }) {

    const [visible, setVisible] = useState(false);

    async function removeClient() {
        await deleteClient(id)
        await refresh()
        setVisible(false)
    }

    return (
        <div>

            <Tooltip content="Remover" > 
                <Button css={{ m: 5 }} onPress={() => setVisible(true)} color="error" auto>
                    <BsTrashFill />
                </Button>
            </Tooltip>

            <ModalConfirm
                visible={visible}
                setVisible={setVisible}
                title="Remover cliente"
                action={removeClient}
                message={`Realmente deseja remover o cliente ${clientName}?`}
            />

        </div>
    );
}

export default RemoveClient;