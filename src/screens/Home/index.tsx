import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useTheme } from "styled-components/native";
import { ExerciseCard } from "../../components/ExerciseCard";
import { Group } from "../../components/Group";
import { HomeHeader } from "../../components/HomeHeader";
import { AppNavigatorRoutesProps } from "../../routes/app.routes";
import { Container, ExerciseList, ExerciseListInfo, ExerciseListTitle } from "./styles";

export function Home() {
    const { colors, fontSizes } = useTheme()
    const navigation = useNavigation<AppNavigatorRoutesProps>()

    const [groupSelected, setGroupSelected] = useState('Costas')
    const [exercises, setExercises] = useState([
        'Puxada frontal',
        'Remada curvada',
        'Remada lateral',
        'Levantamento terra'
    ])
    const [groups, setGroups] = useState(['Costas', 'Bíceps', 'Tríceps', 'Ombro'])

    function handleOpenExerciseDetails() {
        navigation.navigate('exercise')
      }

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

          <View style={{ flex: 1, paddingHorizontal: 24 }}>
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
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <ExerciseCard onPress={handleOpenExerciseDetails} />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 20
                    }}
                />
          </View>
        </Container>
    )
}