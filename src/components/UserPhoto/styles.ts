import { Image } from "react-native";
import styled from "styled-components/native";

type Props = {
    size: number
}

export const UserImage = styled(Image)<Props>`
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    margin-right: 16px;
    border-radius: 999px;
    border: 2px solid ${({ theme }) => theme.colors.gray[400]}
`