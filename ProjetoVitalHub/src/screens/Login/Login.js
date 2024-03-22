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

// Import do icon
import { AntDesign } from '@expo/vector-icons';
import { TextAccount } from "../../components/Text/style"

export const Login = ({
    navigation
}) => {

    async function Login() {
        navigation.replace("Main")
    }

    return (
        <Container>

            <LogoStyle source={logo} />

            <Title marginBottom={"20px"}>Entrar ou criar conta</Title>

            <ContainerInput>
                <InputStyle
                    placeholder="Usuário ou email"
                />

                <InputStyle
                    placeholder="Senha"
                />
            </ContainerInput>

            <LinkUtil onPress={() => navigation.navigate("RecuperarSenha")}>
                <LinkMedium >Esqueceu sua senha?</LinkMedium>
            </LinkUtil>

            <ContainerInput>
                <Button onPress={(e) => Login()}>
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