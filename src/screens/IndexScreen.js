import React, { useContext, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Button,
    TouchableOpacity
} from 'react-native';
import { Context } from '../context/BlogContext';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    const { state, deleteBlogPost, getBlogPost } = useContext(Context);

    useEffect(() => {
        getBlogPost();
        const listener = navigation.addListener('didFocus', () => {
            getBlogPost();
        });

        return () => {
            listener.remove();
        }
    }, []);

    return (
        <View>
            <FlatList
                data={state}
                keyExtractor={blogPost => blogPost.title}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('ShowScreen', {
                                    id: item.id
                                })
                            }
                        >
                            <View style={styles.row}>
                                <Text style={styles.titleStyle}>
                                    {item.title} - {item.id}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => deleteBlogPost(item.id)}
                                >
                                    <FontAwesome
                                        style={styles.trashStyle}
                                        name="trash-o"
                                    />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                <AntDesign name="plus" size={30} style={styles.plusStyle} />
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    trashStyle: {
        fontSize: 24,
        marginHorizontal: 10,
        color: 'white'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderBottomWidth: 1,
        backgroundColor: 'navy',
        borderColor: 'grey',
        marginBottom: 4
    },
    titleStyle: {
        fontSize: 18,
        marginHorizontal: 10,
        color: 'white'
    },
    plusStyle: {
        padding: 5,
        marginHorizontal: 5
    }
});

export default IndexScreen;
