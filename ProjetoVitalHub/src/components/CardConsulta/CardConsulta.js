import { ImageUser } from "../FotoPerfil/style";
import { AgeAndTypeBox, BoxInfos, ButtonCard, ButtonText, CardConsultaStyle, ClockCard, ContentCard, ViewRow } from "./style";

import ImageUser1 from "../../../assets/ImageUser1.png"
import { TitleName } from "../Title/style";
import { TextAge, TypeBold } from "../Text/style";

import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import api from "../../services/services";

export const CardConsulta = ({
    data,
    nameUser,
    situacao,
    onPressCancel,
    onPressAppointment,
    onPressPerfilMed,
    navigation,

    roleUsuario,
    prioridade,
    usuarioConsulta,
    atualizarStatus

}) => {
    const [profile, setProfile] = useState("paciente")

    const [nome, setNome] = useState(usuarioConsulta.idNavigation.nome);



    function handlePress(rota) {
        navigation.navigate(rota, { consultaId: data.id })
    }
    

    return (
        // Container principal

        <CardConsultaStyle onPress={roleUsuario == 'Paciente' ? onPressPerfilMed : onPressAppointment}>
            {/* Imagem do paciente */}
            {roleUsuario == 'Paciente' ? <ImageUser source={{ uri: data.medicoClinica.medico.idNavigation.foto }} />
                : <ImageUser source={{ uri: data.paciente.idNavigation.foto }} />}
            {/* <ImageUser source={{ uri: data.medicoClinica.medico.idNavigation.foto }} /> */}

            <ContentCard>
                {/* Conteúdo do card */}
                <BoxInfos>
                    <TitleName>{nome.length > 10 ? nome.substring(15, -1) + "..." : nome}</TitleName>

                    <AgeAndTypeBox>
                        <TextAge>{roleUsuario == 'Medico' ? '22 anos' : `CRM: ${usuarioConsulta.crm}`}</TextAge>
                        <TypeBold>{prioridade == 0 ? "Rotina" : prioridade == 1 ? "Exame" : "Urgencia"}</TypeBold>
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
                            <ButtonCard onPress={roleUsuario !== "Paciente" ? onPressAppointment : () => handlePress("Prescricao")}>
                                <ButtonText situacao={situacao}>Ver prontuário</ButtonText>
                            </ButtonCard>
                        )
                    }

                </ViewRow>
            </ContentCard>
        </CardConsultaStyle>
    );
};
