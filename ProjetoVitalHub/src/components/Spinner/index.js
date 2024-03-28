import { ActivityIndicator, StyleSheet, View } from "react-native";


export const Spinner = ({ setFalse, navigation, screen }) => {
    setTimeout(() => navigation.replace(screen), 2000)
    return (
        <View style={styles.boxSpinner}>
            <ActivityIndicator
                size={"large"}
                color={"#496bba"}
                style={styles.spinner} />
        </View>
    )
}


const styles = StyleSheet.create({
    boxSpinner: {
        position: `absolute`,
        zIndex: 10,
        width: `100%`,
        height: `100%`,
        alignItems: `center`,
        justifyContent: `center`,
        backgroundColor: `black`,
        opacity: .7
    },
    spinner: {
        width: 200,
        height: 200,
        opacity: 1
    }
})