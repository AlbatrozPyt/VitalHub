import { BoxInput } from "../../components/BoxInput"
import { Button, ButtonSecondary } from "../../components/Button/style"
import { ButtonSecondaryTitle, ButtonTitle } from "../../components/ButtonTitle/style"
import { Container, ContainerBox, ContainerInput, Scroll } from "../../components/Container/style"
import { FotoStyle } from "../../components/FotoPerfil/style"
import { Subtitle } from "../../components/Text/style"
import { Title } from "../../components/Title/style"

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ContainerBoxPrescricao, Linha } from "./style"
import { CameraComp } from "../../components/CameraComp/CameraComp"

//Componente nativo
import { useEffect, useState } from "react"
import { Image, StyleSheet } from "react-native"
import { Label } from "../../components/Label"
import api from "../../services/services"

export const Prescricao = ({
    navigation,
    route
}) => {

    const [showCamera, setShowCamera] = useState(false)
    const [photoPrescicao, setPhotoPrescicao] = useState(null)

    // Guardando os dados da consulta
    const [consulta, setConsulta] = useState()

    useEffect(() => {
        async function getConsultas() {
            const promise = await api.get(`/Consultas/BuscarPorId?id=${route.params.consultaId}`)

            setConsulta(promise.data)

            // console.log(consulta.medicoClinica.medico.idNavigation.foto);
        }
        getConsultas()

    }, [])
    return (
        <Container>
            {
                consulta != null && (
                    <Scroll>
                        <FotoStyle source={{ uri: consulta.medicoClinica.medico.idNavigation.foto }} />

                        <Title marginTop={'20px'} textAlign={"center"}>Dr. {consulta.medicoClinica.medico.idNavigation.nome}</Title>
                        <Subtitle>{consulta.medicoClinica.medico.especialidade.especialidade1} - {consulta.medicoClinica.medico.crm}</Subtitle>

                        <ContainerInput>
                            <BoxInput
                                textLabel={"Descrição da consulta"}
                                placeholder={"Descrição da consulta..."}
                                fieldHeight={"121"}
                            />

                            <BoxInput
                                textLabel={"Diagnóstico do paciente"}
                                placeholder={"Diagnóstico..."}
                            />

                            <BoxInput
                                textLabel={"Prescrição médica"}
                                placeholder={"Prescrição médica..."}
                                fieldHeight={"133"}
                            />

                            {
                                photoPrescicao == null ? (
                                    <BoxInput
                                        textLabel={"Exames médicos"}
                                        placeholder={"                  Nenhuma foto informada"}
                                        fieldHeight={"111"}
                                    >
                                    </BoxInput>
                                ) : (
                                    <>
                                        <Label
                                            textLabel={"Exames médicos"}
                                        />
                                        <Image style={styles.imageStyle} source={{ uri: photoPrescicao }} />
                                    </>
                                )
                            }

                            <ContainerBoxPrescricao>

                                <Button fieldGap={"10px"} fieldWidth={"54%"} fieldHeight={"44px"} onPress={() => setShowCamera(true)}>
                                    <MaterialCommunityIcons name="camera-plus-outline" size={20} color="#fff" />
                                    <ButtonTitle>Enviar</ButtonTitle>
                                </Button>


                                <ButtonSecondaryTitle onPress={() => navigation.navigate("Home")} color={"#C81D25"}>Cancelar</ButtonSecondaryTitle>

                            </ContainerBoxPrescricao>

                            <Linha />

                            <BoxInput
                                textLabel={"Exames médicos"}
                                placeholder={"Resultado do exame de sangue:"}
                                fieldHeight={"103"}
                            />

                            <ButtonSecondary onPress={() => navigation.replace("Main")}>
                                <ButtonSecondaryTitle>Voltar</ButtonSecondaryTitle>
                            </ButtonSecondary>
                        </ContainerInput>


                        <CameraComp
                            visible={showCamera}
                            setShowCamera={setShowCamera}
                            setPhotoPrescicao={setPhotoPrescicao}
                        />

                    </Scroll>
                )
            }

        </Container>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 110,
        width: '90%',
        borderRadius: 15
    }
})