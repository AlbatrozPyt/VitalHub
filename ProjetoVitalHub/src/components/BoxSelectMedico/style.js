import styled, { css } from "styled-components";

export const BoxSelectMedicoStyle = styled.TouchableHighlight.attrs({
    activeOpacity: 1,
    underlayColor: "#fff"
})` 
    width: 90%;
    height: 100px;
    /* border: 2px solid black; */
    
    align-items: center;
    flex-direction: row;
    gap: 10px;
    padding-left: 10px;

    background-color: #fff;

    border-radius: 5px;

    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.08);

    ${(props) => props.clickButton ? css`
        border: 2px solid #496BBA;
    `:
        css`
        border: 2px solid #fff;
    `}
`
export const BoxInfosMedicos = styled.View`

`

export const Avaliacao = styled.Image`
    width: 40px;
    height: 20px;
`