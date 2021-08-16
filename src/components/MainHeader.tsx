import * as React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import * as Common from '../common';

import { ThemeContext } from '../../App';
import { useAppSelector } from '../redux/hooks';

export default function MainHeader() {
    const appTheme = React.useContext(ThemeContext);
    const { spacing, colors } = appTheme;
    const navigation = useNavigation();
    const cards = useAppSelector(state => state.cards.shoppingCart);

    return (
        <View style={{ ...styles.grap, paddingHorizontal: spacing.xl }}>
            <View style={{ ...styles.menuButton, backgroundColor: colors.secondary }}>
                <Pressable
                    onPress={() => Common.showToast('Open drawer')}
                    android_ripple={{ color: 'rgba(250,250,250,.3)', borderless: true }}
                    style={styles.menuButtonGrap}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: 26 }}>
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>
                </Pressable>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Pressable
                    onPress={() => navigation.navigate('ShoppingCart')}
                    android_ripple={{ color: 'rgba(0,0,0,.1)', borderless: true }}
                    style={styles.iconButton}>
                    <Icon name={'cart-outline'} size={25} />
                    {Object.entries(cards).length > 0 ? (
                        <View style={{ ...styles.cardDot, backgroundColor: colors.blue }}>
                            <Text style={{ fontSize: 9, color: 'white' }}>{`${Object.entries(cards).length
                                }`}</Text>
                        </View>
                    ) : null}
                </Pressable>
                <View style={{ ...styles.userAvatar, backgroundColor: colors.blue }}>
                    <Pressable
                        onPress={() => navigation.navigate('Login')}
                        android_ripple={{ color: 'rgba(250,250,250,.3)', borderless: true }}>
                        <View style={styles.avatarGrap}>
                            <Text
                                style={{
                                    color: colors.foreground,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}>
                                P
                            </Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    grap: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userAvatar: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 1.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 1.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuButtonGrap: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 12,
        height: 12,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
    },
    cardDot: {
        width: 15,
        height: 15,
        borderRadius: 10,
        borderWidth: 1,
        position: 'absolute',
        top: 4,
        right: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconButton: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarGrap: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
