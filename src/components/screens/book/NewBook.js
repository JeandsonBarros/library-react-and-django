import '../../styles/Styles.css'
import { Button } from "@nextui-org/react";
import FormBook from '../../Layouts/FormBook';
import { postBook } from '../../../services/BookService'
import React, { useState } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';

function NewBook({ refresh }) {

    const [visible, setVisible] = useState(false);

    async function saveBook(book) {

        const data = await postBook(book)
        await refresh(data)

    }

    return (

        <div>
            <Button
                onPress={() => setVisible(true)}
                shadow
                auto>
                <span style={{ marginRight: 5 }}>
                    Cadastrar livro
                </span>
                <BsPlusCircleFill />
            </Button>

            <FormBook
                submitAction={saveBook}
                title='Salvar'
                visible={visible}
                setVisible={setVisible}
            />
        </div>

    );
}

export default NewBook;