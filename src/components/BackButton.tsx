import * as React from 'react';
import { StyleSheet, View, Pressable, StatusBar } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../App';

const androidRipple = { color: 'rgba(250,250,250,.3)', borderless: true };

export default function BackButton() {
    const appTheme = React.useContext(ThemeContext);
    const { spacing, colors } = appTheme;
    const navigation = useNavigation();

    return (
        <View
            style={{
                ...styles.btnGrap,
                backgroundColor: colors.blue,
                left: spacing.xl,
                top: (StatusBar.currentHeight ?? 10) + 10,
            }}>
            <Pressable
                onPress={() => navigation.goBack()}
                android_ripple={androidRipple}
                style={styles.btn}>
                <Icon name={'arrow-back-outline'} size={25} color={'white'} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    btnGrap: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1.3,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    },
    btn: {
        width: 50,
        height: 50,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
