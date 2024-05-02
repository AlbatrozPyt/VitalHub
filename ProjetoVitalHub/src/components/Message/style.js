import { Animated } from "react-native";
import styled from "styled-components";

export const BoxMessage = styled(Animated.View)`
    position: absolute;
    top: 100px;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    width: 90%;
    height: 120px;
    background-color: ${(props) => props.backgroundMessage};
    border-radius: 10px;
`

export const TitleMessage = styled(Animated.Text)`
    font-family: 'MontserratAlternates_500Medium';
    font-size: 30px;
    color: #fff;
    margin-top: 10px;
`

export const TextMessage = styled(Animated.Text)`
    font-family: 'Quicksand_500Medium';
    color: #fff;
`

export const Line = styled(Animated.View)`
    width: 70%;
    height: 2px;
    background-color: #fff;
    border-radius: 10px;
`