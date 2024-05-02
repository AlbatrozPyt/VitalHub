// Import dos componentes
import { Container, ContainerInput, ContentAccount } from "../../components/Container/style"
import { LogoStyle } from "../../components/Logo/style"
import { Title } from "../../components/Title/style"
import { LinkMedium, LinkUtil } from "../../components/Link/style"
import { Button, ButtonGoogle, ValidationText } from "../../components/Button/style"
import { ButtonTitle, ButtonTitleGoogle } from "../../components/ButtonTitle/style"

// Import da Image
import logo from "../../../assets/logo.png"

// Import da API
import api from '../../services/services'

// Import do icon
import { AntDesign } from '@expo/vector-icons';
import { TextAccount } from "../../components/Text/style"
import { useEffect, useRef, useState } from "react"
import { InputText } from "../../components/Input"
import { ActivityIndicator, Alert, Animated, StyleSheet, Text, View } from "react-native"

// Import do Storage
import AsyncStorage from '@react-native-async-storage/async-storage'

// Componente que roda o spinner de load do login
import { Spinner } from "../../components/Spinner"
import { MontserratAlternates_400Regular_Italic } from "@expo-google-fonts/montserrat-alternates"
import { Sla } from "../Perfil/style"
import { Message } from "../../components/Message/Message"

export const Login = ({
    navigation,
    route
}) => {

    const [email, setEmail] = useState('matheus.ortiz2@aluno.senai.br')
    const [senha, setSenha] = useState('Ggg')
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const [loadButton, setLoadButton] = useState(false);

    // Mostra a mensagem de erro
    const [errorMessage, setErrorMessage] = useState()

    const [animError] = useState(new Animated.Value(-1000))

    // Funcao de login
    async function Logar() {
        await api.post('/Login', {
            email: email,
            senha: senha
        }).then(async response => {
            await AsyncStorage.setItem("token", JSON.stringify(response.data))

            setTimeout(() => {
                navigation.replace("Main")
            }, 1000);

        }).catch(() => {
            setTimeout(() => {
                setLoadButton(false);
                Animated.spring(animError, { toValue: 0, speed: 0.1, bounciness: 2, useNativeDriver: true }).start()
            }, 500)

            setTimeout(() => {
                Animated.spring(animError, { toValue: -1000, duration: 800, useNativeDriver: true }).start()
            }, 2500)

        })
    }

    useEffect(() => {
    //    setEmail(route.params.data.email)
    //    setSenha(route.params.data.senha)
    }, [route])

    return (
        <Container>

            <Message
                translate={animError}
                title={`Login inválido`}
                text={`Emai ou senha incorretos !!!`}
                type={`error`}
            />

            {/* Spinner de carregamento para home */}
            {
                loadButton ? (
                    <Spinner />
                ) : null
            }
            {
                errorMessage &&
                <Message
                    title={`Login inválido`}
                    text={`Email ou senha incorretos !!!`}
                    type={`error`}
                />
            }

            <LogoStyle source={logo} />

            <Title marginBottom={"20px"}>Entrar ou criar conta</Title>

            <ContainerInput>

                <InputText
                    placeholder="Email"

                    fieldValue={email}
                    onChangeText={(txt) => setEmail(txt)}
                />
                {/* { emailInvalid ? <ValidationText>Email inválido !!!</ValidationText> : null } */}

                <InputText
                    placeholder="Senha"
                    secureTextEntry={true}

                    fieldValue={senha}
                    onChangeText={(txt) => setSenha(txt)}
                />
                {/* { passwordInvalid ? <ValidationText>Senha inválida !!!</ValidationText> : null } */}
            </ContainerInput>

            <LinkUtil onPress={() => navigation.navigate("RecuperarSenha")}>
                <LinkMedium >Esqueceu sua senha?</LinkMedium>
            </LinkUtil>

            <ContainerInput>
                <Button
                    disabled={loadButton}
                    fieldBckColor={loadButton ? `gray` : " #496bba"}
                    style={loadButton ? { borderColor: `gray` } : null}
                    onPress={() => {
                        // Mostrar o carregamento do bot
                        setLoadButton(true)
                        Logar()
                    }}>
                    <ButtonTitle>Entrar</ButtonTitle>
                </Button>


                <ButtonGoogle>
                    <AntDesign name="google" size={18} color="#496BBA" />
                    <ButtonTitleGoogle >Entrar com google</ButtonTitleGoogle>
                </ButtonGoogle>
            </ContainerInput>

            <ContentAccount>
                <TextAccount>Não tem conta? </TextAccount>
                <TextAccount
                    fieldColor={"#4d659d"}
                    onPress={() => navigation.replace("CriarConta")}
                >
                    Crie uma conta agora
                </TextAccount>
            </ContentAccount>
        </Container >
    )
}
