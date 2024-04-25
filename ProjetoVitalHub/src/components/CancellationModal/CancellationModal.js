import { Modal } from "react-native"
import { Title } from "../Title/style"
import { LinkUtil } from "../Text/style"
import { ModalContent, ModalText, PatientModal } from "./style"
import { ButtonModal, ButtonSecondary } from "../Button/style"
import { ButtonSecondaryTitle, ButtonTitle } from "../ButtonTitle/style"
import { handleCallNotifications } from "../Notification/Notification"
import api from "../../services/services"



export const CancellationModal = ({
    visible,
    setShowModalCancel,
    consulta,
    ClosedModal,
    ...rest
}) => {

    async function CancelarConsulta() {
        await api.put(`/Consultas/Status?idConsulta=${consulta.id}&status=cancelado`)

        ClosedModal()
    }

    // console.log(consulta.id);

    return(
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">
            {/* Container */}
            <PatientModal>
                {/* Content */}
                <ModalContent>
                    {/* Title */}
                    <Title>Cancelar consulta</Title>

                    <ModalText>
                    Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?
                    </ModalText>

                    <ButtonModal onPress={() => CancelarConsulta()}>
                        <ButtonTitle>Confirmar</ButtonTitle>
                    </ButtonModal>

                    <ButtonSecondary onPress={() => setShowModalCancel(false) }>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>
                </ModalContent>
            </PatientModal>
        </Modal>
    )
}