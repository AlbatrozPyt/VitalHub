// Import dos componentes
import { Container, ContainerInput, ContentAccount } from "../../components/Container/style"
import { LogoStyle } from "../../components/Logo/style"
import { Title } from "../../components/Title/style"
import { InputStyle } from "../../components/Input/style"
import { LinkMedium, LinkUtil } from "../../components/Link/style"
import { Button, ButtonGoogle } from "../../components/Button/style"
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
import { Alert } from "react-native"

export const Login = ({
    navigation
}) => {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    async function Logar() {
        await api.post('/Login', {
            email: email,
            senha: senha
        }).then( response => {
            console.log( response )
        }).catch(error => {
            console.log( error )

            Alert.alert(
                //Title
                'Erro',
                //Body
                'Email e/ou senha incorreto!!'
            )

            // alert( "Email e/ou senha incorreto!!" )
        })


        // navigation.replace("Main")
    }



    return (
        <Container>

            <LogoStyle source={logo} />

            <Title marginBottom={"20px"}>Entrar ou criar conta</Title>

            <ContainerInput>
                <InputText
                    placeholder="Usuário ou email"

                    fieldValue={email}
                    onChangeText={(txt) => setEmail(txt)}
                />

                <InputText
                    placeholder="Senha"
                    secureTextEntry={true}

                    fieldValue={senha}
                    onChangeText={(txt) => setSenha(txt)}
                />
            </ContainerInput>

            <LinkUtil onPress={() => navigation.navigate("RecuperarSenha")}>
                <LinkMedium >Esqueceu sua senha?</LinkMedium>
            </LinkUtil>

            <ContainerInput>
                <Button onPress={() => Logar()}>
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