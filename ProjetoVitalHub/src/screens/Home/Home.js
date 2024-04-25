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

const Consultas = [
    { id: 1, nome: "Pedro Felix Gentileza", idade: "20", typeExame: "Rotina", horario: "16h", situacao: "pendente" },
    { id: 2, nome: "Enzo Gentileza", idade: "17", typeExame: "Rotina", horario: "17h", situacao: "realizado" },
    { id: 3, nome: "Gois Garbelini", idade: "17", typeExame: "Exame", horario: "18h", situacao: "cancelado" },
    { id: 4, nome: "Murilo Fois", idade: "18", typeExame: "Urgência", horario: "19h", situacao: "realizado" },
    { id: 5, nome: "Daniel Viera", idade: "16", typeExame: "Rotina", horario: "20h", situacao: "cancelado" },
    { id: 6, nome: "Pedro King's", idade: "16", typeExame: "Urgência", horario: "22h", situacao: "pendente" },

]

export const Home = ({
    navigation
}) => {

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



    useEffect(() => {

        const url = (profile == 'Medico' ? "Medicos" : "Pacientes")

        async function getConsultas() {
            const promise = await api.get(`/${url}/BuscarPorData?data=${dataConsulta}&id=${idUser}`);
            setConsultaLista(promise.data);
            // console.log(promise.data);
        }

        async function profileLoad() {
            const token = await userDecodeToken();

            if (token) {
                setIdUser(token.id);

                setNameUser(token.name)
                setProfile(token.role)
                // console.log(profile);
            }
        }

        profileLoad()
        getConsultas();
<<<<<<< HEAD
    }, []);
    
    const [spinner, setSpinner] = useState(false);
=======
    }, [dataConsulta]);


    function MostrarModal(modal, consulta) {

        setConsultaSelecionada(consulta)


        if (modal == 'prontuario') {
            setShowModalAppointment(true)
        } else if (modal == 'prescricao') {
            setShowModalPerfilMed(true)
        } else {
            setShowModalCancel(true)
        }
    }

>>>>>>> b0c023c0d0514a6f345d32c4c4ea3b6639a03974

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


            {/* MUDAR O BACKGROUND COLOR
             */}
            <ButtonAppointment
                onPressConsulta={() => setShowModalConsultas(true)}
            />

            <HeaderHome
                navigation={navigation}
                setSpinnerHome={setSpinner}
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
                            // onPressAppointment={() => setShowModalAppointment(true)}
                            //onPressPerfilMed={() => setShowModalPerfilMed(true)}
                            
                            onPressAppointment={() => MostrarModal('prontuario', item)}
                            onPressPerfilMed={() => MostrarModal('prescricao', item)}
                            onPressCancel={() => setShowModalCancel(true)}


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
                dados={Consultas}
                navigation={navigation}
            />

            <ModalConsultas
                visible={showModalConsultas}
                setShowModalConsultas={setShowModalConsultas}
                navigation={navigation}
            />

            <ModalPerfilMed
                consulta={consultaSelecionada}
                roleUsuario={profile}

                visible={showModalPerfilMed}
                setShowModalPerfilMed={setShowModalPerfilMed}
                navigation={navigation}
            />


        </Container>
    )
}