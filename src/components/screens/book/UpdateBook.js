import { useState } from "react";
import { Button, Text } from "@nextui-org/react";
import FormBook from '../../Layouts/FormBook';
import { getBook, putBook } from '../../../services/BookService'

function UpdateBook({ id, refresh }) {

    const [book, setBook] = useState()
    const [visible, setVisible] = useState(false);

    async function saveBook(book) {
       
        await putBook(id, book);
        await refresh()
        
    }

    async function obterLivro() {

        const data = await getBook(id)
        setBook(data)
        setVisible(true)

    }

    return (
        <>

            <Button css={{m: 10}}  flat auto onPress={obterLivro} >
                <Text
                    css={{ color: "inherit" }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                >
                    Editar
                </Text>
            </Button>

            {visible && <FormBook
                submitAction={saveBook}
                title='Editar'
                visible={visible}
                setVisible={setVisible}
                bookUpdate={book}
            />}
        </>
    );
}

export default UpdateBook;