import { InputDados } from "./style"

export const InputText = ({
    placeholder,
    fieldHeight = 50,
    fieldColor = "",
    fieldBorderColor = "#F5F3F3",
    fieldValue = null,
    onChangeText = null,
    keyType,
    maxLength,
    secureTextEntry,
    editable
}) => {
    return (
        <InputDados
            fieldHeight={fieldHeight}
            fieldColor={fieldColor}
            fieldBorderColor={fieldBorderColor}
            placeholder={placeholder}
            keyboardType={keyType}
            maxLength={maxLength}
            value={fieldValue}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            editable={editable}
        />
    )
}