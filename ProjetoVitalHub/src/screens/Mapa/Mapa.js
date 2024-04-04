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

    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [logradouro, setLogradouro] = useState()
    const [numero, setNumero] = useState()

    useEffect(() => {
        if (clinica == null) {
            BuscarClinica()
        }

        // console.log(route.params.clinicaId);
    }, [clinica])

    async function BuscarClinica() {
        const promise = await api.get(`/Clinica/BuscarPorId?id=${route.params.clinicaId}`)

        setClinica(promise.data)

        setLogradouro(promise.data.endereco.logradouro)
        setNumero(promise.data.endereco.numero)
        console.log(promise.data.endereco.numero)

        setLatitude(promise.data.endereco.latitude);
        setLongitude(promise.data.endereco.longitude);
    }
    return (
        <Container>
            {
                clinica != null && (
                    <>
                        <MapsComponente
                            latitude={latitude}
                            longitude={longitude}
                        />

                        <Title marginTop={"30px"}>{clinica.nomeFantasia}</Title>
                        <Subtitle>{clinica.endereco.cidade}</Subtitle>

                        <ContainerPerfil>
                            <BoxInput
                                textLabel='Endereço'
                                placeholder='Endereço...'
                                fieldValue={logradouro}
                            />

                            <ContainerBox>
                                <BoxInput
                                    fieldWidth={45}
                                    textLabel='Número'
                                    placeholder='Número...'
                                    fieldValue={numero}
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
                    </>
                )
            }
        </Container>
    )
}