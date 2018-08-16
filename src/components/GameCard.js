import React, {Component} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import Button from "./Button";
import GameIcon from "./GameIcon";
import styles from '../styles/games';

class GameCard extends Component {
    render() {
        const {game, style, onEditPreference, onSwitchPreferenceOrder} = this.props;
        return (
            <View style={style}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={[{flex: 1}, styles.orderNum]}>{game.order}</Text>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                        {game.order > 1
                            ? <Button text="+"
                                      onPress={() => onSwitchPreferenceOrder(game.order, game.order - 1)}
                                      style={[styles.orderChangeButton, {marginBottom:5}]}
                                      textStyle={styles.orderChangeButtonText}/>
                            : <View style={{height: 25}}/>}
                        {game.order < 3 ?
                            <Button text="-"
                                    onPress={() => onSwitchPreferenceOrder(game.order, game.order + 1)}
                                    style={[styles.orderChangeButton, {marginTop:5}]}
                                    textStyle={styles.orderChangeButtonText}/>
                            : <View style={{height: 25}}/>}
                    </View>
                </View>
                <TouchableHighlight onPress={() => onEditPreference(game.order)} style={{flex: 4}}>
                    <GameIcon game={game}/>
                </TouchableHighlight>
            </View>);
    }
}

export default GameCard;