import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { useTheme } from "styled-components/native";
import { ExerciseCard } from "../../components/ExerciseCard";
import { Group } from "../../components/Group";
import { HomeHeader } from "../../components/HomeHeader";
import { ExerciseDTO } from '../../dtos/ExerciseDTO';
import { AppNavigatorRoutesProps } from "../../routes/app.routes";
import { api } from '../../services/api';
import { AppError } from '../../utils/AppError';
import { Container, ExerciseList, ExerciseListInfo, ExerciseListTitle } from "./styles";

export function Home() {
    const { colors, fontSizes } = useTheme()
    const navigation = useNavigation<AppNavigatorRoutesProps>()
    const [isLoading, setIsLoading] = useState(true)

    const [groupSelected, setGroupSelected] = useState('antebraço')
    const [exercises, setExercises] = useState<ExerciseDTO[]>([])
    const [groups, setGroups] = useState<string[]>([])

    function handleOpenExerciseDetails(exerciseId: string) {
        navigation.navigate('exercise', { exerciseId })
    }

    async function fetchGroups() {
        try {
            const response = await api.get('/groups')
            setGroups(response.data)
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares.'

            Alert.alert(title)
        }
    }

    async function fetchExercisesByGroup() {
        try {
            setIsLoading(true)

            const response = await api.get(`/exercises/bygroup/${groupSelected}`)
            setExercises(response.data)
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar os exercícios.'

            Alert.alert(title)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchGroups()
    }, [])

    useFocusEffect(useCallback(() => {
        fetchExercisesByGroup()
    }, [groupSelected]))

    return (
        <Container>
            <HomeHeader />

            <FlatList 
                data={groups}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Group 
                        name={item}
                        isActive={groupSelected === item}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 24
                }}
                style={{
                    marginVertical: 40,
                    maxHeight: 40,
                    minHeight: 40
                }}
            />

            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: colors.gray[100] }}>
                        Carregando...
                    </Text>
                </View>
            ) : (
                <View style={{ paddingHorizontal: 24 }}>
                    <ExerciseList>
                        <ExerciseListInfo>
                            <ExerciseListTitle>
                                Exercícios
                            </ExerciseListTitle>

                            <Text style={{ color: colors.gray[200], fontSize: fontSizes.sm }}>
                                {exercises.length}
                            </Text>
                        </ExerciseListInfo>
                    </ExerciseList>

                    <FlatList 
                        data={exercises}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ExerciseCard
                                data={item}
                                onPress={() => handleOpenExerciseDetails(item.id)}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: 20
                        }}
                    />
                </View>
            )}
        </Container>
    )
}