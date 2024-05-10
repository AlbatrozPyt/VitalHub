import { FlatList, Modal, Text, Touchable, TouchableOpacity } from "react-native"
import { BoxDegrade, BoxNotifications, ButtonClose, ContainerIconText, ContainerNotification, IconSituacao, NotificationText } from "./style"
import { Title } from "../Title/style"

import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { ScrollView } from "react-native";

export const ViewNotification = ({ visible, setVisible, notifications = null }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <BoxDegrade>
                <ButtonClose
                    onPress={() => {
                        setVisible(false)
                    }}
                >
                    <Feather name="x-circle" size={30} color="white" />
                </ButtonClose>


                {
                    notifications.length === 0
                        ? <Title style={{ color: 'white', marginTop: `55%` }}> Sem Nenhuma notificação</Title>
                        : notifications.map(noti => (
                            <ContainerNotification>
                                <NotificationText>
                                    {new Date(noti.dataConsulta).toLocaleDateString()}
                                </NotificationText>

                                <ContainerIconText>
                                    <IconSituacao>
                                        {
                                            noti.situacao.situacao === `pendente`
                                                ? <Feather name="alert-circle" size={24} color="#feef77" />
                                                : noti.situacao.situacao === `cancelado`
                                                    ? <Feather name="trash" size={24} color="#f44f77" />
                                                    : <Feather name="done" size={24} color="#44ef77" />
                                        }
                                    </IconSituacao>

                                    <NotificationText>
                                        Consulta: {noti.situacao.situacao}
                                    </NotificationText>
                                </ContainerIconText>
                            </ContainerNotification>
                        ))
                }
            </BoxDegrade>
        </Modal>
    )
}