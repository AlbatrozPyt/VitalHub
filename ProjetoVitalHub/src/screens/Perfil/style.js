import styled from "styled-components";

export const DadosPessoais = styled.View`
    width: 80%;
    height: 100px;

    align-items: center;
    justify-content: center;
    
    border-radius: 5px;

    background-color: #fff;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.08);

    position: relative;
    margin: -50px 0px 30px 36px;
`

export const BottomCamera = styled.TouchableOpacity.attrs({
    activeOpacity: 0.8
})`
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #fbfbfb;
    background-color: #496bba;

    position: absolute;
    right: 15px;
    bottom: -20px;
    z-index: 100
`