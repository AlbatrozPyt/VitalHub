import styled from "styled-components";

export const LinkMedium = styled.Text`
    font-size: 14px;
    font-family: 'MontserratAlternates_500Medium';
    text-decoration: underline;
    color: #8c8a97;

    margin: 10px 0px 30px 20px;
`

export const LinkUtil = styled.TouchableOpacity`
    align-self: flex-start;
`

export const LinkMediumAccount = styled(LinkMedium)`
    margin-top: 30px;
    margin-left: 0px;
    color: #4d659d
`