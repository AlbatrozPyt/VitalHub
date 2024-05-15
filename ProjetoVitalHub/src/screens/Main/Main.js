import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home } from "../Home/Home";
import { Perfil } from "../Perfil/Perfil";
import { ContentIcon, TextIcon } from "./style";

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { useEffect, useState } from "react";

const BottomTab = createBottomTabNavigator();

export const Main = () => {

    const [route, setRoute] = useState(route)

    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarStyle: { backgroundColor: "#fff", height: 80, paddingTop: 10 },
                tabBarActiveBackgroundColor: "transparent",
                tabBarShowLabel: false,
                headerShown: false,

                tabBarIcon: ({ focused }) => {
                    if (route.name === "Home") {
                        return (
                            <ContentIcon
                                tabBarActiveBackgroundColor={focused ? "#ECF2FF" : "transparent"}
                            >
                                <FontAwesome name="calendar" size={18} color="#4E4B59" />

                                {focused && <TextIcon>Agenda</TextIcon>}

                                {/* <TextIcon>Agenda</TextIcon> */}
                            </ContentIcon>
                        )

                    } else {
                        return (
                            <ContentIcon
                                tabBarActiveBackgroundColor={focused ? "#ECF2FF" : "transparent"}
                            >
                                <FontAwesome5 name="user-circle" size={18} color="#4E4B59" />

                                {focused && <TextIcon>Perfil</TextIcon>}
                            </ContentIcon>
                        )
                    }
                }
            })}
        >
            <BottomTab.Screen
                name="Home"
                component={Home}
            />

            <BottomTab.Screen
                name="Perfil"
                component={Perfil}
            />
        </BottomTab.Navigator>
    )
}