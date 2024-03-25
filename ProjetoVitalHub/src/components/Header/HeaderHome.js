import { FotoPerfilHome, IconeSino } from "../FotoPerfil/style"
import { BoxHeader, CntHeader, ContainerTxtHeader, HeaderContainer, HeaderContent, TextHeader, TextName } from "./style"
import fotoPerfilHome from "../../../assets/fotoPerfilHome.png"
import sino from "../../../assets/iconeSino.png"

import { userDecodeToken } from "../../Utils/Auth"
import { useEffect, useState } from "react"

export function HeaderHome() {

    const [nameUser, setNameUser]= useState()

    async function profileLoad(){
        const token = await userDecodeToken();

        if (token) {
            console.log(token);

            setNameUser(token.name)
        }
    }

    useEffect(() => {
        profileLoad()
    },[])

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
                    <IconeSino source={sino} />
                </HeaderContent>
            {/* </HeaderContainer>  */}
        </CntHeader>
        
    )
}