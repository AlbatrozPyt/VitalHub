
import { BoxInput } from "../../components/BoxInput"

import { Button, ButtonSecondary } from "../../components/Button/style"
import { ButtonSecondaryTitle, ButtonTitle } from "../../components/ButtonTitle/style"
import { Container, ContainerInputButtom, ContainerPerfil, Scroll } from "../../components/Container/style"
import { FotoStyle } from "../../components/FotoPerfil/style"
import { Subtitle } from "../../components/Text/style"
import { Title } from "../../components/Title/style"

export const MedicoProntuario = ({
    navigation
}) => {
    return (
        <Container>
            <Scroll>
                <FotoStyle source={{
                    uri: "https://github.com/Filipe-Gois.png",
                }} />

                <Title marginTop={'20px'} textAlign={"center"}>Gelipe fois</Title>
                <Subtitle>15 anos fythoy@gmail.com</Subtitle>

                <ContainerPerfil>
                    <BoxInput
                        fieldColor={"#34898F"}
                        fieldBorderColor={"#49B3BA"}
                        fieldHeight={121}
                        textLabel='Descrição da consulta'
                        placeholder='Descrição'
                    />

                    <BoxInput
                        fieldColor={"#34898F"}
                        fieldBorderColor={"#49B3BA"}
                        fieldHeight={53}
                        textLabel='Diagnóstico do paciente'
                        placeholder='Diagnóstico'
                    />

                    <BoxInput
                        fieldColor={"#34898F"}
                        fieldBorderColor={"#49B3BA"}
                        fieldHeight={121}
                        textLabel='Prescrição médica'
                        placeholder='Prescrição médica'
                    />

                    <ContainerInputButtom>
                        <Button>
                            <ButtonTitle>Salvar</ButtonTitle>
                        </Button>

                        <Button fieldBckColor={"#ACABB7"} fieldBorderColor={"#ACABB7"}>
                            <ButtonTitle>editar</ButtonTitle>
                        </Button>
                    </ContainerInputButtom>

                    <ButtonSecondary onPress={() => navigation.replace("Main")}>
                        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
                    </ButtonSecondary>
                </ContainerPerfil>

            </Scroll>
        </Container>
    )
}