import { BoxMessage, Line, TextMessage, TitleMessage } from "./style"

export const Message = ({ title, text, translate = 0, type }) => {
    return (
        <BoxMessage
            style={{ transform: [{ translateX: translate }] }}
            backgroundMessage={
                type === `error` ? `#f64f77` : null
            }
        >
            <TitleMessage
                textMessage={
                    type === `error` ? `#f64f77` : null
                }
            >
                {title}
            </TitleMessage>

            <Line/>

            <TextMessage
                textMessage={
                    type === `error` ? `#f64f77` : null
                }
            >
                {text}
            </TextMessage>
        </BoxMessage>
    )
}