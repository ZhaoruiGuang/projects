import {createStore} from 'redux'
import {reducers} from '../reducers'

import dataList from '../data/ActivityList.json'


export let store = createStore(reducers, {
    dataSource: dataList.body
})