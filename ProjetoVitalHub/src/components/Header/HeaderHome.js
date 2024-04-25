import { BoxIcons, FotoPerfilHome, IconeSino } from "../FotoPerfil/style"
import { BoxHeader, CntHeader, ContainerTxtHeader, HeaderContainer, HeaderContent, TextHeader, TextName } from "./style"
import fotoPerfilHome from "../../../assets/fotoPerfilHome.png"
import sino from "../../../assets/iconeSino.png"

import { userDecodeToken } from "../../Utils/Auth"
import { useEffect, useState } from "react"

import { SimpleLineIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Spinner } from "../Spinner"
import api from "../../services/services"

export function HeaderHome({ navigation, setSpinnerHome }) {

    const [user, setUser] = useState()


    useEffect(() => {
        async function profileLoad() {
            const token = await userDecodeToken();

            if (token) {
                // console.log(token);

                setUser(token)

                console.log(token.jti);
            }
        }

        profileLoad()
    }, [])

    console.log(user);

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
                                <IconeSino source={sino} />

                                <TouchableOpacity onPress={() => {
                                    AsyncStorage.removeItem('token');
                                    navigation.replace('Login');
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