import { Image, ScrollView, Text } from "react-native";
import { Button, ButtonTitle, ButtonTrasparent, Container, FooterTitle, HeaderTitle, Input, SignInFooter, SignInForm, SignInFormTitle, SignInHeader } from "./styles";

import BackgroundImg from '../../assets/background.png';
import LogoImg from '../../assets/logo.svg';

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

                    <Input>
                        <Text style={{ color: "#7C7C8A", fontSize: 15 }}>
                            E-mail
                        </Text>
                    </Input>

                    <Input>
                        <Text style={{ color: "#7C7C8A", fontSize: 15 }}>
                            Senha
                        </Text>
                    </Input>
                    

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