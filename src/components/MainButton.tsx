import * as React from 'react';
import { StyleSheet, View, Pressable, Dimensions, Text } from 'react-native';

import { ThemeContext } from '../../App';

interface Props {
    children: React.ReactNode;
    callback: () => void;
    primary?: boolean;
    buttonWidth?: number;
}

const { width } = Dimensions.get('window');
export const androidRippleConfig = { color: 'rgba(250,250,250,.3)', borderless: true };


export default function MainButton({ children, callback, primary = false, buttonWidth }: Props) {

    const appTheme = React.useContext(ThemeContext);
    const { spacing, colors } = appTheme;

    const btnWidth = buttonWidth ? buttonWidth : width - (spacing.xl * 2);

    return (
        <View style={{
            ...styles.button,
            backgroundColor: primary ? colors.primary : colors.secondary,
            marginBottom: spacing.xl, borderColor: colors.foreground, width: btnWidth,
            marginLeft: buttonWidth ? 0 : spacing.xl,
        }}>
            <Pressable
                onPress={() => callback()}
                android_ripple={androidRippleConfig}
                style={{ width: btnWidth, alignItems: 'center' }}
            >

                {
                    typeof children === 'string' ?
                        <Text style={styles.buttonLabel}>
                            {children}
                        </Text>
                        :
                        children
                }

            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.3,
    },
    buttonLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 15,
    }
});
