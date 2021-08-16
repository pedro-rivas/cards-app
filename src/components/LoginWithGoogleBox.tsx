import * as React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../App';
import * as Common from '../common';
import MainButton from './MainButton';

const { width } = Dimensions.get('window');

export default function LoginWithGoogleBox() {
    const appTheme = React.useContext(ThemeContext);
    const { spacing, colors } = appTheme;

    return (
        <View
            style={{
                ...styles.mainGrap,
                backgroundColor: colors.background,
                borderColor: colors.foreground,
                margin: spacing.xl,
                padding: spacing.xl,
            }}>
            <MainButton
                callback={() => Common.showToast('Comming soon')}
                buttonWidth={width - spacing.xl * 4}>
                <View style={styles.button}>
                    <Icon name={'logo-google'} size={20} color={'white'} />
                    <Text style={styles.buttonLabel}>Sign in with google</Text>
                </View>
            </MainButton>
            <Text style={styles.text}>
                By click login you agree to our{' '}
                <Text style={styles.boldText}>Terms of Service</Text> and{' '}
                <Text style={styles.boldText}>Privacy Policy.</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    mainGrap: {
        borderWidth: 1.3,
        borderRadius: 35,
        marginTop: 0,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    buttonLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        paddingLeft: 10,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 22,
    },
    boldText: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 22,
        fontWeight: 'bold',
    },
});
