import styled from "styled-components";

export const CameraView = styled.View`
    flex: 1;
`

export const ButtonPhoto = styled.TouchableOpacity`
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
    background-color: "#121212";

    justify-content: center;
    align-items: center;
`

export const ButtonModal = styled.TouchableOpacity`
    padding: 20px;
    background-color: transparent;

    justify-content: center;
    align-items: center;
`

export const BoxPhotoView = styled.View`
        flex: 1;
    background-Color: transparent;
    flex-Direction: row;
    align-Items: flex-end;
    justify-Content: center;
`

export const BoxModal = styled.View`
    margin: 20px;
    flex-direction: row;
    gap: 10px;
`

export const ViewModal = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin: 20px;
`

export const PhotoImage = styled.Image`
    width: 100%;
    height: 500px;
    border-radius: 15px;
`

export const BntClose = styled.TouchableOpacity`
    position: absolute;

    right: 30px;
    top: 60px;
`