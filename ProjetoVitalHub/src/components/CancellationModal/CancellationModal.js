import { Modal } from "react-native"
import { Title } from "../Title/style"
import { LinkUtil } from "../Text/style"
import { ModalContent, ModalText, PatientModal } from "./style"
import { ButtonModal, ButtonSecondary } from "../Button/style"
import { ButtonSecondaryTitle, ButtonTitle } from "../ButtonTitle/style"
import { handleCallNotifications } from "../Notification/Notification"



export const CancellationModal = ({
    visible,
    setShowModalCancel,
    ClosedModal,
    ...rest
}) => {

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

                    <ButtonModal onPress={() => ClosedModal()}>
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