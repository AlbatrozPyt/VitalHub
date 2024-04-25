import { BoxIcons, FotoPerfilHome, IconeSino } from "../FotoPerfil/style"
import { BoxHeader, CntHeader, ContainerTxtHeader, HeaderContainer, HeaderContent, TextHeader, TextName } from "./style"
import fotoPerfilHome from "../../../assets/fotoPerfilHome.png"
import sino from "../../../assets/iconeSino.png"

import { userDecodeToken } from "../../Utils/Auth"
import { useEffect, useState } from "react"

import { SimpleLineIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
<<<<<<< HEAD
import { Spinner } from "../Spinner"
=======
import api from "../../services/services"
>>>>>>> c326ea71aa18bec168ac805690097f57f9dd75a3

export function HeaderHome({ navigation, setSpinnerHome }) {

<<<<<<< HEAD
    const [nameUser, setNameUser] = useState()
    const [loadButton, setLoadButton] = useState(false);
=======
    const [user, setUser] = useState()
>>>>>>> c326ea71aa18bec168ac805690097f57f9dd75a3


<<<<<<< HEAD
        if (token) {
            setNameUser(token.name)
        }
    }
=======

    // const [fotoPerfil, setFotoPerfil] = useState()
    // async function buscarFoto() {
    //     const foto = await api.get(`/Usuario/BuscarPorId?id=${user.id}`)

    //     setFotoPerfil(foto.data.foto)
    // }
>>>>>>> c326ea71aa18bec168ac805690097f57f9dd75a3

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

<<<<<<< HEAD
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
=======
                        </HeaderContent>
                        {/* </HeaderContainer>  */}
                    </>
                )
            }

>>>>>>> c326ea71aa18bec168ac805690097f57f9dd75a3
        </CntHeader>

    )
}