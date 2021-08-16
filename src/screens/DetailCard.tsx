import * as React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addToShoppingCard, toogledSavedCard } from '../redux/slices/cardsSlice';
import { ThemeContext } from '../../App';
import * as Common from '../common';
import StatusBar from '../components/StatusBar';
import ContentContainer from '../components/ContentContainer';
import MainButton from '../components/MainButton';
import SecondaryHeader from '../components/SecondaryHeader';
import BackButton from '../components/BackButton';

type ParamList = {
    detailsCard: {
        id: string;
    };
};

type Params = RouteProp<ParamList, 'detailsCard'>;

type RouteParams = { route: Params };

const cardWidth = Common.width * 0.36;
const cardRating = Math.floor(Math.random() * 6);
let firstRender = false;

export default function DetailCardScreen({ route }: RouteParams) {
    const { id } = route.params;
    const cards = useAppSelector(state => state.cards.cards);
    const cardAdded = useAppSelector(state => state.cards.cardAdded);
    const card = cards[Number(id)];
    const cardPrice = card.status
        ? card.status === 'Alive'
            ? 20
            : card.status === 'Dead'
                ? 15
                : 10
        : 10;
    const cardDescription = `${card.name} was born in ${card.origin.name}. Currently living in ${card.location.name}.`;

    const dispatch = useAppDispatch();
    const appTheme = React.useContext(ThemeContext);
    const { colors, spacing } = appTheme;

    React.useEffect(() => {
        if (firstRender) {
            Common.showToast(`${card.name} added`);
        } else {
            firstRender = true;
        }
    }, [cardAdded]);

    React.useEffect(() => {
        Common.changeNavigationBarColor(appTheme.colors.blue, true);
        return () => {
            Common.changeNavigationBarColor(appTheme.colors.background, true);
            firstRender = false;
        };
    }, []);

    return (
        <View
            style={{ ...styles.mainGrap, backgroundColor: appTheme.colors.background }}>
            <View>
                <StatusBar />
                <SecondaryHeader label={'Detail Card'} />
                <BackButton />
            </View>
            <ContentContainer backgroundColor={appTheme.colors.background}>
                <View>
                    <View
                        style={{
                            ...styles.cardGrap,
                            position: 'absolute',
                            left: (Common.width - cardWidth) / 2,
                            top: -(cardWidth * 1.56 - spacing.xl * 1),
                        }}>
                        <FastImage
                            style={styles.image}
                            source={{
                                uri: card.image,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </View>
                    <View style={{ height: spacing.xl * 2, width: 200 }} />
                    <View
                        style={{
                            ...styles.saveBtn,
                            position: 'absolute',
                            right: spacing.xl,
                            backgroundColor: card.saved
                                ? colors.secondary
                                : colors.background,
                        }}>
                        <Pressable
                            style={styles.btn}
                            onPress={() => dispatch(toogledSavedCard(card.id))}
                            android_ripple={{ color: 'rgba(0,0,0,.1)', borderless: true }}>
                            <Icon
                                name={`${card.saved ? 'ios-bookmark' : 'ios-bookmark-outline'}`}
                                size={20}
                                color={card.saved ? colors.background : colors.foreground}
                            />
                        </Pressable>
                    </View>
                    <Text
                        style={{
                            textAlign: 'center',
                            color: colors.secondary,
                            fontSize: 22,
                            fontWeight: 'bold',
                        }}>{`$${cardPrice}.00`}</Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            color: colors.foreground,
                            fontSize: 22,
                            fontWeight: 'bold',
                        }}>{`${card.name}`}</Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            marginBottom: spacing.xl,
                            color: colors.foreground,
                            fontSize: 16,
                        }}>{`${card.type ? card.type : '-'}`}</Text>
                    <View
                        style={{
                            ...styles.detailsGrap,
                            borderColor: colors.foreground,
                            padding: spacing.xl,
                            paddingVertical: spacing.m,
                            width: Common.width - spacing.xl * 2,
                            marginLeft: spacing.xl,
                        }}>
                        <View
                            style={{
                                justifyContent: 'center',
                                width: (Common.width - spacing.xl * 4) / 3,
                                borderRightWidth: 1.3,
                                borderColor: colors.foreground,
                                alignItems: 'center',
                            }}>
                            <Text style={styles.detail}>Rating</Text>
                            <Text style={styles.detailBold}>{`${cardRating}`}</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: (Common.width - spacing.xl * 4) / 3,
                                borderRightWidth: 1.3,
                                borderColor: colors.foreground,
                            }}>
                            <Text style={styles.detail}>Episodes</Text>
                            <Text
                                style={
                                    styles.detailBold
                                }>{`${card.episode.length} episodes`}</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: (Common.width - spacing.xl * 4) / 3,
                            }}>
                            <Text style={styles.detail}>Status</Text>
                            <Text style={styles.detailBold}>{`${card.status}`}</Text>
                        </View>
                    </View>
                    <Text style={{ ...styles.description, padding: spacing.xl }}>
                        {cardDescription}
                    </Text>
                    <ContentContainer backgroundColor={appTheme.colors.blue}>
                        <MainButton
                            callback={() => dispatch(addToShoppingCard(card.id))}
                            primary>
                            Add to Card
                        </MainButton>
                    </ContentContainer>
                </View>
            </ContentContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    mainGrap: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'red',
    },
    cardGrap: {
        borderWidth: 1.3,
        borderRadius: 16,
        elevation: 1,
        padding: 2,
        width: cardWidth,
        height: cardWidth * 1.56,
    },
    image: {
        width: cardWidth - 6.6,
        height: cardWidth * 1.56 - 6.6,
        borderRadius: 16,
    },
    description: {
        fontSize: 18,
        lineHeight: 24,
    },
    detailsGrap: {
        borderWidth: 1.3,
        borderRadius: 50,
        flexDirection: 'row',
    },
    saveBtn: {
        borderWidth: 1.3,
        alignItems: 'center',
        justifyContent: 'center',
        width: 45,
        height: 45,
        borderRadius: 30,
    },
    btn: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detail: {
        fontSize: 14,
    },
    detailBold: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});
