import React from "react";
import PropTypes from 'prop-types';
import {FlatList, Text, View} from "react-native";

function PlayerPanel({participants}) {
    return <View style={{flex: 1, flexDirection: "row"}}>
        <Text>players: </Text>
        <FlatList
            style={{
                flex: 1,
                flexDirection: 'row'
            }}
            data={participants}
            renderItem={({item}) => <Text style={{flex: 1}}>{item}</Text>}
        />
    </View>;
}

PlayerPanel.propTypes = {
    participants: PropTypes.arrayOf(PropTypes.string)
};
export default PlayerPanel;