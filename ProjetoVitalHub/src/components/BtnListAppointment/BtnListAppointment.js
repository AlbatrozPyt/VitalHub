import { ButtonTabStyle, ButtonTextStyle, TextStyle } from "./style"

export const BtnListAppointment = ({
    textButton,
    clickButton = false,
    onPress,
    fieldBorderColor = "#496bba",
    fieldColor,
    fieldBckColor
}) => {
    return(
        <ButtonTabStyle fieldBckColor={fieldBckColor} fieldBorderColor={fieldBorderColor} clickButton={clickButton} onPress={onPress}>
            <ButtonTextStyle fieldColor={fieldColor} clickButton={clickButton}>{textButton}</ButtonTextStyle>
        </ButtonTabStyle>
    ); 
};

