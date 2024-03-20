import styled from "styled-components";

export const ButtonTitle = styled.Text`
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
    font-family: 'MontserratAlternates_700Bold';

`

export const ButtonTitleGoogle = styled(ButtonTitle)`
    color: #496BBA;
`

export const ButtonSecondaryTitle = styled.Text`
    color: ${props => props.color ? props.color : "#344F8F"};
    text-decoration: underline;
    font-size: 14px;
    font-family: 'MontserratAlternates_600SemiBold';
`