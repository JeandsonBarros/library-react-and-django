import { Button, Text } from "@nextui-org/react";
import { useState } from "react";
import ModalConfirm from '../../Layouts/ModalConfirm';
import { BsTrashFill } from "react-icons/bs";
import { deleteLoan } from '../../../services/LoanService'

function RemoveLoan({ id, refresh}) {

    const [visible, setVisible] = useState(false);

    return (
        <div>

            <Button onPress={() => setVisible(true)} shadow auto color="error" css={{ m: 10 }} >
                <Text
                    css={{ color: "inherit" }}
                    size={18}
                >
                    <BsTrashFill />
                </Text>
            </Button>

            <ModalConfirm
                title='Remover empréstimo'
                message={`Realmente deseja remover o este empréstimo?`}
                visible={visible}
                setVisible={setVisible}
                action={async () => {
                    await deleteLoan(id)
                    await refresh()
                    setVisible(false)
                }}
            />

        </div>
    );
}

export default RemoveLoan;