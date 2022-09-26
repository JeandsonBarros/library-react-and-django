import { Button, Text } from '@nextui-org/react';
import  { useState } from 'react';
import { BsTrashFill } from 'react-icons/bs';

import { deleteBook } from '../../../services/BookService';
import ModalConfirm from '../../Layouts/ModalConfirm';

export default function RemoveBook({ id, title, refresh, buttonText }) {

    const [visible, setVisible] = useState(false);

    return (
        <div>

            <Button onPress={() => setVisible(true)} shadow auto color="error" css={{ m: 5 }} >
                <Text
                    css={{ color: "inherit" }}
                    size={18}
                >
                   {buttonText} <BsTrashFill />
                </Text>
            </Button>

            <ModalConfirm
                title='Remover livro'
                message={`Realmente deseja remover o livro ${title}?`}
                visible={visible}
                setVisible={setVisible}
                action={async () => {
                    await deleteBook(id)
                    await refresh()
                    setVisible(false)
                }}
            />

        </div>
    )
}