import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { fetchCards } from '../redux/slices/cardsSlice';
import { ThemeContext } from '../../App';
import * as Common from '../common';
import StatusBar from '../components/StatusBar';
import SearchInput from '../components/SearchInput';
import ContentContainer from '../components/ContentContainer';
import Label from '../components/ContentLabel';
import CardsCarousel from '../components/CardsHorizontalCarousel';
import MainHeader from '../components/MainHeader';
import SavedCards from '../components/SavedCards';

const page = Math.floor(Math.random() * 10);

export default function HomeScreen() {
    const cards = useAppSelector(state => state.cards.cards);
    const loading = useAppSelector(state => state.cards.loading);
    const dispatch = useAppDispatch();
    const appTheme = React.useContext(ThemeContext);

    React.useEffect(() => {
        Common.changeNavigationBarColor(appTheme.colors.background, true);
        dispatch(fetchCards(page));
    }, []);

    return (
        <View
            style={{ ...styles.mainGrap, backgroundColor: appTheme.colors.background }}>
            <StatusBar />
            <MainHeader />
            <ScrollView>
                <SearchInput />
                <ContentContainer backgroundColor={appTheme.colors.blue}>
                    <Label color={appTheme.colors.background} label={'Trending Cards'} />
                    <CardsCarousel items={Object.values(cards)} loading={loading} />
                    <ContentContainer backgroundColor={appTheme.colors.background}>
                        <Label
                            color={appTheme.colors.foreground}
                            label={'Continue Watching'}
                        />
                        <SavedCards />
                    </ContentContainer>
                </ContentContainer>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainGrap: {
        flex: 1,
    },
});
