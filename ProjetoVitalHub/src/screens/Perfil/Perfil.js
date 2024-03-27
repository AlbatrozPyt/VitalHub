// Import dos componentes
import { Container, ContainerBox, ContainerInputButtom, ContainerPerfil, Scroll } from "../../components/Container/style"
import { FotoStyle } from "../../components/FotoPerfil/style"

// Import da foto
import fotoPerfil from '../../../assets/FotoPerfil.png'
import { Title } from "../../components/Title/style"
import { Subtitle } from "../../components/Text/style"
import { BoxInput } from "../../components/BoxInput"
import { Button } from "../../components/Button/style"
import { ButtonTitle } from "../../components/ButtonTitle/style"
import { Alert } from "react-native"
import { DadosPessoais } from "./style"
import { useEffect, useState } from "react"
import { userDecodeToken } from "../../Utils/Auth"

// Array de objetos mocados
let profile =
{
    id: 1,
    nome: 'Pedro Felix',
    email: 'felixpedro@gmail',
    nascimento: '25/02/2004',
    cpf: '010.101.010/10',
    logradouro: 'Rua da minha casa',
    cep: '00000-000',
    cidade: 'Itaquaquecetuba'
}



export const Perfil = ({
    navigation,
}) => {
    const AlertPage = () => {
        Alert.alert(
            //Title
            'Desculpe o transtorno',
            //Body
            'Página em desenvolvimento'
        )
    }

    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();

    async function profileLoad() {
        const token = await userDecodeToken();    

        if (token) {
            setUserName(token.name)
            setUserEmail(token.email)
        }
    }

    useEffect(() => { profileLoad() }, [])

    return (
        <Container>
            <Scroll>
                <FotoStyle source={fotoPerfil} />

                <DadosPessoais>
                    <Title textAlign={"center"}>{userName}</Title>
                    <Subtitle>{userEmail}</Subtitle>
                </DadosPessoais>

                <ContainerPerfil>
                    <BoxInput
                        textLabel='Data de nascimento'
                        placeholder='Data de nascimento...'
                        fieldValue={profile.nascimento}
                    />
                    <BoxInput
                        textLabel='CPF'
                        placeholder='CPF...'
                        fieldValue={profile.cpf}
                    />
                    <BoxInput
                        textLabel='Endereço'
                        placeholder='Endereço...'
                        fieldValue={profile.logradouro}
                    />
                    <ContainerBox>
                        <BoxInput
                            fieldWidth={45}
                            textLabel='CEP'
                            placeholder='CEP...'
                            fieldValue={profile.cep}
                        />

                        <BoxInput
                            fieldWidth={50}
                            textLabel='Cidade'
                            placeholder='Cidade...'
                            fieldValue={profile.cidade}
                        />
                    </ContainerBox>

                    <ContainerInputButtom>
                        <Button onPress={() => navigation.navigate("Main")}>
                            <ButtonTitle>Salvar</ButtonTitle>
                        </Button>

                        <Button onPress={AlertPage}>
                            <ButtonTitle>editar</ButtonTitle>
                        </Button>

                        <Button fieldBckColor={"#ACABB7"} fieldBorderColor={"#ACABB7"} onPress={AlertPage}>
                            <ButtonTitle>sair do app</ButtonTitle>
                        </Button>
                    </ContainerInputButtom>
                </ContainerPerfil>
            </Scroll>
        </Container>
    )
}