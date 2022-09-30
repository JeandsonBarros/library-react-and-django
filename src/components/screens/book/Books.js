import { Card, Col, Text, Row, Input, Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPlusCircleFill, BsSearch } from 'react-icons/bs';
import { getBooks } from '../../../services/BookService';

import NewBook from './NewBook';
import RemoveBook from './RemoveBook';
import UpdateBook from './UpdateBook';
import Alert from '../../Layouts/Alert'

function Books() {

    let navigate = useNavigate();
    const [books, setBooks] = useState([]);

    const [msg, setMsg] = useState('')
    const [alertVisible, setAlerVisible] = useState(false)

    const [search, setSearch] = useState('');

    const [totalBooks, setTotalBooks] = useState(0);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        getBooksFunction()
    }, [])

    async function getBooksFunction(offsetValue = 0, title = '') {

        const data = await getBooks(offsetValue, title)

        if (typeof (data) === 'string') {
            setMsg(data)
            setAlerVisible(true)

            return
        }


        setTotalBooks(data.count)
        offsetValue === 0 ? setBooks(data.results) : setBooks(books.concat(data.results))

    }

    async function paginationBook() {

        getBooksFunction(offset + 10, search)

        setOffset(offset + 10)

    }

    function refresh(msg) {

        setMsg(msg)
        setAlerVisible(true)

        getBooksFunction(0, search)

        setOffset(0)

        window.scroll({
            top: 0,
            behavior: 'smooth'
        })

    }

    return (

        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', }} >

            <div style={{ margin: 10, width: '100%', }}>

                <Row css={{ mb: 20 }} wrap='wrap' justify='space-between'>

                    <div style={{ marginTop: 40 }}>
                        <NewBook refresh={refresh} />
                    </div>

                    <Input
                        value={search}
                        width='200px'
                        underlined
                        css={{ mt: 40 }}
                        contentRight={<BsSearch/>}
                        labelPlaceholder='Buscar livro'
                        onChange={event => {
                            getBooksFunction(0, event.target.value)
                            setSearch(event.target.value)
                            setOffset(0)
                        }}
                    />

                </Row>

                <hr />

                <Alert
                    visible={alertVisible}
                    setVisible={setAlerVisible}
                    text={msg} />

                <div className='d-flex flex-row flex-wrap justify-content-center mt-4' >
                    {books.length > 0 && books.map(book => {
                        return (

                            <Card
                                isHoverable
                                isPressable
                                key={book.id}
                                onPress={() => navigate(`/livro/${book.id}/`)}
                                css={{
                                    w: "230px",
                                    h: '400px',
                                    m: '10px'
                                }}>

                                <Card.Body css={{ p: 10 }}>

                                    <Card.Image
                                        src={book.image ? `http://127.0.0.1:8000${book.image}` : require('../../imgs/default_image.png') }
                                        width="100%"
                                        height="100%"
                                        objectFit="contain"
                                        alt="Card example background"
                                    />

                                    <Col>

                                        <Col css={{h:100}}>
                                            <Text css={{wordWrap: 'break-word'}}>
                                                {book.title.length<50? book.title : book.title.slice(0, 50)+'...' }
                                            </Text>
                                            <Text size={12} weight="bold" >
                                                {book.author}
                                            </Text>
                                        </Col>

                                        <Row justify='center'>
                                            <RemoveBook
                                                id={book.id}
                                                title={book.title}
                                                refresh={refresh}
                                            />

                                            <UpdateBook
                                                refresh={refresh}
                                                id={book.id}
                                                book={book} />
                                        </Row>

                                    </Col>

                                </Card.Body>

                            </Card>
                        )

                    })}

                </div>

                {(totalBooks !== books.length && totalBooks > 0) && <Button
                    auto
                    shadow
                    css={{
                        m: '20px auto',
                        p: 10,
                        h: 60,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={paginationBook}
                >
                    <BsPlusCircleFill style={{ fontSize: 40 }} />
                </Button>}

            </div>

        </div>
    );
}

export default Books;