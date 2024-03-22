import styled, { css } from "styled-components";

export const SelectContent = styled.View`
    align-items: center;
    width: 100%; 
    height: max-content;
`

export const SelectView = styled.View`
    width: 100%; 
    align-items: center;
    margin: 35px 0px ${props => props.marginTop ? props.marginTop : "0px"};
    gap : 15px;
`

export const BoxSelectStyle = styled.TouchableHighlight.attrs({
    activeOpacity: 1,
    underlayColor: "#fff"
})` 
    width: 90%;
    height: 84px;
 
    border-radius: 5px;
    background-color: white;

    justify-content: space-around;
    padding: 10px;

    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.08);

    /* ${(props) =>
        props.clickButton &&
        css`
      border: 2px solid #496BBA;
    `}; */

    ${(props) => props.clickButton ? css`
        border: 2px solid #496BBA;
    `:
        css`
        border: 2px solid #fff;
    `}


`

export const BoxDay = styled.View`
    height: 26px;
    width: 100px;

    border: 1px solid #E8FCFD;
    border-radius: 5px;
    background-color: #E8FCFD;

    flex-direction: row;
    align-items: center;

    justify-content: space-around;
`

export const BoxInformacoes = styled.View`
    flex-direction: row;
    justify-content: space-between;
`