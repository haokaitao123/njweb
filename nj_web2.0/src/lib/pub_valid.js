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
    //是否有特殊字符
    val_check: (str) => {
        var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
        regCn = /[·！#￥（——）：；“”‘’、，|《。》？、【】[\]]/im;
        if(regEn.test(str) || regCn.test(str)) {
            return false;
        }
        return true;
    },
    //非空的数字格式_非负浮点数
    val_number99: (str) => {
    if (str === "") {
        return true
    } 
      let rtn = false,
    reg = /^(((\d)|([1-9]\d+))(\.\d+)?)$/;
    if (str.match(reg))
      rtn = true;
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
//银行卡号码验证
	val_bank: (bankCard) => {
		//开头6位
		var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
		var num = /^\d*$/; //全数字
		if(bankCard != "") {
			if(bankCard.length < 15 || bankCard.length > 20){
				return 1;
			}else if(!num.test(bankCard)) {
				return 2;
			}else if(strBin.indexOf(bankCard.substring(0, 2)) == -1) {
				return 3;
			}

		}

	},
	//银行卡类型判断
	bankCardAttribution: (bankCard) => {
		var cardTypeMap = {
			DC: "储蓄卡",
			CC: "信用卡",
			SCC: "准贷记卡",
			PC: "预付费卡"
		};

		function extend(target, source) {
			var result = {};
			var key;
			target = target || {};
			source = source || {};
			for(key in target) {
				if(target.hasOwnProperty(key)) {
					result[key] = target[key];
				}
			}
			for(key in source) {
				if(source.hasOwnProperty(key)) {
					result[key] = source[key];
				}
			}
			return result;
		}

		function getCardTypeName(cardType) {
			if(cardTypeMap[cardType]) {
				return cardTypeMap[cardType]
			}
			return undefined;
		}
		var bankcardList = [{
			bankName: "中国邮政储蓄银行",
			bankCode: "PSBC",
			patterns: [{
				reg: /^(621096|621098|622150|622151|622181|622188|622199|955100|621095|620062|621285|621798|621799|621797|620529|621622|621599|621674|623218|623219)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(62215049|62215050|62215051|62218850|62218851|62218849)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(622812|622810|622811|628310|625919)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "中国工商银行",
			bankCode: "ICBC",
			patterns: [{
				reg: /^(620200|620302|620402|620403|620404|620406|620407|620409|620410|620411|620412|620502|620503|620405|620408|620512|620602|620604|620607|620611|620612|620704|620706|620707|620708|620709|620710|620609|620712|620713|620714|620802|620711|620904|620905|621001|620902|621103|621105|621106|621107|621102|621203|621204|621205|621206|621207|621208|621209|621210|621302|621303|621202|621305|621306|621307|621309|621311|621313|621211|621315|621304|621402|621404|621405|621406|621407|621408|621409|621410|621502|621317|621511|621602|621603|621604|621605|621608|621609|621610|621611|621612|621613|621614|621615|621616|621617|621607|621606|621804|621807|621813|621814|621817|621901|621904|621905|621906|621907|621908|621909|621910|621911|621912|621913|621915|622002|621903|622004|622005|622006|622007|622008|622010|622011|622012|621914|622015|622016|622003|622018|622019|622020|622102|622103|622104|622105|622013|622111|622114|622017|622110|622303|622304|622305|622306|622307|622308|622309|622314|622315|622317|622302|622402|622403|622404|622313|622504|622505|622509|622513|622517|622502|622604|622605|622606|622510|622703|622715|622806|622902|622903|622706|623002|623006|623008|623011|623012|622904|623015|623100|623202|623301|623400|623500|623602|623803|623901|623014|624100|624200|624301|624402|623700|624000)\d{12}$/g,
				cardType: "DC"
			}, {
				reg: /^(622200|622202|622203|622208|621225|620058|621281|900000|621558|621559|621722|621723|620086|621226|621618|620516|621227|621288|621721|900010|623062|621670|621720|621379|621240|621724|621762|621414|621375|622926|622927|622928|622929|622930|622931|621733|621732|621372|621369|621763)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(402791|427028|427038|548259|621376|621423|621428|621434|621761|621749|621300|621378|622944|622949|621371|621730|621734|621433|621370|621764|621464|621765|621750|621377|621367|621374|621731|621781)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(9558)\d{15}$/g,
				cardType: "DC"
			}, {
				reg: /^(370246|370248|370249|370247|370267|374738|374739)\d{9}$/g,
				cardType: "CC"
			}, {
				reg: /^(427010|427018|427019|427020|427029|427030|427039|438125|438126|451804|451810|451811|458071|489734|489735|489736|510529|427062|524091|427064|530970|530990|558360|524047|525498|622230|622231|622232|622233|622234|622235|622237|622239|622240|622245|622238|451804|451810|451811|458071|628288|628286|622206|526836|513685|543098|458441|622246|544210|548943|356879|356880|356881|356882|528856|625330|625331|625332|622236|524374|550213|625929|625927|625939|625987|625930|625114|622159|625021|625022|625932|622889|625900|625915|625916|622171|625931|625113|625928|625914|625986|625925|625921|625926|625942|622158|625917|625922|625934|625933|625920|625924|625017|625018|625019)\d{10}$/g,
				cardType: "CC"
			}, {
				reg: /^(45806|53098|45806|53098)\d{11}$/g,
				cardType: "CC"
			}, {
				reg: /^(622210|622211|622212|622213|622214|622220|622223|622225|622229|622215|622224)\d{10}$/g,
				cardType: "SCC"
			}, {
				reg: /^(620054|620142|620184|620030|620050|620143|620149|620124|620183|620094|620186|620148|620185)\d{10}$/g,
				cardType: "PC"
			}, {
				reg: /^(620114|620187|620046)\d{13}$/g,
				cardType: "PC"
			}]
		}, {
			bankName: "中国农业银行",
			bankCode: "ABC",
			patterns: [{
				reg: /^(622841|622824|622826|622848|620059|621282|622828|622823|621336|621619|622821|622822|622825|622827|622845|622849|623018|623206|621671|622840|622843|622844|622846|622847|620501)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(95595|95596|95597|95598|95599)\d{14}$/g,
				cardType: "DC"
			}, {
				reg: /^(103)\d{16}$/g,
				cardType: "DC"
			}, {
				reg: /^(403361|404117|404118|404119|404120|404121|463758|519412|519413|520082|520083|552599|558730|514027|622836|622837|628268|625996|625998|625997|622838|625336|625826|625827|544243|548478|628269)\d{10}$/g,
				cardType: "CC"
			}, {
				reg: /^(622820|622830)\d{10}$/g,
				cardType: "SCC"
			}]
		}, {
			bankName: "中国银行",
			bankCode: "BOC",
			patterns: [{
				reg: /^(621660|621661|621662|621663|621665|621667|621668|621669|621666|456351|601382|621256|621212|621283|620061|621725|621330|621331|621332|621333|621297|621568|621569|621672|623208|621620|621756|621757|621758|621759|621785|621786|621787|621788|621789|621790|622273|622274|622771|622772|622770|621741|621041)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(621293|621294|621342|621343|621364|621394|621648|621248|621215|621249|621231|621638|621334|621395|623040|622348)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(625908|625910|625909|356833|356835|409665|409666|409668|409669|409670|409671|409672|512315|512316|512411|512412|514957|409667|438088|552742|553131|514958|622760|628388|518377|622788|628313|628312|622750|622751|625145|622479|622480|622789|625140|622346|622347)\d{10}$/g,
				cardType: "CC"
			}, {
				reg: /^(518378|518379|518474|518475|518476|524865|525745|525746|547766|558868|622752|622753|622755|524864|622757|622758|622759|622761|622762|622763|622756|622754|622764|622765|558869|625905|625906|625907|625333)\d{10}$/g,
				cardType: "SCC"
			}, {
				reg: /^(53591|49102|377677)\d{11}$/g,
				cardType: "SCC"
			}, {
				reg: /^(620514|620025|620026|620210|620211|620019|620035|620202|620203|620048|620515|920000)\d{10}$/g,
				cardType: "PC"
			}, {
				reg: /^(620040|620531|620513|921000|620038)\d{13}$/g,
				cardType: "PC"
			}]
		}, {
			bankName: "中国建设银行",
			bankCode: "CCB",
			patterns: [{
				reg: /^(621284|436742|589970|620060|621081|621467|621598|621621|621700|622280|622700|623211|623668)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(421349|434061|434062|524094|526410|552245|621080|621082|621466|621488|621499|622966|622988|622382|621487|621083|621084|620107)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(436742193|622280193)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(553242)\d{12}$/g,
				cardType: "CC"
			}, {
				reg: /^(625362|625363|628316|628317|356896|356899|356895|436718|436738|436745|436748|489592|531693|532450|532458|544887|552801|557080|558895|559051|622166|622168|622708|625964|625965|625966|628266|628366|622381|622675|622676|622677)\d{10}$/g,
				cardType: "CC"
			}, {
				reg: /^(5453242|5491031|5544033)\d{11}$/g,
				cardType: "CC"
			}, {
				reg: /^(622725|622728|436728|453242|491031|544033|622707|625955|625956)\d{10}$/g,
				cardType: "SCC"
			}, {
				reg: /^(53242|53243)\d{11}$/g,
				cardType: "SCC"
			}]
		}, {
			bankName: "中国交通银行",
			bankCode: "COMM",
			patterns: [{
				reg: /^(622261|622260|622262|621002|621069|621436|621335)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(620013)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(405512|601428|405512|601428|622258|622259|405512|601428)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(49104|53783)\d{11}$/g,
				cardType: "CC"
			}, {
				reg: /^(434910|458123|458124|520169|522964|552853|622250|622251|521899|622253|622656|628216|622252|955590|955591|955592|955593|628218|625028|625029)\d{10}$/g,
				cardType: "CC"
			}, {
				reg: /^(622254|622255|622256|622257|622284)\d{10}$/g,
				cardType: "SCC"
			}, {
				reg: /^(620021|620521)\d{13}$/g,
				cardType: "PC"
			}]
		}, {
			bankName: "招商银行",
			bankCode: "CMB",
			patterns: [{
				reg: /^(402658|410062|468203|512425|524011|622580|622588|622598|622609|95555|621286|621483|621485|621486|621299)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(690755)\d{9}$/g,
				cardType: "DC"
			}, {
				reg: /^(690755)\d{12}$/g,
				cardType: "DC"
			}, {
				reg: /^(356885|356886|356887|356888|356890|439188|439227|479228|479229|521302|356889|545620|545621|545947|545948|552534|552587|622575|622576|622577|622578|622579|545619|622581|622582|545623|628290|439225|518710|518718|628362|439226|628262|625802|625803)\d{10}$/g,
				cardType: "CC"
			}, {
				reg: /^(370285|370286|370287|370289)\d{9}$/g,
				cardType: "CC"
			}, {
				reg: /^(620520)\d{13}$/g,
				cardType: "PC"
			}]
		}, {
			bankName: "中国民生银行",
			bankCode: "CMBC",
			patterns: [{
				reg: /^(622615|622616|622618|622622|622617|622619|415599|421393|421865|427570|427571|472067|472068|622620)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(545392|545393|545431|545447|356859|356857|407405|421869|421870|421871|512466|356856|528948|552288|622600|622601|622602|517636|622621|628258|556610|622603|464580|464581|523952|545217|553161|356858|622623|625912|625913|625911)\d{10}$/g,
				cardType: "CC"
			}, {
				reg: /^(377155|377152|377153|377158)\d{9}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "中国光大银行",
			bankCode: "CEB",
			patterns: [{
				reg: /^(303)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(90030)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(620535)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(620085|622660|622662|622663|622664|622665|622666|622667|622669|622670|622671|622672|622668|622661|622674|622673|620518|621489|621492)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(356837|356838|486497|622657|622685|622659|622687|625978|625980|625981|625979|356839|356840|406252|406254|425862|481699|524090|543159|622161|622570|622650|622655|622658|625975|625977|628201|628202|625339|625976)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "中信银行",
			bankCode: "CITIC",
			patterns: [{
				reg: /^(433670|433680|442729|442730|620082|622690|622691|622692|622696|622698|622998|622999|433671|968807|968808|968809|621771|621767|621768|621770|621772|621773|622453|622456)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(622459)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(376968|376969|376966)\d{9}$/g,
				cardType: "CC"
			}, {
				reg: /^(400360|403391|403392|404158|404159|404171|404172|404173|404174|404157|433667|433668|433669|514906|403393|520108|433666|558916|622678|622679|622680|622688|622689|628206|556617|628209|518212|628208|356390|356391|356392|622916|622918|622919)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "华夏银行",
			bankCode: "HXBANK",
			patterns: [{
				reg: /^(622630|622631|622632|622633|999999|621222|623020|623021|623022|623023)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(523959|528709|539867|539868|622637|622638|628318|528708|622636|625967|625968|625969)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "深发/平安银行",
			bankCode: "SPABANK",
			patterns: [{
				reg: /^(621626|623058)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(602907|622986|622989|622298|627069|627068|627066|627067|412963|415752|415753|622535|622536|622538|622539|998800|412962|622983)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(531659|622157|528020|622155|622156|526855|356869|356868|625360|625361|628296|435744|435745|483536|622525|622526|998801|998802)\d{10}$/g,
				cardType: "CC"
			}, {
				reg: /^(620010)\d{10}$/g,
				cardType: "PC"
			}]
		}, {
			bankName: "兴业银行",
			bankCode: "CIB",
			patterns: [{
				reg: /^(438589)\d{12}$/g,
				cardType: "DC"
			}, {
				reg: /^(90592)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(966666|622909|438588|622908)\d{12}$/g,
				cardType: "DC"
			}, {
				reg: /^(461982|486493|486494|486861|523036|451289|527414|528057|622901|622902|622922|628212|451290|524070|625084|625085|625086|625087|548738|549633|552398|625082|625083|625960|625961|625962|625963)\d{10}$/g,
				cardType: "CC"
			}, {
				reg: /^(620010)\d{10}$/g,
				cardType: "PC"
			}]
		}, {
			bankName: "上海银行",
			bankCode: "SHBANK",
			patterns: [{
				reg: /^(621050|622172|622985|622987|620522|622267|622278|622279|622468|622892|940021)\d{12}$/g,
				cardType: "DC"
			}, {
				reg: /^(438600)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(356827|356828|356830|402673|402674|486466|519498|520131|524031|548838|622148|622149|622268|356829|622300|628230|622269|625099|625953)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "浦东发展银行",
			bankCode: "SPDB",
			patterns: [{
				reg: /^(622516|622517|622518|622521|622522|622523|984301|984303|621352|621793|621795|621796|621351|621390|621792|621791)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(84301|84336|84373|84385|84390|87000|87010|87030|87040|84380|84361|87050|84342)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(356851|356852|404738|404739|456418|498451|515672|356850|517650|525998|622177|622277|628222|622500|628221|622176|622276|622228|625957|625958|625993|625831)\d{10}$/g,
				cardType: "CC"
			}, {
				reg: /^(622520|622519)\d{10}$/g,
				cardType: "SCC"
			}, {
				reg: /^(620530)\d{13}$/g,
				cardType: "PC"
			}]
		}, {
			bankName: "广发银行",
			bankCode: "GDB",
			patterns: [{
				reg: /^(622516|622517|622518|622521|622522|622523|984301|984303|621352|621793|621795|621796|621351|621390|621792|621791)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(622568|6858001|6858009|621462)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(9111)\d{15}$/g,
				cardType: "DC"
			}, {
				reg: /^(406365|406366|428911|436768|436769|436770|487013|491032|491033|491034|491035|491036|491037|491038|436771|518364|520152|520382|541709|541710|548844|552794|493427|622555|622556|622557|622558|622559|622560|528931|558894|625072|625071|628260|628259|625805|625806|625807|625808|625809|625810)\d{10}$/g,
				cardType: "CC"
			}, {
				reg: /^(685800|6858000)\d{13}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "渤海银行",
			bankCode: "BOHAIB",
			patterns: [{
				reg: /^(621268|622684|622884|621453)\d{10}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "广州银行",
			bankCode: "GCB",
			patterns: [{
				reg: /^(603445|622467|940016|621463)\d{13}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "金华银行",
			bankCode: "JHBANK",
			patterns: [{
				reg: /^(622449|940051)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(622450|628204)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "温州银行",
			bankCode: "WZCB",
			patterns: [{
				reg: /^(621977)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(622868|622899|628255)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "徽商银行",
			bankCode: "HSBANK",
			patterns: [{
				reg: /^(622877|622879|621775|623203)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(603601|622137|622327|622340|622366)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(628251|622651|625828)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "江苏银行",
			bankCode: "JSBANK",
			patterns: [{
				reg: /^(621076|622173|622131|621579|622876)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(504923|622422|622447|940076)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(628210|622283|625902)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "南京银行",
			bankCode: "NJCB",
			patterns: [{
				reg: /^(621777|622305|621259)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(622303|628242|622595|622596)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "宁波银行",
			bankCode: "NBBANK",
			patterns: [{
				reg: /^(621279|622281|622316|940022)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(621418)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(625903|622778|628207|512431|520194|622282|622318)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "北京银行",
			bankCode: "BJBANK",
			patterns: [{
				reg: /^(623111|421317|422161|602969|422160|621030|621420|621468)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(522001|622163|622853|628203|622851|622852)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "北京农村商业银行",
			bankCode: "BJRCB",
			patterns: [{
				reg: /^(620088|621068|622138|621066|621560)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(625526|625186|628336)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "汇丰银行",
			bankCode: "HSBC",
			patterns: [{
				reg: /^(622946)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(622406|621442)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(622407|621443)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(622360|622361|625034|625096|625098)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "渣打银行",
			bankCode: "SCB",
			patterns: [{
				reg: /^(622948|621740|622942|622994)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(622482|622483|622484)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "花旗银行",
			bankCode: "CITI",
			patterns: [{
				reg: /^(621062|621063)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(625076|625077|625074|625075|622371|625091)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "东亚银行",
			bankCode: "HKBEA",
			patterns: [{
				reg: /^(622933|622938|623031|622943|621411)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(622372|622471|622472|622265|622266|625972|625973)\d{10}$/g,
				cardType: "CC"
			}, {
				reg: /^(622365)\d{11}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "广东华兴银行",
			bankCode: "GHB",
			patterns: [{
				reg: /^(621469|621625)\d{13}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "深圳农村商业银行",
			bankCode: "SRCB",
			patterns: [{
				reg: /^(622128|622129|623035)\d{10}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "广州农村商业银行股份有限公司",
			bankCode: "GZRCU",
			patterns: [{
				reg: /^(909810|940035|621522|622439)\d{12}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "东莞农村商业银行",
			bankCode: "DRCBCL",
			patterns: [{
				reg: /^(622328|940062|623038)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(625288|625888)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "东莞市商业银行",
			bankCode: "BOD",
			patterns: [{
				reg: /^(622333|940050)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(621439|623010)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(622888)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "广东省农村信用社联合社",
			bankCode: "GDRCC",
			patterns: [{
				reg: /^(622302)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(622477|622509|622510|622362|621018|621518)\d{13}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "大新银行",
			bankCode: "DSB",
			patterns: [{
				reg: /^(622297|621277)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(622375|622489)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(622293|622295|622296|622373|622451|622294|625940)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "永亨银行",
			bankCode: "WHB",
			patterns: [{
				reg: /^(622871|622958|622963|622957|622861|622932|622862|621298)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(622798|625010|622775|622785)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "星展银行香港有限公司",
			bankCode: "DBS",
			patterns: [{
				reg: /^(621016|621015)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(622487|622490|622491|622492)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(622487|622490|622491|622492|621744|621745|621746|621747)\d{11}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "恒丰银行",
			bankCode: "EGBANK",
			patterns: [{
				reg: /^(623078)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(622384|940034)\d{11}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "天津市商业银行",
			bankCode: "TCCB",
			patterns: [{
				reg: /^(940015|622331)\d{12}$/g,
				cardType: "DC"
			}, {
				reg: /^(6091201)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(622426|628205)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "浙商银行",
			bankCode: "CZBANK",
			patterns: [{
				reg: /^(621019|622309|621019)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(6223091100|6223092900|6223093310|6223093320|6223093330|6223093370|6223093380|6223096510|6223097910)\d{9}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "南洋商业银行",
			bankCode: "NCB",
			patterns: [{
				reg: /^(621213|621289|621290|621291|621292|621042|621743)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(623041|622351)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(625046|625044|625058|622349|622350)\d{10}$/g,
				cardType: "CC"
			}, {
				reg: /^(620208|620209|625093|625095)\d{10}$/g,
				cardType: "PC"
			}]
		}, {
			bankName: "厦门银行",
			bankCode: "XMBANK",
			patterns: [{
				reg: /^(622393|940023)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(6886592)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(623019|621600|)\d{13}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "福建海峡银行",
			bankCode: "FJHXBC",
			patterns: [{
				reg: /^(622388)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(621267|623063)\d{12}$/g,
				cardType: "DC"
			}, {
				reg: /^(620043|)\d{12}$/g,
				cardType: "PC"
			}]
		}, {
			bankName: "吉林银行",
			bankCode: "JLBANK",
			patterns: [{
				reg: /^(622865|623131)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(940012)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(622178|622179|628358)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "汉口银行",
			bankCode: "HKB",
			patterns: [{
				reg: /^(990027)\d{12}$/g,
				cardType: "DC"
			}, {
				reg: /^(622325|623105|623029)\d{10}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "盛京银行",
			bankCode: "SJBANK",
			patterns: [{
				reg: /^(566666)\d{12}$/g,
				cardType: "DC"
			}, {
				reg: /^(622455|940039)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(623108|623081)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(622466|628285)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "大连银行",
			bankCode: "DLB",
			patterns: [{
				reg: /^(603708)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(622993|623069|623070|623172|623173)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(622383|622385|628299)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "河北银行",
			bankCode: "BHB",
			patterns: [{
				reg: /^(622498|622499|623000|940046)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(622921|628321)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "乌鲁木齐市商业银行",
			bankCode: "URMQCCB",
			patterns: [{
				reg: /^(621751|622143|940001|621754)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(622476|628278)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "绍兴银行",
			bankCode: "SXCB",
			patterns: [{
				reg: /^(622486)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(603602|623026|623086)\d{12}$/g,
				cardType: "DC"
			}, {
				reg: /^(628291)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "成都商业银行",
			bankCode: "CDCB",
			patterns: [{
				reg: /^(622152|622154|622996|622997|940027|622153|622135|621482|621532)\d{13}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "抚顺银行",
			bankCode: "FSCB",
			patterns: [{
				reg: /^(622442)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(940053)\d{12}$/g,
				cardType: "DC"
			}, {
				reg: /^(622442|623099)\d{13}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "郑州银行",
			bankCode: "ZZBANK",
			patterns: [{
				reg: /^(622421)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(940056)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(96828)\d{11}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "宁夏银行",
			bankCode: "NXBANK",
			patterns: [{
				reg: /^(621529|622429|621417|623089|623200)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(628214|625529|622428)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "重庆银行",
			bankCode: "CQBANK",
			patterns: [{
				reg: /^(9896)\d{12}$/g,
				cardType: "DC"
			}, {
				reg: /^(622134|940018|623016)\d{10}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "哈尔滨银行",
			bankCode: "HRBANK",
			patterns: [{
				reg: /^(621577|622425)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(940049)\d{12}$/g,
				cardType: "DC"
			}, {
				reg: /^(622425)\d{11}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "兰州银行",
			bankCode: "LZYH",
			patterns: [{
				reg: /^(622139|940040|628263)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(621242|621538|621496)\d{13}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "青岛银行",
			bankCode: "QDCCB",
			patterns: [{
				reg: /^(621252|622146|940061|628239)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(621419|623170)\d{13}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "秦皇岛市商业银行",
			bankCode: "QHDCCB",
			patterns: [{
				reg: /^(62249802|94004602)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(621237|623003)\d{13}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "青海银行",
			bankCode: "BOQH",
			patterns: [{
				reg: /^(622310|940068)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(622817|628287|625959)\d{10}$/g,
				cardType: "CC"
			}, {
				reg: /^(62536601)\d{8}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "台州银行",
			bankCode: "TZCB",
			patterns: [{
				reg: /^(622427)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(940069)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(623039)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(622321|628273)\d{10}$/g,
				cardType: "CC"
			}, {
				reg: /^(625001)\d{10}$/g,
				cardType: "SCC"
			}]
		}, {
			bankName: "长沙银行",
			bankCode: "CSCB",
			patterns: [{
				reg: /^(694301)\d{12}$/g,
				cardType: "DC"
			}, {
				reg: /^(940071|622368|621446)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(625901|622898|622900|628281|628282|622806|628283)\d{10}$/g,
				cardType: "CC"
			}, {
				reg: /^(620519)\d{13}$/g,
				cardType: "PC"
			}]
		}, {
			bankName: "泉州银行",
			bankCode: "BOQZ",
			patterns: [{
				reg: /^(683970|940074)\d{12}$/g,
				cardType: "DC"
			}, {
				reg: /^(622370)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(621437)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(628319)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "包商银行",
			bankCode: "BSB",
			patterns: [{
				reg: /^(622336|621760)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(622165)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(622315|625950|628295)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "龙江银行",
			bankCode: "DAQINGB",
			patterns: [{
				reg: /^(621037|621097|621588|622977)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(62321601)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(622860)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(622644|628333)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "上海农商银行",
			bankCode: "SHRCB",
			patterns: [{
				reg: /^(622478|940013|621495)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(625500)\d{10}$/g,
				cardType: "SCC"
			}, {
				reg: /^(622611|622722|628211|625989)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "浙江泰隆商业银行",
			bankCode: "ZJQL",
			patterns: [{
				reg: /^(622717)\d{10}$/g,
				cardType: "SCC"
			}, {
				reg: /^(628275|622565|622287)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "内蒙古银行",
			bankCode: "H3CB",
			patterns: [{
				reg: /^(622147|621633)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(628252)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "广西北部湾银行",
			bankCode: "BGB",
			patterns: [{
				reg: /^(623001)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(628227)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "桂林银行",
			bankCode: "GLBANK",
			patterns: [{
				reg: /^(621456)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(621562)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(628219)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "龙江银行",
			bankCode: "DAQINGB",
			patterns: [{
				reg: /^(621037|621097|621588|622977)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(62321601)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(622475|622860)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(625588)\d{10}$/g,
				cardType: "SCC"
			}, {
				reg: /^(622270|628368|625090|622644|628333)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "成都农村商业银行",
			bankCode: "CDRCB",
			patterns: [{
				reg: /^(623088)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(622829|628301|622808|628308)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "福建省农村信用社联合社",
			bankCode: "FJNX",
			patterns: [{
				reg: /^(622127|622184|621701|621251|621589|623036)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(628232|622802|622290)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "天津农村商业银行",
			bankCode: "TRCB",
			patterns: [{
				reg: /^(622531|622329)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(622829|628301)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "江苏省农村信用社联合社",
			bankCode: "JSRCU",
			patterns: [{
				reg: /^(621578|623066|622452|622324)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(622815|622816|628226)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "湖南农村信用社联合社",
			bankCode: "SLH",
			patterns: [{
				reg: /^(622906|628386|625519|625506)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "江西省农村信用社联合社",
			bankCode: "JXNCX",
			patterns: [{
				reg: /^(621592)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(628392)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "商丘市商业银行",
			bankCode: "SCBBANK",
			patterns: [{
				reg: /^(621748)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(628271)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "华融湘江银行",
			bankCode: "HRXJB",
			patterns: [{
				reg: /^(621366|621388)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(628328)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "衡水市商业银行",
			bankCode: "HSBK",
			patterns: [{
				reg: /^(621239|623068)\d{13}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "重庆南川石银村镇银行",
			bankCode: "CQNCSYCZ",
			patterns: [{
				reg: /^(621653004)\d{10}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "湖南省农村信用社联合社",
			bankCode: "HNRCC",
			patterns: [{
				reg: /^(622169|621519|621539|623090)\d{13}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "邢台银行",
			bankCode: "XTB",
			patterns: [{
				reg: /^(621238|620528)\d{13}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "临汾市尧都区农村信用合作联社",
			bankCode: "LPRDNCXYS",
			patterns: [{
				reg: /^(628382|625158)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "东营银行",
			bankCode: "DYCCB",
			patterns: [{
				reg: /^(621004)\d{12}$/g,
				cardType: "DC"
			}, {
				reg: /^(628217)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "上饶银行",
			bankCode: "SRBANK",
			patterns: [{
				reg: /^(621416)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(628217)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "德州银行",
			bankCode: "DZBANK",
			patterns: [{
				reg: /^(622937)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(628397)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "承德银行",
			bankCode: "CDB",
			patterns: [{
				reg: /^(628229)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "云南省农村信用社",
			bankCode: "YNRCC",
			patterns: [{
				reg: /^(622469|628307)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "柳州银行",
			bankCode: "LZCCB",
			patterns: [{
				reg: /^(622292|622291|621412)\d{12}$/g,
				cardType: "DC"
			}, {
				reg: /^(622880|622881)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(62829)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "威海市商业银行",
			bankCode: "WHSYBANK",
			patterns: [{
				reg: /^(623102)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(628234)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "湖州银行",
			bankCode: "HZBANK",
			patterns: [{
				reg: /^(628306)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "潍坊银行",
			bankCode: "BANKWF",
			patterns: [{
				reg: /^(622391|940072)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(628391)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "赣州银行",
			bankCode: "GZB",
			patterns: [{
				reg: /^(622967|940073)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(628233)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "日照银行",
			bankCode: "RZGWYBANK",
			patterns: [{
				reg: /^(628257)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "南昌银行",
			bankCode: "NCB",
			patterns: [{
				reg: /^(621269|622275)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(940006)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(628305)\d{11}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "贵阳银行",
			bankCode: "GYCB",
			patterns: [{
				reg: /^(622133|621735)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(888)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(628213)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "锦州银行",
			bankCode: "BOJZ",
			patterns: [{
				reg: /^(622990|940003)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(628261)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "齐商银行",
			bankCode: "QSBANK",
			patterns: [{
				reg: /^(622311|940057)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(628311)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "珠海华润银行",
			bankCode: "RBOZ",
			patterns: [{
				reg: /^(622363|940048)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(628270)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "葫芦岛市商业银行",
			bankCode: "HLDCCB",
			patterns: [{
				reg: /^(622398|940054)\d{10}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "宜昌市商业银行",
			bankCode: "HBC",
			patterns: [{
				reg: /^(940055)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(622397)\d{11}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "杭州商业银行",
			bankCode: "HZCB",
			patterns: [{
				reg: /^(603367|622878)\d{12}$/g,
				cardType: "DC"
			}, {
				reg: /^(622397)\d{11}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "苏州市商业银行",
			bankCode: "JSBANK",
			patterns: [{
				reg: /^(603506)\d{13}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "辽阳银行",
			bankCode: "LYCB",
			patterns: [{
				reg: /^(622399|940043)\d{11}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "洛阳银行",
			bankCode: "LYB",
			patterns: [{
				reg: /^(622420|940041)\d{11}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "焦作市商业银行",
			bankCode: "JZCBANK",
			patterns: [{
				reg: /^(622338)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(940032)\d{10}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "镇江市商业银行",
			bankCode: "ZJCCB",
			patterns: [{
				reg: /^(622394|940025)\d{10}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "法国兴业银行",
			bankCode: "FGXYBANK",
			patterns: [{
				reg: /^(621245)\d{10}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "大华银行",
			bankCode: "DYBANK",
			patterns: [{
				reg: /^(621328)\d{13}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "企业银行",
			bankCode: "DIYEBANK",
			patterns: [{
				reg: /^(621651)\d{13}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "华侨银行",
			bankCode: "HQBANK",
			patterns: [{
				reg: /^(621077)\d{10}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "恒生银行",
			bankCode: "HSB",
			patterns: [{
				reg: /^(622409|621441)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(622410|621440)\d{11}$/g,
				cardType: "DC"
			}, {
				reg: /^(622950|622951)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(625026|625024|622376|622378|622377|625092)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "临沂商业银行",
			bankCode: "LSB",
			patterns: [{
				reg: /^(622359|940066)\d{13}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "烟台商业银行",
			bankCode: "YTCB",
			patterns: [{
				reg: /^(622886)\d{10}$/g,
				cardType: "DC"
			}]
		}, {
			bankName: "齐鲁银行",
			bankCode: "QLB",
			patterns: [{
				reg: /^(940008|622379)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(628379)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "BC卡公司",
			bankCode: "BCCC",
			patterns: [{
				reg: /^(620011|620027|620031|620039|620103|620106|620120|620123|620125|620220|620278|620812|621006|621011|621012|621020|621023|621025|621027|621031|620132|621039|621078|621220|621003)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(625003|625011|625012|625020|625023|625025|625027|625031|621032|625039|625078|625079|625103|625106|625006|625112|625120|625123|625125|625127|625131|625032|625139|625178|625179|625220|625320|625111|625132|625244)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "集友银行",
			bankCode: "CYB",
			patterns: [{
				reg: /^(622355|623042)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(621043|621742)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(622352|622353|625048|625053|625060)\d{10}$/g,
				cardType: "CC"
			}, {
				reg: /^(620206|620207)\d{10}$/g,
				cardType: "PC"
			}]
		}, {
			bankName: "大丰银行",
			bankCode: "TFB",
			patterns: [{
				reg: /^(622547|622548|622546)\d{13}$/g,
				cardType: "DC"
			}, {
				reg: /^(625198|625196|625147)\d{10}$/g,
				cardType: "CC"
			}, {
				reg: /^(620072)\d{13}$/g,
				cardType: "PC"
			}, {
				reg: /^(620204|620205)\d{10}$/g,
				cardType: "PC"
			}]
		}, {
			bankName: "AEON信贷财务亚洲有限公司",
			bankCode: "AEON",
			patterns: [{
				reg: /^(621064|622941|622974)\d{10}$/g,
				cardType: "DC"
			}, {
				reg: /^(622493)\d{10}$/g,
				cardType: "CC"
			}]
		}, {
			bankName: "澳门BDA",
			bankCode: "MABDA",
			patterns: [{
				reg: /^(621274|621324)\d{13}$/g,
				cardType: "DC"
			}]
		}]

		function getBankNameByBankCode(bankcode) {
			for(var i = 0, len = bankcardList.length; i < len; i++) {
				var bankcard = bankcardList[i];
				if(bankcode == bankcard.bankCode) {
					return bankcard.bankName;
				}
			}
			return "";
		}

		function _getBankInfoByCardNo(cardNo) {
			for(var i = 0, len = bankcardList.length; i < len; i++) {
				var bankcard = bankcardList[i];
				var patterns = bankcard.patterns;
				for(var j = 0, jLen = patterns.length; j < jLen; j++) {
					var pattern = patterns[j];
					if((new RegExp(pattern.reg)).test(cardNo)) {
						var info = extend(bankcard, pattern);
						delete info.patterns;
						delete info.reg;
						info['cardTypeName'] = getCardTypeName(info['cardType']);
						return info; //返回银行卡结果
					}
				}
			}
			return 'error';
		}
		return _getBankInfoByCardNo(bankCard)
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
