import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../Button';


it('should render with default style', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
});
it('should render with custom button style', () => {
    const tree = renderer.create(<Button style={{backgroundColor:'orange'}} />).toJSON();
    expect(tree).toMatchSnapshot();
});
it('should render with custom text style', () => {
    const tree = renderer.create(<Button text="My button" textStyle={{backgroundColor:'orange'}} />).toJSON();
    expect(tree).toMatchSnapshot();
});
it('should execute callback on press', () =>{
    const mockPress = jest.fn();
    const component = renderer.create(<Button onPress={mockPress} />).root;
    component.findByType(Button).props.onPress();
    expect(mockPress).toBeCalled();
});

