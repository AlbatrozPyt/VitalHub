import { Text } from "react-native"
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
import { useState } from "react"
import { ModalAgendarConsulta } from "../../components/AppointmentModal/AppointmentModal"

export const SelectDate = ({
    navigation
}) => {
    const [showModalAgendar, setShowModalAgendar] = useState(false)

    return (
        <Container>
            <Scroll>
                <ContentSelect>
                    <TitleConsulta marginTop={"35px"}>Selecione data</TitleConsulta>

                    <CalendarMaximized />

                    <LabelDate>Selecione um horário disponível</LabelDate>
                   <InputSelect/>

                    <ButtonModalConfirmar
                        textValue={"Confirmar"}
                        onPressConfirmar={() => setShowModalAgendar(true)}
                    />

                    <ButtonSecondary onPress={() => navigation.replace("Main")}>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>

                    <ModalAgendarConsulta
                        visible={showModalAgendar}
                        setShowModalAgendar={setShowModalAgendar}
                        navigation={navigation}
                    />
                </ContentSelect>
            </Scroll>
        </Container>
    )
}