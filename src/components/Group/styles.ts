import { Text } from 'react-native'
import styled from 'styled-components/native'

type Props = {
    isActive: boolean
}

export const GroupButton = styled.Pressable`
    margin-right: 12px;
    width: 96px;
    height: 40px;
    background-color: ${({ theme }) => theme.colors.gray[600]};
    border-radius: 4px;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`

export const ExerciseName = styled(Text)<Props>`
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fontSizes.xs}px;
    font-weight: bold;
    color: ${({ theme, isActive }) => isActive ? theme.colors.green[500] : theme.colors.gray[200]};
`