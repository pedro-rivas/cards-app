import * as React from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';

import { ThemeContext } from '../../App';
import Card, { CardInterface } from './Card';

interface Props {
  items: Array<CardInterface>;
  loading: boolean;
}

export default function CardsHorizontalCarousel({ items, loading }: Props) {
  const appTheme = React.useContext(ThemeContext);
  const { spacing } = appTheme;

  function renderCard(card: CardInterface, index: number): JSX.Element {
    return <Card {...card} />;
  }

  return (
    <>
      {loading ? (
        <View
          style={{
            width: 100,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={'white'} />
        </View>
      ) : (
        <FlatList
          horizontal={true}
          style={{ marginBottom: spacing.xl }}
          showsHorizontalScrollIndicator={false}
          data={items}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          scrollEventThrottle={16}
          scrollEnabled={true}
          removeClippedSubviews={true}
          renderItem={({ item, index }) => renderCard(item, index)}
          onEndReachedThreshold={0.1}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => (
            <View style={{ height: 30, width: spacing.xl }} />
          )}
          ListFooterComponent={() => (
            <View style={{ height: 30, width: spacing.xl - spacing.s }} />
          )}
        />
      )}
    </>
  );
}
