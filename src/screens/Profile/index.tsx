import { useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, Text, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import * as yup from 'yup';
import defaultUserPhotoImg from '../../assets/userPhotoDefault.png';
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { ScreenHeader } from "../../components/ScreenHeader";
import { UserPhoto } from "../../components/UserPhoto";
import { Container, Content, Title } from "./styles";

import { yupResolver } from "@hookform/resolvers/yup";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { AppError } from "../../utils/AppError";

type FormDataProps = {
    name: string
    email: string
    password: string
    old_password: string
    confirm_password: string
}

const profileSchema = yup.object({
    name: yup.string().required('Informe o nome.'),
    password: yup.string()
        .min(6, 'A senha deve ter pelo menos 6 dígitos.')
        .nullable()
        .transform((value) => !!value ? value : null),
    confirm_password: yup.string()
        .nullable()
        .transform((value) => !!value ? value : null)
        .oneOf([yup.ref('password')], 'A confirmação de senha não confere.')
        .when('password', {
            is: (Field: any) => Field,
            then: (schema) => schema.nullable()
                .required('Informe a confirmação da senha.')
                .transform((value) => !!value ? value : null),
        })
})

export function Profile() {
    const { sizes, colors, fontSizes } = useTheme()
    const PHOTO_SIZE = sizes[33]

    const [isUpdating, setIsUpdating] = useState(false)
    const [photoIsLoading, setPhotoIsLoading] = useState(false)

    const { user, updateUserProfile } = useAuth()
    const { control, handleSubmit } = useForm<FormDataProps>({
        defaultValues: {
            name: user.name,
            email: user.email
        },
        resolver: yupResolver(profileSchema  as any)
    })
    
    async function handleUserPhotoSelected() {
        setPhotoIsLoading(true)

        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true
            })

            if (photoSelected.canceled) {
                return
            }

            if (photoSelected.assets[0].uri) {
                const photoInfo = await FileSystem.getInfoAsync(
                    photoSelected.assets[0].uri,
                )

                if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
                    return Alert.alert(
                        'Essa imagem é muito grande. Escolha uma de até 5MB.',
                    )
                }

                const fileExtension = photoSelected.assets[0].uri.split('.').pop()
                
                const photoFile = {
                    name: `${user.name}.${fileExtension}`.toLowerCase(),
                    uri: photoSelected.assets[0].uri,
                    type: `${photoSelected.assets[0].type}/${fileExtension}`
                } as any

                const userPhotoUploadForm = new FormData()
                userPhotoUploadForm.append('avatar', photoFile)

                const avatarUpdatedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })

                const userUpdated = user
                userUpdated.avatar = avatarUpdatedResponse.data.avatar
                updateUserProfile(userUpdated)

                Alert.alert('Foto atualizada com sucesso!')
            }
        } catch(error: any) {
            console.log(error)
        } finally {
            setPhotoIsLoading(false)
        }
    }

    async function handleProfileUpdate(data: FormDataProps) {
        try {
            setIsUpdating(true)

            const userUpdated = user
            userUpdated.name = data.name

            await api.put('/users', data)
            await updateUserProfile(userUpdated)

            Alert.alert('Perfil atualizado com sucesso')
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente novamente mais tarde'

            Alert.alert(title)
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <Container>
            <ScreenHeader title="Perfil" />

            <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
                <Content>
                    <UserPhoto 
                        source={
                            user.avatar
                            ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                            : defaultUserPhotoImg
                        }
                        alt="Foto do usuário"
                        style={{ marginRight: 0 }}
                        size={PHOTO_SIZE}
                    />

                    <TouchableOpacity onPress={handleUserPhotoSelected}>
                        <Text style={{ 
                            fontSize: fontSizes.md, 
                            fontWeight: 'bold',
                            color: colors.green[500],
                            marginTop: 8,
                            marginBottom: 32
                        }}>
                            Alterar foto
                        </Text>
                    </TouchableOpacity>
                    
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { value, onChange }}) => (
                            <Input
                                onChangeText={onChange}
                                value={value}
                                style={{ 
                                    width: '100%', 
                                    backgroundColor: colors.gray[600] 
                                }}
                                placeholder="Nome" 
                            />
                        )}
                    />

                    <Controller 
                        control={control}
                        name="email"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                onChangeText={onChange}
                                value={value}
                                style={{ 
                                    width: '100%',
                                    color: colors.gray[300],
                                    backgroundColor: colors.gray[600] 
                                }}
                                placeholder="E-mail"
                            />
                        )}
                    />

                    <Title>
                        Alterar senha
                    </Title>
 
                    <Controller 
                        control={control}
                        name="old_password"
                        render={({ field: { onChange } }) => (
                            <Input
                                onChangeText={onChange}
                                style={{ 
                                    width: '100%', 
                                    backgroundColor: colors.gray[600] 
                                }}
                                placeholder="Senha antiga" 
                                secureTextEntry
                            />
                        )}
                    />
                    
                    <Controller 
                        control={control}
                        name="password"
                        render={({ field: { onChange } }) => (
                            <Input
                                onChangeText={onChange}
                                style={{ 
                                    width: '100%', 
                                    backgroundColor: colors.gray[600] 
                                }}
                                placeholder="Nova senha"
                                secureTextEntry
                            />
                        )}
                    />

                    <Controller 
                        control={control}
                        name="confirm_password"
                        render={({ field: { onChange } }) => (
                            <Input
                                onChangeText={onChange}
                                style={{ 
                                    width: '100%', 
                                    backgroundColor: colors.gray[600] 
                                }}
                                placeholder="Confirme a nova senha" 
                                secureTextEntry
                            />
                        )}
                    />

                    {isUpdating ? (
                        <Button 
                            title="Carregando..."
                            style={{ width: '100%', marginTop: 16 }}
                        />
                    ) : (
                        <Button
                            onPress={handleSubmit(handleProfileUpdate)}
                            style={{ width: '100%', marginTop: 16 }}
                            title="Atualizar" 
                        />
                    )}
                </Content>
            </ScrollView>
        </Container>
    )
}