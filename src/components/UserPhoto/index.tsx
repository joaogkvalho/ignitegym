import { ImageProps } from 'react-native'
import { UserImage } from './styles'

type Props = ImageProps & {
    size: number
}

export function UserPhoto({ size, ...rest }: Props) {
    return (
        <UserImage size={size} {...rest} />
    )
}