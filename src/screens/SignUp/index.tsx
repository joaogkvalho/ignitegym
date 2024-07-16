import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, ScrollView } from "react-native";
import * as yup from 'yup';
import BackgroundImage from "../../assets/background.png";
import LogoImg from "../../assets/logo.svg";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { api } from '../../services/api';
import { AppError } from '../../utils/AppError';
import { Container, HeaderTitle, SignInFooter, SignInForm, SignInFormTitle, SignInHeader } from "./styles";

type FormDataProps = {
    name: string
    email: string
    password: string
    password_confirm: string
  }

const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome'),
    email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
    password: yup
    .string()
    .required('Informe a senha')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
    password_confirm: yup
    .string()
    .required('Confirme a senha.')
    .oneOf([yup.ref('password')], 'A confirmação da senha não confere'),
})

export function SignUp() {
    const navigation = useNavigation()

    function handleBack() {
        navigation.goBack()
    }

    const { 
        control,
        handleSubmit,
    } = useForm<FormDataProps>({ 
        resolver: yupResolver(signUpSchema)
    })

    async function handleSignUp({ name, email, password }: FormDataProps) {
        try {
            const response = await api.post('/users', { name, email, password })
            console.log(response.data)
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde.'

            Alert.alert(title)
        }
    }

    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            showsVerticalScrollIndicator={false}
        >
            <Image
                source={BackgroundImage}
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
                        Crie sua conta
                    </SignInFormTitle>

                    <Controller 
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                                placeholder="Nome" 
                                onChangeText={onChange}
                                value={value} 
                            />
                        )}
                    />

                    <Controller 
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input 
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />

                   <Controller 
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                   />

                   <Controller 
                        control={control}
                        name="password_confirm"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Confirmar a Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                returnKeyType="send"
                            />
                        )}
                   />

                    <Button
                        title="Criar e acessar"
                        onPress={handleSubmit(handleSignUp)}
                    />
                </SignInForm>

                <SignInFooter>
                    <Button 
                        title="Voltar para o login"
                        type="SECONDARY"
                        onPress={handleBack}
                    />
                </SignInFooter>
            </Container>
        </ScrollView>
    )
}