var css = require('./breadcrumb.scss');

var React = require('react');

var antdCss = require('antd/dist/antd.css');
var { Layout } = require('antd');
var { Breadcrumb } = Layout;

var UiBread = React.createClass({
	getInitialState:function(){
		return {
			breadList:[],
		}
	},
	componentDidMounted:function(){

	},
	render:function(){
		return (
			<Breadcrumb className="breadcrumb">
	           	<Breadcrumb.Item>Home</Breadcrumb.Item>
	            <Breadcrumb.Item>List</Breadcrumb.Item>
	            <Breadcrumb.Item>App</Breadcrumb.Item>
	        </Breadcrumb>
		)
	}
});

module.exports = UiBread;