

import { Card, Col, Text} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getBooks } from '../../../services/BookService';
import { getToken } from '../../../services/TokenService';
import NewBook from './NewBook';
import RemoveBook from './RemoveBook';
import UpdateBook from './UpdateBook';

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
        <div >

            <div >
                <h1>Livros</h1>
                
                <NewBook refresh={getBooksFunction} />

                <div className='d-flex flex-row flex-wrap justify-content-start mt-4' >
                    {books.length > 0 && books.map(book => {
                        return (

                            <Card
                                isHoverable
                                isPressable
                                key={book.id}
                                onPress={() => navigate(`/livro/${book.id}/`)}
                                css={{
                                    w: "230px",
                                    h: '280px',
                                    m: '10px'
                                }}>
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

                                    <RemoveBook refresh={getBooksFunction} id={book.id} title={book.title} />
                                    <UpdateBook refresh={getBooksFunction} id={book.id} book={book}/>

                                </Card.Footer>
                            </Card>
                        )

                    })}

                </div>
            </div>
        </div>
    );
}

export default Books;