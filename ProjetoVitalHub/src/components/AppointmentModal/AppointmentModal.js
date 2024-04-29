import { Modal } from "react-native"
import { Title, TitleConsulta } from "../Title/style"

import fotoPerfil from '../../../assets/FotoPerfil.png'
import { ButtonModal, ButtonModalStyle, ButtonSecondary } from "../Button/style"
import { ButtonSecondaryTitle, ButtonTitle } from "../ButtonTitle/style"
import { AppointmentContent, AppointmentModalStyle, BoxConsultasInput, BoxInfosConsultas, ConsultaStyleModal, ConsultasContent, ConsultasModalStyle, ImagePatient } from "./style"
import { Subtitle, TextQuick } from "../Text/style"
import { BoxInput } from "../BoxInput"
import { BntListConsulta, BtnListAppointment } from "../BtnListAppointment/BtnListAppointment"
import { Label } from "../Label"
import { useState } from "react"
import { Mapa } from "../../screens/Mapa/Mapa"


export const AppointmentModal = ({
    visible,
    setShowModalAppointment,
    dados,
    navigation,
    roleUsuario,
    consulta
}) => {
    function handlePress(rota) {
        navigation.navigate(rota, { consultaId: consulta.id })
        setShowModalAppointment(false)
    }

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            {
                roleUsuario == "Medico" && (
                    <>
                        {
                            consulta != null && (
                                <AppointmentModalStyle>

                                    <AppointmentContent>
                                        <ImagePatient source={fotoPerfil} />

                                        <Title>{consulta != null ? consulta.paciente.idNavigation.nome : "Nome não carregou"}</Title>

                                        {/* Teste para não quebrar o code */}
                                        {/* {consulta == null ? "não há nada" : "Há algo"} */}

                                        <Subtitle>{consulta.paciente.dataNascimento == null ? "não há nada"
                                            : new Date().getFullYear() - consulta.paciente.dataNascimento.substring(4, -1) || consulta != null ? consulta.paciente.idNavigation.email : null}</Subtitle>

                                        <ButtonModal onPress={() => handlePress("MedicoProntuario")} >
                                            <ButtonTitle>Inserir protuário</ButtonTitle>
                                        </ButtonModal>

                                        <ButtonSecondary onPress={() => setShowModalAppointment(false)}>
                                            <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                                        </ButtonSecondary>
                                    </AppointmentContent>
                                </AppointmentModalStyle>
                            )
                        }
                    </>
                )
            }


            {/* Container */}

        </Modal>
    )
}

export const ModalConsultas = ({
    visible,
    setShowModalConsultas,
    navigation
}) => {

    const [statusLista, setStatusList] = useState("");
    const [angendamento, setAgendamento] = useState();

    async function handleContinue() {
        await setShowModalConsultas(false);

        navigation.replace('SelectClinic', { agendamento: angendamento })
    }

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <ConsultaStyleModal>
                <ConsultasContent>

                    <Title marginBottom={"17px"}>
                        Agendar consulta
                    </Title>


                    <Label
                        textLabel={"Qual o nível da consulta"}
                    />
                    <BoxConsultasInput>

                        <BtnListAppointment
                            textButton={"Rotina"}
                            fieldBorderColor="#60BFC5"
                            fieldColor={"#34898F"}
                            clickButton={statusLista === "rotina"}
                            onPress={() => {
                                setStatusList("rotina")
                                setAgendamento({
                                    ...angendamento, // Mantem as informacoes que ja existem no state
                                    prioridadeId: "F04CB0C8-E413-408A-B2A9-4F4C87918696",
                                    prioridadeLabel: "Rotina"
                                })
                            }}
                            fieldBckColor={"#60BFC5"}
                        />

                        <BtnListAppointment
                            textButton={"Exame"}
                            fieldBorderColor="#60BFC5"
                            fieldColor={"#34898F"}
                            clickButton={statusLista === "exame"}
                            onPress={() => {
                                setStatusList("exame")
                                setAgendamento({
                                    ...angendamento,
                                    prioridadeId: "B7214CF6-F840-49D7-80C7-B50A1CED7187",
                                    prioridadeLabel: "Exame"
                                })
                            }}
                            fieldBckColor={"#60BFC5"}
                        />

                        <BtnListAppointment
                            textButton={"Urgência"}
                            fieldBorderColor="#60BFC5"
                            fieldColor={"#34898F"}
                            clickButton={statusLista === "urgencia"}
                            onPress={() => {
                                setStatusList("urgencia")
                                setAgendamento({
                                    ...angendamento,
                                    prioridadeId: "1CEFF7CF-0BDE-4B3F-A376-8B5B411CB7A9",
                                    prioridadeLabel: "Urgencia"
                                })
                            }}
                            fieldBckColor={"#60BFC5"}
                        />

                    </BoxConsultasInput>

                    <BoxInput
                        fieldColor={"#34898F"}
                        fieldBorderColor={"#49B3BA"}
                        fieldHeight={53}
                        value={angendamento ? angendamento.localizacao : null}
                        textLabel='Informe a localização desejada'
                        placeholder='Informe a localização'
                        onChangeText={(txt) => setAgendamento({
                            ...angendamento,
                            localizacao: txt
                        })}
                    />

                    <ButtonModalStyle onPress={() => handleContinue()}>
                        <ButtonTitle>Continuar</ButtonTitle>
                    </ButtonModalStyle>

                    <ButtonSecondary onPress={() => setShowModalConsultas(false)}>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>

                </ConsultasContent>
            </ConsultaStyleModal>
        </Modal>
    )
}

