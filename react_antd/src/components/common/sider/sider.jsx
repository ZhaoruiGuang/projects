import './sider.scss';
import React from 'react';

import { Menu , Icon ,Layout } from 'antd';
const { SubMenu } = Menu;
import { Link } from 'react-router-dom';
import member from 'member';
import data from 'datas';

class Sider extends React.Component{
	constructor(props) {   // 获取初始数据，相当于 vue 里的 data (ES6 语法)
        super(props);
        this.state = {
			userInfo:{},
			list:[],

		}
    };
	componentDidMount = () => {    // 生成真实 DOM 完成事件，相当于 Vue 里的 ready
		let _this = this;
		setTimeout(()=>{
			_this.setState({
				userInfo:window.PAGE_DATA.userInfo,
				list:data.siderList,
			});
		});
	};
	render(){
		return (
            <Menu mode="inline" className="menuList">
            	
                {
                	this.state.list.map(function(el1,index1){
                		return (
                			// 一级标题
                			<SubMenu key={el1.name} title={<span>{el1.name}</span>} className="firstTitle">
                				{
                					el1.list.map(function(el2,index2){
                						return (
                							// 二级标题
                							<SubMenu key={el2.name}  title={<span>{el2.name}</span>} className="secondTitle">
                								{
                									el2.list.map(function(el3,index3){
				                						return (
				                							// 三级标题
				                							<Menu.Item key={el3.name}>
				                								<Link to={el3.href}>{el3.name}</Link>
				                							</Menu.Item>
				                						)
				                					})
                								}
                							</SubMenu>
                						)
                					})
                				}
                			</SubMenu>
                		)
                	})
                }
            </Menu>  
		)
	}
}

export default Sider;