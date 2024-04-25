import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { encode, decode } from "base-64";
import { useEffect, useState } from "react";
import api from "../services/services";

if (!global.atob) {
    global.atob = decode
}

if (!global.btoa) {
    global.btoa = encode
}

export const userDecodeToken = async () => {
    const token = JSON.parse(await AsyncStorage.getItem("token")).token;
    console.log(token);

    // Verificar se o token tem algo
    if (token === null) {
        return null;
    }

    // Decodifica o token recebido
    const decoded = jwtDecode(token)
    console.log("Decodou");

<<<<<<< HEAD
<<<<<<< HEAD
    return {
        name: decoded.name,
=======
    return{
        id: decoded.jti,
        name : decoded.name, 
>>>>>>> b0c023c0d0514a6f345d32c4c4ea3b6639a03974
        email: decoded.email,
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
    }
}