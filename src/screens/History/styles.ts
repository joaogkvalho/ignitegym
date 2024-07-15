import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
`

export const Heading = styled.Text`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.md}px;
    color: ${({ theme }) => theme.colors.gray[200]};
    margin: 40px 0 12px;
`