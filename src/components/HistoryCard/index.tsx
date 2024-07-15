import { Text, View } from "react-native";
import { useTheme } from "styled-components/native";
import { Container, Description, Title } from "./styles";

export function HistoryCard() {
    const { colors, fontSizes } = useTheme()

    return (
        <Container>
            <View style={{ flex: 1, marginRight: 20, gap: 4 }}>
                <Title numberOfLines={1}>
                    Costas
                </Title>
                <Description numberOfLines={1}>
                    Puxada frontal
                </Description>
            </View>

            <Text style={{ color: colors.gray[300], fontSize: fontSizes.md}}>
                08:56
            </Text>
        </Container>
    )
}