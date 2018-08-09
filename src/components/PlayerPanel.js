import React from "react";
import PropTypes from 'prop-types';
import {FlatList, Text, View} from "react-native";
import PlayerIcon from "./PlayerIcon";

function PlayerPanel({eventId, participants}) {
    if(participants.length === 0) {
        return <Text>No players yet</Text>
    }
    return <View style={{flex: 1, flexDirection: "row"}}>
        <Text>players: </Text>
        <FlatList
            listKey={`${eventId}-players`}
            keyExtractor={(item, i) => `${eventId}-player-${i}`}
            style={{
                flex: 1,
                flexDirection: 'row'
            }}
            data={participants}
            renderItem={({item}) => <PlayerIcon style={{flex: 1}} name={item.name} avatar={item.avatar} />}
        />
    </View>;
}

PlayerPanel.propTypes = {
    participants: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string
    }))
};
export default PlayerPanel;