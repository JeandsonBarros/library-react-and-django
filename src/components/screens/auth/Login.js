import '../../styles/Styles.css';
import '../Screens.css';

import { Button, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { login } from '../../../services/AuthService';
import CustomInput from '../../Layouts/CustomInput';
import InputPassword from '../../Layouts/InputPassword';
import {getToken} from '../../../services/TokenService';
import { useNavigate } from "react-router-dom";


function Login() {
    let navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alertMessage, setAlertMessage] = useState()

    useEffect(() => {
        if (getToken())
            return navigate("/");      
    })

    async function loginSubmit(event) {
        event.preventDefault();
        const data = await login(username, password);

        if (data === 200)
            return navigate("/");  
        else
            setAlertMessage(data)
    }

    return (

        <div className='centerItems'>

            <div className='loginBox' >

                <div className='welcome'>
                    <div>
                        <h2 style={{ color: '#fff', textAlign: 'center' }} >Bem vindo(a) a Library</h2>
                        <p style={{ color: '#fff', textAlign: 'center' }} >Administre sua biblioteca gerenciando livros, clientes e empréstimos.</p>
                    </div>
                </div>

                <form onSubmit={loginSubmit} className="formLogin">

                    <h2>Login</h2>

                    <Text color="error" >{alertMessage}</Text>

                    <CustomInput
                        placeholder="Nome de usuário"
                        setValue={text => { setUsername(text) }}
                        value={username}
                    />

                    <InputPassword
                        placeholder="Senha"
                        setValue={text => { setPassword(text) }}
                        value={password}
                    />
  
                       <Button type="submit" css={{ margin: 30 }} shadow auto>
                            Entrar
                        </Button>

                        <Link style={{textAlign: 'center'}} to={`/register/`}>Cadastra-se</Link>

                </form>

            </div>

        </div>

    );
}

export default Login;