import { Container, ContainerInput, ContainerInputButtom } from "../../components/Container/style"
import { LogoStyle } from "../../components/Logo/style"

// Import da logo
import logo from '../../../assets/logo.png'
import { Title } from "../../components/Title/style"
import { Subtitle } from "../../components/Text/style"
import { InputStyle } from "../../components/Input/style"
import { Button } from "../../components/Button/style"
import { ButtonTitle } from "../../components/ButtonTitle/style"
import { ButtonIcon, IconLogin } from "../Home/style"

import iconFechar from "../../../assets/fecharIcon.png"
import { Feather } from '@expo/vector-icons';

import api from "../../services/services.js"
import { useState } from "react"
import { Spinner } from "../../components/Spinner/index.js"
import { Animated, TouchableOpacity, View } from "react-native"
import { Message } from "../../components/Message/Message.js"

export const RedifinirSenha = ({
    navigation,
    route
}) => {

    const [eye, setEye] = useState(true)
    const [eyeTwo, setEyeTwo] = useState(true)

    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [spinner, setSpinner] = useState(false);

    const [animError] = useState(new Animated.Value(-1000))
    const [error, setError] = useState('#49b3ba')

    async function AlterarSenha() {
        await api.put(`/Usuario/AlterarSenha?email=${route.params.email}`, {
            "senhaNova": novaSenha
        })
            .then(() => setSpinner(true))
            .catch(e => console.log(e))
    }

    return (
        <Container>

            <Message
                translate={animError}
                type={`error`}
                title={`Senhas inválidas`}
                text={`As senhas não coincidem ou estão inválidas`}
            />

            {
                spinner ? <Spinner navigation={navigation} screen={'Login'} /> : null
            }

            <ButtonIcon onPress={() => navigation.navigate("Login")}>
                <IconLogin source={iconFechar} />
            </ButtonIcon>

            <LogoStyle source={logo} />

            <Title>Redefinir senha</Title>

            <Subtitle>Insira e confirme sua nova senha</Subtitle>

            <ContainerInputButtom>
                <ContainerInput>

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
                        placeholder="Nova senha"
                        onChangeText={txt => setNovaSenha(txt)}
                        secureTextEntry={eye}
                        style={{ borderWidth: 0 }}
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
                        placeholder="Confirme a nova senha"
                        onChangeText={txt => setConfirmarSenha(txt)}
                        secureTextEntry={eyeTwo}
                        style={{ borderWidth: 0 }}
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
                   
                    
                </ContainerInput>

                <Button onPress={() => {
                    if (novaSenha === confirmarSenha && novaSenha !== '' && confirmarSenha !== '') {
                        AlterarSenha();
                        return;
                    }
                    else if (novaSenha === '' || confirmarSenha === '') {
                        setError(`#f64f77`)
                        setTimeout(() => setError(`#49b3ba`), 3000)
                    }

                    Animated.spring(animError, { toValue: 0, speed: 0.1, bounciness: 2, useNativeDriver: true }).start()

                    setTimeout(() => {
                        Animated.spring(animError, { toValue: -1000, duration: 800, useNativeDriver: true }).start()
                    }, 2500)
                }}>
                    <ButtonTitle>confirme a nova senha</ButtonTitle>
                </Button>
            </ContainerInputButtom>

        </Container>
    )
}