/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    NavigatorIOS,
    Text
} from 'react-native';
import ActivityList from './src/components/activity/ActivityList'
import Redux, {createStore} from 'redux'
import { Provider ,connect } from 'react-redux';
import dataList from './src/data/ActivityList.json'
import {store} from './src/store'
import FocusList from './src/components/focus/FocusList'


export default class AwesomeProject extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <Provider store={store}>
                <NavigatorIOS
                    ref='nav'
                    initialRoute={{
                        component: ActivityList,
                        title: '活动列表',
                        passProps: {
                            title: '活动列表222',
                            dataSource: store.getState().dataSource
                        },
                    }}
                    style={{flex: 1}}
                    rightButtonTitle="我的关注"
                    onRightButtonPress={()=>{
                        let {nav} = this.refs
                        nav.push({
                            title: 'FocusList',
                            component: FocusList,
                            passProps: {
                                title: 'FocusList',
                                dataSource: store.getState().dataSource
                            },
                            rightButtonTitle: null
                        })
                    }}

                />
            </Provider>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('ReduxDemo', () => AwesomeProject);
