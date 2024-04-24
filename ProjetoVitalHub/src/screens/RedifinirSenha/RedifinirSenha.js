import { Container, ContainerInput, ContainerInputButtom } from "../../components/Container/style"
import { LogoStyle } from "../../components/Logo/style"

// Import da logo
import logo from '../../../assets/logo.png'
import { Title } from "../../components/Title/style"
import { Subtitle } from "../../components/Text/style"
import { InputStyle } from "../../components/Input/style"
import { Button } from "../../components/Button/style"
import { ButtonTitle } from "../../components/ButtonTitle/style"
import { ButtonIcon, IconLogin } from "../Home/style"

import iconFechar from "../../../assets/fecharIcon.png"

import api from "../../services/services.js"
import { useState } from "react"
import { Spinner } from "../../components/Spinner/index.js"

export const RedifinirSenha = ({
    navigation,
    route
}) => {

    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [spinner, setSpinner] = useState(false);

    async function AlterarSenha() {
        await api.put(`/Usuario/AlterarSenha?email=${route.params.email}`, {
            "senhaNova": novaSenha
        })
            .then(() => setSpinner(true))
            .catch(e => console.log(e))
    }

    return (
        <Container>

            {
                spinner ? <Spinner navigation={navigation} screen={'Login'} /> : null
            }

            <ButtonIcon onPress={() => navigation.replace("Login")}>
                <IconLogin source={iconFechar} />
            </ButtonIcon>

            <LogoStyle source={logo} />

            <Title>Redifinir senha</Title>

            <Subtitle>Insira e confirme sua nova senha</Subtitle>

            <ContainerInputButtom>
                <ContainerInput>
                    <InputStyle
                        placeholder="Nova senha"
                        onChangeText={txt => setNovaSenha(txt)}
                    />
                    <InputStyle
                        placeholder="Confirme a nova senha"
                        onChangeText={txt => setConfirmarSenha(txt)}
                    />
                </ContainerInput>

                <Button onPress={() => {
                    if (novaSenha === confirmarSenha) {
                        AlterarSenha();
                        return;
                    }

                    alert('Senhas diferentes')
                }}>
                    <ButtonTitle>confirme a nova senha</ButtonTitle>
                </Button>
            </ContainerInputButtom>

        </Container>
    )
}