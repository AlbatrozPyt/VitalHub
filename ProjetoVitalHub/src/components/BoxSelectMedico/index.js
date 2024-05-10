import { useEffect, useState } from "react"
import api from "../../services/services"
import { ImageUser } from "../FotoPerfil/style"
import { Subtitle } from "../Text/style"
import { TitleName } from "../Title/style"
import { BoxInfosMedicos, BoxSelectMedicoStyle } from "./style"



export const BoxSelectMedico = ({
    medicos,
    ListMedicos,
    clickButton,
    onPress,
    route
}) => {

    console.log(medicos)
    return(
        
        <BoxSelectMedicoStyle clickButton={clickButton} onPress={onPress}>
            <>
            <ImageUser source={{
                    uri: medicos.idNavigation.foto,
                }}/>
            <BoxInfosMedicos>
            <TitleName>{medicos.idNavigation.nome}</TitleName>

            <Subtitle>{route.params.agendamento.clinicaLabel},  {medicos.especialidade.especialidade1}</Subtitle>
            </BoxInfosMedicos>
            </>
        </BoxSelectMedicoStyle>
    )
}