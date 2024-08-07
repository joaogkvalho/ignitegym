import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { StatusBar, View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { AuthContextProvider } from './src/contexts/AuthContext';
import { Routes } from './src/routes';
import theme from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent 
      />
        <AuthContextProvider>
          {fontsLoaded ? <Routes /> : <View />}
        </AuthContextProvider>
    </ThemeProvider>
  );
}
