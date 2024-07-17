import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import { useTheme } from "styled-components/native";
import { useAuth } from "../hooks/useAuth";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

let NavTheme = DefaultTheme

export function Routes() {
    const { colors } = useTheme()
    const { user, isLoadingUserStorageData } = useAuth()    

    NavTheme.colors.background = colors.gray[700]

    if (isLoadingUserStorageData) {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#202024'
            }}>
                <Text style={{ fontSize: 16, color: '#fff' }}>
                    Carregando...
                </Text>
            </View>
        )
    }

    return (
       <View style={{ flex: 1, backgroundColor: colors.gray[700] }}>
            <NavigationContainer theme={NavTheme}>
                {user.id ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
       </View>
    )
}