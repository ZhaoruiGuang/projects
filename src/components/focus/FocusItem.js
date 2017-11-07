import React, {Component} from 'react'
import {View, TouchableHighlight, Image, Text} from 'react-native'


export default class FocusItem extends Component {


    constructor(props) {
        super(props)
        this._onForward = props.onForward
        this._cancelFocus = props.cancelFocus
    }

    render() {
        let rowData = this.props.rowData

        return (
            <View style={{
                flexDirection: "row"
            }}>
                <TouchableHighlight
                    onPress={() => {
                        this._onForward(rowData)
                    }}
                    style={{
                        marginTop: 10,
                        flex: 8
                    }}
                >
                    <Image
                        source={{uri: rowData.uri}}
                        style={{
                            height: 150
                        }}
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    style={{
                        flex: 2
                    }}>
                    <Text style={{
                        textAlign: "center",
                        lineHeight: 150
                    }}
                          onPress={() => {
                              this._cancelFocus(rowData)
                          }}
                    >{rowData.focus ? '已关注' : '关注'}</Text>
                </TouchableHighlight>
            </View>
        )
    }

}