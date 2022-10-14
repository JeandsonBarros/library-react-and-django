import { Button, Text, Modal, Progress } from "@nextui-org/react";
import React, { useState } from 'react';

export default function ModalConfirm({ title, message, visible, setVisible, action }) {

    const [progressVisible, setProgressVisible] = useState(false);

    async function execultAction() {

        setProgressVisible(true)

        await action()
        setVisible(false)

        setProgressVisible(false)
    }

    return (

        <Modal
            blur
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={() => setVisible(false)}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    {title}
                </Text>
            </Modal.Header>

            <Modal.Body>

                {progressVisible && <Progress indeterminated value={50} />}

                <Text> {message} </Text>

            </Modal.Body>

            <Modal.Footer>
                <Button auto flat onPress={() => setVisible(false)}>
                    Cancelar
                </Button>
                <Button auto color="error" onPress={execultAction}>
                    Confirmar
                </Button>
            </Modal.Footer>

        </Modal>

    )
}
