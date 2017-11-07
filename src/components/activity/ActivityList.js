import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListView, StyleSheet, View} from 'react-native';
import ActivityDetail from './ActivityDetail'
import ActivityItem from './ActivityItem'
import {store} from '../../store'
import {focusActivity} from '../../actions'


export default class ActivityList extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
    }

    _onForward(rowData) {
        this.props.navigator.push({
            title: rowData.name,
            component: ActivityDetail,
            passProps: {
                title: rowData.name,
                activity: rowData
            },
            rightButtonTitle: null
        });
    }

    _onBack() {

    }

    _onFocus(rowData, i) {

        focusActivity(rowData, i)


    }

    constructor(props, context) {
        super(props, context);
        this._onForward = this._onForward.bind(this);
        this._onBack = this._onBack.bind(this);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1 !== r2
            }
        })

        this.state = {
            dataSource: ds.cloneWithRows(props.dataSource),
        }
        store.subscribe(() => {
            let dataSource = store.getState().dataSource;

            const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => {
                    return r1 !== r2
                }
            })

            this.setState({
                dataSource: ds.cloneWithRows(dataSource)
            })
        })
    }

    componentWillUpdate(state) {

    }

    render() {

        let dataSource = this.state.dataSource;
        return (
            <View style={styles.container}>

                <ListView
                    dataSource={dataSource}
                    renderRow={(rowData, sectionID, rowID) => {

                        return (

                            <ActivityItem
                                rowData={rowData}
                                onFocus={(rowData) => {

                                    this._onFocus(rowData, rowID)
                                }}
                                onForward={this._onForward}
                            />
                        )
                    }}
                />


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        flex: 1
    }
})