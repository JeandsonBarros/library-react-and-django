import { Button, Text, Modal } from "@nextui-org/react";

export default function ModalConfirm({ title, message, visible, setVisible, action }) {

    async function execultAction() {
        await action()
        setVisible(false)
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
