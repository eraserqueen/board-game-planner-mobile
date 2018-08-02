import React from 'react';
import {Text, TouchableHighlight} from 'react-native';
import styles from '../styles/button';

export default function Button({onPress, text, style, textStyle}){
    return (
        <TouchableHighlight onPress={onPress} style={[styles.button, style]}>
            <Text style={[styles.buttonText, textStyle]}>{text}</Text>
        </TouchableHighlight>
    );
}