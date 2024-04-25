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
import { useState } from "react"
import { InputText } from "../../components/Input"
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native"

// Import do Storage
import AsyncStorage from '@react-native-async-storage/async-storage'

// Componente que roda o spinner de load do login
import { Spinner } from "../../components/Spinner"

export const Login = ({
    navigation
}) => {

    const [email, setEmail] = useState('matheus.ortiz2@aluno.senai.br')
    const [senha, setSenha] = useState('Gg')
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const [loadButton, setLoadButton] = useState(false);

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
                Alert.alert(
                    //Title
                    'Erro',
                    //Body
                    'Email e/ou senha incorreto!!'
                )

                setLoadButton(false);
            }, 1000)
        })
    }
    return (
        <Container>
            {/* Spinner de carregamento para home */}
            {
                loadButton ? (
                    <Spinner />
                ) : null
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
                    style={loadButton ? {borderColor: `gray`} : null}
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
        </Container>
    )
}
