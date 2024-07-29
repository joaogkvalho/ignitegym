import MaterialIcons from "@expo/vector-icons/Entypo";
import { Image, Pressable, PressableProps } from "react-native";
import { useTheme } from "styled-components/native";
import { ExerciseDTO } from "../../dtos/ExerciseDTO";
import { api } from "../../services/api";
import { Content, ExerciseInfo, ExerciseInfoContainer, ExerciseTitle } from "./styles";

type Props = PressableProps & {
    data: ExerciseDTO
}

export function ExerciseCard({ data, ...rest }: Props) {
    const { colors } = useTheme()

    return (
        <Pressable {...rest}>
            <Content>
                <Image
                    source={{
                        uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
                    }}
                    alt="Imagem de exercício"
                    style={{
                        width: 64,
                        height: 64,
                        borderRadius: 4,
                        marginRight: 16,
                        resizeMode: 'cover'
                    }}
                />

                <ExerciseInfoContainer>
                    <ExerciseTitle>
                        {data.name}
                    </ExerciseTitle>

                    <ExerciseInfo>
                        {data.series} séries x {data.repetitions} repetições
                    </ExerciseInfo>
                </ExerciseInfoContainer>

                <MaterialIcons name="chevron-thin-right" color={colors.gray[300]} />
            </Content>
        </Pressable>
    )
}