export const ModalAgendarConsulta = ({
    visible,
    setShowModalAgendar,
    navigation,
    consulta
}) => {
    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            {/* Container */}
            <AppointmentModalStyle>

                <AppointmentContent>
                    {/* <ImagePatient source={fotoPerfil} /> */}

                    <Title>Agendar consulta</Title>

                    <Subtitle>Consulte os dados selecionados para a sua consulta</Subtitle>

                    <BoxInfosConsultas>
                        <TextQuick>Data da consulta</TextQuick>
                        <Subtitle margin={"8px 0px 20px"}>1 de Novembro de 2023</Subtitle>

                        <TextQuick>Médico(a) da consulta</TextQuick>
                        <Subtitle margin={"5px 0px 0px"}>Dra Alessandra</Subtitle>
                        <Subtitle margin={"3px 0px 20px"}>Demartologa, Esteticista</Subtitle>

                        <TextQuick>Local da consulta</TextQuick>
                        <Subtitle margin={"5px 0px 20px"}>São Paulo, SP</Subtitle>

                        <TextQuick>Tipo da consulta</TextQuick>
                        <Subtitle margin={"5px 0px 0px"}>Rotina</Subtitle>
                    </BoxInfosConsultas>

                    <ButtonModalStyle onPress={() => navigation.navigate("Main")}>
                        <ButtonTitle>Confirmar</ButtonTitle>
                    </ButtonModalStyle>

                    <ButtonSecondary onPress={() => setShowModalAgendar(false)}>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>
                </AppointmentContent>
            </AppointmentModalStyle>
        </Modal>
    )
}

export const ModalPerfilMed = ({
    visible,
    setShowModalPerfilMed,
    navigation,
    consultaMed,
    roleUsuario
}) => {
    // const [consultax, setConsulta] = useState()
    function handlePress(rota) {
        navigation.navigate(rota, { clinicaId: consultaMed.medicoClinica.clinicaId })
    }

    // console.log(roleUsuario);
    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            {/* Container */}

            {
                roleUsuario != "Medico" && (
                    <>
                        {
                            consultaMed != null && (
                                <AppointmentModalStyle>

                                    <AppointmentContent>
                                        <ImagePatient
                                            // margin={"20px"}
                                            source={{ uri: consultaMed.medicoClinica.medico.idNavigation.foto }} />

                                        <Title>Dr. {consultaMed.medicoClinica.medico.idNavigation.nome}</Title>

                                        <Subtitle>{consultaMed.medicoClinica.medico.especialidade.especialidade1}    CRM-{consultaMed.medicoClinica.medico.crm}</Subtitle>

                                        <ButtonModal onPress={() => setShowModalPerfilMed(false) || handlePress("Mapa")}>
                                            <ButtonTitle>Ver local da consulta</ButtonTitle>
                                        </ButtonModal>

                                        <ButtonSecondary onPress={() => setShowModalPerfilMed(false)}>
                                            <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                                        </ButtonSecondary>
                                    </AppointmentContent>
                                </AppointmentModalStyle>
                            )
                        }
                    </>
                )
            }



        </Modal>
    )
}

