import styled from "styled-components";

export const InputStyle = styled.TextInput`
    width: ${(props) => props.fieldWidth ? props.fieldWidth : '90%'};
    height: 53px;

    border-radius: 5px;
    border: 2px solid #49b3ba;

    padding: 16px;
    
    font-size: 14px;
    font-family: 'MontserratAlternates_600SemiBold';
    color: #34898f;
    color: ${props => props.fieldColor ? props.fieldColor : "#33303E"};
`

export const InputDados = styled(InputStyle)`
    height: ${props => `${props.fieldHeight}px`};
    margin-top: 6px;
    /* color: ${props => props.fieldColor ? props.fieldColor : "#33303E"}; */
    background-color: #F5F3F3;
    /* border: 2px solid #F5F3F3; */
    border: ${props => `2px solid ${props.fieldBorderColor}`};

    text-align: justify;

    margin-bottom: 0px;

    font-family: 'MontserratAlternates_500Medium';
`



