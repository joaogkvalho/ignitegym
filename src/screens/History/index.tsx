import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Alert, SectionList, Text, View } from "react-native";
import { useTheme } from "styled-components/native";
import { HistoryCard } from "../../components/HistoryCard";
import { ScreenHeader } from "../../components/ScreenHeader";
import { HistoryByDayDTO } from "../../dtos/HistoryByDayDTO";
import { api } from "../../services/api";
import { AppError } from "../../utils/AppError";
import { Container, Heading } from "./styles";

export function History() {
    const { colors } = useTheme()

    const [isLoading, setIsLoading] = useState(true)
    const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])

    async function fetchHistory() {
        try {
            setIsLoading(true)

            const response = await api.get('/history')
            setExercises(response.data)
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar o histórico.'

            Alert.alert(title)
        } finally {
            setIsLoading(false)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchHistory()
    }, []))

    return (
        <Container>
            <ScreenHeader title="Histórico de Exercícios" />

           {isLoading ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#fff' }}>
                    Carregando...
                </Text>
            </View>
           ) : (
             <SectionList 
                sections={exercises}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <HistoryCard data={item} />}
                renderSectionHeader={({ section }) => (
                    <Heading>
                        {section.title}
                    </Heading>
                )}
                style={{ paddingHorizontal: 32 }}
                contentContainerStyle={
                    exercises.length === 0 && { flex: 1, justifyContent: 'center' }
                }
                ListEmptyComponent={() => (
                    <Text style={{ color: colors.gray[100], textAlign: 'center' }}>
                        Não há exercícios registrados ainda. {'\n'}
                        Vamos fazer exercícios hoje?
                    </Text>
                )}
            />
           )}
        </Container>
    )
}