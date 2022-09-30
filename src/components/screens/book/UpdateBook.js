import { useState } from "react";
import { Button, Text } from "@nextui-org/react";
import FormBook from '../../Layouts/FormBook';
import { putBook } from '../../../services/BookService'
import { BsFillPencilFill } from "react-icons/bs";

function UpdateBook({ book, id, refresh, buttonText }) {


    const [visible, setVisible] = useState(false);

    async function saveBook(bookUpdate) {

       const data = await putBook(id, bookUpdate);
       await refresh(data)

    }

    return (
        <div>

            <Button
                css={{ m: 5 }}
                shadow
                auto
                color='secondary'
                onPress={() => setVisible(true)} >
                <Text
                    css={{ color: "inherit" }}
                    size={18}
                >
                    {buttonText} <BsFillPencilFill />
                </Text>
            </Button>

            <FormBook
                submitAction={saveBook}
                title='Editar'
                visible={visible}
                setVisible={setVisible}
                bookUpdate={book}
            />

        </div>
    );
}

export default UpdateBook;