import styled from "styled-components";

export const FotoStyle = styled.Image`
    width: 100%;
    height: 280px;
`

export const FotoPerfilHome = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 10px;
`

export const IconeSino = styled(FotoPerfilHome)`
    width: 25px;
    height: 25px;
`

export const ImageUser = styled(FotoStyle)`
    width: 77px;
    height: 80px;

    border-radius: 5px;
    margin: 0;
`

export const BoxIcons = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 70px;
`

