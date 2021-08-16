import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Pressable,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../App';
import * as Common from '../common';
import StatusBar from '../components/StatusBar';
import ContentContainer from '../components/ContentContainer';
import LoginWithGoogleBox from '../components/LoginWithGoogleBox';
import MainButton from '../components/MainButton';
import BackButton from '../components/BackButton';
import LoginInputGrap from '../components/LoginInputGrap';

export default function LoginScreen() {
    const appTheme = React.useContext(ThemeContext);
    const { colors, spacing } = appTheme;

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, togglePassword] = React.useState(false);

    React.useEffect(() => {
        Common.changeNavigationBarColor(appTheme.colors.blue, true);
        return () => {
            Common.changeNavigationBarColor(colors.background, true);
        };
    }, []);

    return (
        <View style={{ ...styles.maingGrap, backgroundColor: colors.background }}>
            <StatusBar />
            <BackButton />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ width: 50, height: 50 }} />
                <Text
                    style={{
                        ...styles.bigLabel,
                        padding: spacing.xl,
                        paddingBottom: spacing.s,
                        width: Common.width - spacing.xl * 2,
                    }}
                    numberOfLines={2}>
                    Hello, welcome back!
                </Text>
                <Text style={{ ...styles.signinLabel, padding: spacing.xl }}>
                    Sign in
                </Text>
                <LoginInputGrap label={'Email'}>
                    <View style={styles.textInputGrap}>
                        <TextInput
                            onChangeText={setEmail}
                            value={email}
                            keyboardType={'email-address'}
                            placeholder={'rick@space.com'}
                            style={{ ...styles.input, width: Common.width - spacing.xl * 5 }}
                        />
                        {email.includes('@') ? (
                            <Icon name={'checkbox'} size={20} color={'#65d664'} />
                        ) : null}
                    </View>
                </LoginInputGrap>
                <LoginInputGrap label={'Password'}>
                    <View style={styles.textInputGrap}>
                        <TextInput
                            onChangeText={setPassword}
                            value={password}
                            placeholder={'password'}
                            secureTextEntry={!showPassword}
                            style={{ ...styles.input, width: Common.width - spacing.xl * 5 }}
                        />
                        <Pressable
                            onPress={() => togglePassword(!showPassword)}
                            android_ripple={{ color: 'rgba(0,0,0,.1)', borderless: true }}
                            style={styles.eyeBtn}>
                            <Icon
                                name={`${showPassword ? 'eye-outline' : 'eye-off-outline'}`}
                                size={20}
                                color={colors.foreground}
                            />
                        </Pressable>
                    </View>
                </LoginInputGrap>

                <MainButton callback={() => Common.showToast('Login..')} primary>
                    Login
                </MainButton>
                <View style={{ flexDirection: 'row-reverse' }}>
                    <Pressable onPress={() => Common.showToast('Check your email')}>
                        <Text
                            style={{
                                textDecorationLine: 'underline',
                                color: colors.foreground,
                                paddingBottom: spacing.xl,
                                paddingRight: spacing.xl,
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}>
                            Forgot your Password?
                        </Text>
                    </Pressable>
                </View>
                <ContentContainer backgroundColor={colors.blue}>
                    <LoginWithGoogleBox />
                </ContentContainer>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    maingGrap: {
        flex: 1,
        backgroundColor: 'green',
    },
    bigLabel: {
        fontSize: 32,
        lineHeight: 38,
        fontWeight: 'bold',
    },
    signinLabel: {
        fontSize: 16,
        paddingTop: 0,
    },
    textInputGrap: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        justifyContent: 'space-between',
    },
    input: {
        height: 50,
        fontSize: 16,
        fontWeight: 'bold',
    },
    eyeBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
