import { Animated, Modal } from "react-native"
import { Title, TitleConsulta, TitleName } from "../../components/Title/style"
import { ButtonModalStyle, ButtonSecondary } from "../../components/Button/style"
import { ButtonSecondaryTitle, ButtonTitle } from "../../components/ButtonTitle/style"
import { SelectContent, SelectView } from "./style"

import { Container, ContainerPerfil, Scroll } from "../../components/Container/style"
import { BoxSelect } from "../../components/BoxSelect"
import { useEffect, useState } from "react"
import { ListComponent } from "../../components/List/List"
import api from "../../services/services"
import { Message } from "../../components/Message/Message"

const ListClinic = [
    { id: 1, nome: "Clinic Natureh", estado: "SP", cidade: "SCS" },
    { id: 2, nome: "Clinic Natureh", estado: "SP", cidade: "São Paulo" },
    { id: 3, nome: "Clinic Natureh", estado: "SP", cidade: "São Paulo" },

]

export const SelectClinic = ({
    navigation,
    route
}) => {
    const [selectedClinic, setSelectedClinic] = useState("teste");

    const [clinicas, setClinicas] = useState();
    const [clinica, setClinica] = useState(null)

    const [animError] = useState(new Animated.Value(-1000))

    function handleContinue() {
        navigation.replace('SelectMedicoScreen', {
            agendamento: {
                ...route.params.agendamento,
                ...clinica
            }
        })
    }

    useEffect(() => {
        async function getClinics() {

            const promise = await api.get(`/Clinica/BuscarPorCidade?cidade=${route.params.agendamento.localizacao}`)
            await setClinicas(promise.data);
            console.log(clinicas);
        }

        getClinics()
    }, [])

    return (
        <Container>

            <Message
                title={`Selecione uma clinica`}
                text={`Selecione uma clinica para continuar`}
                type={`error`}
                translate={animError}
            />


            <SelectContent>
                <TitleConsulta>Selecionar clínica</TitleConsulta>


                <ListComponent
                    data={clinicas}
                    keyExtractor={(item) => item.id}

                    renderItem={({ item }) =>
                        <SelectView>
                            <BoxSelect
                                clinica={item}
                                ListClinic={item}
                                situacao={item.situacao}
                                clickButton={item.id === selectedClinic}
                                onPress={() => {
                                    setSelectedClinic(item.id)
                                    setClinica({
                                        clinicaId: item.id,
                                        clinicaLabel: item.nomeFantasia
                                    })
                                }}
                            />
                        </SelectView>
                    }
                    showsVerticalScrollIndicator={true}
                />



                <ButtonModalStyle onPress={() => {
                    if (clinica === null) {
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

                <ButtonSecondary onPress={() => navigation.replace("Main")}>
                    <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                </ButtonSecondary>

            </SelectContent>
        </Container>
    )
}