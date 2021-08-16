import * as React from 'react';
import {
    StyleSheet,
    View,
    Pressable,
    TextInput,
    ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import * as Common from '../common';
import { ThemeContext } from '../../App';
import { searchCards } from '../redux/slices/cardsSlice';

interface Props {
    editable?: boolean;
}

const androidRipple = { color: 'rgba(0,0,0,.1)', borderless: true };

export default function SearchInput({ editable = false }: Props) {
    const navigation = useNavigation();
    const loading = useAppSelector(state => state.cards.loadingSearch);
    const dispatch = useAppDispatch();
    const [query, setQuery] = React.useState('');
    const appTheme = React.useContext(ThemeContext);
    const { spacing, colors } = appTheme;

    return (
        <View style={{ padding: spacing.xl }}>
            <View
                style={{
                    ...styles.grap,
                    borderColor: colors.foreground,
                    backgroundColor: colors.background,
                }}>
                <View style={{ ...styles.iconGrap }}>
                    {loading ? (
                        <ActivityIndicator color={colors.foreground} size={'small'} />
                    ) : (
                        <Pressable
                            android_ripple={androidRipple}
                            style={styles.iconButton}
                            onPress={() =>
                                editable
                                    ? dispatch(searchCards(query))
                                    : navigation.navigate('Search')
                            }>
                            <Icon name={'search-outline'} size={25} />
                        </Pressable>
                    )}
                </View>
                <Pressable onPress={() => navigation.navigate('Search')}>
                    <TextInput
                        style={{
                            ...styles.textInput,
                            width: Common.width - (spacing.xl * 2 + 122),
                        }}
                        placeholder={'Search'}
                        editable={editable}
                        autoFocus={editable}
                        value={query}
                        onChangeText={setQuery}
                    />
                </Pressable>
                <View style={{ ...styles.iconGrap }}>
                    <Pressable
                        android_ripple={androidRipple}
                        style={styles.iconButton}
                        onPress={() => Common.showToast('Some action')}>
                        <Icon name={'ellipsis-horizontal-outline'} size={30} />
                    </Pressable>
                </View>
            </View>
            <View
                style={{
                    ...styles.grap,
                    width: Common.width - spacing.xl * 2,
                    borderColor: colors.foreground,
                    backgroundColor: colors.primary,
                    position: 'absolute',
                    top: spacing.xl + 7,
                    left: spacing.xl + 6,
                    zIndex: -1,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    grap: {
        height: 60,
        borderWidth: 1.3,
        borderRadius: 30,
        flexDirection: 'row',
    },
    textInput: {
        height: 60,
        fontSize: 16,
        fontWeight: 'bold',
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
});
