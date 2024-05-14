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
import { Feather } from '@expo/vector-icons';

import { TextAccount } from "../../components/Text/style"
import { useEffect, useRef, useState } from "react"
import { InputText } from "../../components/Input"
import { Animated, Touchable, TouchableOpacity, View } from "react-native"

// Import do Storage
import AsyncStorage from '@react-native-async-storage/async-storage'

// Componente que roda o spinner de load do login
import { Spinner } from "../../components/Spinner"

// Componente de mensagem com animacao
import { Message } from "../../components/Message/Message"
import { faL } from "@fortawesome/free-solid-svg-icons"

export const Login = ({
    navigation,
    route
}) => {

    const [eye, setEye] = useState(true)

    const [email, setEmail] = useState(route.params && route.params.data.email)
    const [senha, setSenha] = useState(route.params && route.params.data.senha)


    // State para mostar o spinner de carregamento
    const [loadButton, setLoadButton] = useState(false);

    // Mostra a mensagem de erro
    const [errorMessage, setErrorMessage] = useState()
    const [error, setError] = useState(`#F5F3F3`)

    // State da animacao
    const [animError] = useState(new Animated.Value(-1000))

    // Funcao de login
    async function Logar() {
        await api.post('/Login', {
            email: email,
            senha: senha
        }).then(async response => {

            // Salva o token no async storage
            await AsyncStorage.setItem("token", JSON.stringify(response.data))

            // Vai para a tela principal
            setTimeout(() => {
                navigation.navigate("Main")
            }, 1000);

        }).catch(() => {

            // Muda a cor da borda
            setError(`#f64f77`)

            // Configurando a animacao de erro e o tempo

            setTimeout(() => {
                setLoadButton(false);
                Animated.spring(animError, { toValue: 0, speed: 0.1, bounciness: 2, useNativeDriver: true }).start()
            }, 500)

            setTimeout(() => {
                Animated.spring(animError, { toValue: -1000, duration: 800, useNativeDriver: true }).start()
            }, 2500)

            setTimeout(() => setError(`#F5F3F3`), 2500)
        })
    }

    useEffect(() => {
        if (route.params !== undefined) {
            Logar()
        }
    }, [route])

    return (
        <Container>

            {/* Componente de animacao de erro */}
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

            {/* Inicio da tela */}

            <LogoStyle source={logo} />

            <Title marginBottom={"20px"}>Entrar ou criar conta</Title>

            <ContainerInput>
                <InputText
                    placeholder="Email"
                    fieldBorderColor={error}
                    fieldValue={email}
                    onChangeText={(txt) => setEmail(txt)}
                />

                <View
                    style={{
                        borderWidth: 2,
                        borderColor: error,
                        position: `relative`,
                        width: `90%`,
                        flexDirection: `row`,
                        alignItems: `center`,
                        backgroundColor: `#F5F3F3`,
                        borderRadius: 5
                    }}
                >
                    <InputText
                        placeholder="Senha"
                        secureTextEntry={eye}
                        fieldValue={senha}
                        onChangeText={(txt) => setSenha(txt)}
                    />

                    <TouchableOpacity
                        onPress={() => eye ? setEye(false) : setEye(true)}
                    >
                        {
                            eye
                                ? <Feather name="eye" size={24} color="black" />
                                : <Feather name="eye-off" size={24} color="black" />
                        }
                    </TouchableOpacity>
                </View>
            </ContainerInput>

            <LinkUtil onPress={() => navigation.navigate("RecuperarSenha")}>
                <LinkMedium >Esqueceu sua senha?</LinkMedium>
            </LinkUtil>

            <ContainerInput>
                <Button
                    disabled={loadButton} // Desabilita o botao se o spinner estiver rodando
                    fieldBckColor={loadButton ? `gray` : " #496bba"} // Muda a cor de fundo do botao
                    style={loadButton ? { borderColor: `gray` } : null} // Muda a borda do botao
                    onPress={() => {

                        // Mostrar o carregamento do spinner
                        setLoadButton(true)

                        // Chama a funcao de Login
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
                    onPress={() => navigation.navigate("CriarConta")}
                >
                    Crie uma conta agora
                </TextAccount>
            </ContentAccount>
        </Container >
    )
}
