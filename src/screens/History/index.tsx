import { useState } from "react";
import { SectionList, Text } from "react-native";
import { useTheme } from "styled-components/native";
import { HistoryCard } from "../../components/HistoryCard";
import { ScreenHeader } from "../../components/ScreenHeader";
import { Container, Heading } from "./styles";

export function History() {
    const { colors } = useTheme()

    const [exercises, setExercises] = useState([
        {
            title: '26.08.22',
            data: ['Puxada frontal', 'Remada unilateral'],
        },
        {
            title: '27.08.22',
            data: ['Puxada frontal']
        }
    ])

    return (
        <Container>
            <ScreenHeader title="Histórico de Exercícios" />

            <SectionList 
                sections={exercises}
                keyExtractor={(item) => item}
                renderItem={({ item }) => <HistoryCard />}
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
        </Container>
    )
}