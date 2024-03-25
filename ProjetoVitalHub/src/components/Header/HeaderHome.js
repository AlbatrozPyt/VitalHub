import { FotoPerfilHome, IconeSino } from "../FotoPerfil/style"
import { BoxHeader, CntHeader, ContainerTxtHeader, HeaderContainer, HeaderContent, TextHeader, TextName } from "./style"
import fotoPerfilHome from "../../../assets/fotoPerfilHome.png"
import sino from "../../../assets/iconeSino.png"

import { userDecodeToken } from "../../Utils/Auth"
import { useEffect } from "react"

export function HeaderHome() {

    async function profileLoad(){
        const token = await userDecodeToken();

        if (token) {
            console.log(token);
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
                            <TextName>Dr. Cludio</TextName>
                        </ContainerTxtHeader>
                    </BoxHeader>
                    <IconeSino source={sino} />
                </HeaderContent>
            {/* </HeaderContainer>  */}
        </CntHeader>
        
    )
}