import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import { UserPhoto } from "../UserPhoto";
import { Container, UserInfo, UserName } from "./styles";

export function HomeHeader() {
    const { colors, fontSizes } = useTheme()

    return (
        <Container>
            <UserPhoto 
                source={{ uri: 'https://github.com/joaogkvalho.png' }}
                size={64}
                alt="Imagem do usuário"
            />

            <UserInfo>
                <Text style={{ color: colors.gray[100], fontSize: fontSizes.md }}>
                    Olá,
                </Text>

                <UserName>
                    João Gabriel
                </UserName>
            </UserInfo>
            <TouchableOpacity>
                <MaterialIcons name="logout" color={colors.gray[200]} size={28} />
            </TouchableOpacity>
        </Container>
    )
}