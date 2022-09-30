import '../styles/Styles.css';
import './Layouts.css'

import { Button, Text, Card } from '@nextui-org/react';
import { useState } from 'react';

import CustomInput from './CustomInput';
import InputPassword from './InputPassword';

export default function UserForm({
    userData,
    title,
    buttonText,
    actionSubmit,
   
}) {


    const [user, setUser] = useState(userData || {})
    const [passwordConfirm, setPasswordConfirm] = useState('')

    function setUserValue(key, value) {

        let userTemp = user
        user[key] = value
        setUser(userTemp)

    }

    function submitFunction(event) {
        event.preventDefault()

        if (user.password !== user.password2) {
            return setPasswordConfirm('Senha não corresponde')
        }

        actionSubmit(user)

    }

    return (
        <section>

            <form onSubmit={submitFunction} className="formRegister">

                <h1>{title}</h1>

                <div className='inputs'>

                    <div className='inputContainer' >
                        <CustomInput
                            setValue={text => { setUserValue('username', text) }}
                            value={user.username}
                            placeholder="Nome de usuário" />
                    </div>

                    <div className='inputContainer' >
                        <CustomInput
                            setValue={text => { setUserValue('email', text) }}
                            value={user.email}
                            placeholder="E-mail" />
                    </div>

                    <div className='inputContainer' >
                        <CustomInput
                            setValue={text => { setUserValue('first_name', text) }}
                            value={user.first_name}
                            placeholder="Primeiro nome" />
                    </div>

                    <div className='inputContainer' >
                        <CustomInput
                            setValue={text => { setUserValue('last_name', text) }}
                            value={user.last_name}
                            placeholder="Sobrenome" />
                    </div>


                    <InputPassword
                        setValue={text => { setUserValue('password', text) }}
                        value={user.password}
                        placeholder="Senha" />

                    <p></p>

                    <InputPassword
                        setValue={text => { setUserValue('password2', text) }}
                        value={user.password2}
                        placeholder="Confirmar senha" />

                    <Text color="error" >{passwordConfirm}</Text>


                </div>

                <Button type="submit" css={{ margin: '25px auto', width: 20 }} shadow auto>
                    {buttonText}
                </Button>

            </form>

        </section>
    );
}
