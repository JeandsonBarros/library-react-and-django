import '../styles/Styles.css'
import { Button, Modal } from "@nextui-org/react";
import CustomInput from './CustomInput'
import { useState } from 'react';

function FormBook({ submitAction, title, visible, setVisible, bookUpdate }) {

    const [book, setBook] = useState(bookUpdate || {})

    function setValue(key, value) {

        let bookTemp = book
        book[key] = value
        setBook(bookTemp)

    }

    function submiteFuntion(event) {
       /*  event.preventDefault() */

        submitAction(book)
        setVisible(false)
    }

    function file(event) {
        let bookTemp = book
        book['image'] = event.target.files[0]
        setBook(bookTemp)

    }

    return (
        
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={() => setVisible(false)}
                css={{ margin: 10 }}
            >
                <Modal.Header>
                    <h3>{title} livro</h3>
                </Modal.Header>

                <Modal.Body>

                    <CustomInput
                        placeholder="Titulo"
                        setValue={text => setValue('title', text)}
                        value={book.title || ''}
                    />

                    <CustomInput
                        placeholder="Autor"
                        setValue={text => setValue('author', text)}
                        value={book.author || ''}
                    />

                    <CustomInput
                        placeholder="ISBN"
                        setValue={text => setValue('isbn', text)}
                        type='number'
                        value={book.isbn && book.isbn}
                    />

                    <CustomInput
                        placeholder="Sinopse"
                        setValue={text => setValue('synopsis', text)}
                        value={book.synopsis || ''}
                    />

                    <div style={{ marginTop: '50px', width: '100%' }}>
                        <label htmlFor='imageId' >Capa</label>
                        <input
                            id='imageId'
                            className='form-control'
                            type="file"
                            onChange={file}
                           
                        />
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button onPress={submiteFuntion} css={{ margin: 10 }} shadow auto>{title}</Button>
                    <Button
                        css={{ margin: 10 }}
                        color="error"
                        shadow
                        auto
                        onPress={() => setVisible(false)}
                    >
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
      

    );
}

export default FormBook;