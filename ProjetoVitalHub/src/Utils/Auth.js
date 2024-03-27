import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { encode, decode } from "base-64";

if( !global.atob ){
    global.atob = decode
}

if( !global.btoa ){
    global.btoa = encode
}

export const userDecodeToken = async () => {
    const token = await AsyncStorage.getItem("token")

    if (token === null) {
        return null;
    }

    // Decodifica o token recebido
    const decoded = jwtDecode(token)

    return{
        name : decoded.name, 
        email: decoded.email,
        role : decoded.role
    }
}