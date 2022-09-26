import { Button, Text } from "@nextui-org/react";
import { useState } from "react";
import ModalLoan from "../../Layouts/ModalLoan";
import { BsFillPencilFill } from "react-icons/bs";
import { putLoan } from "../../../services/LoanService";

function LoanUpdate({ loan, refresh }) {

    const [visible, setVisible] = useState(false)

    async function updateLoan(loan) {
        console.log(loan);
        //putLoan(loan.id, loan)
        await refresh()
        setVisible(false)
    }

    return (
        <div>
            <Button
                css={{ m: 10 }}
                shadow
                auto
                color='secondary'
                onPress={() => setVisible(true)} >
                <Text
                    css={{ color: "inherit" }}
                    size={18}
                >
                    <BsFillPencilFill />
                </Text>
            </Button>

            <ModalLoan
                setVisible={setVisible}
                visible={visible}
                loanUpdate={loan}
                title="Atualizar"
                actionSubmit={updateLoan}
            />

        </div>
    );
}

export default LoanUpdate;