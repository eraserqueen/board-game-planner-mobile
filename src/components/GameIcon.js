import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import connect from "react-redux/es/connect/connect";
import styles from '../styles/games';

class GameIcon extends Component {
    render() {
        const {game, style} = this.props;
        return (
            <View style={[style, {flexDirection:'row'}]}>
                <View>
                    {game.image
                        ? <Image source={{uri: game.image}} style={styles.gameIcon}/>
                        : <Text style={styles.gameIcon}>?</Text>
                    }
                </View>
                <Text style={styles.gameTitle}>{game.title || 'Pick your preferred game'}</Text>
            </View>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    if (state.games.isUpdating || !state.games.list) {
        return ownProps;
    }
    return {
        game: Object.assign({}, ownProps.game, state.games.list[ownProps.game.gameId])
    };
};
export default connect(mapStateToProps)(GameIcon);