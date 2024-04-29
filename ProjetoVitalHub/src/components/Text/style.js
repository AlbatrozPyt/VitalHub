import styled from "styled-components";

export const TextAccount = styled.Text`
    margin-top: 30px;
    font-size: 14px;
    font-family: 'MontserratAlternates_600SemiBold';
    
    color: ${(props) => props.fieldColor ? props.fieldColor : "#4E4B59"};
`

export const Subtitle = styled.Text`
    font-size: 16px;
    /* width: 90%; */
    font-family: 'Quicksand_500Medium';
    color: #5F5C6B;
    text-align: center;
    margin: ${(props) => props.margin ? props.margin : '16px'};
    
`

export const LinkUtil = styled.Text`
    color: #344F8F;
    font-size: 14px;
    font-family: "MontserratAlternates_600SemiBold";
    margin-top: 30px;
    text-decoration: underline;
`

export const TextAge = styled.Text`
    font-size: 14px;
    color: #8C8A97;
    font-family: "Quicksand_400Regular";
`
export const TypeBold = styled(TextAge)`
    font-size: 14px;
    font-family: "Quicksand_600SemiBold";
    color: ${(props) => props.situacao == "pendente" ? "#49b3ba" : '#8c8a97'};
`

export const TextQuick = styled.Text`
    color: #33303E;
    font-family: "Quicksand_600SemiBold";
    font-size: 16px;
    /* text-align: left; */
`

export const TextStyle1 = styled.Text`
    font-size: 14px;
    font-family: "Quicksand_600SemiBold";

    color: ${(props) => props.fieldColor ? props.fieldColor : '#8c8a97'} ;

`



