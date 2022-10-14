import { useState } from 'react';
import { register } from '../../../services/AuthService'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../../styles/Styles.css'
import { Button, Text, Card, Loading, } from '@nextui-org/react';
import CustomInput from '../../Layouts/CustomInput';
import InputPassword from '../../Layouts/InputPassword';
import Alert from '../../Layouts/Alert';

function Register() {

    const navigate = useNavigate()
    const [alertMessage, setAlertMessage] = useState()
    const [user, setUser] = useState({})
    const [passwordConfirmAlert, setPasswordConfirmAlert] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [loadingVisible, setLoadingVisible] = useState(false);

    function setUserValue(key, value) {

        let userTemp = user
        user[key] = value
        setUser(userTemp)

    }

    async function registerSubmit(event) {
        event.preventDefault()

        const keys = ['username', 'email', 'first_name', 'last_name', 'password']

        const checks = keys.find(key => {
            return !user[key]
        })

        if (checks)
            return setAlertMessage("Não deixe campos vazios")

        if (user.password.length < 8)
            return setAlertMessage("Senha deve ter mais de 8 caracteres ou mais")

        if (user.password !== passwordConfirm) {
            return setPasswordConfirmAlert('Senha não corresponde')
        }

        setLoadingVisible(true)

        const data = await register(user)

        if (data === 201)
            navigate('/')
        else
            setAlertMessage(data)

        setLoadingVisible(false)
    }

    return (
        <div className='centerItems'>

            <Alert
                text={alertMessage}
                visible={alertMessage}
                setVisible={()=>{
                    setAlertMessage('')
                }}
            />

            <form onSubmit={registerSubmit} className="formRegister">

                <h1>Cadastro</h1>

                {loadingVisible && <Loading />}

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

                    <div>
                        <InputPassword
                            setValue={text => { setUserValue('password', text) }}
                            value={user.password}
                            placeholder="Senha" />

                        <p></p>

                        <InputPassword
                            setValue={text => { setPasswordConfirm(text) }}
                            value={passwordConfirm}
                            placeholder="Confirmar senha" />

                        <Text color="error" >{passwordConfirmAlert}</Text>
                    </div>

                </div>

                <Button type="submit" css={{ margin: '25px auto', width: 20 }} shadow auto>
                    Cadastrar-se
                </Button>

                <Link style={{ textAlign: 'center' }} to={`/login/`}>Login</Link>

            </form>

        </div>
    );
}

export default Register;