import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
`

export const Title = styled.Text`
    font-size: 24px;
    color: white;
`

export const ExerciseList = styled.View`
    flex: 1;
`

export const ExerciseListInfo = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
`

export const ExerciseListTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.colors.gray[200]};
`