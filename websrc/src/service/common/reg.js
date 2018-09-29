/*
	所有正则校验封装
*/

const emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/; 	// 邮箱验证
const telephoneReg = /^1[3456789]\d{9}$/;						// 手机正则 已加入2017 年底最新发布 199、198、166 号段
const passwordReg = /^[0-9a-zA-Z_]{6,20}$/;					// 密码：6-20位字符，可以是 数字、字母、下划线
const realNameReg = /^[\u4E00-\u9FA5]{2,6}$/;					// 真实姓名
const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;	// 身份证号
const intReg = /^\+?[1-9][0-9]*$/								// 数字，整数
const numberReg = /^\+?[0-9][0-9\.]*$/							// 数字，整数或小数
const familyPhone = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/		// 固定电话
const digitalAlphabet = /^[0-9A-Za-z]{6,32}$/		            // 6-32位数字字母
const alphabetReg = /^[A-Za-z]{8}$/		                    	// 8位字母
const positiveNumberReg = /^[1-9]$/		                    	// 正数
const nonNegativeNumberReg = /^[0-9]*$/		                    // 非负数
const chineseReg = /^[\u4E00-\u9FA5]*$/							// 验证中文


// 新密码相关（8-20位，至少包含数字、字母、符号其中两种）
const haveNumReg = /[\d]+/;				// 包含数字
const haveCodeReg = /[a-zA-Z]+/;		// 包含字母
const allNumReg = /^[0-9]*$/			// 纯数字
const allCodeReg = /^[a-zA-Z]*$/;		// 纯字母

export default {
	validEmail(email){
		return emailReg.test(email);
	},
	validTelephone(tel){
		return telephoneReg.test(tel);
	},
	validPassword(password){
		return passwordReg.test(password);
	},
	validRealName(realName){
		return realNameReg.test(realName);
	},
	validIdCard(idCard){
		return idCardReg.test(idCard);
	},
	validPositiveNumber(num){
		return positiveNumberReg.test(num);
	},
	validNonNegativeNumber(num){
		return nonNegativeNumberReg.test(num);
	},
	validInt(num){
		return intReg.test(num);
	},
	validNumber(num){
		return numberReg.test(num);
	},
    validDigitalAlphabet(num){
        return digitalAlphabet.test(num);
    },
    validAlphabetReg(num){
        return alphabetReg.test(num);
    },
	// 新密码格式验证，修改时间：2018-04-18
	validNewPass(num){
		let haveNum = haveNumReg.test(num)
		let haveCode = haveCodeReg.test(num)
		let allNum = allNumReg.test(num)
		let allCode = allCodeReg.test(num)
		let res;
		if(!allNum && !allCode && (haveNum || haveCode)){
			res = true;
		}else{
			res = false;
		}
		return res;
	},
    validFamilyPhone(num){
		return familyPhone.test(num);
	},


// 与实名认证页关联，不允许改变方法名 ------------------------- start
		// 联系人姓名
	validContactName(str){
		return realNameReg.test(str);
	},	
		// 联系人身份证号
	validContactIdCard(str){
		return idCardReg.test(str);
	},
		// 法人姓名
	validLegalName(str){
		return realNameReg.test(str);
	},
		// 法人身份证号
	validLegalIdCard(str){
		return idCardReg.test(str);
	},
		// 企业名称
	validCompanyName(str){
		return chineseReg.test(str);
	},
		// 银行开户许可证
	validOpenPermit(str){
		return nonNegativeNumberReg.test(str);
	},
		// 银行开户行支行名称
	validBranchName(str){
		return chineseReg.test(str);
	},
		// 开户行账号
	validOpenAccount(str){
		return nonNegativeNumberReg.test(str);
	},
// 与实名认证页关联，不允许改变方法名 ------------------------- end
}