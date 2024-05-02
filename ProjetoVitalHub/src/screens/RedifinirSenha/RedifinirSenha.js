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
import { Animated } from "react-native"
import { Message } from "../../components/Message/Message.js"

export const RedifinirSenha = ({
    navigation,
    route
}) => {

    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [spinner, setSpinner] = useState(false);

    const [animError] = useState(new Animated.Value(-1000))

    async function AlterarSenha() {
        await api.put(`/Usuario/AlterarSenha?email=${route.params.email}`, {
            "senhaNova": novaSenha
        })
            .then(() => setSpinner(true))
            .catch(e => console.log(e))
    }

    return (
        <Container>

            <Message 
                translate={animError}
                type={`error`}
                title={`Senhas inválidas`}
                text={`As senhas não coincidem`}
            />

            {
                spinner ? <Spinner navigation={navigation} screen={'Login'} /> : null
            }

            <ButtonIcon onPress={() => navigation.replace("Login")}>
                <IconLogin source={iconFechar} />
            </ButtonIcon>

            <LogoStyle source={logo} />

            <Title>Redefinir senha</Title>

            <Subtitle>Insira e confirme sua nova senha</Subtitle>

            <ContainerInputButtom>
                <ContainerInput>
                    <InputStyle
                        placeholder="Nova senha"
                        onChangeText={txt => setNovaSenha(txt)}
                        secureTextEntry={true}
                    />
                    <InputStyle
                        placeholder="Confirme a nova senha"
                        onChangeText={txt => setConfirmarSenha(txt)}
                        secureTextEntry={true}
                    />
                </ContainerInput>

                <Button onPress={() => {
                    if (novaSenha === confirmarSenha) {
                        AlterarSenha();
                        return;
                    }

                    Animated.spring(animError, { toValue: 0, speed: 0.1, bounciness: 2, useNativeDriver: true }).start()

                    setTimeout(() => {
                        Animated.spring(animError, { toValue: -1000, duration: 800, useNativeDriver: true }).start()
                    }, 2500)
                }}>
                    <ButtonTitle>confirme a nova senha</ButtonTitle>
                </Button>
            </ContainerInputButtom>

        </Container>
    )
}