import * as React from 'react';
import { View, ScrollView, StyleSheet, Text, Pressable } from 'react-native';

import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppSelector } from '../redux/hooks';
import { ThemeContext } from '../../App';
import * as Common from '../common';
import StatusBar from '../components/StatusBar';
import SearchInput from '../components/SearchInput';
import BackButton from '../components/BackButton';

const cardWidth = Common.width * 0.12;

export default function SearchScreen() {
    const cards = useAppSelector(state => state.cards.searchCards);
    const appTheme = React.useContext(ThemeContext);
    const { spacing, colors } = appTheme;

    return (
        <View
            style={{ ...styles.mainGrap, backgroundColor: appTheme.colors.background }}>
            <StatusBar />
            <BackButton />
            <View style={{ height: 70, width: 50 }} />
            <SearchInput editable />
            <ScrollView>
                <View style={{ paddingHorizontal: spacing.xl }}>
                    {Object.entries(cards).length > 0 ? (
                        Object.entries(cards).map((c, index: number) => {
                            const card = c[1];
                            return (
                                <View
                                    key={index}
                                    style={{
                                        ...styles.card,
                                        backgroundColor: colors.background,
                                        borderColor: colors.foreground,
                                        marginBottom: spacing.s,
                                        width: Common.width - spacing.xl * 2,
                                        padding: spacing.s,
                                    }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View
                                            style={{
                                                ...styles.imageGrap,
                                                borderColor: colors.foreground,
                                            }}>
                                            <FastImage
                                                style={{ ...styles.image }}
                                                source={{
                                                    uri: card.image,
                                                    priority: FastImage.priority.normal,
                                                }}
                                                resizeMode={FastImage.resizeMode.cover}
                                            />
                                        </View>
                                        <Text
                                            style={{
                                                ...styles.name,
                                                paddingLeft: spacing.m,
                                                color: colors.foreground,
                                            }}>
                                            {card.name}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: 25,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Pressable
                                            style={{
                                                width: 50,
                                                height: 50,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            android_ripple={{
                                                color: 'rgba(0,0,0,.1)',
                                                borderless: true,
                                            }}
                                            onPress={() => Common.showToast(`${card.name}`)}>
                                            <Icon
                                                name={'arrow-forward-outline'}
                                                size={25}
                                                color={colors.foreground}
                                            />
                                        </Pressable>
                                    </View>
                                </View>
                            );
                        })
                    ) : (
                        <Text>No results</Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainGrap: {
        flex: 1,
    },
    card: {
        borderWidth: 1.3,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    name: {
        fontSize: 16,
    },
});
