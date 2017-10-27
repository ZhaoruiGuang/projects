import './home.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, hashHistory ,Switch } from 'react-router-dom';

import antdCss from 'antd/dist/antd.css';
import { Layout, Breadcrumb, Icon } from 'antd';
const  { Header, Content, Sider, Footer } = Layout;

import Popup    from 'popup';
import UiNav    from 'nav';
import UiFooter from 'footer';
import UiSider  from 'sider';
import welcome  from 'welcome';
import customerData from 'customerData';
import customerAccount from 'customerAccount';

class Vm extends React.Component{
    constructor(props){
        super(props);
    };
    render(){
        return (
            <Layout className="outsideLayout">
                <Header className="header">
                    <UiNav />
                </Header>
                <Layout>
                    <Sider className="slider">
                        <UiSider/>
                    </Sider>
                    <Layout className="insideLayout">
                        <Breadcrumb className="breadcrumb">
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content className="content">
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
                <Footer className="footer">
                    <UiFooter />
                </Footer>
            </Layout>
        )
    }
};

ReactDOM.render((
    <HashRouter history={hashHistory}>
        <Vm>
            <Route exact breadcrumbName="home" path="/" component={welcome} />
            <Route exact breadcrumbName="customerData" path="/customerData" component={customerData} />
            <Route exact breadcrumbName="customerAccount" path="/customerAccount" component={customerAccount} />
        </Vm>
    </HashRouter>
), document.getElementById('homeBox'))


// 刷新页面返回欢迎页面
window.onload = function(){
    let href = window.location.href;
    let hrefArr = href.split('#');
    window.location.href = hrefArr[0]+'#/';
}