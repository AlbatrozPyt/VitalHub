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
                consulta != null && (
                    <AppointmentModalStyle>

                        <AppointmentContent>
                            <ImagePatient source={fotoPerfil} />

                            {/* <Title>{consulta != null ? consulta.paciente.idNavigation.nome : "Nome não carregou"}</Title> */}

                            {/* Teste para não quebrar o code */}
                            {/* {consulta == null ? "não há nada" : "Há algo"} */}

                            {/* <Subtitle>{consulta.paciente.dataNascimento == null ? "não há nada"
                                : new Date().getFullYear() - consulta.paciente.dataNascimento.substring(4, -1) || consulta != null ? consulta.paciente.idNavigation.email : null}</Subtitle> */}

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
                            onPress={() => setStatusList("rotina")}
                            fieldBckColor={"#60BFC5"}
                        />

                        <BtnListAppointment
                            textButton={"Exame"}
                            fieldBorderColor="#60BFC5"
                            fieldColor={"#34898F"}
                            clickButton={statusLista === "exame"}
                            onPress={() => setStatusList("exame")}
                            fieldBckColor={"#60BFC5"}
                        />

                        <BtnListAppointment
                            textButton={"Urgência"}
                            fieldBorderColor="#60BFC5"
                            fieldColor={"#34898F"}
                            clickButton={statusLista === "urgencia"}
                            onPress={() => setStatusList("urgencia")}
                            fieldBckColor={"#60BFC5"}
                        />

                    </BoxConsultasInput>

                    <BoxInput
                        fieldColor={"#34898F"}
                        fieldBorderColor={"#49B3BA"}
                        fieldHeight={53}
                        textLabel='Informe a localização desejada'
                        placeholder='Informe a localização'
                    />

                    <ButtonModalStyle onPress={() => navigation.navigate("SelectClinic") || setShowModalConsultas(false)}>
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
    navigation
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
        // setConsulta({consulta})

        // console.log(consulta);
    }
    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            {/* Container */}
            {
                consultaMed != null && (
                    <AppointmentModalStyle>

                        <AppointmentContent>
                            <ImagePatient
                                // margin={"20px"}
                                source={{ uri: "https://media.licdn.com/dms/image/D4D03AQFY7jiWefxVnA/profile-displayphoto-shrink_800_800/0/1678934773265?e=1714608000&v=beta&t=ez1fnmpbDyUkDmRn3GHLkjaw05s7n8f6jb8Pik-_RUg" }} />

                            {/* Terminar essa parte */}
                            <Title>Dr. {consultaMed != null ? consultaMed.medicoClinica.medico.idNavigation.nome : null}</Title>

                            <Subtitle>Cliníco geral    CRM-{consultaMed != null ? consultaMed.medicoClinica.medico.crm : null}</Subtitle>

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

        </Modal>
    )
}

