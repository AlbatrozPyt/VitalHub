import { BoxMessage, Line, TextMessage, TitleMessage } from "./style"

export const Message = ({ title, text, translate = 0, type }) => {
    return (
        <BoxMessage
            style={{ transform: [{ translateX: translate }] }}
            backgroundMessage={
                type === `error`
                    ? `#f64f77`
                    : type === `success`
                        ? `#12a1af`
                        : null
            }
        >
            <TitleMessage
                textMessage={
                    type === `error`
                        ? `#f64f77`
                        : type === `success`
                            ? `#13f1af`
                            : null
                }
            >
                {title}
            </TitleMessage>

            <Line />

            <TextMessage
                textMessage={
                    type === `error`
                        ? `#f64f77`
                        : type === `success`
                            ? `#13f1af`
                            : null
                }
            >
                {text}
            </TextMessage>
        </BoxMessage>
    )
}