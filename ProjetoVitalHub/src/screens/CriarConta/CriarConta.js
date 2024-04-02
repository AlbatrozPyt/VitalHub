// Import dos componentes
import { Container, ContainerInput, ContainerInputButtom } from "../../components/Container/style"
import { LogoStyle } from "../../components/Logo/style"
import { Title } from "../../components/Title/style"
import { LinkUtil, Subtitle } from "../../components/Text/style"
import { InputStyle } from "../../components/Input/style"
import { Button } from "../../components/Button/style"
import { ButtonTitle } from "../../components/ButtonTitle/style"


import api from "../../services/services"


// Import da logo
import logo from "../../../assets/logo.png"
import { useState } from "react"
import { Alert } from "react-native"

export const CriarConta = ({
    navigation
}) => {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [confirmarSenha, setConfirmarSenha] = useState();

    async function createAccount() {
        await api.post(`/Pacientes`, {
            idTipoUsuario: "300175F7-6A8F-4DAB-A5CF-5546D5E1B4A2",
            email: email,
            senha: senha
        })
            .then(async () => Alert.alert(`Conta criada`, `A conta foi criada com sucesso.`))
            .catch(async () => Alert.alert(`Não foi possível criar conta`, `A conta não foi criada com sucesso.`))

    }

    return (
        <Container>
            <LogoStyle source={logo} />

            <Title>Criar conta</Title>

            <Subtitle>Insira seu endereço de e-mail e senha para realizar seu cadastro.</Subtitle>

            <ContainerInputButtom>
                <ContainerInput>
                    <InputStyle
                        placeholder="E-mail"
                        onChangeText={(txt) => setEmail(txt)}
                    />

                    <InputStyle
                        placeholder="Senha"
                        onChangeText={(txt) => setSenha(txt)}
                        secureTextEntry={true}
                    />

                    <InputStyle
                        placeholder="Confirme a senha"
                        onChangeText={(txt) => setConfirmarSenha(txt)}
                        secureTextEntry={true}
                    />
                </ContainerInput>

                <Button onPress={() => {
                    if (senha === confirmarSenha) {
                        createAccount();
                        navigation.replace("Login")
                    }
                    else {
                        alert(`As senhas estão diferentes`)
                    }
                }}>
                    <ButtonTitle>cadastrar</ButtonTitle>
                </Button>
            </ContainerInputButtom>
            <LinkUtil onPress={() => navigation.replace("Login")}>Cancelar</LinkUtil>
        </Container>
    )
}