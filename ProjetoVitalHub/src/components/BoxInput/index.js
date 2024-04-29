import { InputText } from "../Input"
import { Label } from "../Label"
import { FieldContent } from "./style"


export const BoxInput = ({
    fieldWidth = 100,
    fieldHeight = 50,
    editable,
    fieldBorderColor,
    fieldColor,
    textLabel,
    placeholder,
    fieldValue = null,
    onChangeText = null,
    keyType = 'default',
    maxLength
}) => {
    return (
        <FieldContent fieldWidth={fieldWidth}>
            <Label
                textLabel={textLabel}
            />

            <InputText
                fieldBorderColor={fieldBorderColor}
                fieldHeight={fieldHeight}
                editable={editable}
                placeholder={placeholder}
                keyType={keyType}
                maxLength={maxLength}
                fieldValue={fieldValue}
                onChangeText={onChangeText}
            />
        </FieldContent>
    )
}
