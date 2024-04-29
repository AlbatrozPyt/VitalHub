import { IconeAppointment } from "../../screens/Home/style"
import { ButtonAppointmentStyled } from "./style"
import iconeConsulta from "../../../assets/iconConsultas.png"


export const ButtonAppointment = ({
    onPressConsulta,
}) => {
    return(
        <ButtonAppointmentStyled onPress={onPressConsulta}>
            <IconeAppointment source={iconeConsulta} />
        </ButtonAppointmentStyled>
    )
}