import { useEffect, useState } from "react"
import { BoxSelectMedico } from "../../components/BoxSelectMedico"
import { ButtonModalStyle, ButtonSecondary } from "../../components/Button/style"
import { ButtonSecondaryTitle, ButtonTitle } from "../../components/ButtonTitle/style"
import { Container, ContainerBox, Scroll } from "../../components/Container/style"
import { TitleConsulta } from "../../components/Title/style"
import { SelectView } from "../SelectClinic/style"
import { ContentSelect } from "./style"
import { ListComponent } from "../../components/List/List"
import api from "../../services/services"
import { Animated } from "react-native"
import { Message } from "../../components/Message/Message"

const ListMedicos = [
    { id: 1, nome: "Pedro Felix", area: "Demartologa", especializacao: "Estitca" },
    { id: 2, nome: "Enzo Gentileza", area: "Cirurgião", especializacao: "Cardilogista" },
    { id: 3, nome: "Gois Garbelini", area: "Clínico", especializacao: "Pediatra" },

]

export const SelectMedicoScreen = ({ navigation, route }) => {

    const [selectMedico, setSelectMedico] = useState("")
    const [medicos, setMedicos] = useState([]);
    const [medico, setMedico] = useState(null)

    const [animError] = useState(new Animated.Value(-1000))

    function handleContinue() {
        navigation.navigate('SelectDate', {
            agendamento: {
                ...route.params.agendamento,
                ...medico
            }
        })
    }


    useEffect(() => {
        async function getMedicos() {
            const promise = await api.get(`/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.clinicaId}`);
            setMedicos(promise.data);
        }

        getMedicos();
    }, []);


    return (
        <Container>
            <Message
                title={`Selecione um médico`}
                text={`Selecione uma médico para continuar`}
                type={`error`}
                translate={animError}
            />

            <ContentSelect>
                <TitleConsulta>Selecionar médico</TitleConsulta>

                <ListComponent
                    data={medicos}
                    keyExtractor={(item) => item.id}

                    renderItem={({ item }) =>
                        <SelectView>
                            <BoxSelectMedico
                                route={route}
                                medicos={item}
                                ListMedicos={item}
                                situacao={item.situacao}
                                clickButton={item.id === selectMedico}
                                onPress={() => {
                                    setSelectMedico(item.id)
                                    setMedico({
                                        medicoClinicaId: item.id,
                                        especialidadeId: item.especialidade.id,
                                        especialidadeLabel: item.especialidade.especialidade1,
                                        medicoLabel: item.idNavigation.nome
                                    })
                                }}
                            />
                        </SelectView>
                    }
                    showsVerticalScrollIndicator={false}
                />
            </ContentSelect>


            <ButtonModalStyle onPress={() => {
                if (medico === null) {

                    setTimeout(() => {
                        Animated.spring(animError, { toValue: 0, speed: 0.1, bounciness: 2, useNativeDriver: true }).start()
                    }, 500)

                    setTimeout(() => {
                        Animated.spring(animError, { toValue: -1000, duration: 800, useNativeDriver: true }).start()
                    }, 2500)

                }
                else {
                    handleContinue()
                }
            }}>
                <ButtonTitle>Continuar</ButtonTitle>
            </ButtonModalStyle>

            <ButtonSecondary onPress={() => navigation.navigate("Main")}>
                <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
            </ButtonSecondary>
        </Container>
    )
}