import styled from 'styled-components/native'

export const Container = styled.View`
    align-items: center;
    flex-direction: row;
    padding: 64px 32px 20px;
    background-color: ${({ theme }) => theme.colors.gray[600]};
`

export const UserInfo = styled.View`
    flex: 1;
`

export const UserName = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes.md}px;
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.gray[100]};
`