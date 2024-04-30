import { Quicksand_500Medium } from "@expo-google-fonts/quicksand";
import styled from "styled-components";

export const BoxMessage = styled.View`
    position: absolute;
    z-index: 1;
    top: 15%;
    display: flex;
    align-items: center;
    width: 80%;
    height: 150px;
    border-radius: 20px;
    background-color: #f64f77;
    transition: 1.5s;
`

export const TitleMessage = styled.Text`
    width: 90%;
    text-align: center;
    padding: 2px;
    margin-top: 20px;
    font-family: MontserratAlternates_500Medium;
    border-width: 2px;
    border-top-color: transparent;
    border-right-color: transparent;
    border-left-color: transparent;
    border-bottom-color: white;
    font-size: 22px;
    color: ${(props) =>
        props.typeMessage === 'error'
            ? '#fff' : 'white'
    };
`

export const TextMessage = styled.Text`
    margin-top: 20px;
    font-family: Quicksand_500Medium;
    color: ${(props) =>
        props.typeMessage === 'error'
            ? '#fff' : 'white'
    };
`