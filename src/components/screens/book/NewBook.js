import '../../styles/Styles.css'
import { Button } from "@nextui-org/react";
import FormBook from '../../Layouts/FormBook';
import { postBook } from '../../../services/BookService'
import React, { useState } from 'react';

function NewBook({ refresh }) {

    const [visible, setVisible] = useState(false);

    async function saveBook(book) {
        
        await postBook(book)
        await refresh()

    }

    return (

        <section>
            <Button onPress={() => setVisible(true)} shadow auto>Cadastrar livro</Button>

            <FormBook
                submitAction={saveBook}
                title='Salvar'
                visible={visible}
                setVisible={setVisible}
            />
        </section>

    );
}

export default NewBook;