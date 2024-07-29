import MaterialIcons from "@expo/vector-icons/Feather";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "styled-components/native";
import BodySvg from '../../assets/body.svg';
import RepetitionSvg from '../../assets/repetitions.svg';
import SeriesSvg from '../../assets/series.svg';
import { Button } from "../../components/Button";
import { ExerciseDTO } from "../../dtos/ExerciseDTO";
import { api } from "../../services/api";
import { AppError } from "../../utils/AppError";
import { Container, ExerciseContent, ExerciseHeader, ExerciseInfo, ExerciseRoutineInfo, ExerciseRoutineInfoContent, ExerciseTitle, ExerciseType } from "./styles";

type RouteParamsProps = {
    exerciseId: string
}

export function Exercise() {
    const [sendingRegister, setSendingRegister] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)

    const navigation = useNavigation()
    const route = useRoute()

    const { exerciseId } = route.params as RouteParamsProps
    const { colors } = useTheme()

    function handleGoBack() {
        navigation.goBack()
    }

    async function fetchExerciseDetails() {
        try {
            setIsLoading(true)

            const response = await api.get(`/exercises/${exerciseId}`)
            setExercise(response.data)
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício.'

            Alert.alert(title)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleExerciseHistoryRegister() {
        try {
            setSendingRegister(true)

            await api.post('/history', { exercise_id: exerciseId })
            Alert.alert('Parabéns! Exercício registrado no seu histórico')

            navigation.navigate('history' as never)
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível registrar o exercício.'

            Alert.alert(title)
        } finally {
            setSendingRegister(false)
        }
    }

    useEffect(() => {
        fetchExerciseDetails()
    }, [exerciseId])

    return (
        <Container>
            <ExerciseHeader>
                <TouchableOpacity style={{ marginLeft: -4 }} onPress={handleGoBack}>
                    <MaterialIcons name="arrow-left" color={colors.green[500]} size={24} />
                </TouchableOpacity>

                <ExerciseInfo>
                    <ExerciseTitle>
                        {exercise.name}
                    </ExerciseTitle>

                    <ExerciseType>
                        <BodySvg />

                        <Text style={{ color: colors.gray[200], marginLeft: 4, textTransform: 'capitalize' }}>
                            {exercise.group}
                        </Text>
                    </ExerciseType>
                </ExerciseInfo>
            </ExerciseHeader>

            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: colors.gray[100] }}>
                        Carregando...
                    </Text>
                </View>
            ) : (
                <ScrollView>
                    <ExerciseContent>
                        <View style={{
                            marginBottom: 12,
                            borderRadius: 8,
                            overflow: 'hidden'
                        }}>
                            <Image
                                source={{
                                    uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                                }}
                                alt="Nome do exercício"
                                resizeMode="cover"
                                style={{
                                    width: '100%',
                                    height: 320,
                                    borderRadius: 12
                                }}
                            />
                        </View>

                        <ExerciseRoutineInfo>
                            <ExerciseRoutineInfoContent>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <SeriesSvg />
                                    <Text style={{ color: colors.gray[200], marginLeft: 8 }}>
                                        {exercise.series} séries
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RepetitionSvg />
                                    <Text style={{ color: colors.gray[200], marginLeft: 8 }}>
                                        {exercise.repetitions} repetições
                                    </Text>
                                </View>
                            </ExerciseRoutineInfoContent>

                            {sendingRegister ? (
                                <Button 
                                    title="Carregando..."
                                />
                            ) : (
                                <Button
                                    onPress={handleExerciseHistoryRegister}
                                    title="Marcar como realizado"                                        
                                />
                            )}
                        </ExerciseRoutineInfo>
                    </ExerciseContent>
                </ScrollView>
            )}
        </Container>
    )
}