import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 10px 16px;
`

export const SignInHeader = styled.View`
    align-items: center;
    margin: 96px 0;
`

export const HeaderTitle = styled.Text`
    font-size: ${({ theme }) => theme.fontSizes.sm}px;
    color: ${({ theme }) => theme.colors.white};
`

export const SignInForm = styled.View`
    width: 100%;
    padding: 0 24px;
`

export const SignInFormTitle = styled.Text`
    margin: 42px 0 18px;

    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.xl}px;
    text-align: center;

    color: ${({ theme }) => theme.colors.gray[100]};
`

//**Transformar em componente de Botão**
export const Button = styled.TouchableOpacity`
    width: "100%";
    height: 56px;

    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.colors.green[700]};
    border-radius: 6px;
`

export const ButtonTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.sm}px;
    color: ${({ theme }) => theme.colors.white};
`

export const SignInFooter = styled.View`
    width: 100%;
    margin-top: 96px;
    padding: 0 24px;
`

export const FooterTitle = styled.Text`
    margin-bottom: 12px;
    align-self: center;

    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.sm}px;
    color: ${({ theme }) => theme.colors.gray[100]};
`

//Segunda variante do botão
export const ButtonTrasparent = styled.TouchableOpacity`
    width: "100%";
    height: 56px;

    align-items: center;
    justify-content: center;

    background-color: transparent;

    border: 1px solid ${({ theme }) => theme.colors.green[500]};
    border-radius: 6px;
`