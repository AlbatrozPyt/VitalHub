import { Animated, Text } from "react-native"
import { ButtonModalStyle, ButtonSecondary } from "../../components/Button/style"
import { ButtonSecondaryTitle, ButtonTitle } from "../../components/ButtonTitle/style"
import CalendarMaximized from "../../components/CalendarMaximized/CalendarMaximized"
import { Container, Scroll } from "../../components/Container/style"
import { TextStyle1 } from "../../components/Text/style"
import { TitleConsulta } from "../../components/Title/style"
import { ContentSelect } from "../SelectMedicoScreen/style"
import InputSelect from "../../components/InputSelect"
import { InputLabel } from "../../components/Label/style"
import { LabelDate } from "./style"
import { ButtonModalConfirmar } from "../../components/Button"
import { useEffect, useState } from "react"
import { ModalAgendarConsulta } from "../../components/AppointmentModal/AppointmentModal"
import { Message } from "../../components/Message/Message"

export const SelectDate = ({
    navigation,
    route
}) => {
    const [showModalAgendar, setShowModalAgendar] = useState(false)
    const [agendamento, setAgendamento] = useState('')
    const [data, setData] = useState('')
    const [hora, setHora] = useState('')

    const [animError] = useState(new Animated.Value(-1000))

    function handleContinue() {
        setAgendamento({
            ...route.params.agendamento,
            dataConsulta: `${data} ${hora}`
        })

        setShowModalAgendar(true)
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <Container>
            <Message
                title={`Data e Hora`}
                text={`Escolha uma data e uma hora !!!`}
                type={`error`}
                translate={animError}
            />

            <Scroll>
                <ContentSelect>
                    <TitleConsulta marginTop={"35px"}>Selecione data</TitleConsulta>

                    <CalendarMaximized
                        setData={setData}
                        data={data}
                    />

                    <LabelDate>Selecione um horário disponível</LabelDate>

                    <InputSelect
                        setHora={setHora}
                    />

                    <ButtonModalConfirmar
                        textValue={"Confirmar"}
                        onPressConfirmar={() => {
                            if (data === '' || hora === '') {

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
                        }}
                    />

                    <ButtonSecondary onPress={() => navigation.navigate("Main")}>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>

                    <ModalAgendarConsulta
                        visible={showModalAgendar}
                        setShowModalAgendar={setShowModalAgendar}
                        navigation={navigation}
                        agendamento={agendamento}
                    />
                </ContentSelect>
            </Scroll>
        </Container>
    )
}