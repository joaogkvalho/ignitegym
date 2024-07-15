import styled from "styled-components/native";

export const Container = styled.View`
    align-items: center;
    justify-content: center;
    padding: 64px 0 32px;
    background-color: ${({ theme }) => theme.colors.gray[600]};
`

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.xl}px;
    color: ${({ theme }) => theme.colors.gray[100]};
`