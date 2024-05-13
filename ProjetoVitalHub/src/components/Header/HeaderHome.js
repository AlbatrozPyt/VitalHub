import { BoxIcons, FotoPerfilHome, IconeSino } from "../FotoPerfil/style"
import { BoxHeader, CntHeader, ContainerTxtHeader, HeaderContent, TextHeader, TextName } from "./style"
import sino from "../../../assets/iconeSino.png"

import { userDecodeToken } from "../../Utils/Auth"
import { useEffect, useState } from "react"

import { SimpleLineIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

export function HeaderHome({ navigation, route, setSpinnerHome, setViewNotifcation }) {

    const [user, setUser] = useState()

    useEffect(() => {
        async function profileLoad() {
            const token = await userDecodeToken();

            if (token) {
                setUser(token)
            }
        }

        profileLoad()
    }, [user])

    return (
        <CntHeader>
            {
                user != null && (
                    <>
                        {/* <HeaderContainer> */}
                        <HeaderContent>
                            <BoxHeader>
                                <FotoPerfilHome source={{ uri: user.foto }} />

                                <ContainerTxtHeader>
                                    <TextHeader>Bem vindo</TextHeader>
                                    <TextName>{user.role == "Medico" ? "Dr" : null} {user.name}</TextName>
                                </ContainerTxtHeader>
                            </BoxHeader>

                            <BoxIcons>
                                <TouchableOpacity onPress={() => setViewNotifcation(true)}>
                                    <IconeSino source={sino} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    AsyncStorage.removeItem('token');
                                    navigation.replace(`Login`)
                                }}>
                                    <SimpleLineIcons name="logout" size={20} color="white" />
                                </TouchableOpacity>
                            </BoxIcons>


                        </HeaderContent>
                    </>
                )
            }
        </CntHeader>

    )
}