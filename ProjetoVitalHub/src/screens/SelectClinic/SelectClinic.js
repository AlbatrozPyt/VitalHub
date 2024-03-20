import { Modal } from "react-native"
import { Title, TitleConsulta, TitleName } from "../../components/Title/style"
import { ButtonModalStyle, ButtonSecondary } from "../../components/Button/style"
import { ButtonSecondaryTitle, ButtonTitle } from "../../components/ButtonTitle/style"
import { SelectContent, SelectView } from "./style"

import { Container, ContainerPerfil, Scroll } from "../../components/Container/style"
import { BoxSelect } from "../../components/BoxSelect"
import { useState } from "react"
import { ListComponent } from "../../components/List/List"

const ListClinic = [
    { id: 1, nome: "Clinic Natureh", estado: "SP", cidade: "SCS" },
    { id: 2, nome: "Clinic Natureh", estado: "SP", cidade: "São Paulo" },
    { id: 3, nome: "Clinic Natureh", estado: "SP", cidade: "São Paulo" },

]

export const SelectClinic = ({
    navigation
}) => {
    const [selectedClinic, setSelectedClinic] = useState("teste");

    return (
        <Container>
            <Scroll>
                <SelectContent>
                    <TitleConsulta>Selecionar clínica</TitleConsulta>

                    
                    
                       <ListComponent
                        data={ListClinic}
                        keyExtractor={(item) => item.id}

                        renderItem={({ item }) =>
                        <SelectView>
                            <BoxSelect
                                ListClinic={item}
                                situacao={item.situacao}
                                clickButton={item.id === selectedClinic}
                                onPress={() => setSelectedClinic(item.id)}
                            />
                            </SelectView>
                        }
                        showsVerticalScrollIndicator={false}
                    />

                    

                    <ButtonModalStyle onPress={() => navigation.navigate("SelectMedicoScreen")}>
                        <ButtonTitle>Continuar</ButtonTitle>
                    </ButtonModalStyle>

                    <ButtonSecondary onPress={() => navigation.replace("Main")}>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>

                </SelectContent>
            </Scroll>
        </Container>
    )
}