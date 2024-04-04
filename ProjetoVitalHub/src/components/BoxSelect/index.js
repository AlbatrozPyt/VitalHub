import { BoxDay, BoxInformacoes, BoxSelectStyle } from "../../screens/SelectClinic/style"
import { TextStyle1 } from "../Text/style"
import { TitleName } from "../Title/style"
import { FontAwesome5 } from '@expo/vector-icons';
import aval from "../../../assets/avaliacao.png"
import { Avaliacao } from "../BoxSelectMedico/style";



export const BoxSelect = ({
    isSelected,
    onSelect,
    clickButton = false,
    fieldBckColor,
    onPress,
    clinica
}) => {
    return (
        <BoxSelectStyle clickButton={clickButton} onPress={onPress}>
            <>
                <BoxInformacoes>
                <TitleName>{clinica.nomeFantasia}</TitleName>
                <Avaliacao source={aval}/>
            </BoxInformacoes>

                <BoxInformacoes>
                    <TextStyle1>São Paulo, SP</TextStyle1>
                    <BoxDay>
                        <FontAwesome5 name="calendar-day" size={14} color="#49B3BA" />
                        <TextStyle1 fieldColor="#49B3BA">Seg-Sex</TextStyle1>
                    </BoxDay>
                </BoxInformacoes>
            </>
        </BoxSelectStyle>
    )
}