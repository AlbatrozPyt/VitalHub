// import da camera
import { Camera, CameraType } from 'expo-camera/legacy'

// import style
import { lastPhoto, BntClose, BoxModal, BoxPhotoView, ButtonFlip, ButtonModal, ButtonPhoto, CameraView, PhotoImage, ViewModal, LastPhoto } from './style'

// import do modal
import { Modal, StatusBar, StyleSheet, Touchable, TouchableOpacity } from 'react-native'

// import do react
import { useEffect, useRef, useState } from 'react'

// Icon
import { FontAwesome } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import * as MediaLibrary from "expo-media-library"
import * as ImagePicker from "expo-image-picker"
import { Button } from '../Button/style'
import { ButtonTitle } from '../ButtonTitle/style'


export const CameraComp = ({
    visible,
    setShowCamera,
    setPhotoPrescicao,
    setGalleryPhoto,
    getMediaLibrary = true
}) => {
    const cameraRef = useRef(null)
    const [tipoCamera, setTipoCamera] = useState(CameraType.back)
    const [photo, setPhoto] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [lastPhoto, setLastPhoto] = useState(null)
    const [flash, setFlash] = useState('off')

    async function GetLatestPhoto() {
        const { assets } = await MediaLibrary.getAssetsAsync(
            { sortBy: [[MediaLibrary.SortBy.creationTime, false]], first: 1 }
        );

        if (assets.length > 0) {
            setLastPhoto(assets[0].uri)
        }
    }

    async function CapturePhotos() {
        if (cameraRef) {
            const photo = await cameraRef.current.takePictureAsync()
            setPhoto(photo.uri)
            setOpenModal(true)

        }
    }

    async function SelectImageGallery() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri)
            setOpenModal(true)
        }
    }

    function ClearModal() {
        setPhoto(null)
        setOpenModal(false)
    }


    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync()
        })();

        if (getMediaLibrary) {
            GetLatestPhoto()
        }

    }, [])


    return (
        <Modal style={styles.container} visible={visible} transparent={true} animationType="fade">
            <Camera
                ref={cameraRef}
                style={styles.camera}
                type={tipoCamera}
                flashMode={flash}
                ratio='16:9'
            >
                <BoxPhotoView>
                    <ButtonPhoto onPress={() => CapturePhotos()}>
                        <FontAwesome name='camera' size={23} color={'#fff'} />
                    </ButtonPhoto>

                    <ButtonPhoto onPress={() => setTipoCamera(tipoCamera == CameraType.front ? CameraType.back : CameraType.front)}>
                        <MaterialIcons name="restart-alt" size={24} color="#fff" />
                    </ButtonPhoto>

                    <ButtonPhoto onPress={() => flash === 'off' ? setFlash('on') : setFlash('off')}>
                        {
                            flash === 'on' ?
                                <MaterialIcons name="flash-on" size={24} color="#fff" />
                                : <MaterialIcons name="flash-off" size={24} color="#fff" />
                        }
                    </ButtonPhoto>

                    <BntClose onPress={() => setShowCamera(false)}>
                        <AntDesign name="close" size={30} color="#fff" />
                    </BntClose>

                    <TouchableOpacity
                        style={styles.lastPhotoButton}
                        onPress={() => SelectImageGallery()}
                    >
                        {
                            lastPhoto !== null && <LastPhoto source={{ uri: lastPhoto }} />
                        }
                    </TouchableOpacity>
                </BoxPhotoView>
            </Camera>

            <Modal animationType='slide' transparent={false} visible={openModal}>
                <ViewModal>

                    <PhotoImage
                        source={{ uri: photo }}
                    />

                    <BoxModal flexColumn={true}>

                        <Button
                            onPress={() => {
                                setGalleryPhoto(photo)
                                ClearModal()
                                setShowCamera(false)
                            }}
                        >
                            <ButtonTitle>Continuar</ButtonTitle>
                        </Button>

                        <Button onPress={() => {
                            ClearModal()
                        }} >
                            <ButtonTitle>Cancelar</ButtonTitle>
                        </Button>
                    </BoxModal>

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
        justifyContent: 'center'
    },
    camera: {
        position: `absolute`,
        flex: 1,
        height: '100%',
        width: '100%'
    },
    lastPhotoButton: {
        position: `absolute`,
        top: 50,
        left: 30
    }
})