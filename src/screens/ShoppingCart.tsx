import * as React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

import { useAppSelector } from '../redux/hooks';
import { ThemeContext } from '../../App';
import * as Common from '../common';
import StatusBar from '../components/StatusBar';
import ContentContainer from '../components/ContentContainer';
import MainButton from '../components/MainButton';
import SecondaryHeader from '../components/SecondaryHeader';
import BackButton from '../components/BackButton';
import Card from '../components/CardWithInfo';

export default function ShoppingCart() {
    const cards = useAppSelector(state => state.cards.shoppingCart);
    let amountToPay = 0;
    Object.entries(cards).length > 0
        ? Object.entries(cards).forEach(c => {
            amountToPay += Common.calculateCardPrice(c[1].status);
        })
        : 0;
    const appTheme = React.useContext(ThemeContext);
    const { colors, spacing } = appTheme;

    React.useEffect(() => {
        Common.changeNavigationBarColor(appTheme.colors.blue, true);
        return () => {
            Common.changeNavigationBarColor(appTheme.colors.background, true);
        };
    }, []);

    return (
        <View
            style={{ ...styles.mainGrap, backgroundColor: appTheme.colors.background }}>
            <StatusBar />
            <SecondaryHeader label={'Cart'} />
            <BackButton />
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: spacing.xl,
                        }}>
                        {Object.entries(cards).length > 0 ? (
                            Object.entries(cards).map((card, index: number) => {
                                return <Card key={index} {...card[1]} />;
                            })
                        ) : (
                            <Text>No cards yet</Text>
                        )}
                    </View>
                </ScrollView>
                <ContentContainer backgroundColor={colors.background}>
                    <View style={{ ...styles.priceGrap, padding: spacing.xl }}>
                        <Text style={{ ...styles.label, color: colors.foreground }}>
                            Total
                        </Text>
                        <Text
                            style={{
                                ...styles.price,
                                color: colors.foreground,
                            }}>{`$${amountToPay}.00`}</Text>
                    </View>
                    <ContentContainer backgroundColor={colors.blue}>
                        <MainButton
                            callback={() => Common.showToast(`Pay $${amountToPay}.00`)}
                            primary>
                            Pay
                        </MainButton>
                    </ContentContainer>
                </ContentContainer>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainGrap: {
        flex: 1,
    },
    priceGrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 0,
        alignItems: 'center',
    },
    label: {
        fontSize: 22,
    },
    price: {
        fontSize: 32,
        fontWeight: 'bold',
    },
});
