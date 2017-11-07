import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListView, StyleSheet, View} from 'react-native';
import {store} from '../../store'
import FocusItem from './FocusItem'
import {focusActivity} from '../../actions'
import ActivityDetail from '../activity/ActivityDetail'


export default class FocusList extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
    }

    _cancelFocus(rowData, rowID) {
        focusActivity(rowData, rowID)
    }

    _onForward(rowData) {
        this.props.navigator.push({
            title: rowData.name,
            component: ActivityDetail,
            passProps: {
                activity: rowData,
                title: rowData.name
            }
        });
    }


    constructor(props, context) {
        super(props, context);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1 !== r2
            }
        })

        this.state = {
            dataSource: ds.cloneWithRows(props.dataSource.filter(a => a.focus)),
        }
        this._onForward = this._onForward.bind(this)


    }

    componentWillMount() {
        this.unsub = store.subscribe(() => {
            let dataSource = store.getState().dataSource.filter(a => a.focus);

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

    componentWillUnmount() {
        this.unsub()
    }

    render() {

        let dataSource = this.state.dataSource;
        return (
            <View style={{
                flex: 1
            }}>
                <ListView
                    dataSource={dataSource}
                    enableEmptySections={true}
                    renderRow={(rowData, sectionID, rowID) => {

                        return (

                            <FocusItem
                                rowData={rowData}
                                onForward={this._onForward}
                                cancelFocus={(rowData) => {

                                    this._cancelFocus(rowData, rowID)
                                }}

                            />
                        )
                    }}
                />
            </View>
        )
    }
}
