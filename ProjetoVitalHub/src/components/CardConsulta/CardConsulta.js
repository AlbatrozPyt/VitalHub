import { ImageUser } from "../FotoPerfil/style";
import { AgeAndTypeBox, BoxInfos, ButtonCard, ButtonText, CardConsultaStyle, ClockCard, ContentCard, ViewRow } from "./style";

import ImageUser1 from "../../../assets/ImageUser1.png"
import { TitleName } from "../Title/style";
import { TextAge, TypeBold } from "../Text/style";

import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";

export const CardConsulta = ({
    data = [],
    situacao = 'pendente',
    onPressCancel,
    onPressAppointment,
    onPressPerfilMed,
    navigation
}) => {
    const [profile, setProfile] = useState("paciente")

    return (
        // Container principal
        <CardConsultaStyle onPress={onPressPerfilMed}>
            {/* Imagem do paciente */}
            <ImageUser source={ImageUser1} />

            <ContentCard>
                {/* Conteúdo do card */}
                <BoxInfos>
                    <TitleName>{data.nome}</TitleName>

                    <AgeAndTypeBox>
                        <TextAge>{data.idade} anos</TextAge>
                        <TypeBold>{data.typeExame}</TypeBold>
                    </AgeAndTypeBox>
                </BoxInfos>

                <ViewRow>
                    {/* Icone e Horário */}

                    <ClockCard situacao={situacao}>
                        <AntDesign name="clockcircle" size={14} color={situacao == "pendente" ? "#49b3ba" : "#8c8a97"} />
                        <TypeBold situacao={situacao}>{data.horario}</TypeBold>
                    </ClockCard>

                    {/* Botão Cancelar ou ver prontuário */}

                    { 
                        situacao == "cancelado" ? (
                            <>
                            </>
                        ) : situacao == "pendente" ? (
                            <ButtonCard onPress={onPressCancel}>
                                <ButtonText situacao={situacao}>Cancelar</ButtonText>
                            </ButtonCard>
                        ) : (
                            <ButtonCard onPress={ profile !== "paciente" ? onPressAppointment : () => navigation.replace("Prescricao")}>
                                <ButtonText situacao={situacao}>Ver prontuário</ButtonText>
                            </ButtonCard>
                        )
                    }

                </ViewRow>
            </ContentCard>
        </CardConsultaStyle>
    );
};
