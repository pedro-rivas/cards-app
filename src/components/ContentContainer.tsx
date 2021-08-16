import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemeContext } from '../../App';
import * as Common from '../common';

interface Props {
    children: React.ReactNode;
    backgroundColor: string;
}

export default function ContentContainer({ children, backgroundColor }: Props) {
    const appTheme = React.useContext(ThemeContext);
    const { spacing, colors } = appTheme;

    return (
        <View
            style={{
                ...styles.container,
                paddingTop: spacing.xl,
                backgroundColor,
                borderColor: colors.foreground,
            }}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Common.width,
        borderWidth: 1.3,
        borderTopLeftRadius: 35,
        borderBottomWidth: 0,
    },
});
