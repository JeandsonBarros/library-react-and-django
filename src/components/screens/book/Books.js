import React, { useState, useEffect } from 'react';
import { getBooks } from '../../../services/BookService'
import { getToken } from '../../../services/TokenService';
import { useNavigate } from "react-router-dom";
import '../../styles/Styles.css';
import NewBook from './NewBook';
import UpdateBook from './UpdateBook';
import { Card, Col, Button, Text } from "@nextui-org/react";

function Books() {

    let navigate = useNavigate();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooksFunction()
    }, [])

    async function getBooksFunction() {

        if (getToken()) {
            const data = await getBooks()
            setBooks(data.results)
        }
        else
            navigate("/login/");
    }

    return (
        <section className='container'>
            <div >
                <h1>Livros</h1>

                <NewBook refresh={getBooksFunction} />

                <div className='d-flex flex-row flex-wrap justify-content-start mt-4' >
                    {books.length > 0 && books.map(book => {
                        return (

                            <Card key={book.id} css={{ w: "230px", h: '280px', m: '10px' }}>
                                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                                    <Col>
                                        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                                            {book.author}
                                        </Text>
                                        <Text h4 color="white">
                                            {book.title}
                                        </Text>
                                    </Col>
                                </Card.Header>
                                <Card.Body css={{ p: 0 }}>
                                    <Card.Image
                                        src={book.image ? `http://127.0.0.1:8000${book.image}` : 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'}
                                        width="100%"
                                        height="100%"
                                        objectFit="cover"
                                        alt="Card example background"
                                    />
                                </Card.Body>
                                <Card.Footer

                                    isBlurred
                                    css={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        position: "absolute",
                                        bgBlur: "#ffffff66",
                                        borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                                        bottom: 0,
                                        zIndex: 1,
                                    }}
                                >
                                    <Button flat auto color="error" css={{ m: 10 }} >
                                        <Text
                                            css={{ color: "inherit" }}
                                            size={12}
                                            weight="bold"
                                            transform="uppercase"
                                        >
                                            Deletar
                                        </Text>
                                    </Button>

                                    <UpdateBook refresh={getBooksFunction} id={book.id} />

                                </Card.Footer>
                            </Card>
                        )

                    })}

                </div>

            </div>
        </section>
    );
}

export default Books;