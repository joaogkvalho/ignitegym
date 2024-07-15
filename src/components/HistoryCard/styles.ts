import styled from "styled-components/native";

export const Container = styled.View`
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding: 18px 24px;
    margin-bottom: 12px;
    background-color: ${({ theme }) => theme.colors.gray[600]};
    border-radius: 6px;
`

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.sm}px;
    color: ${({ theme }) => theme.colors.white};
    text-transform: capitalize;
`

export const Description = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes.lg}px;
    color: ${({ theme }) => theme.colors.gray[100]};
`