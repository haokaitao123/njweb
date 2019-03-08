/**
 * Created by Aaron on 2018/3/16.
 */
import valid from '../../../lib/pub_valid'

const validCode = {
  p_vldmod_000: valid.val_isnull, // 不能为空
  p_vldmod_100: valid.val_number100, // 非负整数
  p_vldmod_101: valid.val_number101, // 正整数
  p_vldmod_102: valid.val_number102, // 整数
  p_vldmod_103: valid.val_number103, // 非负小数
  p_vldmod_104: valid.val_number104, // 正小数
  p_vldmod_105: valid.val_number105, // 小数
  p_vldmod_106: valid.val_number106, // 数字
  p_vldmod_200: valid.val_date, // 日期格式
  p_vldmod_201: valid.val_englishchar, // 英文字符
  p_vldmod_202: valid.val_postcode, // 邮政编码
  p_vldmod_203: valid.val_phone, // 固定电话、传真
  p_vldmod_204: valid.val_mobile, // 手机格式
  p_vldmod_205: valid.val_mail, // 邮件格式
  p_vldmod_206: valid.val_mulmail, // 多个邮件地址
  p_vldmod_207: valid.val_IdCard, // 身份证格式
  p_vldmod_208: '长度大于',
  p_vldmod_209: '长度大于等于',
  p_vldmod_210: '长度等于',
  p_vldmod_211: '长度小于',
  p_vldmod_212: '长度小于等于',
  p_vldmod_300: '大于',
  p_vldmod_301: '大于等于',
  p_vldmod_302: '小于',
  p_vldmod_303: '小于等于',

}

export default validCode
