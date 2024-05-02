import { useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet } from "react-native"

// Import do maps
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"

import MapViewDirections from "react-native-maps-directions"

// Import do style
import { BoxMaps } from "./style"

// Import da key
import { mapskey } from "../../../Utils/mapsKey"
import {
    getCurrentPositionAsync,
    requestForegroundPermissionsAsync,
    watchPositionAsync
}
    from "expo-location"
import { Title } from "../Title/style"

export const MapsComponente = ({
    latitude,
    longitude
}) => {

    // Posição inicial
    const [initialPosition, setInitialPosition] = useState(null);

    async function CapturarLocalizacao() {
        const { granted } = await requestForegroundPermissionsAsync();

        if (granted) {
            const currentPosition = await getCurrentPositionAsync()

            setInitialPosition(currentPosition)

            // console.log(initialPosition)
        }
    }

    useEffect(() => {
        CapturarLocalizacao()

        // capturar localizacao
        // watchPositionAsync({
        //     accuracy: LocationAccuracy.High,
        //     timeInterval: 1000,
        //     distanceInterval: 1
        // }, async (response) => {
        //     await setInitialPosition(response)

        //     mapRefence.current?.animateCamera({
        //         pitch: 60,
        //         center: response.coords
        //     })
        // }

        // )
    }, [10000000])

 

    return (
        <BoxMaps>
            {
                initialPosition != null
                    ? (
                        <MapView
                        latitude={latitude}
                        longitude={longitude}
                            initialRegion={{
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005
                            }}
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                        >

                            {/* Criando um marcador no mapa */}
                            <Marker
                                coordinate={{
                                    latitude: latitude,
                                    longitude: longitude,
                                }}
                                title='Localização atual'
                                description='Qualquer lugar do map'
                                pinColor='red'
                            />


                            {/* Marcar um destino mapa */}
                            {/* <MapViewDirections
                    apikey={mapskey}

                /> */}
                        </MapView>) : (
                        <>
                            <Title>Localização não encontrada</Title>
                            <ActivityIndicator />
                        </>
                    )
            }
        </BoxMaps>


    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        width: '100%'
    }
});