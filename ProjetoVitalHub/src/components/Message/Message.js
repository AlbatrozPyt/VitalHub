import { Animated, Text } from "react-native"
import { BackgroundMessage, BoxMessage, TextMessage, TitleMessage } from "./style"
import { useRef } from "react";


export const Message = ({ title, text, type }) => {
    return (
        <BoxMessage
            typeMessage={type}

        >
            <TitleMessage typeMessage={type}>{title}</TitleMessage>

            <TextMessage typeMessage={type}>{text}</TextMessage>
        </BoxMessage>
    )
}