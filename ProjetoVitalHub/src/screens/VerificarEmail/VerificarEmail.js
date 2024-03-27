// Import dos componentes
import { Container, ContainerInputButtom } from "../../components/Container/style"
import { LogoStyle } from "../../components/Logo/style"
import { Title } from "../../components/Title/style"
import { LinkUtil, Subtitle } from "../../components/Text/style"

// Import da logo
import logo from "../../../assets/logo.png"
import { BoxCode, InputVerification } from "./style"
import { Button } from "../../components/Button/style"
import { ButtonTitle } from "../../components/ButtonTitle/style"
import { InputStyle } from "../../components/Input/style"
import { ButtonIcon, IconLogin } from "../Home/style"

import iconFechar from "../../../assets/fecharIcon.png"


export const VerificarEmail = ({
    navigation
}) => {
    return (
        <Container>
            <ButtonIcon onPress={() => navigation.navigate("Login")}>
                <IconLogin source={iconFechar} />
            </ButtonIcon>

            <LogoStyle source={logo} />

            <Title>Verifique seu e-mail</Title>

            <Subtitle>Digite o código de 4 dígitos enviado para username@email.com</Subtitle>

            <ContainerInputButtom>
                <BoxCode>
                    <InputVerification value="0" />
                    <InputVerification value="0" />
                    <InputVerification value="0" />
                    <InputVerification value="0" />
                </BoxCode>

                <Button onPress={() => navigation.replace("RedifinirSenha")}>
                    <ButtonTitle>confrimar</ButtonTitle>
                </Button>
            </ContainerInputButtom>

            <LinkUtil>Reenviar Código</LinkUtil>
        </Container>
    )
}