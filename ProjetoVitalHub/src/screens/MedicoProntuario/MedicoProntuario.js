
import { useEffect, useState } from "react"
import { BoxInput } from "../../components/BoxInput"

import { Button, ButtonSecondary } from "../../components/Button/style"
import { ButtonSecondaryTitle, ButtonTitle } from "../../components/ButtonTitle/style"
import { Container, ContainerInputButtom, ContainerPerfil, Scroll } from "../../components/Container/style"
import { FotoStyle } from "../../components/FotoPerfil/style"
import { Subtitle } from "../../components/Text/style"
import { Title } from "../../components/Title/style"
import api from "../../services/services"

export const MedicoProntuario = ({
    navigation,
    route,
}) => {
    const [consulta, setConsulta] = useState()
    const [editable, setEditable] = useState()

    // Dados da consulta
    const [descricao, setDescricao] = useState()
    const [diagnostico, setDiagnostico] = useState()
    const [prescricao, setPrescicao] = useState()

    function edit() {
        setEditable(true)
        setDescricao("")
        setDiagnostico(null)
        setPrescicao(null)
    }

    useEffect(() => {
        async function getConsultas() {
            const promise = await api.get(`/Consultas/BuscarPorId?id=${route.params.consultaId}`);
            if (promise != null) {
                setConsulta(promise.data)

                // Dados da consulta
                setDescricao(promise.data.descricao)
                setDiagnostico(promise.data.diagnostico)
                setPrescicao(promise.data.receita.medicamento)
            }
            else {
                console.log("Ocorreu um erro em médico prontuário");
            }
        }

        getConsultas()
    }, [])
    return (
        <Container>
            {
                consulta != null && (
                    <Scroll>
                        <FotoStyle source={{
                            uri: "https://github.com/Filipe-Gois.png",
                        }} />

                        <Title marginTop={'20px'} textAlign={"center"}>{consulta != null ? consulta.paciente.idNavigation.nome : "falta algo"}</Title>
                        <Subtitle>{consulta.paciente.dataNascimento == null ? "não há nada"
                                : new Date().getFullYear() - consulta.paciente.dataNascimento.substring(4, -1)} anos  {consulta != null ? consulta.paciente.idNavigation.email : null}</Subtitle>

                        <ContainerPerfil>
                            <BoxInput
                                fieldColor={"#34898F"}
                                fieldBorderColor={"#49B3BA"}
                                fieldHeight={121}
                                textLabel='Descrição da consulta'
                                placeholder='Descrição'
                                editable={editable}
                                fieldValue={descricao}
                            />

                            <BoxInput
                                fieldColor={"#34898F"}
                                fieldBorderColor={"#49B3BA"}
                                fieldHeight={53}
                                textLabel='Diagnóstico do paciente'
                                placeholder='Diagnóstico'
                                editable={editable}
                                // fieldValue={diagnostico}
                            />

                            <BoxInput
                                fieldColor={"#34898F"}
                                fieldBorderColor={"#49B3BA"}
                                fieldHeight={121}
                                textLabel='Prescrição médica'
                                placeholder='Prescrição médica'
                                editable={editable}
                                fieldValue={prescricao}
                            />

                            <ContainerInputButtom>
                                <Button>
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