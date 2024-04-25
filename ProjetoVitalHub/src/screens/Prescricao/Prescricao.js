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
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { Label } from "../../components/Label"
import api from "../../services/services"

export const Prescricao = ({
    navigation
}) => {

    const [showCamera, setShowCamera] = useState(false)
    const [photoPrescicao, setPhotoPrescicao] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [descricao, setDescricao] = useState(null)

    async function InserirExame() {
        const formData = new FormData()
        formData.append('ConsultaId', `C99800FE-CCC3-4503-BDB0-F0DCFD1AEF7E`);
        formData.append('Imagem', {
            uri: photo,
            name: `image.${photo.split(".").pop()}`,
            type: `image/${photo.split(".").pop()}`
        })

        await api.post('/Exame/Cadastrar', formData, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
            .then(response => {
                setDescricao('\n' + response.data.descricao)
                console.log(descricao);
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        if (photo !== null) {
            InserirExame()
        }
    }, [photo])

    return (
        < Container >
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
                        photo == null ? (
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
                                <Image style={styles.imageStyle} source={{ uri: photo }} />
                            </>
                        )
                    }

                    <ContainerBoxPrescricao>

                        <Button fieldGap={"10px"} fieldWidth={"54%"} fieldHeight={"44px"} onPress={() => setShowCamera(true)}>
                            <MaterialCommunityIcons name="camera-plus-outline" size={20} color="#fff" />
                            <ButtonTitle>Enviar</ButtonTitle>
                        </Button>


                        <ButtonSecondaryTitle onPress={() => setPhoto(null)} color={"#C81D25"}>Cancelar</ButtonSecondaryTitle>

                    </ContainerBoxPrescricao>

                    <Linha />

                

                    <ScrollView style={{width: '90%', height: 103}}>
                        <Text>{descricao}</Text>
                    </ScrollView>

                    <ButtonSecondary onPress={() => navigation.navigate("Main")}>
                        <ButtonSecondaryTitle>Voltar</ButtonSecondaryTitle>
                    </ButtonSecondary>
                </ContainerInput>


                <CameraComp
                    visible={showCamera}
                    setShowCamera={setShowCamera}
                    setPhotoPrescicao={setPhotoPrescicao}
                    setGalleryPhoto={setPhoto}
                />

            </Scroll>
        </Container >
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 110,
        width: '90%',
        borderRadius: 15
    }
})