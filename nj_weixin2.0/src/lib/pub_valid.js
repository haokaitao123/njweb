const valid = {
  //数字格式_非负整数
  val_number100: (str) => {
    let rtn = false,
      reg = /^((\d)|([1-9]\d+))$/;
    var strs = str.replace(/(^\s*)|(\s*$)/g, "")
    if (strs.match(reg))
      rtn = true;
    return rtn;
  },
  //数字格式_正整数
  val_number101: (str) => {
    let rtn = false,
      reg = /^[1-9]\d*$/;
    var strs = str.replace(/(^\s*)|(\s*$)/g, "")
    if (strs.match(reg))
      rtn = true;
    return rtn;
  },
  //数字格式_整数
  val_number102: (str) => {
    let rtn = false,
      reg = /^((-[1-9]\d*)|(\d)|([1-9]\d+))$/;
    var strs = str.replace(/(^\s*)|(\s*$)/g, "")
    if (strs.match(reg))
      rtn = true;
    return rtn;
  },
  //数字格式_非负浮点数
  val_number103: (str) => {
    console.log('str', str)
    let rtn = false,
      reg = /^(((\d)|([1-9]\d+))(\.\d+)?)$/;
    var strs = str.replace(/(^\s*)|(\s*$)/g, "")
    // console.log('str',strs)
    if (strs.match(reg))
      rtn = true;
    return rtn;
  },
  //数字格式_正浮点数
  val_number104: (str) => {
    let rtn = false,
      reg = /^((0\.\d*[1-9]\d*)|(([1-9]\d*)(\.\d+)?))$/;
    var strs = str.replace(/(^\s*)|(\s*$)/g, "")
    if (strs.match(reg))
      rtn = true;
    return rtn;
  },
  //数字格式_浮点数
  val_number105: (str) => {
    let rtn = false,
      reg = /^((-0\.\d*[1-9]\d*)|((-[1-9]\d*)(\.\d+)?)|(((\d)|([1-9]\d+))(\.\d+)?))$/;
    var strs = str.replace(/(^\s*)|(\s*$)/g, "")
    if (strs.match(reg))
      rtn = true;
    return rtn;
  },
  //数字格式_数字
  val_number106: (str) => {
    console.log(str)
    let rtn = false,
      reg = /^\d+$/;
    var strs = str.replace(/(^\s*)|(\s*$)/g, "")
    if (strs.match(reg))
      rtn = true;
    return rtn;
  },
  //汉字验证
  val_chinese: (str) => {
    let rtn = false,
      reg = /[^\0-9]/;
    var reg1 = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
    var strs = str.replace(/(^\s*)|(\s*$)/g, "")
    if (strs.match(reg)) {
      if (!strs.match(reg1)) {
        rtn = true;
        return rtn;
      }
    }
  },
  //手机格式 204 必须以数字开头，除数字外，可含有-
  val_mobile: (str) => {
    let rtn = false,
      reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    var strs = str.replace(/(^\s*)|(\s*$)/g, "")
    if (strs.match(reg))
      rtn = true;
    return rtn;
  },
  //银行卡号码的验证
  val_backNumber: (bankCard) => {
    var bankCardnum = bankCard.replace(/(^\s*)|(\s*$)/g, "");
    //console.log('bankCardnum',bankCard.replace(/(^\s*)|(\s*$)/g, ""))
    if (bankCardnum != "") {
      if (bankCardnum.length < 16 || bankCardnum.length > 19) {
        return 1;
      }
      var num = /^\d*$/; //全数字
      if (!num.test(bankCardnum)) {
        return 2;
      }
      //开头6位
      var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
      if (strBin.indexOf(bankCardnum.substring(0, 2)) == -1) {
        return 3;
      }
      return 4;
    }
  },
  //email格式 205
  val_mail2(str) {
    let rtn = false,
      reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    str.replace(/(^\s*)|(\s*$)/g, "")
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
    var codes = code.replace(/(^\s*)|(\s*$)/g, "")
    let pass = true;
    //验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
    if (!codes || !/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/.test(codes)) {
      pass = false;
    } else if (!city[codes.substr(0, 2)]) {
      pass = false;
    } else {
      //18位身份证需要验证最后一位校验位
      if (codes.length == 18) {
        codes = codes.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        let sum = 0;
        let ai = 0;
        let wi = 0;
        for (let i = 0; i < 17; i++) {
          ai = codes[i];
          wi = factor[i];
          sum += ai * wi;
        }
        let last = parity[sum % 11];
        if (parity[sum % 11] != codes[17]) {
          pass = false;
        }
      }
    }
    return pass;
  },
}
export default valid
