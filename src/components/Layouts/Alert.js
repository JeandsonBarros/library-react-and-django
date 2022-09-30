import { Button, Card, Row, Text } from "@nextui-org/react";

function Alert({visible, setVisible, text}) {
    return (
        <>
            {visible > 0 && <Card css={{ mt: 10 }}>
                <Card.Body>
                    <Row
                     justify='space-between' wrap='wrap' align='center'>

                        <Text size={20} >{text}</Text>

                        <Button
                            color='error'
                            shadow
                            flat
                            auto
                            onPress={() => setVisible(false)}
                        >X</Button>
                    </Row>
                </Card.Body>
            </Card>}
        </>
    );
}

export default Alert;