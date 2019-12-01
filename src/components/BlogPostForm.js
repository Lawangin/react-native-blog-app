import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

const BlogPostForm = ({ onSubmit, initialValue }) => {
    const [title, setTitle] = useState(initialValue.title);
    const [content, setContent] = useState(initialValue.content);

    return (
        <View>
            <Text style={styles.labelStyle}>Enter Title</Text>
            <TextInput
                value={title}
                onChangeText={text => setTitle(text)}
                style={styles.inputStyle}
            />
            <Text style={styles.labelStyle}>Enter Content</Text>
            <TextInput
                value={content}
                onChangeText={text => setContent(text)}
                style={styles.inputStyle}
            />
            <Button title="Save Blog Post" onPress={() => {
                onSubmit(title, content);
            }} />
        </View>
    );
};

BlogPostForm.defaultProps = {
    initialValue: {
        title: '',
        content: ''
    }
};

const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: '#f7f7f7',
        fontSize: 18,
        padding: 10,
        marginHorizontal: 5
    },
    labelStyle: {
        fontSize: 20,
        marginBottom: 5,
        marginHorizontal: 5
    }
});

export default BlogPostForm;