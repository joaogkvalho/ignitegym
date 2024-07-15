import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { ScreenHeader } from "../../components/ScreenHeader";
import { UserPhoto } from "../../components/UserPhoto";
import { Container, Content, Title } from "./styles";

import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

export function Profile() {
    const { sizes, colors, fontSizes } = useTheme()
    const PHOTO_SIZE = sizes[33]

    const [photoIsLoading, setPhotoIsLoading] = useState(false)
    const [userPhoto, setUserPhoto] = useState(
        'https://github.com/joaogkvalho.png'
    )
    
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

                setUserPhoto(photoSelected.assets[0].uri)
            }
        } catch(error: any) {
            console.log(error)
        } finally {
            setPhotoIsLoading(false)
        }
    }

    return (
        <Container>
            <ScreenHeader title="Perfil" />

            <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
                <Content>
                    <UserPhoto 
                        source={{ uri: userPhoto }}
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

                    <Input
                        style={{ 
                            width: '100%', 
                            backgroundColor: colors.gray[600] 
                        }}
                        placeholder="Nome" 
                    />

                    <Input
                        style={{ 
                            width: '100%', 
                            backgroundColor: colors.gray[600] 
                        }}
                        placeholder="E-mail"
                    />

                    <Title>
                        Alterar senha
                    </Title>

                    <Input
                        style={{ 
                            width: '100%', 
                            backgroundColor: colors.gray[600] 
                        }}
                        placeholder="Senha antiga" 
                        secureTextEntry
                    />

                    <Input
                        style={{ 
                            width: '100%', 
                            backgroundColor: colors.gray[600] 
                        }}
                        placeholder="Confirme a nova senha" 
                        secureTextEntry
                    />

                    <Button
                        style={{ width: '100%', marginTop: 16 }}
                        title="Atualizar" 
                    />
                </Content>
            </ScrollView>
        </Container>
    )
}