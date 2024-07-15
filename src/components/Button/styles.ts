import { Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY'

type Props = {
    type: ButtonTypeStyleProps
}

export const Container = styled(TouchableOpacity)<Props>`
    width: "100%";
    height: 56px;

    align-items: center;
    justify-content: center;

    background-color: ${({ theme, type }) => type === 'PRIMARY' ? theme.colors.green[700] : 'transparent'};

    border: 1px solid ${({ theme, type }) => type === 'SECONDARY' ? theme.colors.green[500] : 'transparent'};
    border-radius: 6px;
`

export const Title = styled(Text)<Props>`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.sm}px;
    color: ${({ theme, type }) => type === 'PRIMARY' ? theme.colors.white : theme.colors.green[500]};
`