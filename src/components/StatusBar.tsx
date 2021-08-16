import * as React from 'react';
import { View, StatusBar } from 'react-native';

export default function _StatusBar() {
    return (
        <View>
            <StatusBar
                translucent={true}
                backgroundColor={'rgba(0,0,0,0)'}
                barStyle={'dark-content'}
            />
            <View style={{ width: '100%', height: StatusBar.currentHeight }} />
        </View>
    );
}
