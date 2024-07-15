import { PressableProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ExerciseName, GroupButton } from "./styles";

type Props = PressableProps & {
    name: string
    isActive: boolean
}

export function Group({ name, isActive, ...rest }: Props) {
    const { colors } = useTheme()

    return (
        <GroupButton
            onPress={() => isActive === true}
            style={{
                borderColor: isActive ? colors.green[500] : 'trasparent',
                borderWidth: isActive ? 1 : 0
            }}
            {...rest}
        >
            <ExerciseName isActive={isActive}>
                {name}
            </ExerciseName>
        </GroupButton>
    )
}