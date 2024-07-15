import styled from "styled-components/native";

export const Content = styled.View`
    align-items: center;
    flex-direction: row;
    padding: 8px;
    padding-right: 16px;
    border-radius: 4px;
    margin-bottom: 12px;
    background-color: ${({ theme }) => theme.colors.gray[500]};
`

export const ExerciseInfoContainer = styled.View`
    flex: 1;
`

export const ExerciseTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.lg}px;
    color: ${({ theme }) => theme.colors.white};
`
export const ExerciseInfo = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes.sm}px;
    color: ${({ theme }) => theme.colors.gray[200]};
`