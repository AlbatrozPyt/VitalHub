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
import { Alert, View } from "react-native"
import { DadosPessoais } from "./style"
import { useEffect, useState } from "react"
import { userDecodeToken } from "../../Utils/Auth"


import api from "../../services/services"
import { faL } from "@fortawesome/free-solid-svg-icons"
import { Spinner } from "../../components/Spinner"


//Importando os icones
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { BottomCamera } from "./style"
import { CameraComp } from "../../components/CameraComp/CameraComp"

export const Perfil = ({
    navigation,
}) => {

    // DADOS DO USUARIO
    const [userId, setUserId] = useState();
    const [userName, setUserName] = useState();
    const [userRole, setUserRole] = useState();
    const [userEmail, setUserEmail] = useState();
    const [token, setToken] = useState();

    // DADOS DO PACIENTE
    const [dataNascimento, setDataNascimento] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [cep, setCep] = useState();
    const [logradouro, setLogradouro] = useState();
    const [cidade, setCidade] = useState();
    const [perfil, setPerfil] = useState();

    // DADOS DO MÉDICO
    const [crm, setCrm] = useState();

    // SPINNER
    const [spinner, setSpinner] = useState();

    // Ativa a edicao do perfil
    const [edit, setEdit] = useState(false);

    const [photo, setPhoto] = useState(null);


    const [showModalCamera, setShowModalCamera] = useState(false)


    // CARREGA O USUARIO
    async function profileLoad() {
        const token = await userDecodeToken();

        if (token) {
            setUserName(token.name)
            setUserEmail(token.email)
            setUserRole(token.role)
            setUserId(token.id)
            setToken(token)

            getPerfil(token)

        }
    }

    // BUSCAR O USUARIO
    async function getPerfil(token) {

        const rota = (token.role === 'Paciente' ? `Pacientes` : `Medicos`);

        const promise = await api.get(`/${rota}/BuscarPorId?id=${token.id}`);
        const response = promise.data

        setPerfil(response)

        if (rota === 'Medicos') {
            setCrm(response.crm)
            setLogradouro(response.endereco.logradouro)
            setCep(response.endereco.cep)
            setCidade(response.endereco.cidade)
        }
        else {
            setDataNascimento(response.dataNascimento)
            setLogradouro(response.endereco.logradouro)
            setCep(response.endereco.cep)
            setCidade(response.endereco.cidade)
            setCpf(response.cpf)
            setRg(response.rg)
        }
    }

    // ATUALIZAR O USUARIO
    async function putPerfil() {
        const rota = (token.role === 'Paciente' ? `Pacientes` : `Medicos`);

        token.role === `Paciente` ?
            await api.put(`/Pacientes?idUsuario=${userId}`, {
                "rg": rg,
                "cpf": cpf,
                "cep": cep,
                "logradouro": logradouro,
                "cidade": cidade,
                "dataNascimento": dataNascimento,
            })
                .catch(e => console.log(e))
            :
            await api.put(`/Medicos?idUsuario=${userId}`, {
                "cep": cep,
                "logradouro": logradouro,
                "cidade": cidade,
                "crm": crm,
            })
    }

    // ATUALIZAR A FOTO DE PERFIL
    async function AlterarFotoPerfil() {
        const formData = new FormData();
        formData.append('Arquivo', {
            uri: photo,
            name: `image.${photo.split(".").pop()}`,
            type: `image/${photo.split(".").pop()}`
        });

        await api.put(`/Usuario/AlterarFotoPerfil?id=${userId}`, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(response => setPhoto(response))
            .catch(error => console.log(error))
    }


    useEffect(() => {
        profileLoad()
    }, [perfil])

    useEffect(() => {
        if (photo !== null) {
            AlterarFotoPerfil()
        }
    }, [photo])

    return (
        <Container>

            {
                spinner ?
                    <Spinner
                        state={setSpinner}
                        time={2000}
                    />
                    : null
            }

            <Scroll>
                <View>
                    <FotoStyle source={perfil !== undefined ? { uri: perfil.idNavigation.foto } : null} />
                    <BottomCamera onPress={() => setShowModalCamera(true)}>
                        <MaterialCommunityIcons name="camera-plus" size={20} color={'#fbfbfb'} />
                    </BottomCamera>

                    <CameraComp
                        visible={showModalCamera}
                        setShowCamera={setShowModalCamera}
                        setGalleryPhoto={setPhoto}
                    />
                </View>

                <DadosPessoais>
                    <Title textAlign={"center"}>{userName !== null ? userName : null}</Title>
                    <Subtitle>{userEmail !== null ? userEmail : null}</Subtitle>
                </DadosPessoais>

                {
                    userRole === 'Paciente' ?
                        <ContainerPerfil
                            style={{ marginBottom: 40 }}
                        >
                            <BoxInput
                                onChangeText={(x) => setDataNascimento(x)}
                                textLabel='Data de nascimento'
                                placeholder={
                                    !edit ? new Date(dataNascimento).toLocaleDateString()
                                        : new Date(perfil.dataNascimento).toLocaleDateString()
                                }
                                editable={edit}
                            />
                            <BoxInput
                                onChangeText={(x) => setCpf(x)}
                                textLabel='CPF'
                                placeholder={
                                    !edit ? cpf
                                        : perfil.cpf
                                }
                                keyType={"numeric"}
                                editable={edit}
                            />
                            <BoxInput
                                onChangeText={(x) => setRg(x)}
                                textLabel='RG'
                                placeholder={
                                    !edit ? rg
                                        : perfil.rg
                                }
                                keyType={"numeric"}
                                editable={edit}
                            />
                            <BoxInput
                                onChangeText={(x) => setLogradouro(x)}
                                textLabel='Endereço'
                                placeholder={!edit ? logradouro : perfil.endereco.logradouro}
                                editable={edit}
                            />
                            <ContainerBox>
                                <BoxInput
                                    onChangeText={(x) => setCep(x)}
                                    fieldWidth={45}
                                    textLabel='CEP'
                                    placeholder={!edit ? cep : perfil.endereco.cep}
                                    editable={edit}
                                />

                                <BoxInput
                                    onChangeText={(x) => setCidade(x)}
                                    fieldWidth={50}
                                    textLabel='Cidade'
                                    placeholder={!edit ? cidade : perfil.endereco.cidade}
                                    editable={edit}
                                />
                            </ContainerBox>
                        </ContainerPerfil>
                        :
                        <ContainerPerfil
                            style={{ marginBottom: 40 }}
                        >
                            <BoxInput
                                onChangeText={(x) => setCrm(x)}
                                textLabel='CRM'
                                placeholder={!edit ? crm : perfil.crm}
                                editable={edit}
                            />
                            <BoxInput
                                onChangeText={(x) => setLogradouro(x)}
                                textLabel='Endereço'
                                placeholder={!edit ? logradouro : perfil.endereco.logradouro}
                                editable={edit}
                            />
                            <ContainerBox>
                                <BoxInput
                                    onChangeText={(x) => setCep(x)}
                                    fieldWidth={45}
                                    textLabel='CEP'
                                    placeholder={!edit ? cep : perfil.endereco.cep}
                                    editable={edit}
                                />

                                <BoxInput
                                    onChangeText={(x) => setCidade(x)}
                                    fieldWidth={50}
                                    textLabel='Cidade'
                                    placeholder={!edit ? cidade : perfil.endereco.cidade}
                                    editable={edit}
                                />
                            </ContainerBox>
                        </ContainerPerfil>
                }

                <ContainerInputButtom>
                    <Button
                        style={!edit ? { backgroundColor: '#ACABB7', borderColor: '#ACABB7' } : null}
                        onPress={() => {
                            setEdit(false)
                            putPerfil()
                            setSpinner(true)
                        }}
                        disabled={!edit}
                    >
                        <ButtonTitle>Salvar</ButtonTitle>
                    </Button>

                    <Button
                        onPress={() => setEdit(true)}
                        style={edit ? { backgroundColor: '#ACABB7', borderColor: '#ACABB7' } : null}
                    >
                        <ButtonTitle>editar</ButtonTitle>
                    </Button>

                    {/* <Button fieldBckColor={"#ACABB7"} fieldBorderColor={"#ACABB7"}>
                            <ButtonTitle>sair do app</ButtonTitle>
                        </Button> */}
                </ContainerInputButtom>

            </Scroll>
        </Container>
    )
}