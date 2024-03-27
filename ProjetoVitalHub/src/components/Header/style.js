import styled from "styled-components";

import { LinearGradient } from "expo-linear-gradient"; 

export const CntHeader = styled(LinearGradient).attrs({
    colors: ["#60BFC5", "#496BBA"],
    start: {x: -0.05, y: 1.00},
    end: {x: 1, y: 0}
})`
    width: 100%;
    height: 102px;

    align-items: center;
    justify-content: center;
    
    border-radius: 0px 0px 15px 15px;
`


export const HeaderContainer = styled.View`
    background-color: #60BFC5;
    height: 20%;
    align-items: center;
    justify-content: center;
    
    border-radius: 0px 0px 15px 15px;
    width: 100%;
`
export const HeaderContent = styled.SafeAreaView`
    margin-top: 30px;
    flex-direction: row;
    width: 90%;

    margin-bottom: 20px;

    justify-content: space-between;

    align-items: center;
`

export const ContainerTxtHeader = styled.View`
    /* align-items: center; */
    justify-content: center;
`

export const BoxHeader = styled.View`
        flex-direction: row;
        gap: 10px;
`


export const TextHeader = styled.Text`
    font-size: 14px;
    font-family: 'Quicksand_500Medium';
    color: #4E4B59;
    
`
export const TextName = styled(TextHeader)`
    font-size: 16px;
    font-family: 'MontserratAlternates_600SemiBold';
    color: #FBFBFB;
    
`