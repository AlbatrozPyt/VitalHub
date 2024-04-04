import { useEffect, useState } from "react"
import { BoxSelectMedico } from "../../components/BoxSelectMedico"
import { ButtonModalStyle, ButtonSecondary } from "../../components/Button/style"
import { ButtonSecondaryTitle, ButtonTitle } from "../../components/ButtonTitle/style"
import { Container, ContainerBox, Scroll } from "../../components/Container/style"
import { TitleConsulta } from "../../components/Title/style"
import { SelectView } from "../SelectClinic/style"
import { ContentSelect } from "./style"
import { ListComponent } from "../../components/List/List"
import api from "../../services/services"

const ListMedicos = [
    { id: 1, nome: "Pedro Felix", area: "Demartologa", especializacao: "Estitca" },
    { id: 2, nome: "Enzo Gentileza", area: "Cirurgião", especializacao: "Cardilogista" },
    { id: 3, nome: "Gois Garbelini", area: "Clínico", especializacao: "Pediatra" },

]

export const SelectMedicoScreen = ({ navigation }) => {

    const [selectMedico, setSelectMedico] = useState("")
    const [medicos, setMedicos] = useState([]);


    useEffect(() => {
        async function getMedicos() {
            const promise = await api.get(`/Medicos`);
            setMedicos(promise.data);
            console.log(medicos);
        }

        getMedicos();
    }, []);


    return (
        <Container>
            <Scroll>
                <ContentSelect>
                    <TitleConsulta>Selecionar médico</TitleConsulta>

                    <ListComponent
                        data={medicos}
                        keyExtractor={(item) => item.id}

                        renderItem={({ item }) => 
                            <SelectView>
                                <BoxSelectMedico
                                    medicos={item}
                                    ListMedicos={item}
                                    situacao={item.situacao}
                                    clickButton={item.id === selectMedico}
                                    onPress={() => setSelectMedico(item.id)}
                                />
                            </SelectView>
                        }
                        showsVerticalScrollIndicator={false}
                    />



                    <ButtonModalStyle onPress={() => navigation.navigate("SelectDate")}>
                        <ButtonTitle>Continuar</ButtonTitle>
                    </ButtonModalStyle>

                    <ButtonSecondary onPress={() => navigation.replace("Main")}>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>
                </ContentSelect>
            </Scroll>
        </Container>
    )
}