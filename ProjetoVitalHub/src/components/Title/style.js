import styled from "styled-components";

export const Title = styled.Text`
    font-size: 20px;
    font-family: 'MontserratAlternates_600SemiBold';
    color: #33303e;
    margin-bottom: ${(props) => props.marginBottom ? props.marginBottom : '0px'};
    margin-top: ${(props) => props.marginTop ? props.marginTop : '0px'};
    
    text-align: ${(props) => props.textAlign ? props.textAlign : 'left'};
`
export const TitleName = styled.Text`
    font-size: 16px;
    font-family: 'MontserratAlternates_600SemiBold';
    color: #33303e;
`

export const TitleConsulta = styled.Text`
    margin: 30px 0px ${props => props.marginTop ? props.marginTop : "0px"};
    font-size: 20px;
    font-family: 'MontserratAlternates_600SemiBold';
    color: #33303e;
`