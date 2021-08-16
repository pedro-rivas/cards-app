import * as React from 'react';
import { View } from 'react-native';

import * as Common from '../common';
import { ThemeContext } from '../../App';
import { useAppSelector } from '../redux/hooks';
import AnimatedCard from '../components/AnimatedCard';

export default function SavedCards() {
    const cards = useAppSelector(state => state.cards.cards);
    const savedCards = Object.entries(cards).filter(card => card[1].saved);

    const appTheme = React.useContext(ThemeContext);
    const { spacing, colors } = appTheme;

    const cWidth = (Common.width - (spacing.xl * 2 + spacing.l * 2)) / 3;

    return (
        <View>
            <View style={{ padding: spacing.xl, paddingTop: 0 }}>
                <View style={{ flexDirection: 'row', height: cWidth * 1.56 }}>
                    {savedCards.length > 0 ? (
                        savedCards.slice(0, 4).map((c, index: number) => {
                            const card = c[1];

                            return (
                                <AnimatedCard
                                    key={index}
                                    index={index}
                                    width={cWidth}
                                    image={card.image}
                                    id={card.id}
                                />
                            );
                        })
                    ) : (
                        <View
                            style={{
                                width: (Common.width - (spacing.xl * 2 + spacing.l * 2)) / 3,
                                height:
                                    ((Common.width - (spacing.xl * 2 + spacing.l * 2)) / 3) *
                                    1.56,
                                borderColor: colors.foreground,
                                borderRadius: 16,
                                borderWidth: 1.3,
                                borderStyle: 'dashed',
                            }}
                        />
                    )}
                </View>
            </View>
        </View>
    );
}
