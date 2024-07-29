import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import defaultUserPhotoImg from '../../assets/userPhotoDefault.png';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../services/api';
import { UserPhoto } from "../UserPhoto";
import { Container, UserInfo, UserName } from "./styles";

export function HomeHeader() {
    const { colors, fontSizes } = useTheme()
    const { user, signOut } = useAuth()

    return (
        <Container>
            <UserPhoto 
                source={
                    user.avatar
                    ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                    : defaultUserPhotoImg
                }
                size={64}
                alt="Imagem do usuário"
            />

            <UserInfo>
                <Text style={{ color: colors.gray[100], fontSize: fontSizes.md }}>
                    Olá,
                </Text>

                <UserName>
                    {user.name}
                </UserName>
            </UserInfo>
            <TouchableOpacity onPress={signOut}>
                <MaterialIcons 
                    name="logout" 
                    color={colors.gray[200]} size={28} 
                />
            </TouchableOpacity>
        </Container>
    )
}