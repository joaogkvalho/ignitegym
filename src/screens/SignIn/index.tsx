import { Alert, Image, ScrollView } from "react-native";
import { Container, FooterTitle, HeaderTitle, SignInFooter, SignInForm, SignInFormTitle, SignInHeader } from "./styles";

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import BackgroundImg from '../../assets/background.png';
import LogoImg from '../../assets/logo.svg';
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/useAuth";
import { AuthNavigatorRoutesProps } from "../../routes/auth.routes";
import { AppError } from "../../utils/AppError";

type FormData = {
    email: string
    password: string
}

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation<AuthNavigatorRoutesProps>()
    
    const { control, handleSubmit } = useForm<FormData>()
    const { signIn } = useAuth()

    function handleCreateNewAccount() {
        navigation.navigate('signUp')
    }

    async function handleSignIn({ email, password }: FormData) {
       try {
            setIsLoading(true)
            await signIn(email, password)            
       } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'

            setIsLoading(false)
            Alert.alert(title)
       }
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

                    <Controller 
                        control={control}
                        name="email"
                        rules={{ required: 'Informe o e-mail' }}
                        render={({ field: { onChange } }) => (
                            <Input 
                                placeholder="E-mail"
                                keyboardType="email-address"
                                onChangeText={onChange}
                                autoCapitalize="none"
                            />
                        )}
                    />

                   <Controller 
                        control={control}
                        name="password"
                        rules={{ required: 'Informe a senha' }}
                        render={({ field: { onChange } }) => (
                            <Input 
                                secureTextEntry
                                placeholder="Senha"
                                onChangeText={onChange}
                            />
                        )}
                   />

                   {isLoading ? (
                        <Button 
                            title="Carregando..."
                        />
                   ) : (
                    <Button
                        title="Acessar" 
                        onPress={handleSubmit(handleSignIn)}
                    />
                   )}
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