import { Container, ContainerBox, ContainerPerfil } from "../../components/Container/style"
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
    const [logradouro, setLogradouro] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')

    // 'Setando' a latitude e longitude da clinica
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)

    useEffect(() => {
        BuscarClinica()
    }, [])

    async function BuscarClinica() {
        try {
            const promise = await api.get(`/Clinica/BuscarPorId?id=${route.params.clinicaId}`)
            if (!promise.data) {
                throw new Error('Dados da resposta estão vazios');
            }

            // Essa rota serve para buscar o bairro através do cep
            const response = await apiBuscaBairro.get(`${promise.data.endereco.cep}`);
            setBairro(response.data.bairro);

            setClinica(promise.data)
            setLogradouro(promise.data.endereco.logradouro)
            setNumero(promise.data.endereco.numero.toString())

            setLatitude(promise.data.endereco.latitude);
            setLongitude(promise.data.endereco.longitude);
        } catch (error) {
            console.log('Ocorreu um erro ao carregar informações do mapa \n' + error.message);
        }
    }
    console.log(clinica);


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