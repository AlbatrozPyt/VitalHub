import { StatusBar } from 'expo-status-bar';

// Import do navigator
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Navegacao } from './src/screens/Navegacao/Navegacao';

// Import das fonts
import { useFonts } from 'expo-font';
import {
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,

} from '@expo-google-fonts/quicksand';
import {
  MontserratAlternates_500Medium,
  MontserratAlternates_600SemiBold,
  MontserratAlternates_700Bold,

} from '@expo-google-fonts/montserrat-alternates';

// Import dos components
import { Login } from './src/screens/Login/Login';
import { RecuperarSenha } from './src/screens/RecuperarSenha/RecuperarSenha';
import { CriarConta } from './src/screens/CriarConta/CriarConta';
import { VerificarEmail } from './src/screens/VerificarEmail/VerificarEmail';
import { RedifinirSenha } from './src/screens/RedifinirSenha/RedifinirSenha';
import { Perfil } from './src/screens/Perfil/Perfil';
import { Home } from './src/screens/Home/Home';
import { MedicoProntuario } from './src/screens/MedicoProntuario/MedicoProntuario';
import { SelectClinic } from './src/screens/SelectClinic/SelectClinic';
import { SelectMedicoScreen } from './src/screens/SelectMedicoScreen/SelectMedicoScreen';
import { SelectDate } from './src/screens/SelectDate/SelectDate';
import { Mapa } from './src/screens/Mapa/Mapa';
import { Prescricao } from './src/screens/Prescricao/Prescricao';
import { Main } from './src/screens/Main/Main';


import * as MediaLibrary from "expo-media-library"
import * as ImagePicker from "expo-image-picker"
import { Camera } from 'expo-camera';
import { useEffect } from 'react';


// Tira os logs do app

// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(["Warning: ..."])
// LogBox.ignoreAllLogs()

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    MontserratAlternates_500Medium,
    MontserratAlternates_600SemiBold,
    MontserratAlternates_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  async function requestGaleria() {
    await MediaLibrary.requestPermissionsAsync();
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  }

  // useEffect(() => requestGaleria(), [])

  return (
    //Estrututura 
    // Container
    // Navigator
    // Screen - Tela
    //name: nome da tela
    //component: componente que será chamado
    //options(title): titulo da tela

    <NavigationContainer>

      <Stack.Navigator>
        {/* <Stack.Screen
          name="Navegacao"
          component={Navegacao}
          options={{ title: "Navegacao" }}
        /> */}

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login", headerShown: false }}
        />

        <Stack.Screen
          name='Main'
          component={Main}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="RecuperarSenha"
          component={RecuperarSenha}
          options={{ title: "Recuperar Senha", headerShown: false }}
        />

        <Stack.Screen
          name="CriarConta"
          component={CriarConta}
          options={{ title: "Criar Conta", headerShown: false }}
        />

        <Stack.Screen
          name="VerificarEmail"
          component={VerificarEmail}
          options={{ title: "Verificar Email", headerShown: false }}
        />

        <Stack.Screen
          name="RedifinirSenha"
          component={RedifinirSenha}
          options={{ title: "Redifinir Senha", headerShown: false }}
        />

        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{ title: "Perfil", headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home", headerShown: false }}
        />

        <Stack.Screen
          name="MedicoProntuario"
          component={MedicoProntuario}
          options={{ title: "Medico Prontuario", headerShown: false }}
        />

        <Stack.Screen
          name="SelectClinic"
          component={SelectClinic}
          options={{ title: "SelectClinic", headerShown: false }}
        />


        <Stack.Screen
          name="SelectMedicoScreen"
          component={SelectMedicoScreen}
          options={{ title: "SelectMedicoScreen", headerShown: false }}
        />

        <Stack.Screen
          name="SelectDate"
          component={SelectDate}
          options={{ title: "SelectDate", headerShown: false }}
        />

        <Stack.Screen
          name="Mapa"
          component={Mapa}
          options={{ title: "Mapa", headerShown: false }}
        />

        <Stack.Screen
          name="Prescricao"
          component={Prescricao}
          options={{ title: "Prescricao", headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
