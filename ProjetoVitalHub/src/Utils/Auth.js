import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { encode, decode } from "base-64";
<<<<<<< HEAD
import { useState } from "react";
=======
import { useEffect, useState } from "react";
import api from "../services/services";
>>>>>>> Pedro

if (!global.atob) {
    global.atob = decode
}

if (!global.btoa) {
    global.btoa = encode
}



export const userDecodeToken = async () => {
    const token = JSON.parse(await AsyncStorage.getItem("token")).token;

    // Verificar se o token tem algo
    if (token === null) {
        return null;
    }


    // Decodifica o token recebido
    const decoded = jwtDecode(token)

<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> Pedro
    return {
        id: decoded.jti,
        name: decoded.name,
        email: decoded.email,
<<<<<<< HEAD
        role: decoded.role,
=======
        role: decoded.role
=======
    // // buscar usuário
    let fotoPerfil = "https://blobvitalhubg15.blob.core.windows.net/containervitalhubpedro/imagemPadrao.jpg"
    if (decoded != null) {
        await api.get(`/Usuario/BuscarPorId?id=${decoded.jti}`)
        .then( response => {
            fotoPerfil = response.data.foto

            console.log(response.data.foto);
        }).catch(error => {
            console.log(error);
        })
    }

    return {
        id: decoded.jti,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        foto: fotoPerfil
>>>>>>> c326ea71aa18bec168ac805690097f57f9dd75a3
>>>>>>> Pedro
    }
}