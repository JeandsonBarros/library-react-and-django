import { useState, useEffect } from 'react';
import { updateUser, getUser, deleteUser } from '../../../services/AuthService'
import { useNavigate } from 'react-router-dom';
import ModalConfirm from '../../Layouts/ModalConfirm';
import '../../styles/Styles.css'
import { Button, Text, Collapse, Row, Progress, Loading } from '@nextui-org/react';
import CustomInput from '../../Layouts/CustomInput';
import InputPassword from '../../Layouts/InputPassword';
import Alert from '../../Layouts/Alert';

function UserConfig() {

    const navigate = useNavigate()
    const [confirmModalVisible, setConfirmModalVisible] = useState(false)

    const [alertMessage, setAlertMessage] = useState('')
    const [alertVisible, setAlertVisible] = useState(false)

    const [user, setUser] = useState()

    const [passwordConfirmAlert, setPasswordConfirmAlert] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [password, setPassword] = useState('')
    const [progressVisible, setProgressVisible] = useState(false);

    useEffect(() => {
        getUserData()
    }, [])

    async function getUserData() {

        setProgressVisible(true)

        const data = await getUser()
        setUser(data)

        setProgressVisible(false)

    }

    async function userEdit(event) {
        event.preventDefault()

        const keys = ['username', 'email', 'first_name', 'last_name']

        const checks = keys.find(key => {
            return !user[key]
        })

        if (checks) {
            setAlertVisible(true)
            return setAlertMessage("Não deixe campos vazios!")
        }

        setProgressVisible(true)

        const data = await updateUser(user)

        setAlertVisible(true)
        setAlertMessage(data)

        setProgressVisible(false)
    }

    function setUserValue(key, value) {

        let userTemp = user
        user[key] = value
        setUser(userTemp)

    }

    async function passwordUpdate(event) {
        event.preventDefault()

        if (!password || !passwordConfirm) {
            return setPasswordConfirmAlert({ text: "Não deixe campos vazios", status: 'error' })
        }

        if (password !== passwordConfirm) {
            return setPasswordConfirmAlert({ text: 'Senhas não correspondem', status: 'error' })
        }

        setProgressVisible(true)

        const data = await updateUser({ password })
        if (data === "Dados atualizados com sucesso!")
            setPasswordConfirmAlert({ text: "Senha atualizada com sucesso!", status: 'success' })
        else
            setPasswordConfirmAlert({ text: data, status: 'error' })

        setProgressVisible(false)
    }

    async function deleteAccount() {

        const data = await deleteUser()

        if (data === 204)
            navigate('/login/')
        else {
            setAlertVisible(true)
            setAlertMessage("Erro ao deletar conta!")
        }

    }

    function formUser() {
        if (user) {
            return (
                <form onSubmit={userEdit} className="formRegister">

                    <h1>Cadastro</h1>

                    <div className='inputs'>

                        <CustomInput
                            setValue={text => { setUserValue('username', text) }}
                            value={user.username}
                            placeholder="Nome de usuário" />

                        <CustomInput
                            setValue={text => { setUserValue('email', text) }}
                            value={user.email}
                            type="email"
                            placeholder="E-mail" />

                        <CustomInput
                            setValue={text => { setUserValue('first_name', text) }}
                            value={user.first_name}
                            placeholder="Primeiro nome" />

                        <CustomInput
                            setValue={text => { setUserValue('last_name', text) }}
                            value={user.last_name}
                            placeholder="Sobrenome" />

                    </div>

                    <Button type="submit" css={{ margin: '25px auto', width: 20 }} shadow auto>
                        Atualizar
                    </Button>

                </form>
            )
        }

        return <></>

    }

    return (
        <section className='centerItems'>

            {progressVisible && <Progress indeterminated value={50} />}

            <Alert
                visible={alertVisible}
                setVisible={setAlertVisible}
                text={alertMessage}
            />

            {formUser()}

            <Collapse css={{ mt: 20, width: 300 }} title="Senha" subtitle="Redefinir senha">

                <form onSubmit={passwordUpdate}>

                    <Text color={passwordConfirmAlert.status} >{passwordConfirmAlert.text}</Text>

                    {progressVisible && <Loading className='d-flex flex-row justify-content-center mt-4' />}

                    <InputPassword
                        setValue={text => setPassword(text)}
                        value={password}
                        placeholder="Senha" />

                    <p></p>

                    <InputPassword
                        setValue={text => { setPasswordConfirm(text) }}
                        value={passwordConfirm}
                        placeholder="Confirmar senha" />

                    <Button type="submit" css={{ margin: '25px auto' }} shadow auto>
                        Redefinir
                    </Button>

                </form>


            </Collapse>

            <Row css={{ marginTop: 25 }} align='center' justify='center' >

                <Text size={20}> Deletar conta: </Text>

                <Button
                    css={{ marginLeft: '25px', }}
                    onPress={() => setConfirmModalVisible(true)}
                    color="error"
                    shadow
                    auto>
                    Deletar
                </Button>

                <ModalConfirm
                    visible={confirmModalVisible}
                    setVisible={setConfirmModalVisible}
                    title="Deletar conta"
                    message="Realmente deseja deletar sua conta?"
                    action={deleteAccount}
                />

            </Row>

        </section>
    );
}

export default UserConfig;