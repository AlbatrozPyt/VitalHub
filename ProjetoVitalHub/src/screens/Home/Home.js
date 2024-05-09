import { useEffect, useState } from "react"

import { BtnListAppointment } from "../../components/BtnListAppointment/BtnListAppointment"
import { Calendarhome } from "../../components/CalendarHome/CalendarHome"
import { Container } from "../../components/Container/style"
import { HeaderHome } from "../../components/Header/HeaderHome"
import { FilterAppointment, IconLogin } from "./style"
import { CardConsulta } from "../../components/CardConsulta/CardConsulta"
import { ListComponent } from "../../components/List/List"
import { CancellationModal } from "../../components/CancellationModal/CancellationModal"
import { AppointmentModal, ModalConsultas, ModalPerfilMed } from "../../components/AppointmentModal/AppointmentModal"
import { ButtonAppointment } from "../../components/ButtonAppointment"
import { handleCallNotifications } from "../../components/Notification/Notification"
import { Spinner } from "../../components/Spinner"

// Import da API
import api from "../../services/services"
import { userDecodeToken } from "../../Utils/Auth"
import { Modal, StyleSheet } from "react-native"
import { ViewNotification } from "../../components/ViewNotification/ViewNotification"

export const Home = ({
    navigation
}) => {

    const [user, setUser] = useState();

    // async function loadProfile() {
    //     const token = await userDecodeToken();

    //     if (token !== null) {
    //         setUser(token);
    //     }
    // }

    // State para o estado da lista(cards)
    const [statusLista, setStatusList] = useState("pendente");

    // state para exibição dos modais
    const [showModalCancel, setShowModalCancel] = useState(false)
    const [showModalAppointment, setShowModalAppointment] = useState(false)
    const [showModalConsultas, setShowModalConsultas] = useState(false)
    const [showModalPerfilMed, setShowModalPerfilMed] = useState(false)


    const [consultaLista, setConsultaLista] = useState([])

    const [dataConsulta, setDataConsulta] = useState('')

    const [nameUser, setNameUser] = useState()

    const [profile, setProfile] = useState()

    const [consultaSelecionada, setConsultaSelecionada] = useState(null)

    const [idUser, setIdUser] = useState('')

    const [spinner, setSpinner] = useState(false);

    const [viewNotification, setViewNotification] = useState(false)

    const [reload, setReload] = useState(false)

    useEffect(() => {

        const url = (profile == 'Medico' ? "Medicos" : "Pacientes")

        async function getConsultas() {
            try {
                const token = await userDecodeToken();

                if (token) {
                    setIdUser(token.id);

                    setNameUser(token.name)
                    setProfile(token.role)
                }
                if (dataConsulta) {
                    const promise = await api.get(`/${url}/BuscarPorData?data=${dataConsulta}&id=${idUser}`);
                    setConsultaLista(promise.data);
                }
            } catch (error) {
                console.error('Erro ao buscar consultas: ', error.message);
            }
        }

        getConsultas();
        AtualizarStatus();
    }, [dataConsulta, showModalCancel, profile, user, reload]);

    function AtualizarStatus() {
        const currentDate = new Date();

        consultaLista.forEach((item) => {

            const dataComoObjeto = new Date(item.dataConsulta);
            const dataComoInteiro = dataComoObjeto.getTime();
            if (dataComoInteiro < currentDate.getTime()) {
                async () => {
                    await api.put(`/Consultas/Status?idConsulta=${item.id}&status=realizado`)
                    setReload(true)
                }
            }

            console.log(item.id);
        });

    }

    function MostrarModal(modal, consulta) {

        setConsultaSelecionada(consulta)


        if (modal == 'prontuario') {
            setShowModalAppointment(true)
        } else if (modal == 'prescricao') {
            setShowModalPerfilMed(true)
        } else if (modal == 'cancelar') {
            setShowModalCancel(true)
        } else {
            console.log("Há um erro.");
        }
    }


    return (
        <Container>
            {/* Spinner de carregamento */}
            {
                spinner ? (
                    <Spinner
                        setFalse={setSpinner}
                        navigation={navigation}
                        screen={'Login'}
                    />
                ) : null
            }

            <ViewNotification
                visible={viewNotification}
                setVisible={setViewNotification}
            />


            {profile == 'Paciente' ? <ButtonAppointment onPressConsulta={() => setShowModalConsultas(true)} /> : null}


            <HeaderHome
                navigation={navigation}
                setSpinnerHome={setSpinner}
                setViewNotifcation={setViewNotification}
            />


            {/* Calendario */}
            <Calendarhome
                setDataConsulta={setDataConsulta}
            />

            {/* Filtros (botoes) */}
            <FilterAppointment>
                {/* botão para agendadas */}
                <BtnListAppointment
                    textButton={"Agendadas"}
                    clickButton={statusLista === "pendente"}
                    onPress={() => setStatusList("pendente")}
                />

                {/* botão para realizadas */}
                <BtnListAppointment
                    textButton={"Realizadas"}
                    clickButton={statusLista === "realizado"}
                    onPress={() => setStatusList("realizado")}
                />

                {/* botão para canceladas */}
                <BtnListAppointment
                    textButton={"Canceladas"}
                    clickButton={statusLista === "cancelado"}
                    onPress={() => setStatusList("cancelado")}
                />
            </FilterAppointment>

            {/* Cards */}
            {/* <CardConsulta/> */}


            <ListComponent
                data={consultaLista}
                keyExtractor={(item) => item.id}

                renderItem={({ item }) =>
                    statusLista == item.situacao.situacao && (
                        <CardConsulta
                            nameUser={nameUser}
                            data={item}
                            situacao={item.situacao.situacao}

                            onPressAppointment={() => MostrarModal('prontuario', item)}
                            onPressPerfilMed={() => MostrarModal('prescricao', item)}
                            onPressCancel={() => MostrarModal('cancelar', item)}


                            navigation={navigation}

                            roleUsuario={profile}
                            dataConsulta={item.dataConsulta}
                            prioridade={item.prioridade.prioridade}
                            usuarioConsulta={profile == "Medico" ? item.paciente : item.medicoClinica.medico}
                        />
                    )

                }
                showsVerticalScrollIndicator={false}
            />
            {/* modal cancelar */}
            <CancellationModal
                visible={showModalCancel}
                consulta={consultaSelecionada}

                setShowModalCancel={setShowModalCancel}
                ClosedModal={() => {
                    handleCallNotifications()
                    setShowModalCancel(false)
                }}
            />

            {/* modal ver protuário */}
            <AppointmentModal
                consulta={consultaSelecionada}
                roleUsuario={profile}

                visible={showModalAppointment}
                setShowModalAppointment={setShowModalAppointment}
                navigation={navigation}
            />

            <ModalConsultas
                visible={showModalConsultas}
                setShowModalConsultas={setShowModalConsultas}
                navigation={navigation}
            />

            <ModalPerfilMed
                consultaMed={consultaSelecionada}
                roleUsuario={profile}

                visible={showModalPerfilMed}
                setShowModalPerfilMed={setShowModalPerfilMed}
                navigation={navigation}
            />


        </Container>
    )
}

