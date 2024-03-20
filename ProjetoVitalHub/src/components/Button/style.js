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
// ************************ Button Prontuário
//     width: ${props => `${props.fieldWidth}%`} ;

export const ButtonGoogle = styled(Button)`
    background-color: #FAFAFA;
    flex-direction: row;
    gap: 27px;
`

export const ButtonModal = styled(Button)`
    width: 90%;  
    /* width: ${props => `${props.fieldWidth}%`}; */
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