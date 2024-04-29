import styled, { css } from "styled-components";

export const ButtonTabStyle = styled.TouchableHighlight.attrs({
    underlayColor: "transparent"
})`
    padding: 12px 14px;
    border-radius: 5px;

    /* Validação botão */ 
    ${(props) => props.clickButton ? css`
        /* background-color: #496bba; */
        background-color: ${props => props.fieldBckColor ? props.fieldBckColor : "#496bba"};
    `:
        css`
        background-color: #fbfbfb;
        /* border: 2px solid #607ec5; */
        border: ${props => `2px solid ${props.fieldBorderColor}`};
    `}
`

export const ButtonTextStyle = styled.Text`
    font-size: 12px;
    font-family: 'MontserratAlternates_600SemiBold';

        /* Validação botão */
        ${(props) => props.clickButton ? css`
            color: #fbfbfb;
        `
        :
        css`
            /* color: #607EC5; */
            color: ${props => props.fieldColor ? props.fieldColor : "#607EC5"}
        `}
`

export const TextStyle = styled.Text`
    font-size: 12px;
    font-family: 'MontserratAlternates_600SemiBold';

        /* Validação botão */
        ${(props) => props.clickButton ? css`
            color: #fbfbfb;
        `
        :
        css`
            color: #34898F;
        `}
`