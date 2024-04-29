import { ActivityIndicator, StyleSheet, View } from "react-native";


export const Spinner = ({ time = 2000, state = null, navigation = null, screen }) => {

    if (navigation !== null) {
        setTimeout(() => navigation.replace(screen), time)
    }
    if (state !== null) {
        setTimeout(() => state(false), time)
    }

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
        backgroundColor: `white`,
        opacity: .7
    },
    spinner: {
        width: 200,
        height: 200,
        opacity: 1
    }
})