/**
 * Created by Aaron on 2018/2/8.
 */
const valid = {
  val_isnull: (str) => {
    const str1 = str.toString()
    if (typeof (str1) === 'object' && str1 !== null) {
      return true
    }
    if (str1 === undefined) {
      return false
    }
    let rtn = true,
      reg = /^\s*$/g;
    if (str1.match(reg))
      rtn = false;
    return rtn;
  },
  //数字格式_非负整数
  val_number100: (str) => {
    let rtn = false,
      reg = /^((\d)|([1-9]\d+))$/;
    if (str.match(reg))
      rtn = true;
    return rtn;
  },

  //数字格式_正整数
  val_number101: (str) => {
    let rtn = false,
      reg = /^[1-9]\d*$/;
    if (str.match(reg))
      rtn = true;
    return rtn;
  },
  //数字格式_整数
  val_number102: (str) => {
    let rtn = false,
      reg = /^((-[1-9]\d*)|(\d)|([1-9]\d+))$/;
    if (str.match(reg))
      rtn = true;
    return rtn;
  },
  //数字格式_非负浮点数
  val_number103: (str) => {
    let rtn = false,
      reg = /^(((\d)|([1-9]\d+))(\.\d+)?)$/;
    if (str.match(reg))
      rtn = true;
    return rtn;
  },
  //数字格式_正浮点数
  val_number104: (str) => {
    let rtn = false,
      reg = /^((0\.\d*[1-9]\d*)|(([1-9]\d*)(\.\d+)?))$/;
    if (str.match(reg))
      rtn = true;
    return rtn;
  },
  //数字格式_浮点数
  val_number105: (str) => {
    let rtn = false,
      reg = /^((-0\.\d*[1-9]\d*)|((-[1-9]\d*)(\.\d+)?)|(((\d)|([1-9]\d+))(\.\d+)?))$/;
    if (str.match(reg))
      rtn = true;
    return rtn;
  },
  //数字格式_数字
  val_number106: (str) => {
    let rtn = false,
      reg = /^\d+$/;
    if (str.match(reg))
      rtn = true;
    return rtn;
  },
  //日期格式 200，格式yyyy-mm-dd
  val_date: (str) => {
    let rtn = false;
    if (val_isnull(str)) return rtn;
    if (str.length != 10) return rtn;

    let year = str.substring(0, 4);
    if (year > "9999" || year < "1900") return rtn;

    let month = str.substring(5, 7);
    if (month > "12" || month < "01") return rtn;

    let day = str.substring(8, 10);
    if (day > getMaxDay(year, month) || day < "01") return rtn;
    rtn = true;
    return rtn;
  },
  //获得年月的最后一天
  getMaxDay: (year, month) => {
    if (month == 4 || month == 6 || month == 9 || month == 11)
      return "30";
    if (month == 2) {
      if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
        return "29";
      else
        return "28";
    }
    return "31";
  },
  //英文字符 201,忽略大小写，可以包括空格
  val_englishchar: (str) => {
    let rtn = false,
      reg = /^[a-z0-9\-_!@#$%^&*()+=?\|\/\s\,\.\;\:\']+$/i;
    if (str.match(reg))
      rtn = true;
    return rtn;
  },
  //邮政编码 202 3-12位字符+数字，可以包括空格
  val_postcode: (str) => {
    let rtn = false,
      reg = /^[a-z0-9 ]{3,12}$/i;
    if (str.match(reg))
      rtn = true;
    return rtn;
  },
  //固定电话、传真 203 可以+开头，除数字外，可含有-
  val_phone: (str) => {
    let rtn = false,
      reg = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
    if (str.match(reg))
      rtn = true;
    return rtn;
  },

  //手机格式 204 必须以数字开头，除数字外，可含有-
  val_mobile: (str) => {
    let rtn = false,
      reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (str.match(reg))
      rtn = true;
    return rtn;
  },

  //email格式 205
  val_mail: (str) => {
    let rtn = false,
      reg = /^[a-z0-9]([a-z0-9]*[-_\.]?[a-z0-9]+[_]?)*@([a-z0-9]*[-_\.]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
    if (jsTrim(str).match(reg))
      rtn = true;
    return rtn;
  },
  val_mail2(str) {
    let rtn = false,
      reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    if (str.match(reg))
      rtn = true;
    return rtn;
  },

  //验证多个email地址，206 以,或;隔开
  val_mulmail: (str) => {
    let rtn = true,
      i,
      om = str.replace(/\,/g, ";");
    if (om.length > 0) {
      let tmp = om.split(";");
      for (i = 0; i < tmp.length; i++) {
        if (!val_isnull(tmp[i])) {
          if (!val_mail(tmp[i])) {
            rtn = false;
            break;
          }
        }
      }
    }
    return rtn;
  },

  //校验西门子公司邮箱格式，213
  val_siemensmail: (str) => {
    let rtn = true;
    if (!val_mail(str)) {
      rtn = false;
    }
    if ((str.length <= "@siemens.com".length) || ((str.lastIndexOf("@siemens.com") != str.length - "@siemens.com".length) &&
        (str.lastIndexOf("@SIEMENS-HEALTHINEERS.COM") != str.length - "@SIEMENS-HEALTHINEERS.COM".length) &&
        (str.lastIndexOf("@smartmetering.com.cn") != str.length - "@smartmetering.com.cn".length))) {
      rtn = false;
    }
    return rtn;
  },
  //身份证号
  val_IdCard: (id) => {
    let REGEX_ID_CARD = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    if (REGEX_ID_CARD.test(id)) {
      return true
    }
    return false
  },

  //身份证号 207
  val_iden: (ob) => {
    let rtn = false,
      str = $(ob).val(),
      n_iden, i, check,
      arrVerifyCode = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2],
      Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
      aProv = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
      };

    if (str.length != 15 && str.length != 18) {
      alert(lan_res.idcdnum_shdbe_fiorei_dig);
      return rtn;
    }
    let Ai = (str.length == 18) ? str.slice(0, 17) : str.slice(0, 6) + "19" + str.slice(6, 15);
    if (!val_number101(Ai)) {
      alert(lan_res.idcdnum_err);
      return rtn;
    }
    //判断省份
    if (aProv[parseInt(Ai.slice(0, 2))] == null) {
      alert(lan_res.idcdnum_arcod_err);
      return rtn;
    }
    // 判断出生年月日
    let birthday = Ai.slice(6, 10) + "-" + Ai.slice(10, 12) + "-" + Ai.slice(12, 14);
    if (!val_date(birthday)) {
      alert(lan_res.idcdnum_brthd_err);
      return rtn;
    }
    let sex = (Ai.slice(14, 17) % 2) ? "female" : "male";
    // 检查验证码，'X'大小写无关；如果是15位，则转化为18位
    for (i = 0, check = 0; i < 17; i++) {
      check += Ai.charAt(i) * Wi[i];
    }
    sData = arrVerifyCode[check %= 11];
    if (str.length == 18) {
      if (sData != str.slice(17, 18).toUpperCase()) {
        alert(lan_res.idcdnum_lastnum_err_ritis + sData + "！");
        return rtn;
      }
    } else {
      n_iden = Ai + sData;
      $(ob).val(n_iden);
    }

    return true;
  },
  //身份证校验 
  val_identity: (code) => {
    let city = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江 ",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北 ",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏 ",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外 "
    };
    let pass = true;
    //验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
      pass = false;
    } else if (!city[code.substr(0, 2)]) {
      pass = false;
    } else {
      //18位身份证需要验证最后一位校验位
      if (code.length == 18) {
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        let sum = 0;
        let ai = 0;
        let wi = 0;
        for (let i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        let last = parity[sum % 11];
        if (parity[sum % 11] != code[17]) {
          pass = false;
        }
      }
    }
    return pass;
  },
  //台湾身份证号   214
  tw_idenvaild: (ob) => {
    let rtn = false,
      idno = $(ob).val(),
      tw_iden, field = $(ob).attr("dis"),
      //台湾的所有地区编码和验证码如下：英文 县市 / 地区 验证码（数字）
      twareacode = [{
          "code": "A",
          "city": "台北市",
          "valid": 10
        },
        {
          "code": "B",
          "city": "台中市",
          "valid": 11
        },
        {
          "code": "C",
          "city": "基隆市",
          "valid": 12
        },
        {
          "code": "D",
          "city": "台南市",
          "valid": 13
        },
        {
          "code": "E",
          "city": "高雄市",
          "valid": 14
        },
        {
          "code": "F",
          "city": "台北县",
          "valid": 15
        },
        {
          "code": "G",
          "city": "宜兰县",
          "valid": 16
        },
        {
          "code": "H",
          "city": "桃园县",
          "valid": 17
        },
        {
          "code": "I",
          "city": "嘉义市",
          "valid": 34
        },
        {
          "code": "J",
          "city": "新竹县",
          "valid": 18
        },
        {
          "code": "K",
          "city": "苗栗县",
          "valid": 19
        },
        {
          "code": "L",
          "city": "台中县",
          "valid": 20
        },
        {
          "code": "M",
          "city": "南投县",
          "valid": 21
        },
        {
          "code": "N",
          "city": "彰化县",
          "valid": 22
        },
        {
          "code": "O",
          "city": "新竹市",
          "valid": 35
        },
        {
          "code": "P",
          "city": "云林县",
          "valid": 23
        },
        {
          "code": "Q",
          "city": "嘉义县",
          "valid": 24
        },
        {
          "code": "R",
          "city": "台南县",
          "valid": 25
        },
        {
          "code": "S",
          "city": "高雄县",
          "valid": 26
        },
        {
          "code": "T",
          "city": "屏东县",
          "valid": 27
        },
        {
          "code": "U",
          "city": "花莲县",
          "valid": 28
        },
        {
          "code": "V",
          "city": "台东县",
          "valid": 29
        },
        {
          "code": "W",
          "city": "金门县",
          "valid": 32
        },
        {
          "code": "X",
          "city": "澎湖县",
          "valid": 30
        },
        {
          "code": "Y",
          "city": "阳明山管理局",
          "valid": 31
        },
        {
          "code": "Z",
          "city": "连江县",
          "valid": 33
        }
      ];
    if (idno.length != 10) {
      alert(field + " " + lan_res.idcdnum_shdbe_number_dig);
      return rtn;
    }



    //台湾身份证格式验证
    if (idno.length == 10) {
      let reg = /[A-Z][0-9]{9}/;
      //let reg=/[A-Z][1|2][0-9]{8}/;
      if (!idno.match(reg)) {
        alert(field + " 输入错误！");
        return rtn;
      }

      /****
       //台湾身份证验证有效数字
       let frist=idno.slice(0,1),       //首字母
       n1=parseInt(idno.slice(1,2)),  //性别码
       n2=parseInt(idno.slice(2,3)),  //第二位数字
       n3=parseInt(idno.slice(3,4)),  //第三位数字
       n4=parseInt(idno.slice(4,5)),  //第四位数字
       n5=parseInt(idno.slice(5,6)),  //第五位数字
       n6=parseInt(idno.slice(6,7)),  //第六位数字
       n7=parseInt(idno.slice(7,8)),  //第七位数字
       n8=parseInt(idno.slice(8,9)),  //第八位数字
       n9=parseInt(idno.slice(9,10)); //最后一位数
       //alert(frist+' '+n1+' '+n2+' '+n3+' '+n4+' '+n5+' '+n6+' '+n7+' '+n8);

       for(let area  in twareacode){

		if(frist==twareacode[area].code){
 			let v1=parseInt((twareacode[area].valid%100)/10), //十位  首字母对应的第一位验证码
	    		v2=twareacode[area].valid%10,//个位 首字母对应的第二位验证码

	  	//最后一位数字是检验码，通过公式计算得到。计算公式如下：
	  	//通算值 = 首字母对应的第一位验证码 + 首字母对应的第二位验证码 * 9 + 性别码 * 8 + 第二位数字 * 7 + 第三位数字 * 6 + 第四位数字 * 5 + 第五位数字 * 4 + 第六位数字 * 3 + 第七位数字 * 2 + 第八位数字 * 1
      	// 最后一位数 = 10 - 通算值的末尾数


  		 vaildcode=10-((v1+v2*9+n1*8+n2*7+n3*6+n4*5+n5*4+n6*3+n7*2+n8*1)%10);//最后一位有效数字
			if(n9!=vaildcode){
  			 alert(field + " 字段的最后一位校验码不正确！正确的是:" + vaildcode+"！");
    		 return rtn;
			} else {
				tw_iden = idno;
				$(ob).val(tw_iden);
			}
 	}
   	 }
       */
    }
    return true;
  },
}

export default valid
