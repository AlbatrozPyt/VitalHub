import styled from "styled-components";

export const Button = styled.TouchableOpacity`
    width: ${props => props.fieldWidth ? props.fieldWidth : "90%"};
    height: ${props => props.fieldHeight ? props.fieldHeight : ""};

    /* background-color: #496bba; */
    background-color: ${props => props.fieldBckColor ? props.fieldBckColor : " #496bba"};
    border: 1px solid ${props => props.fieldBorderColor ? props.fieldBorderColor : " #496bba"};
    /* margin-top: 30px; */
    padding: 12px 8px 12px 8px;
    border-radius: 5px;
    
    align-items: center;
    justify-content: center;

    flex-direction: row;
    gap: ${props => props.fieldGap ? props.fieldGap : "0px"};
`


export const ButtonGoogle = styled(Button)`
    background-color: #FAFAFA;
    flex-direction: row;
    gap: 27px;
`

export const ButtonModal = styled(Button)`
    width: 90%;  
    /* width: ${props => `${props.fieldWidth}%`};*/
    background-color: ${props => props.bckColor ? props.bckColor : "#496bba"};
    border: ${props => props.border ? props.border : " 1px solid #496bba"}; 
    margin-top: 25px;
`

export const ButtonSecondary = styled(Button)`
    background-color: transparent;
    border: none;
    margin-top: ${props => props.marginTop ? props.marginTop : "25px"};
`

export const ButtonModalStyle = styled(Button)`
    width: 90%;
    margin-top: 25px;
`

// Mensagem da verficacao de campos preenchidos
export const ValidationText = styled.Text`
    font-size: 12px;
    font-weight: bold;
    font-family: Quicksand_500Medium;
`