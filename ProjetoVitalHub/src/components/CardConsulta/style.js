import styled from "styled-components";

export const CardConsultaStyle = styled.TouchableOpacity`
  width: 90%;
  height: 102px;

  margin: 0 auto;
  margin-bottom: 12px;
  padding: 10px;

  border-radius: 5px;
  background-color: #ffffff;
  flex-direction: row;
  /* margin-top: 20px; */
  justify-content: space-between;
  gap: 10px;
  
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.08);
`
export const ContentCard = styled.View`
  width: 70%;
  gap: 10px;
  /* background-color: gray; */
`

export const BoxInfos = styled.View`
    width: 70%;
    gap: 5px;
`

export const InfoTextBox = styled.View`

  height: 100%;
  /* border: 2px solid red; */
  justify-content: space-between;
`;

export const AgeAndTypeBox = styled.View`
  flex-direction: row;
  /* width: 100%; */
  /* justify-content: flex-start; */
  gap: 5px;
`;

export const ViewRow = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* border: 2px solid black; */
`;

export const ClockCard = styled.View`
  flex-direction: row;
  gap: 6px;
  padding: 4px 23px;
  border-radius: 5px;
  background-color: ${(props) => props.situacao == "pendente" ? "#E8FCFD" : "#F1f0f5" };
  align-items: center;
`
export const ButtonCard = styled.TouchableOpacity`
  
`

export const ButtonText = styled.Text`
  font-size: 12px;
  font-family: 'MontserratAlternates_500Medium';
  color: ${(props) => props.situacao == "pendente" ? "#c81d25" : '#344f8f'};
`