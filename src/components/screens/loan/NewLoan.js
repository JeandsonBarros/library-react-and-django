import { Button, Text } from "@nextui-org/react";
import { useState } from "react";
import { BsPlusCircleFill } from 'react-icons/bs';
import ModalLoan from "../../Layouts/ModalLoan";
import { postLoan } from '../../../services/LoanService';

function NewLoan({ bookId, refresh }) {

    const [visible, setVisible] = useState(false);

    async function saveLoan(loan) {

        loan = { ...loan, book: bookId }
        const data = await postLoan(loan)
        await refresh(data)
        setVisible(false)

    }

    return (
        <div>
            <Button
                shadow
                auto
                onPress={() => setVisible(true)}
                css={{ m: 5 }}>

                <Text
                    css={{ color: "inherit" }}
                    size={18}>
                    Empréstar livro <BsPlusCircleFill />
                </Text>

            </Button>

            <ModalLoan
                title="Cadastrar"
                visible={visible}
                setVisible={setVisible}
                actionSubmit={saveLoan}
            />

        </div>
    );
}

export default NewLoan;