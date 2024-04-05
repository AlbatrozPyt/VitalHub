import { Container, ContainerBox, ContainerPerfil } from "../../components/Container/style"
import { ImageMapa } from "./style"
import mapaImage from "../../../assets/imageMapa.png"
import { Title } from "../../components/Title/style"
import { Subtitle } from "../../components/Text/style"
import { BoxInput } from "../../components/BoxInput"
import { ButtonModalStyle, ButtonSecondary } from "../../components/Button/style"
import { ButtonSecondaryTitle, ButtonTitle } from "../../components/ButtonTitle/style"
import { MapsComponente } from "../../components/MapsComponente/MapsComponente"
import { useEffect, useState } from "react"
import api from "../../services/services"

export const Mapa = ({ navigation, route }) => {
    const [clinica, setClinica] = useState(null)

    useEffect(() => {
        if (clinica == null) {
            BuscarClinica()
        }

        // console.log(route.params.clinicaId);
    }, [clinica])

    async function BuscarClinica() {
        const promise = await api.get(`/Clinica/BuscarPorId?id=${route.params.clinicaId}`)
  
        setClinica(promise)

        console.log(promise);
    }
    return (

        <Container>
            <MapsComponente />

            <Title marginTop={"30px"}>Clínica Natureh</Title>
            {/* <Subtitle>{clinica.nomeFantasia}</Subtitle> */}

            <ContainerPerfil>
                <BoxInput
                    textLabel='Endereço'
                    placeholder='Endereço...'
                    fieldValue='Rua Vicenso Silva, 987'
                />

                <ContainerBox>
                    <BoxInput
                        fieldWidth={45}
                        textLabel='Número'
                        placeholder='Número...'
                        fieldValue='589'
                    />

                    <BoxInput
                        fieldWidth={50}
                        textLabel='Bairro'
                        placeholder='Bairro...'
                        fieldValue='Moema-SP'
                    />
                </ContainerBox>

                <ButtonSecondary onPress={() => navigation.replace("Main")}>
                    <ButtonSecondaryTitle>Voltar</ButtonSecondaryTitle>
                </ButtonSecondary>

            </ContainerPerfil>
        </Container>
    )
}