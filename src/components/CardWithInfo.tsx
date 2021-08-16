import * as React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Platform,
    UIManager,
    LayoutAnimation,
    Pressable,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Common from '../common';
import { CardInterface } from './Card';
import { removeFromShoppingCard } from '../redux/slices/cardsSlice';
import { useAppDispatch } from '../redux/hooks';
import { ThemeContext } from '../../App';

const cardWidth = Common.width * 0.25;

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

export default function CardWithInfo(props: CardInterface) {
    const { image, type, name, id, status } = props;
    const dispatch = useAppDispatch();
    const appTheme = React.useContext(ThemeContext);
    const { spacing, colors } = appTheme;

    const price = Common.calculateCardPrice(status);

    React.useEffect(() => {
        //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        return () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        };
    }, []);

    return (
        <View
            style={{
                ...styles.card,
                backgroundColor: colors.background,
                borderColor: colors.foreground,
                marginBottom: spacing.l,
                width: Common.width - spacing.xl * 2,
                padding: spacing.s,
            }}>
            <View style={{ ...styles.imageGrap, borderColor: colors.foreground }}>
                <FastImage
                    style={{ ...styles.image }}
                    source={{
                        uri: image,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>
            <View
                style={{
                    padding: spacing.s,
                    width:
                        Common.width - (spacing.xl * 2 + cardWidth + 90 + spacing.s * 2),
                }}>
                <Text
                    style={{
                        ...styles.name,
                        color: colors.foreground,
                        width:
                            Common.width - (spacing.xl * 2 + cardWidth + 90 + spacing.s * 2),
                    }}>
                    {name}
                </Text>
                <Text
                    style={{
                        ...styles.type,
                        color: colors.foreground,
                        width:
                            Common.width - (spacing.xl * 2 + cardWidth + 90 + spacing.s * 2),
                    }}>
                    {type ? type : '-'}
                </Text>
            </View>
            <View style={{ width: 80, justifyContent: 'space-between' }}>
                <Pressable
                    onPress={() => dispatch(removeFromShoppingCard(id))}
                    android_ripple={{ color: 'rgba(0,0,0,.1)', borderless: true }}
                    style={styles.deleteBtn}>
                    <Icon
                        name={'ios-trash-outline'}
                        size={25}
                        color={colors.foreground}
                    />
                </Pressable>
                <Text
                    style={{
                        ...styles.price,
                        color: colors.secondary,
                    }}>{`$${price}.00`}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1.3,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageGrap: {
        width: cardWidth,
        height: cardWidth * 1.2,
        borderWidth: 1.3,
        borderRadius: 16,
        padding: 2,
    },
    image: {
        width: cardWidth - 6.6,
        height: (cardWidth - 6.6) * 1.2,
        borderRadius: 16,
    },
    type: {
        fontSize: 14,
        fontWeight: 'normal',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        width: 80,
        alignSelf: 'flex-end',
        textAlign: 'right',
    },
    deleteBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 45,
        alignSelf: 'flex-end',
    },
});
