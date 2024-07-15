import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
`

export const ExerciseHeader = styled.View`
    padding: 64px 32px 0;
    background-color: ${({ theme }) => theme.colors.gray[600]};
`

export const ExerciseInfo = styled.View`
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-top: 16px;
    margin-bottom: 32px;
`

export const ExerciseTitle = styled.Text`
    flex-shrink: 1;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.lg}px;
    color: ${({ theme }) => theme.colors.gray[100]};
`

export const ExerciseType = styled.View`
    align-items: center;
    flex-direction: row;
`

export const ExerciseContent = styled.View`
    padding: 32px;
`

export const ExerciseRoutineInfo = styled.View`
    background-color: ${({ theme }) => theme.colors.gray[600]};
    border-radius: 8px;
    padding: 0 16px 16px;
`

export const ExerciseRoutineInfoContent = styled.View`
    flex: 1;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    margin: 24px 0 20px;
`