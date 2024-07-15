import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { AppRoutes } from "./app.routes";

let NavTheme = DefaultTheme

export function Routes() {
    const { colors } = useTheme()
    NavTheme.colors.background = colors.gray[700]

    return (
       <View style={{ flex: 1, backgroundColor: colors.gray[700] }}>
            <NavigationContainer theme={NavTheme}>
                <AppRoutes />
            </NavigationContainer>
       </View>
    )
}