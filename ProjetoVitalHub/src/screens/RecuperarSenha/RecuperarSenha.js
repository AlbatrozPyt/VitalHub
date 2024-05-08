// Import dos componentes
import { Container, ContainerInputButtom } from "../../components/Container/style"
import { LogoStyle } from "../../components/Logo/style"
import { Subtitle } from "../../components/Text/style"
import { InputStyle } from "../../components/Input/style"
import { ButtonTitle } from "../../components/ButtonTitle/style"
import { Button } from "../../components/Button/style"
import { Title } from "../../components/Title/style"

// Import da image
import logo from "../../../assets/logo.png"
import IconVoltar from "../../../assets/setaVoltar.jpg"
import { ButtonIcon, IconLogin } from "../Home/style"
import { useState } from "react"
import api from "../../services/services"
import { Alert, Text } from "react-native"
import { Spinner } from "../../components/Spinner"

export const RecuperarSenha = ({
    navigation
}) => {

    const [email, setEmail] = useState('');
    const [spinner, setSpinner] = useState(false);

    async function MandarCodigo(e) {
        const promise = await api.post(`/ReuperarSenha?email=${e}`)
    }

    return (
        <Container>

            {/* {
                spinner ? <Spinner navigation={navigation} screen={"VerificarEmail"} /> : null
            } */}


            <ButtonIcon onPress={() => navigation.replace("Login")}>
                <IconLogin source={IconVoltar} />
            </ButtonIcon>


            <LogoStyle source={logo} />

            <Title>Recuperar</Title>

            <Subtitle>Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha</Subtitle>
            <ContainerInputButtom>
                <InputStyle
                    placeholder="Email"
                    value={email}
                    onChangeText={txt => setEmail(txt)}
                />

                <Button onPress={() => {
                    if (email !== '') {
                        MandarCodigo(email)
                    }

                    navigation.replace("VerificarEmail", {email});
                    setSpinner(true)
                }}>
                    <ButtonTitle>Continuar</ButtonTitle>
                </Button>
            </ContainerInputButtom>

        </Container>
    )
}