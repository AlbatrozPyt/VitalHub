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

    const [nameUser, setNameUser] = useState()
    const [perfil, setPerfil] = useState()
    const [loadButton, setLoadButton] = useState(false);


    // BUSCAR O USUARIO
    async function getPerfil(token) {
        const rota = (token.role === 'Paciente' ? `Pacientes` : `Medicos`);

        const promise = await api.get(`/${rota}/BuscarPorId?id=${token.id}`)
        const response = promise.data
        setPerfil(response);
    }

    async function profileLoad() {
        const token = await userDecodeToken();

        if (token) {
            getPerfil(token)
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
                    <FotoPerfilHome source={{uri: perfil.idNavigation.foto}} />

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