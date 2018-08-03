import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {getGameDetails} from "../actions/games";

const styles = StyleSheet.create({
    gameCard: {
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#c8f5d3',
        flex: 1,
        flexDirection: 'row',
        borderRadius: 5,
    },
    orderNum: {
        fontSize: 40,
        color: '#fff',
        fontWeight: 'bold'
    },
    image: {
        height: 50,
        width: 50,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 3
    },
    title: {
        fontSize: 15
    }

});


class GameIcon extends Component {
    render() {
        const {game, style} = this.props;
        return (
            <View style={[styles.gameCard, style]}>
                <Text style={styles.orderNum}>{game.order}</Text>
                {game.image &&
                <Image source={{uri: game.image}} style={styles.image}/>
                }
                <Text style={styles.title}>{game.title}</Text>

            </View>);
    }
}


const mapStateToProps = (state, ownProps) => {
    if(state.games.isFetching || !state.games.list) {
        return ownProps;
    }
    return {
        game: Object.assign({}, ownProps.game, state.games.list[ownProps.game.gameId])
    };
};
export default connect(mapStateToProps)(GameIcon);