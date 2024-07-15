import MaterialIcons from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";
import BodySvg from '../../assets/body.svg';
import RepetitionSvg from '../../assets/repetitions.svg';
import SeriesSvg from '../../assets/series.svg';
import { Button } from "../../components/Button";
import { Container, ExerciseContent, ExerciseHeader, ExerciseInfo, ExerciseRoutineInfo, ExerciseRoutineInfoContent, ExerciseTitle, ExerciseType } from "./styles";

export function Exercise() {
    const navigation = useNavigation()
    const { colors } = useTheme()

    function handleGoBack() {
        navigation.goBack()
    }

    return (
        <Container>
            <ExerciseHeader>
                <TouchableOpacity style={{ marginLeft: -4 }} onPress={handleGoBack}>
                    <MaterialIcons name="arrow-left" color={colors.green[500]} size={24} />
                </TouchableOpacity>

                <ExerciseInfo>
                    <ExerciseTitle>
                        Puxada frontal
                    </ExerciseTitle>

                    <ExerciseType>
                        <BodySvg />

                        <Text style={{ color: colors.gray[200], marginLeft: 4, textTransform: 'capitalize' }}>
                            Costas
                        </Text>
                    </ExerciseType>
                </ExerciseInfo>
            </ExerciseHeader>

            <ScrollView>
                <ExerciseContent>
                    <Image
                        source={{
                            uri: 'http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg',
                        }}
                        alt="Nome do exercício"
                        resizeMode="cover"
                        style={{
                            width: '100%',
                            height: 320,
                            marginBottom: 12,
                            borderRadius: 12
                        }}
                    />

                    <ExerciseRoutineInfo>
                        <ExerciseRoutineInfoContent>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <SeriesSvg />
                                <Text style={{ color: colors.gray[200], marginLeft: 8 }}>
                                    3 séries
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RepetitionSvg />
                                <Text style={{ color: colors.gray[200], marginLeft: 8 }}>
                                    12 repetições
                                </Text>
                            </View>
                        </ExerciseRoutineInfoContent>

                        <Button title="Marcar como realizado" />
                    </ExerciseRoutineInfo>
                </ExerciseContent>
            </ScrollView>
        </Container>
    )
}