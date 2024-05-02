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
import { ButtonIcon, IconLogin } from "../Home/style"

import iconFechar from "../../../assets/fecharIcon.png"
import { useRef, useState } from "react"
import api from "../../services/services"
import { Alert, Animated, TouchableOpacity } from "react-native"

import { Message } from "../../components/Message/Message"

export const VerificarEmail = ({
    navigation,
    route
}) => {

    const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [code, setCode] = useState('');

    const [animError] = useState(new Animated.Value(-1000))

    function focusNextInput(index) {
        if (index < inputs.length - 1) {
            inputs[index + 1].current.focus()
        }
    }

    function focusPrevInput(index) {
        if (index > 0) {
            inputs[index - 1].current.focus()
        }
    }

    async function ValidarCodigo(code) {
        const promise = await api.post(`/ReuperarSenha/Validar?codigo=${code}`)
            .then(() => {
                navigation.replace('RedifinirSenha', { email: route.params.email })
            })
            .catch(e => {
                Animated.spring(animError, { toValue: 0, speed: 0.1, bounciness: 2, useNativeDriver: true }).start()

                setTimeout(() => {
                    Animated.spring(animError, { toValue: -1000, duration: 800, useNativeDriver: true }).start()
                }, 2500)
            })
    }

    async function ReenviarCodigo(e) {
        const promise = await api.post(`/ReuperarSenha?email=${e}`)
            .then(() => Alert.alert('Codigo', 'O codigo foi reenviado com sucesso.'))
            .catch(() => Alert.alert('Codigo', 'Não foi possivel reenviar o codigo.'))
    }

    return (
        <Container>

            <Message
                translate={animError}
                title={`Código inválido`}
                text={'O código inserido, não é válido'}
                type={'error'}
            />

            <ButtonIcon onPress={() => navigation.navigate("Login")}>
                <IconLogin source={iconFechar} />
            </ButtonIcon>

            <LogoStyle source={logo} />

            <Title>Verifique seu e-mail</Title>

            <Subtitle>Digite o código de 4 dígitos enviado para {route.params.email}</Subtitle>

            <ContainerInputButtom>
                <BoxCode>
                    {
                        [0, 1, 2, 3].map((index) => (
                            <InputVerification
                                key={index}
                                ref={inputs[index]}
                                placeholder={'0'}
                                keyboardType={'numeric'}
                                maxLength={1}
                                caretHidden={true}
                                onChangeText={(txt => {
                                    if (txt === "") {
                                        //verifica se o campo é vazio
                                        focusPrevInput(index)
                                    }
                                    else {
                                        // verfica se o campo é preenchido
                                        const codInformado = [...code]
                                        codInformado[index] = txt
                                        setCode(codInformado.join(''))

                                        focusNextInput(index)
                                    }
                                })}
                            />
                        ))
                    }
                </BoxCode>

                <Button onPress={() => {
                    ValidarCodigo(code)
                }}>
                    <ButtonTitle>confrimar</ButtonTitle>
                </Button>
            </ContainerInputButtom>

            <TouchableOpacity onPress={() => ReenviarCodigo(route.params.email)}>
                <LinkUtil>Reenviar Código</LinkUtil>
            </TouchableOpacity>
        </Container>
    )
}