import { useState } from 'react';
import { register } from '../../../services/AuthService'
import UserForm from '../../Layouts/UserForm';
import { Link } from "react-router-dom";


function Register() {

    const [alertMessage, setAlertMessage] = useState()

    async function registerSubmit(user) {
        console.log(user)

        const data = await register(user)

        if (data !== 201)
            setAlertMessage(data)
    }

    return (
        <section className='container'>

            <UserForm
                title="Registro"
                buttonText="Registrar-se"
                actionSubmit={registerSubmit}
                alertMessage={alertMessage}
            />
            <Link style={{textAlign: 'center'}} to={`/login/`}>Login</Link>
            
        </section>
    );
}

export default Register;