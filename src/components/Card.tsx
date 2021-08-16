import * as React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Platform,
    UIManager,
    LayoutAnimation,
    Pressable,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import * as Common from '../common';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../App';

export interface CardInterface {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    create: string;
    saved?: boolean;
}

const cardWidth = Common.width * 0.36;

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

function Card(props: CardInterface) {
    const { image, type, name, id } = props;
    const navigation = useNavigation();
    const appTheme = React.useContext(ThemeContext);
    const { spacing, colors } = appTheme;

    React.useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }, []);

    return (
        <View
            style={{
                ...styles.card,
                backgroundColor: colors.background,
                borderColor: colors.foreground,
                marginRight: spacing.s,
            }}>
            <Pressable
                onPress={() => navigation.navigate('DetailCard', { id })}
                android_ripple={{ color: 'rgba(0,0,0,.1)', borderless: true }}>
                <>
                    <FastImage
                        style={styles.image}
                        source={{
                            uri: image,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    <Text style={styles.type} numberOfLines={1}>{`${type ? type : '.'
                        }`}</Text>
                    <Text style={styles.name} numberOfLines={1}>
                        {name}
                    </Text>
                </>
            </Pressable>
        </View>
    );
}

export default React.memo(Card, () => true);

const styles = StyleSheet.create({
    card: {
        width: cardWidth,
        borderWidth: 1.3,
        borderRadius: 16,
        elevation: 1,
        padding: 2,
    },
    image: {
        width: cardWidth - 6,
        height: cardWidth * 1.2,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    type: {
        fontSize: 14,
        width: cardWidth - 16,
        padding: 5,
        fontWeight: 'normal',
    },
    name: {
        fontSize: 18,
        width: cardWidth - 16,
        paddingHorizontal: 5,
        paddingBottom: 20,
        fontWeight: 'normal',
    },
});
