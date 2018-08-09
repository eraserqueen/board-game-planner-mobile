import React from 'react';
import {Image, View, Text} from 'react-native';

export default function PlayerIcon({name, avatar}) {
    console.log(avatar);
    return (<View style={{width:50, height:50, alignItems: 'center', padding: 2}}>
        <Image source={{uri: avatar}} style={{width: 32, height: 32}} />
        <Text style={{fontSize: 10}}>{name}</Text>
    </View>);
}