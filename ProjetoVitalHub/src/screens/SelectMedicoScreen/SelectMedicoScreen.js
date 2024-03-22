import { useState } from "react"
import { BoxSelectMedico } from "../../components/BoxSelectMedico"
import { ButtonModalStyle, ButtonSecondary } from "../../components/Button/style"
import { ButtonSecondaryTitle, ButtonTitle } from "../../components/ButtonTitle/style"
import { Container, ContainerBox, Scroll } from "../../components/Container/style"
import { TitleConsulta } from "../../components/Title/style"
import { SelectView } from "../SelectClinic/style"
import { ContentSelect } from "./style"
import { ListComponent } from "../../components/List/List"

const ListMedicos = [
    { id: 1, nome: "Pedro Felix", area: "Demartologa", especializacao: "Estitca" },
    { id: 2, nome: "Enzo Gentileza", area: "Cirurgião", especializacao: "Cardilogista" },
    { id: 3, nome: "Gois Garbelini", area: "Clínico", especializacao: "Pediatra" },

]

export const SelectMedicoScreen = ({ navigation }) => {

    const [selectMedico, setSelectMedico] = useState("")

    return (
        <Container>
            <Scroll>
                <ContentSelect>
                    <TitleConsulta>Selecionar médico</TitleConsulta>



                    <ListComponent
                        data={ListMedicos}
                        keyExtractor={(item) => item.id}

                        renderItem={({ item }) =>
                            <SelectView>
                                <BoxSelectMedico
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