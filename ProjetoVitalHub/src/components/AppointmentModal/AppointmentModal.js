import { Animated, Modal } from "react-native"
import { Title, TitleConsulta } from "../Title/style"

import fotoPerfil from '../../../assets/FotoPerfil.png'
import { ButtonModal, ButtonModalStyle, ButtonSecondary } from "../Button/style"
import { ButtonSecondaryTitle, ButtonTitle } from "../ButtonTitle/style"
import { AppointmentContent, AppointmentModalStyle, BoxConsultasInput, BoxInfosConsultas, ConsultaStyleModal, ConsultasContent, ConsultasModalStyle, ImagePatient } from "./style"
import { Subtitle, TextQuick } from "../Text/style"
import { BoxInput } from "../BoxInput"
import { BntListConsulta, BtnListAppointment } from "../BtnListAppointment/BtnListAppointment"
import { Label } from "../Label"
import { useEffect, useState } from "react"
import { Mapa } from "../../screens/Mapa/Mapa"
import moment from "moment"
import api from "../../services/services"
import { userDecodeToken } from "../../Utils/Auth"
import { Message } from "../Message/Message"


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

    const [cidades, setCidades] = useState([])

    const [statusLista, setStatusList] = useState("");
    const [angendamento, setAgendamento] = useState();

    const [validPrioridade, setValidPrioridade] = useState(false)
    const [validLocalizacao, setValidLocalizacao] = useState("")

    const [animError] = useState(new Animated.Value(-1000))
    const [animEstadoInvalido] = useState(new Animated.Value(-1000))

    async function handleContinue() {
        await setShowModalConsultas(false);

        navigation.replace('SelectClinic', { agendamento: angendamento })
    }

    async function buscarCidade() { 
        const promise = await api.get(`/Endereco/ListarCidades?cidade=${validLocalizacao}`)
        const response = promise.data;

        setCidades(response)
    }

    useEffect(() => buscarCidade, [validLocalizacao])

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <Message
                translate={animError}
                title={'Campos inválidos'}
                text={'Selecione ou preencha todos os campos !!!'}
                type={'error'}
            />

            <Message
                translate={animEstadoInvalido}
                title={`Cidade inválida`}
                text={'Não há nehuma clínica nessa cidade'}
                type={'error'}
            />

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
                                setValidPrioridade(true)
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
                                setValidPrioridade(true)
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
                                setValidPrioridade(true)
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
                        onChangeText={(txt) => {
                            setAgendamento({
                                ...angendamento,
                                localizacao: txt
                            })
                            setValidLocalizacao(txt)
                        }}
                    />

                    <ButtonModalStyle onPress={() => {
                        if (cidades.length === 0) {
                            setTimeout(() => {
                                Animated.spring(animEstadoInvalido, { toValue: 0, speed: 0.1, bounciness: 2, useNativeDriver: true }).start()
                            }, 500)

                            setTimeout(() => {
                                Animated.spring(animEstadoInvalido, { toValue: -1000, duration: 800, useNativeDriver: true }).start()
                            }, 2500)
                        }

                        if (validPrioridade && cidades.length !== 0) {
                            handleContinue()
                        }
                        else {
                            setTimeout(() => {
                                Animated.spring(animError, { toValue: 0, speed: 0.1, bounciness: 2, useNativeDriver: true }).start()
                            }, 500)

                            setTimeout(() => {
                                Animated.spring(animError, { toValue: -1000, duration: 800, useNativeDriver: true }).start()
                            }, 2500)
                        }
                    }}>
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
    agendamento
}) => {

    const [profile, setProfile] = useState()

    async function profileLoad() {
        const token = await userDecodeToken()

        if (token) {
            setProfile(token)
            console.log(token)
        }
    }

    async function handleConfirm() {
        await api.post(`/Consultas/Cadastrar`, {
            ...agendamento,
            pacienteId: profile.id,
            situacaoId: "3B9BCB82-ED1F-48EA-817C-C0919A1A924F"
        })
            .then(async () => {
                setShowModalAgendar(false)
                navigation.replace('Main')
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        profileLoad()
    }, [])

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
                        <Subtitle margin={"8px 0px 20px"}>{moment(agendamento.dataConsulta).format("DD/MM/YYYY HH:mm")}</Subtitle>

                        <TextQuick>Médico(a) da consulta</TextQuick>
                        <Subtitle margin={"5px 0px 0px"}>{agendamento.medicoLabel}</Subtitle>
                        <Subtitle margin={"3px 0px 20px"}>{agendamento.especialidadeLabel}</Subtitle>

                        <TextQuick>Local da consulta</TextQuick>
                        <Subtitle margin={"5px 0px 20px"}>{agendamento.localizacao}</Subtitle>

                        <TextQuick>Tipo da consulta</TextQuick>
                        <Subtitle margin={"5px 0px 0px"}>{agendamento.prioridadeLabel}</Subtitle>
                    </BoxInfosConsultas>

                    <ButtonModalStyle onPress={() => handleConfirm()}>
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

