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

import api from "../../services/services"
import { faL } from "@fortawesome/free-solid-svg-icons"

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

    const [userId, setUserId] = useState();
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [cpf, setCpf] = useState();
    const [cep, setCep] = useState();
    const [logradouro, setLogradouro] = useState();
    const [cidade, setCidade] = useState();

    const [token, setToken] = useState();
    const [perfil, setPerfil] = useState();

    // Ativa a edicao do perfil
    const [edit, setEdit] = useState(false);

    async function profileLoad() {
        const token = await userDecodeToken();
        setToken(token)

        if (token) {
            setUserName(token.name)
            setUserEmail(token.email)
            setUserId(token.id)
        }
    }


    async function getPerfil() {
        const promise = await api.get(`/Pacientes/BuscarPorId?id=${userId}`);
        await setPerfil(promise.data)
        console.log(perfil);

        setDataNascimento(perfil.dataNascimento);
        setCpf(perfil.cpf)
        setLogradouro(perfil.endereco.logradouro)
        setCep(perfil.endereco.cep)
        setCidade(perfil.endereco.cidade)
    }

    async function putPerfil() {
        await api.put(`/Pacientes/AtualizarPerfil?idUsuario=7EE5B34C-A5D4-44EF-A6D7-790334609EE3`, {
            "cpf": cpf,
            "dataNascimento": dataNascimento,
            "cep": cep,
            "logradouro": logradouro,
            "cidade": cidade,
        })
            .then(() => Alert.alert('Funcionou', 'Yes!!'))
            .catch((e) => console.log(e))
    }


    useEffect(() => {

        getPerfil()
        profileLoad()
    }, [])

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
                        onChangeText={(x) => setDataNascimento(x)}
                        textLabel='Data de nascimento'
                        placeholder={
                            !edit
                                ? new Date(dataNascimento).toLocaleDateString()
                                : new Date(perfil.dataNascimento).toLocaleDateString()
                            }
                        // fieldValue={!edit ? dataNascimento : null}
                        editable={edit}
                    />
                    <BoxInput
                        onChangeText={(x) => setCpf(x)}
                        textLabel='CPF'
                        placeholder={!edit ? cpf : perfil.cpf}
                        // fieldValue={!edit ? cpf : ''}
                        keyType={"numeric"}
                        editable={edit}
                    />
                    <BoxInput
                        onChangeText={(x) => setLogradouro(x)}
                        textLabel='Endereço'
                        placeholder={!edit ? logradouro : perfil.logradouro}
                        // fieldValue={!edit ? logradouro : ''}
                        editable={edit}
                    />
                    <ContainerBox>
                        <BoxInput
                            onChangeText={(x) => setCep(x)}
                            fieldWidth={45}
                            textLabel='CEP'
                            placeholder={cep}
                            // fieldValue={!edit ? cep : ''}
                            editable={edit}
                        />

                        <BoxInput
                            onChangeText={(x) => setCidade(x)}
                            fieldWidth={50}
                            textLabel='Cidade'
                            placeholder={cidade}
                            // fieldValue={!edit ? cidade : ''}
                            editable={edit}
                        />
                    </ContainerBox>

                    <ContainerInputButtom>
                        <Button
                            onPress={() => {
                                setEdit(false)
                                putPerfil();
                            }}
                            disabled={!edit}
                        >
                            <ButtonTitle>Salvar</ButtonTitle>
                        </Button>

                        <Button onPress={() => setEdit(true)}>
                            <ButtonTitle>editar</ButtonTitle>
                        </Button>

                        {/* <Button fieldBckColor={"#ACABB7"} fieldBorderColor={"#ACABB7"}>
                            <ButtonTitle>sair do app</ButtonTitle>
                        </Button> */}
                    </ContainerInputButtom>
                </ContainerPerfil>
            </Scroll>
        </Container>
    )
}