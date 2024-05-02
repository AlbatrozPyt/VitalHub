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
import { Alert, Animated } from "react-native"
import { Spinner } from "../../components/Spinner"
import { Message } from "../../components/Message/Message"

export const CriarConta = ({
    navigation
}) => {

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [animSuccess] = useState(new Animated.Value(-1000))
    const [animError] = useState(new Animated.Value(-1000))
    const [error, setError] = useState(`#49b3ba`)

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
            .then(async () => {
                // Mostra a mensagem de erro
                Animated.spring(animSuccess, { toValue: 0, speed: 0.1, bounciness: 2, useNativeDriver: true }).start()

                setTimeout(() => {
                    Animated.spring(animSuccess, { toValue: -1000, duration: 800, useNativeDriver: true }).start()
                }, 2500)

                setSpinner(true)
            })
            .catch(async (e) => console.log(e))

    }

    const [spinner, setSpinner] = useState(false);

    const user = { email: email, senha: senha }

    return (
        <Scroll>
            <Container>

                <Message
                    translate={animError}
                    type={'error'}
                    title={'Campos inválidos'}
                    text={'Os campos foram digitados incorretamente'}
                />

                <Message
                    translate={animSuccess}
                    type={'success'}
                    title={'Conta crida'}
                    text={'A conta foi criada com sucesso'}
                />

                {
                    spinner ?
                        <Spinner
                            navigation={navigation}
                            screen={'Login'}
                            value={user}
                        /> : null
                }

                <LogoStyle source={logo} />


                <Title>Criar conta</Title>

                <Subtitle>Insira seu endereço de e-mail e senha para realizar seu cadastro.</Subtitle>

                <ContainerInputButtom>
                    <ContainerInput>
                        <InputStyle
                            style={{ borderColor: error }}
                            placeholder="Nome"
                            onChangeText={(txt) => setNome(txt)}
                        />

                        <InputStyle
                            style={{ borderColor: error }}
                            placeholder="Sobrenome"
                            onChangeText={(txt) => setSobrenome(txt)}
                        />

                        <InputStyle
                            style={{ borderColor: error }}
                            placeholder="E-mail"
                            onChangeText={(txt) => setEmail(txt)}
                        />

                        <InputStyle
                            style={{ borderColor: error }}
                            placeholder="Senha"
                            onChangeText={(txt) => setSenha(txt)}
                            secureTextEntry={true}
                        />

                        <InputStyle
                            style={{ borderColor: error }}
                            placeholder="Confirme a senha"
                            onChangeText={(txt) => setConfirmarSenha(txt)}
                            secureTextEntry={true}
                        />
                    </ContainerInput>

                    <Button onPress={() => {
                        if (senha === confirmarSenha && senha !== `` && confirmarSenha !== ``) {
                            createAccount();
                        }
                        else {

                            // Mostra a mensagem de erro
                            Animated.spring(animError, { toValue: 0, speed: 0.1, bounciness: 2, useNativeDriver: true }).start()

                            setTimeout(() => {
                                Animated.spring(animError, { toValue: -1000, duration: 800, useNativeDriver: true }).start()
                            }, 2500)

                            // Muda a cor das borda
                            setError('#f64f77')
                            setTimeout(() => {
                                setError('#49b3ba')
                            }, 2500)
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