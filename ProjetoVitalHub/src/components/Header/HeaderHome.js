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

export function HeaderHome({ navigation, setSpinnerHome }) {

    const [nameUser, setNameUser] = useState()
    const [loadButton, setLoadButton] = useState(false);

    async function profileLoad() {
        const token = await userDecodeToken();

        if (token) {
            setNameUser(token.name)
        }
    }

    useEffect(() => {
        profileLoad()
    }, [])

    return (
        <CntHeader>

            {/* <HeaderContainer> */}
            <HeaderContent>
                <BoxHeader>
                    <FotoPerfilHome source={fotoPerfilHome} />

                    <ContainerTxtHeader>
                        <TextHeader>Bem vindo</TextHeader>
                        <TextName>{nameUser}</TextName>
                    </ContainerTxtHeader>
                </BoxHeader>

                <BoxIcons>
                    <IconeSino source={sino} />

                    <TouchableOpacity
                        disabled={loadButton}
                        onPress={() => {
                            AsyncStorage.removeItem('token');
                            setSpinnerHome(true)
                        }}
                    >
                        <SimpleLineIcons name="logout" size={20} color="white" />
                    </TouchableOpacity>
                </BoxIcons>
            </HeaderContent>
            {/* </HeaderContainer>  */}
        </CntHeader>

    )
}