
import { useEffect, useState } from "react"
import { BoxInput } from "../../components/BoxInput"

import { Button, ButtonSecondary } from "../../components/Button/style"
import { ButtonSecondaryTitle, ButtonTitle } from "../../components/ButtonTitle/style"
import { Container, ContainerInputButtom, ContainerPerfil, Scroll } from "../../components/Container/style"
import { FotoStyle } from "../../components/FotoPerfil/style"
import { Subtitle } from "../../components/Text/style"
import { Title } from "../../components/Title/style"
import api from "../../services/services"
import { Text, Animated } from "react-native"
import { Message } from "../../components/Message/Message"
import { faL } from "@fortawesome/free-solid-svg-icons"

export const MedicoProntuario = ({
    navigation,
    route,
}) => {
    const [consulta, setConsulta] = useState()
    const [editable, setEditable] = useState(false)

    // Dados da consulta
    const [descricao, setDescricao] = useState()
    const [diagnostico, setDiagnostico] = useState()
    const [medicamento, setMedicamento] = useState()

    // const [id, setId] = useState(route.params.consultaId)

    // State da animacao
    const [animError] = useState(new Animated.Value(-1000))

    // State para animacao de sucesso
    const [animSucess] = useState(new Animated.Value(-1000))
    const [animUpdatePhoto] = useState(new Animated.Value(-1000))

    function edit() {
        setEditable(true)
    }

    useEffect(() => {
        async function getConsultas() {
            const promise = await api.get(`/Consultas/BuscarPorId?id=${route.params.consultaId}`);
            if (promise != null) {
                setConsulta(promise.data)

                // Dados da consulta
                setDescricao(promise.data.descricao)
                setDiagnostico(promise.data.diagnostico)
                setMedicamento(promise.data.receita.medicamento)
            }
            else {
                console.log("Ocorreu um erro em médico prontuário");
            }
        }

        getConsultas()
    }, [editable])

    async function PutConsultas() {
        await api.put(`/Consultas/Prontuario`, {
            "consultaId": route.params.consultaId,
            "medicamento": medicamento,
            "descricao": descricao,
            "diagnostico": diagnostico
        }).then(response => {

            setTimeout(() => {
                Animated.spring(animUpdatePhoto, { toValue: 0, speed: 0.1, bounciness: 2, useNativeDriver: true }).start()
            }, 500)

            setTimeout(() => {
                Animated.spring(animUpdatePhoto, { toValue: -1000, duration: 800, useNativeDriver: true }).start()
            }, 2500)
            setEditable(false)
        })
            .catch(error => console.log(error))

        await api.put(`/Consultas/Status?idConsulta=${route.params.consultaId}&status=realizado`)

    }

    return (
        <Container>
            <Message
                translate={animUpdatePhoto}
                type={`success`}
                title={`Prontuario inserido`}
                text={`O prontuario do inserido com sucess !!!`}
            />
            {
                consulta != null && (
                    <Scroll>
                        <FotoStyle source={{
                            uri: consulta.paciente.idNavigation.foto,
                        }} />

                        <Title marginTop={'20px'} textAlign={"center"}>{consulta != null ? consulta.paciente.idNavigation.nome : "falta algo"}</Title>
                        <Subtitle>{consulta.paciente.dataNascimento == null ? "não há nada"
                            : new Date().getFullYear() - consulta.paciente.dataNascimento.substring(4, -1)} anos  {consulta != null ? consulta.paciente.idNavigation.email : null}</Subtitle>

                        <ContainerPerfil>
                            <BoxInput
                                fieldColor={"#34898F"}
                                fieldBorderColor={!editable ? "#49B3BA" : "#fff"}
                                fieldHeight={121}
                                textLabel='Descrição da consulta'
                                placeholder={!editable ? descricao : consulta.descricao}
                                editable={editable}
                                fieldValue={editable ? descricao : consulta.descricao}
                                onChangeText={(x) => setDescricao(x)}
                            />


                            <BoxInput
                                fieldColor={"#34898F"}
                                fieldBorderColor={!editable ? "#49B3BA" : "#fff"}
                                fieldHeight={53}
                                textLabel='Diagnóstico do paciente'
                                placeholder={!editable ? diagnostico : consulta.diagnostico}
                                editable={editable}
                                fieldValue={editable ? diagnostico : consulta.diagnostico}
                                onChangeText={(x) => setDiagnostico(x)}
                            />

                            <BoxInput
                                fieldColor={"#34898F"}
                                fieldBorderColor={!editable ? "#49B3BA" : "#fff"}
                                fieldHeight={121}
                                textLabel='Prescrição médica'
                                placeholder={!editable ? medicamento : consulta.receita.medicamento}
                                editable={editable}
                                fieldValue={editable ? medicamento : consulta.receita.medicamento}
                                onChangeText={(x) => setMedicamento(x)}
                            />

                            <ContainerInputButtom>
                                <Button
                                    onPress={
                                        () => PutConsultas()
                                    }
                                    fieldBckColor={editable ? "#496bba" : "#ACABB7"}
                                    fieldBorderColor={editable ? "#496bba" : "#ACABB7"}
                                    disabled={!editable}>
                                    <ButtonTitle>Salvar</ButtonTitle>
                                </Button>

                                <Button
                                    onPress={
                                        () => edit()
                                    }

                                    fieldBckColor={editable ? "#ACABB7" : "#496bba"}
                                    fieldBorderColor={editable ? "#ACABB7" : "#496bba"}
                                    disabled={editable}
                                >
                                    <ButtonTitle>editar</ButtonTitle>
                                </Button>
                            </ContainerInputButtom>

                            <ButtonSecondary onPress={() => navigation.navigate("Main")}>
                                <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                            </ButtonSecondary>
                        </ContainerPerfil>

                    </Scroll>
                )
            }

        </Container >
    )
}