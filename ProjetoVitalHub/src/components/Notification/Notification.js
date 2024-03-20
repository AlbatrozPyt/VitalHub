
//--------------------Notification
// 1º importar os recursos do expo notification
import * as Notifications from "expo-notifications";

// 2º pedir permissão ao usuário para notificar
Notifications.requestPermissionsAsync();

// 4º Definir como asnotificações devem ser tratadas qnd recebidas
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    //Mostar alerta quando a notificação for recebida
    shouldShowAlert: true,

    // Reproduz som ao receber notificação
    shouldPlaySound: true,

    // Número de notificações no icone do app
    shouldSetBadge: false
  })
})
//--------------------Notification

export const handleCallNotifications = async () => {
    // Obtém status das permissões
    const { status } = await Notifications.getPermissionsAsync();

    // Verifica se o usuário concedeu permissão
    if (status !== "granted") {
      alert("Você não deixou as notificações ativas")
      return;
    }

    // Ageda uma notficação
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Consulta cancelada",
        body: "Sua consulta foi cancelada",
        sound: true
      },
      trigger: null
    })
  }