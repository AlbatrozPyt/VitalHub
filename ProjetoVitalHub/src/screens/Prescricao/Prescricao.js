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
import { useState } from "react"
import { Image, StyleSheet } from "react-native"
import { Label } from "../../components/Label"

export const Prescricao = ({
    navigation
}) => {

    const [showCamera, setShowCamera] = useState(false)
    const [photoPrescicao, setPhotoPrescicao] = useState(null)


    return (
        <Container>
            <Scroll>
                <FotoStyle source={{ uri: "https://media.licdn.com/dms/image/D4D03AQE9_PLYntkCmw/profile-displayphoto-shrink_800_800/0/1708700875958?e=1715212800&v=beta&t=ZCHIpyvcu03a35K-8J0mVD387-G4HjKh0_xoUw2rINQ" }} />

                <Title marginTop={'20px'} textAlign={"center"}>Dr. Gelipe fois</Title>
                <Subtitle>15 anos fythoy@gmail.com</Subtitle>

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

                    <ButtonSecondary onPress={() => navigation.navigate("Main")}>
                        <ButtonSecondaryTitle>Voltar</ButtonSecondaryTitle>
                    </ButtonSecondary>
                </ContainerInput>


                <CameraComp
                    visible={showCamera}
                    setShowCamera={setShowCamera}
                    setPhotoPrescicao={setPhotoPrescicao}
                />

            </Scroll>
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