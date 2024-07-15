import { Image, ScrollView } from "react-native";
import { Container, FooterTitle, HeaderTitle, SignInFooter, SignInForm, SignInFormTitle, SignInHeader } from "./styles";

import { useNavigation } from "@react-navigation/native";
import BackgroundImg from '../../assets/background.png';
import LogoImg from '../../assets/logo.svg';
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";

export function SignIn() {
    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    function handleSignIn() {
        console.log("SignIn feito!")
    }

    function handleCreateNewAccount() {
        navigation.navigate('signUp')
    }

    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}
        >
            <Image 
                source={BackgroundImg}
                alt="Pessoas treinando"
                style={{
                    position: 'absolute',
                    resizeMode: 'contain'
                }}
            />

            <Container>
                <SignInHeader>
                    <LogoImg />

                    <HeaderTitle>
                        Treine sua mente e o seu corpo.
                    </HeaderTitle>
                </SignInHeader>

                <SignInForm>
                    <SignInFormTitle>
                        Acesse a conta
                    </SignInFormTitle>

                    <Input placeholder="E-mail" />

                    <Input 
                        placeholder="Senha"
                        secureTextEntry
                    />

                    <Button
                        title="Acessar" 
                        onPress={handleSignIn} 
                    />
                </SignInForm>

                <SignInFooter>
                    <FooterTitle>
                        Ainda não tem acesso?
                    </FooterTitle>

                    <Button 
                        title="Criar conta" 
                        type="SECONDARY"
                        onPress={handleCreateNewAccount}
                    />
                </SignInFooter>
            </Container>
        </ScrollView>
    )
}