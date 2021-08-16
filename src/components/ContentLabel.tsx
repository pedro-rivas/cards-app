import * as React from 'react';
import { StyleSheet, Text, } from 'react-native';

import { ThemeContext } from '../../App';

interface Props {
    color: string;
    label: string;
}

export default function ContentLabel({ color, label }: Props) {

    const appTheme = React.useContext(ThemeContext);

    const { spacing } = appTheme;

    return (
        <Text style={{ ...styles.text, color, paddingLeft: spacing.xl, paddingBottom: spacing.xl }}>
            {label}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
