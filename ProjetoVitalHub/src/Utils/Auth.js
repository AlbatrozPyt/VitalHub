import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { encode, decode } from "base-64";

if (!global.atob) {
    global.atob = decode
}

if (!global.btoa) {
    global.btoa = encode
}

export const userDecodeToken = async () => {
    const token = JSON.parse(await AsyncStorage.getItem("token")).token;
    console.log(token);

    if (token === null) {
        return null;
    }

    // Decodifica o token recebido
    const decoded = jwtDecode(token)
    console.log("Decodou");

    return {
        name: decoded.name,
        email: decoded.email,
        role: decoded.role
    }
}