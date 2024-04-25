// Import dos componentes
import { Container, ContainerInput, ContainerInputButtom, Scroll } from "../../components/Container/style"
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
import { Spinner } from "../../components/Spinner"

export const CriarConta = ({
    navigation
}) => {

    const [nome, setNome] = useState();
    const [sobrenome, setSobrenome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [confirmarSenha, setConfirmarSenha] = useState();

    async function createAccount() {
        const form = new FormData();

        form.append("IdTipoUsuario", "300175F7-6A8F-4DAB-A5CF-5546D5E1B4A2")
        form.append("Nome", `${nome} ${sobrenome}`)
        form.append("Email", email)
        form.append("Senha", senha)

        await api.post(`/Pacientes`, form, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(async () => Alert.alert(`Conta criada`, `A conta foi criada com sucesso.`))
            .catch(async (e) => console.log(e))

    }

    const [spinner, setSpinner] = useState(false);

    return (
        <Scroll>
            <Container>
                {
                    spinner ?
                        <Spinner
                            navigation={navigation}
                            screen={'Login'}
                        /> : null
                }

                <LogoStyle source={logo} />


                <Title>Criar conta</Title>

                <Subtitle>Insira seu endereço de e-mail e senha para realizar seu cadastro.</Subtitle>

                <ContainerInputButtom>
                    <ContainerInput>
                        <InputStyle
                            placeholder="Nome"
                            onChangeText={(txt) => setNome(txt)}
                        />

                        <InputStyle
                            placeholder="Sobrenome"
                            onChangeText={(txt) => setSobrenome(txt)}
                        />

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
                            setSpinner(true)
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
        </Scroll>
    )
}