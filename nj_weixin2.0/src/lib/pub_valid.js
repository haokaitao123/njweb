const valid = {
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
  //手机格式 204 必须以数字开头，除数字外，可含有-
  val_mobile: (str) => {
    let rtn = false,
      reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (str.match(reg))
      rtn = true;
    return rtn;
  },

  //email格式 205
  val_mail2(str) {
    let rtn = false,
      reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    if (str.match(reg))
      rtn = true;
    return rtn;
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
    if (!code || !/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(code)) {
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
}

export default valid