import { Image, ScrollView } from "react-native";
import { Button, ButtonTitle, ButtonTrasparent, Container, FooterTitle, HeaderTitle, SignInFooter, SignInForm, SignInFormTitle, SignInHeader } from "./styles";

import BackgroundImg from '../../assets/background.png';
import LogoImg from '../../assets/logo.svg';
import { Input } from "../../components/Input";

export function SignIn() {
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
                    <Input placeholder="Senha" />

                    <Button>
                        <ButtonTitle>
                            Acessar
                        </ButtonTitle>
                    </Button>
                </SignInForm>

                <SignInFooter>
                    <FooterTitle>
                        Ainda não tem acesso?
                    </FooterTitle>

                    <ButtonTrasparent>
                        <ButtonTitle>
                            Criar conta
                        </ButtonTitle>
                    </ButtonTrasparent>
                </SignInFooter>
            </Container>
        </ScrollView>
    )
}