import styled from "styled-components";

export const InputLabel = styled.Text`
    padding-left: 5%;
    width: 100%;
    font-size: 16px;
    font-family: 'Quicksand_600SemiBold';
    color: ${props => props.fieldColor ? props.fieldColor : "#33303E"};
`