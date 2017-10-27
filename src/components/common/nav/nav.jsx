import './nav.scss';
import React from 'react';
import member from 'member';

class Nav extends React.Component{
	// getInitialState:function(){  // 获取初始数据，相当于 vue 里的 data (ES5 语法)
	// 	return {
	// 		userInfo:{},
	// 	}
	// },
	constructor(props){   // 获取初始数据，相当于 vue 里的 data (ES6 语法)
		super(props);
		this.state = {
			userInfo:{},
		}
	};
	componentDidMount = () => {    // 生成真实 DOM 完成事件，相当于 Vue 里的 ready
		let _this = this;
		setTimeout(()=>{
			_this.setState({
				userInfo:window.PAGE_DATA.userInfo,
				selectState:'none',
				
			});
		});
	};
	logOff = () => {
		let param = {

		};
		member.logout(param)
		.then((res)=>{

		},(res)=>{

		})
	};
	showSelect = () => {
		let selectState;
		if(this.state.selectState == 'none'){
			selectState = 'block';
		}else{
			selectState = 'none';
		}
		this.setState({
			selectState:selectState,
		})
	};
	render(){
		return (
			<div className = "nav">
				<span className = "logo"></span>
				<span className = "navTitle">综合管理后台-CA系统</span>
				<span className = "userName" onMouseEnter={this.showSelect} onMouseLeave={this.showSelect}>
					<span title={this.state.userInfo.userName}>{this.state.userInfo.userName}</span>
					<ul className = "userSelect" style={{display: this.state.selectState}}>
						<li>
							<a href="">个人信息</a>
						</li>
						<li>
							<a onClick={this.logOff}>退出</a>
						</li>
					</ul>
				</span>
				<span className = "role">{this.state.userInfo.role}</span>
			</div>
		)
	}
};

export default Nav;