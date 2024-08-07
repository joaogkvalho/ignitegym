import {
    BottomTabNavigationProp,
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import { Platform } from 'react-native'
import { useTheme } from 'styled-components/native'
import HistorySvg from '../assets/history.svg'
import HomeSvg from '../assets/home.svg'
import ProfileSvg from '../assets/profile.svg'
import { Exercise } from '../screens/Exercise'
import { History } from '../screens/History'
import { Home } from '../screens/Home'
import { Profile } from '../screens/Profile'

type AppRoutes = {
    home: undefined
    exercise: { exerciseId: string }
    profile: undefined
    history: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

export function AppRoutes() {
    const { colors, sizes } = useTheme()

    const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

    const iconSize = 24

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.green[500],
                tabBarInactiveTintColor: colors.gray[200],
                tabBarStyle: {
                    backgroundColor: colors.gray[600],
                    borderTopWidth: 0,
                    height: Platform.OS === 'android' ? 'auto' : 96,
                    paddingBottom: 36,
                    paddingTop: 36
                }
            }}
        >
            <Screen 
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HomeSvg fill={color} width={iconSize} height={iconSize} />
                    )
                }}
            />

            <Screen 
                name="history"
                component={History}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HistorySvg fill={color} width={iconSize} height={iconSize} />
                    )
                }}
            />

            <Screen 
                name="profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <ProfileSvg fill={color} width={iconSize} height={iconSize} />
                    )
                }}
            />

            <Screen 
                name="exercise"
                component={Exercise}
                options={{ tabBarButton: () => null }}
            />
        </Navigator>
    )
}