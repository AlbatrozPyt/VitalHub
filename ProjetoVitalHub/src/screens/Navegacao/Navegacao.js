import { Button, View } from "react-native"

export const Navegacao = ({ navigation }) => {
    return (
        <View>
            <Button
                title="Login"
                onPress={() => navigation.navigate("Login")}
            />

            <Button
                title="Recuperar Senha"
                onPress={() => navigation.navigate("RecuperarSenha")}
            />

            <Button
                title="Verificar Email"
                onPress={() => navigation.navigate("VerificarEmail")}
            />

            <Button
                title="Redifinir Senha"
                onPress={() => navigation.navigate("RedifinirSenha")}
            />

            <Button
                title="Criar Conta"
                onPress={() => navigation.navigate("CriarConta")}
            />

            <Button
                title="Perfil"
                onPress={() => navigation.navigate("Perfil")}
            />

            <Button
                title="Home"
                onPress={() => navigation.navigate("Home")}
            />

            <Button
                title="Médico prontuário"
                onPress={() => navigation.navigate("MedicoProntuario")}
            />
           
            <Button
                title="Selecionar clinica"
                onPress={() => navigation.navigate("SelectClinic")}
            />
            
            <Button
                title="Selecionar medico"
                onPress={() => navigation.navigate("SelectMedicoScreen")}
            />
           
            <Button
                title="Selecionar data"
                onPress={() => navigation.navigate("SelectDate")}
            />
           
            <Button
                title="Localização"
                onPress={() => navigation.navigate("Mapa")}
            />
            
            <Button
                title="Prescricao"
                onPress={() => navigation.navigate("Prescricao")}
            />

        </View>
    )
}