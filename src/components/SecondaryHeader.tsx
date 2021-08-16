import * as React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import * as Common from '../common';
import { ThemeContext } from '../../App';

const androidRipple = { color: 'rgba(0,0,0,.1)', borderless: true };

interface Props {
    label: string;
}

export default function SecondaryHeader({ label }: Props) {
    const appTheme = React.useContext(ThemeContext);
    const { spacing, colors } = appTheme;

    return (
        <View style={{ ...styles.grap, paddingHorizontal: spacing.xl }}>
            <View style={{ height: 20, width: 60 }} />
            <Text style={{ ...styles.title, color: colors.foreground }}>{label}</Text>
            <View style={{ ...styles.iconGrap }}>
                <Pressable
                    android_ripple={androidRipple}
                    style={styles.iconButton}
                    onPress={() => Common.showToast('Some action')}>
                    <Icon
                        name={'ellipsis-horizontal-outline'}
                        size={30}
                        color={colors.foreground}
                    />
                </Pressable>
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
    iconGrap: {
        width: 60,
        height: 58.4,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButton: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
    },
});
