import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import IndexScreen from './src/screens/IndexScreen';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from "./src/screens/EditScreen";
import { Provider } from './src/context/BlogContext';

const navigator = createStackNavigator(
    {
        IndexScreen: IndexScreen,
        ShowScreen: ShowScreen,
        Create: CreateScreen,
        Edit: EditScreen
    },
    {
        initialRouteName: 'IndexScreen',
        defaultNavigationOptions: {
            title: 'Blog'
        }
    }
);

const App = createAppContainer(navigator);

export default () => {
    return (
        <Provider>
            <App />
        </Provider>
    );
};
