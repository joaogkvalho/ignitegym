import MaterialIcons from "@expo/vector-icons/Entypo";
import { Image, Pressable, PressableProps } from "react-native";
import { useTheme } from "styled-components/native";
import { Content, ExerciseInfo, ExerciseInfoContainer, ExerciseTitle } from "./styles";

type Props = PressableProps & {}

export function ExerciseCard({ ...rest }: Props) {
    const { colors } = useTheme()

    return (
        <Pressable {...rest}>
            <Content>
                <Image
                    source={{
                        uri: 'http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg',
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
                        Remada unilateral
                    </ExerciseTitle>

                    <ExerciseInfo>
                        3 séries x 12 repetições
                    </ExerciseInfo>
                </ExerciseInfoContainer>

                <MaterialIcons name="chevron-thin-right" color={colors.gray[300]} />
            </Content>
        </Pressable>
    )
}