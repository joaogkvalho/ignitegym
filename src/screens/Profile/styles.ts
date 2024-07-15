import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
`

export const Content = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: 24px;
    padding: 0 40px;
`

export const Title = styled.Text`
    align-self: flex-start;
    margin: 28px 0 12px;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.md}px;
    color: ${({ theme }) => theme.colors.gray[200]};
`