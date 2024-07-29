import { Text, View } from "react-native";
import { useTheme } from "styled-components/native";
import { HistoryDTO } from "../../dtos/HistoryDTO";
import { Container, Description, Title } from "./styles";

type Props = {
    data: HistoryDTO
}

export function HistoryCard({ data }: Props) {
    const { colors, fontSizes } = useTheme()

    return (
        <Container>
            <View style={{ flex: 1, marginRight: 20, gap: 4 }}>
                <Title numberOfLines={1}>
                    {data.group}
                </Title>
                <Description numberOfLines={1}>
                    {data.name}
                </Description>
            </View>

            <Text style={{ color: colors.gray[300], fontSize: fontSizes.md}}>
                {data.hour}
            </Text>
        </Container>
    )
}