// import da camera
import { Camera, CameraType } from 'expo-camera'

// import style
import { lastPhoto, BntClose, BoxModal, BoxPhotoView, ButtonFlip, ButtonModal, ButtonPhoto, CameraView, PhotoImage, ViewModal, LastPhoto } from './style'

// import do modal
import { Modal, StyleSheet, Touchable, TouchableOpacity } from 'react-native'

// import do react
import { useEffect, useRef, useState } from 'react'

// Icon
import { FontAwesome } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import * as MediaLibrary from "expo-media-library"
import * as ImagePicker from "expo-image-picker"


export const CameraComp = ({
    visible,
    setShowCamera,
    setPhotoPrescicao,
    getMediaLibrary = true
}) => {
    const cameraRef = useRef(null)
    const [tipoCamera, setTipoCamera] = useState(CameraType.back)
    const [photo, setPhoto] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [lastPhoto, setLastPhoto] = useState(null)


    async function GetLatestPhoto() {
        const { assets } = await MediaLibrary.getAssetsAsync(
            { sortBy: [[MediaLibrary.SortBy.creationTime, false]], first: 1 }
        );

        if (assets.length > 0) {
            setLastPhoto(assets[0].uri)
        }

        console.log(assets);
    }


    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync()
        })();

        if (getMediaLibrary) {
            GetLatestPhoto()
        }

    }, [])

    async function CapturePhotos() {
        if (cameraRef) {
            const photo = await cameraRef.current.takePictureAsync()
            setPhoto(photo.uri)
            // setPhotoPrescicao(photo.uri)

            setOpenModal(true)

            // console.log(photo)
        }
    }

    function ClearModal() {
        setPhoto(null)
        setOpenModal(false)
    }



    return (
        <Modal style={styles.container} visible={visible} transparent={true} animationType="fade">
            <Camera
                ref={cameraRef}
                style={styles.camera}
                type={tipoCamera}
                ratio='16:9'
            >
                <BoxPhotoView>
                    <ButtonPhoto onPress={() => CapturePhotos()}>
                        <FontAwesome name='camera' size={23} color={'#fff'} />
                    </ButtonPhoto>

                    <ButtonPhoto onPress={() => setTipoCamera(tipoCamera == CameraType.front ? CameraType.back : CameraType.front)}>
                        <MaterialIcons name="restart-alt" size={24} color="#fff" />
                    </ButtonPhoto>

                    <BntClose onPress={() => setShowCamera(false)}>
                        <AntDesign name="close" size={30} color="#fff" />
                    </BntClose>

                    <TouchableOpacity>
                        {
                            lastPhoto !== null ? <LastPhoto source={{ uri: lastPhoto }} /> : null
                        }
                    </TouchableOpacity>
                </BoxPhotoView>
            </Camera>

            <Modal animationType='slide' transparent={false} visible={openModal}>
                <ViewModal>



                    <BoxModal>
                        <ButtonModal onPress={() => ClearModal()}>
                            <FontAwesome name='trash' size={35} color={'#ff0000'} />
                        </ButtonModal>

                        <ButtonModal onPress={() => setPhotoPrescicao(photo) || ClearModal()}>
                            <FontAwesome name='upload' size={35} color={'#121212'} />
                        </ButtonModal>
                    </BoxModal>

                    <PhotoImage
                        source={{ uri: photo }}
                    />
                </ViewModal>
            </Modal>

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
        height: '80%',
        width: '100%'
    },
})