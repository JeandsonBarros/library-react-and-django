import ModalClient from '../../Layouts/ModalClient';
import React, { useState } from 'react';
import { Button, Tooltip } from "@nextui-org/react";

import { putClient } from '../../../services/ClientService'
import { BsFillPencilFill } from 'react-icons/bs';

function UpdateClient({ id, client, refresh }) {

    const [visible, setVisible] = useState(false);

    async function updateClient(client) {
        const data = await putClient(id, client)
        await refresh(data)
        setVisible(false)
    }

    return (
        <div>

            <Tooltip content="Atualizar">
                <Button
                    css={{ m: 5 }}
                    color="warning"
                    auto
                    onPress={() => setVisible(true)}>
                    <BsFillPencilFill />
                </Button>
            </Tooltip>

            <ModalClient
                title='Atualizar'
                clientUpdate={client}
                setVisible={setVisible}
                visible={visible}
                submitAction={updateClient}
            />

        </div>
    );
}

export default UpdateClient;