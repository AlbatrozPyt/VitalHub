
import { useEffect, useState } from "react"
import { BoxInput } from "../../components/BoxInput"

import { Button, ButtonSecondary } from "../../components/Button/style"
import { ButtonSecondaryTitle, ButtonTitle } from "../../components/ButtonTitle/style"
import { Container, ContainerInputButtom, ContainerPerfil, Scroll } from "../../components/Container/style"
import { FotoStyle } from "../../components/FotoPerfil/style"
import { Subtitle } from "../../components/Text/style"
import { Title } from "../../components/Title/style"
import api from "../../services/services"
import { Text } from "react-native"

export const MedicoProntuario = ({
    navigation,
    route,
}) => {
    const [consulta, setConsulta] = useState()
    const [editable, setEditable] = useState()

    // Dados da consulta
    const [descricao, setDescricao] = useState()
    const [diagnostico, setDiagnostico] = useState()
    const [medicamento, setMedicamento] = useState()

    // const [id, setId] = useState(route.params.consultaId)

    function edit() {
        setEditable(true)
        setDescricao("")
        setDiagnostico(null)
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
        })
        setEditable(false)

    }

    return (
        <Container>
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
                                <Button onPress={() => PutConsultas()}>
                                    <ButtonTitle>Salvar</ButtonTitle>
                                </Button>

                                <Button onPress={() => edit()} fieldBckColor={"#ACABB7"} fieldBorderColor={"#ACABB7"}>
                                    <ButtonTitle>editar</ButtonTitle>
                                </Button>
                            </ContainerInputButtom>

                            <ButtonSecondary onPress={() => navigation.replace("Main")}>
                                <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                            </ButtonSecondary>
                        </ContainerPerfil>

                    </Scroll>
                )
            }

        </Container>
    )
}