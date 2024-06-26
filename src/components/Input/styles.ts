import { TextInput } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled(TextInput)`
    height: 56px;
    justify-content: center;

    margin-bottom: 12px;
    padding: 16px;

    background-color: ${({ theme }) => theme.colors.gray[700]};
    border-radius: 6px;
`