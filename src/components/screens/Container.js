import '../styles/Styles.css';
import { useLocation, useNavigate } from 'react-router-dom'
import NavbarCom from '../Layouts/Navbar';
import { getToken } from '../../services/TokenService'
import { useEffect } from 'react';

function Container({ children }) {

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!getToken()) {
            return navigate("/login/")
        }
    }, [])

    const navBar = () => {

        if (location.pathname === '/login/' || location.pathname === '/register/') {
            return <div></div>
        }

        return <NavbarCom />

    }

    return (
        <>
            {navBar()}
            <main className='container'>
                {children}
            </main>

        </>

    );
}

export default Container;