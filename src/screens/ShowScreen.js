import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { AntDesign } from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {
    const { state } = useContext(Context);

    const id = navigation.getParam('id');
    const blogPost = state.find(blogPost => blogPost.id === id);

    return (
        <View>
            <Text>{blogPost.title}</Text>
            <Text>{blogPost.content}</Text>
        </View>
    );
};

ShowScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('Edit', {
                        id: navigation.getParam('id')
                    })
                }
            >
                <AntDesign name="edit" size={30} style={styles.iconStyle} />
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    iconStyle: {
        padding: 5,
        marginHorizontal: 5
    }
});

export default ShowScreen;
