var React = require('react');

var Popup = React.createClass({
	getInitialState:function(){       // 获取初始数据，相当于 vue 里的 data
		return {

		}
	},
	componentDidMount:function(){    // 生成真实 DOM 完成事件，相当于 Vue 里的 ready

	},
	render:function(){
	
		var ppp ;
		if(this.props.data == 1){
			ppp = <p>123</p>
		}else{
			ppp = <p>456</p>
		}

		return (
			<div>
				{ppp}
			</div>
		)
	}
})

module.exports = Popup;