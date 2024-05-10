import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";


export const BoxDegrade = styled(LinearGradient).attrs({
    colors: ["#60BFC5", "#496BBA"],
    start: { x: -0.05, y: 1.00 },
    end: { x: 1, y: 0 }
})`
    position: absolute;
    top: 14%;
    align-self: center;
    width: 90%;
    height: 60%;
    border-radius: 20px;
    align-items: center;
    gap: 20px
`

export const ButtonClose = styled.TouchableOpacity`
    position: absolute;
    right: 0;
    top: 20px;
    width: 50px;
    height: 5dvi;
`

export const ContainerNotification = styled.View`
    padding: 5px;
    position: relative;   
    top: 80px;
    align-items: center;
    justify-content: center;
    gap: 2px;
    width: 90%;
    height: 70px;
    border: 2px solid white;
    text-align: center;
    border-radius: 20px;
    padding: 6px 0;
`

export const ContainerIconText = styled.View`
    flex-direction: row;
`

export const NotificationText = styled.Text`
    align-items: center;
    height: 30px;
    color: white;
    font-family: 'Quicksand_500Medium';
    font-size: 16px;
`

export const IconSituacao = styled.View`
    width: 30px;
`