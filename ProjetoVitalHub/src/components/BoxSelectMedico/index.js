import { ImageUser } from "../FotoPerfil/style"
import { Subtitle } from "../Text/style"
import { TitleName } from "../Title/style"
import { BoxInfosMedicos, BoxSelectMedicoStyle } from "./style"



export const BoxSelectMedico = ({
    ListMedicos = [],
    clickButton,
    onPress
}) => {
    return(
        
        <BoxSelectMedicoStyle clickButton={clickButton} onPress={onPress}>
            <>
            <ImageUser source={{
                    uri: "https://github.com/guihenrique16.png",
                }}/>
            <BoxInfosMedicos>
            <TitleName>{ListMedicos.nome}</TitleName>

            <Subtitle>{ListMedicos.area}, {ListMedicos.especializacao}</Subtitle>
            </BoxInfosMedicos>
            </>
        </BoxSelectMedicoStyle>
    )
}