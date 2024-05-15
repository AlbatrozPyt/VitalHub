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
import { Alert, Animated, TouchableOpacity, View } from "react-native"
import { Spinner } from "../../components/Spinner"
import { Message } from "../../components/Message/Message"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Feather } from '@expo/vector-icons';
import { InputText } from "../../components/Input"


export const CriarConta = ({
    navigation
}) => {

    // States para a requisicao
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [eye, setEye] = useState(true)
    const [eyeTwo, setEyeTwo] = useState(true)

    // State para animacao de sucesso
    const [animSuccess] = useState(new Animated.Value(-1000))

    // State para animacao de erro
    const [animError] = useState(new Animated.Value(-1000))

    // State para mudar a cor da borda
    const [error, setError] = useState(`#49b3ba`)

    // State do spinner
    const [spinner, setSpinner] = useState(false);

    // Usuario que vai passar para a tela de login pelo route
    const user = { email: email, senha: senha }


    async function Logar() {
        await api.post('/Login', {
            email: email,
            senha: senha
        }).then(async response => {

            // Salva o token no async storage
            await AsyncStorage.setItem("token", JSON.stringify(response.data))

            // Vai para a tela principal
            setTimeout(() => {
                navigation.navigate("Perfil")
            }, 1000);

        })
    }


    // Funcao de Criar Conta
    async function createAccount() {

        // Logica para enviar uma requisicao do tipo form

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

                // Configura a mensagem de sucesso e o tempo
                Animated.spring(animSuccess, { toValue: 0, speed: 0.1, bounciness: 2, useNativeDriver: true }).start()

                setTimeout(() => {
                    Animated.spring(animSuccess, { toValue: -1000, duration: 800, useNativeDriver: true }).start()
                }, 1500)

                setSpinner(true)

                Logar()
            })
            .catch(async (e) => {
                // Configura a mensagem de erro e o tempo
                Animated.spring(animError, { toValue: 0, speed: 0.1, bounciness: 2, useNativeDriver: true }).start()

                setTimeout(() => {
                    Animated.spring(animError, { toValue: -1000, duration: 800, useNativeDriver: true }).start()
                }, 2500)
            })

    }

    return (
        <Scroll>
            <Container>

                {/* Mostra o spinner de carregamento */}
                {
                    spinner ?
                        <Spinner
                            time={2000}
                        /> : null
                }

                {/* Mensagem de erro */}
                <Message
                    translate={animError}
                    type={'error'}
                    title={'Campos inválidos'}
                    text={'Os campos foram digitados incorretamente'}
                />

                {/* Mensagem de sucesso */}
                <Message
                    translate={animSuccess}
                    type={'success'}
                    title={'Conta crida'}
                    text={'A conta foi criada com sucesso'}
                />


                {/* Inicio da tela */}
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
                            <InputStyle
                            style={{ borderWidth: 0 }}
                            placeholder="Senha"
                            onChangeText={(txt) => setSenha(txt)}
                            secureTextEntry={eyeTwo}
                        /> 

                            <TouchableOpacity
                                onPress={() => eyeTwo ? setEyeTwo(false) : setEyeTwo(true)}
                            >
                                {
                                    eyeTwo
                                        ? <Feather name="eye" size={24} color="black" />
                                        : <Feather name="eye-off" size={24} color="black" />
                                }
                            </TouchableOpacity>
                        </View>

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
                            <InputStyle
                                style={{ borderWidth: 0 }}
                                placeholder="Confirme a senha"
                                onChangeText={(txt) => setConfirmarSenha(txt)}
                                secureTextEntry={eye}
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

                    <Button onPress={() => {

                        // Confirma se as senhas são válidas e chama a função
                        if (senha === confirmarSenha && senha !== `` && confirmarSenha !== ``) {
                            createAccount();
                        }
                        else {

                            // Mostra a mensagem de erro e o tempo
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
                <LinkUtil onPress={() => navigation.navigate("Login")}>Cancelar</LinkUtil>
            </Container>
        </Scroll>
    )
}