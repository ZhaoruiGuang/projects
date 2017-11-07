import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {

    Text,
    View,
    Image
} from 'react-native';


export default class ActivityDetail extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
    }

    _onBack() {
        this.props.navigator.pop();
    }

    constructor(props, context) {
        super(props, context);
        this._onBack = this._onBack.bind(this);

    }

    render() {
        var activity = this.props.activity;
        return (
            <View style={{marginTop: 70, flex: 1}}>

                <Text>关注状态: {activity.focus ? "已关注" : "未关注"}</Text>

                <Image style={{width: '100%', height: 150}} source={{uri: activity.uri}}/>
                <Text>这是第 {activity.id} 个活动</Text>
                <Text>活动名称: {activity.name}</Text>
            </View>
        )
    }
}