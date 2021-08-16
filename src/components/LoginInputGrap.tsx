import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import * as Common from '../common';
import { ThemeContext } from '../../App';

interface Props {
    label: string;
    children: React.ReactNode;
}

export default function LoginInputGrap({ label, children }: Props) {
    const appTheme = React.useContext(ThemeContext);
    const { spacing, colors } = appTheme;

    return (
        <View
            style={{
                ...styles.inputGrap,
                paddingHorizontal: spacing.xl,
                paddingVertical: spacing.s,
                width: Common.width - spacing.xl * 2,
                margin: spacing.xl,
            }}>
            <Text style={{ ...styles.inputLabel, color: colors.foreground }}>
                {label}
            </Text>
            {
                children
            }
        </View>
    );
}

const styles = StyleSheet.create({
    inputGrap: {
        borderWidth: 1.3,
        borderRadius: 25,
        marginTop: 0,
    },
    inputLabel: {
        fontSize: 16,
    },
});
