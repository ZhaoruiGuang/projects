
// 本文件存放各页面或模块的初始数据

var siderList = [
		{	
			name:'EA频道',
			weight:8,
			list:[
				{
					name:'客户管理',
					weight:6,
					list:[
						{
							name:'客户资料维护',
							weight:'9',
							href:'customerData',
						}
					]
				},
				{
					name:'交易账户管理',
					weight:6,
					list:[
						{
							name:'客户信息查询',
							weight:'9',
							href:'customerAccount',
						}
					]
				},
				{
					name:'策略管理',
					weight:6,
					list:[
						{
							name:'客户资料维护',
							weight:'9',
							href:'',
						}
					]
				},
				{
					name:'内容管理',
					weight:6,
					list:[
						{
							name:'客户资料维护',
							weight:'9',
							href:'',
						}
					]
				},
				{
					name:'EA大赛',
					weight:6,
					list:[
						{
							name:'客户资料维护',
							weight:'9',
							href:'',
						}
					]
				},
			]
		},
		{	
			name:'系统',
			weight:9,
			list:[

			]
		},
	];





module.exports = {
	siderList:siderList,
}