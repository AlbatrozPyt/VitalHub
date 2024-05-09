import { FlatList, Modal, Text, Touchable, TouchableOpacity } from "react-native"
import { BoxNotifications } from "./style"
import { Title } from "../Title/style"

import { MaterialIcons } from '@expo/vector-icons';

export const ViewNotification = ({ visible, setVisible }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <BoxNotifications>
                <TouchableOpacity
                    style={{ position: `absolute`, top: 0, right: 0, margin: 30 }}
                    onPress={() => {
                        setVisible(false)
                    }}
                >
                    <MaterialIcons name="close" size={24} color="#fff" />
                </TouchableOpacity>

                <Title style={{ color: 'white' }}> Sem Nenhuma notificação</Title>
            </BoxNotifications>
        </Modal>
    )
}