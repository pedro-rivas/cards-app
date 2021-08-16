import * as React from 'react';
import { View, Pressable } from 'react-native';

import * as Common from '../common';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../App';

interface Props {
    index: number;
    width: number;
    image: string;
    id: number;
}

export default function AnimatedCard({ index, width, image, id }: Props) {
    const navigation = useNavigation();
    const appTheme = React.useContext(ThemeContext);
    const { spacing, colors } = appTheme;

    return (
        <Pressable
            onPress={() => navigation.navigate('DetailCard', { id })}
            style={{
                width: width,
                height: width * 1.56,
                position: 'absolute',
                left: index * (spacing.xl + width / 2),
            }}>
            <View
                style={{
                    width: width,
                    height: width * 1.56,
                    padding: 2,
                    borderColor: colors.foreground,
                    borderRadius: 16,
                    borderWidth: 1.3,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <FastImage
                    style={{
                        width: (Common.width - (spacing.xl * 2 + spacing.l * 2 + 9)) / 3,
                        height:
                            ((Common.width - (spacing.xl * 2 + spacing.l * 2 + 9)) / 3) *
                            1.56,
                        borderRadius: 16,
                    }}
                    source={{
                        uri: image,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>
        </Pressable>
    );
}
