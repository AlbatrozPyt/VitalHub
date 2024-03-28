import { useState } from "react"
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

    const [spinner, setSpinner] = useState(false);

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
            <Calendarhome />

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
                data={Consultas}
                keyExtractor={(item) => item.id}

                renderItem={({ item }) =>
                    statusLista == item.situacao && (
                        <CardConsulta
                            data={item}
                            situacao={item.situacao}
                            onPressCancel={() => setShowModalCancel(true)}
                            onPressAppointment={() => setShowModalAppointment(true)}
                            onPressPerfilMed={() => setShowModalPerfilMed(true)}
                            navigation={navigation}
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
                visible={showModalPerfilMed}
                setShowModalPerfilMed={setShowModalPerfilMed}
                navigation={navigation}
            />


        </Container>
    )
}