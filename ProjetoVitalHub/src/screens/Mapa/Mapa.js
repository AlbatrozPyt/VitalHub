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

// Import da API
import api, { apiBuscaBairro } from "../../services/services"

export const Mapa = ({ navigation, route }) => {
    const [clinica, setClinica] = useState(null)

    // Estados 'setados' a parte para ser passado como valor
    const [logradouro, setLogradouro] = useState()
    const [numero, setNumero] = useState()
    const [bairro, setBairro] = useState()
    
    // 'Setando' a latitude e longitude da clinica
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()

    useEffect(() => {
        if (clinica == null) {
            BuscarClinica()
            BuscarBairro()
        }
    }, [clinica])

    async function BuscarClinica() {
        const promise = await api.get(`/Clinica/BuscarPorId?id=${route.params.clinicaId}`)

        setClinica(promise.data)

        setLogradouro(promise.data.endereco.logradouro)
        setNumero(promise.data.endereco.numero.toString())
        setLatitude(promise.data.endereco.latitude);
        setLongitude(promise.data.endereco.longitude);
    }

    // Essa função serve para buscar o bairro através do cep
    async function BuscarBairro() {
        const promise = await apiBuscaBairro.get(`/${clinica.endereco.cep}/json/`);
        setBairro(promise.data.bairro);
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
                                    fieldValue={bairro}
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