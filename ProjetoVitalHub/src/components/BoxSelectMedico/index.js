import { ImageUser } from "../FotoPerfil/style"
import { Subtitle } from "../Text/style"
import { TitleName } from "../Title/style"
import { BoxInfosMedicos, BoxSelectMedicoStyle } from "./style"



export const BoxSelectMedico = ({
    medicos,
    ListMedicos,
    clickButton,
    onPress
}) => {
    console.log(`List Medicoss`);
    console.log(ListMedicos);

    return(
        
        <BoxSelectMedicoStyle clickButton={clickButton} onPress={onPress}>
            <>
            <ImageUser source={{
                    uri: "https://github.com/guihenrique16.png",
                }}/>
            <BoxInfosMedicos>
            <TitleName>{medicos.idNavigation.nome}</TitleName>

            <Subtitle>Nome da clinica, {medicos.especialidade.especialidade1}</Subtitle>
            </BoxInfosMedicos>
            </>
        </BoxSelectMedicoStyle>
    )
}