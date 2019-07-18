/**
 * Created by Pluto on 2018/4/22.
 */
import { getDataLevelUserLogin } from '../../../axios/axios'
import { isSuccess } from '../../../lib/util'

const emp_transtion = {
  all_dis() {
    emp_transtion.transDate_set(this)
    emp_transtion.transPostinfo_dis(this)
    //emp_transtion.transDate_set(this);
    emp_transtion.transMaterial_dis(this);
    emp_transtion.money_dis(this);
    //emp_transtion.transDeposit_dis(this)
  },
  transPostinfo(node) {
    emp_transtion.transPostinfo_set(this.$parent)
    emp_transtion.transPostinfo_dis(this.$parent)
  },
  deptIdnew(node) {
    emp_transtion.deptIdnew_set(this.$parent)
  },
  transMaterial(node) {
    emp_transtion.transMaterial_dis(this.$parent)
  },

/*  transDeposit(node) {
    // debugger;
/!*
    node.$el.onblur =function(){
      alert(1)
    }
    node.$el.onblur = emp_transtion.transDeposit_dis(this.$parent);
    console.log(node,"node");
    console.log(node.$el.onblur,"this.$parent");*!/
    emp_transtion.transDeposit_dis(this.$parent);
  },*/

  transDate_set(t) {
    if (t.valueMap.transDate) {
      if(t.$refs[t.valueMap.transDate][0].formDataSubmit.transDate.length<=0){
        t.$refs[t.valueMap.transDate][0].$set(t.$refs[t.valueMap.transDate][0].formDataSubmit, 'transDate',  new Date().format('yyyy-MM-dd'))
      }
    }
  },
//现部门
deptIdnew_set(t){
    if (t.valueMap.deptIdnew) {
        t.$refs[t.valueMap.postIdnew][0].$set(t.$refs[t.valueMap.postIdnew][0].formDataSubmit, 'postIdnew', '')
        t.$refs[t.valueMap.postIdnew][0].$refs.postIdnew.thisValue = ''
    }
},
//   transMaterialtm_set(t) {
//     if (t.valueMap.transMaterialtm) {
//         if(t.$refs[t.valueMap.transMaterialtm][0].formDataSubmit.transMaterialtm.length<=0){
//           t.$refs[t.valueMap.transMaterialtm][0].$set(t.$refs[t.valueMap.transMaterialtm][0].formDataSubmit, 'transMaterialtm',  new Date().format('yyyy-MM-dd'))
//         }
//     }
//   },
  transPostinfo_dis(t) {
    if (t.valueMap.transPostinfo) {
      if (t.$refs[t.valueMap.transPostinfo][0].formDataSubmit.transPostinfo === '0') {
        if (t.valueMap.transMan) {

          //交接人
          t.$refs[t.valueMap.transMan][0].$delete(t.$refs[t.valueMap.transMan][0].formshow, 'transMan')
          t.$refs[t.valueMap.transMan][0].$refs.transMan.thisValue = ''

          //上传附件

          t.$refs[t.valueMap.fileKey][0].$delete(t.$refs[t.valueMap.fileKey][0].formshow, 'fileKey')
          t.$refs[t.valueMap.fileKey][0].$refs.fileKey.thisValue = ''

        }

      } else {
        if (t.valueMap.transMan) {
          t.$refs[t.valueMap.transMan][0].$set(t.$refs[t.valueMap.transMan][0].formshow, 'transMan', '')
          t.$refs[t.valueMap.fileKey][0].$set(t.$refs[t.valueMap.fileKey][0].formshow, 'fileKey', '')
        }
      }
    }
  },

  transMaterial_dis(t) {
    if (t.valueMap.transMaterial) {
      if (t.$refs[t.valueMap.transMaterial][0].formDataSubmit.transMaterial === '0') {
        if (t.valueMap.transMaterialtm) {
          t.$refs[t.valueMap.transMaterialtm][0].$delete(t.$refs[t.valueMap.transMaterialtm][0].formshow, 'transMaterialtm')
          t.$refs[t.valueMap.transMaterialtm][0].$refs.transMaterialtm.thisValue = ''
        }

      } else {
        if (t.valueMap.transMaterialtm) {
          t.$refs[t.valueMap.transMaterialtm][0].$set(t.$refs[t.valueMap.transMaterialtm][0].formshow, 'transMaterialtm', '')
        }
      }
    }
  },

  transPostinfo_set(t) {
    if (t.valueMap.transPostinfo && t.$refs[t.valueMap.transPostinfo][0].formDataSubmit.transPostinfo === '0') {
       if (t.valueMap.transMan) {
         t.$refs[t.valueMap.transMan][0].$set(t.$refs[t.valueMap.transMan][0].formDataSubmit, 'transMan', '')
       }

      if (t.valueMap.fileKey) {
        t.$refs[t.valueMap.fileKey][0].$set(t.$refs[t.valueMap.fileKey][0].formDataSubmit, 'fileKey', '')
      }
     }
  },

  postIdnew(node) {
    emp_transtion.postIdnew_set(this.$parent)
  },

  postIdnew_set(t) {
    let postOldId = t.$refs[t.valueMap.postIdpast][0].formDataSubmit.postIdpast;
    let postNewId = t.$refs[t.valueMap.postIdnew][0].formDataSubmit.postIdnew;
    console.log(postOldId+'-----------'+postNewId);
    getDataLevelUserLogin({
      _mt: 'orgPost.getById',
      logType:'查询岗位职级',
      id: postOldId,
    }).then((res) => {
      if (isSuccess(res, this.$parent)) {
        let oldLevel  = res.data.content[0].postDfpslevel.substring(1,2);
      getDataLevelUserLogin({
        _mt: 'orgPost.getById',
        logType:'查询岗位职级',
        id: postNewId,
      }).then((res) => {
        if (isSuccess(res, this.$parent)) {
          let newLevel  = res.data.content[0].postDfpslevel.substring(1,2);
          console.log(oldLevel+'.....'+newLevel);
          if(Number(oldLevel)>Number(newLevel)){
            t.$refs[t.valueMap.transType][0].$set(t.$refs[t.valueMap.transType][0].formDataSubmit, 'transType', '01transtype')
          }else if(Number(oldLevel)<Number(newLevel)){
            t.$refs[t.valueMap.transType][0].$set(t.$refs[t.valueMap.transType][0].formDataSubmit, 'transType', '03transtype')
          }else{
            t.$refs[t.valueMap.transType][0].$set(t.$refs[t.valueMap.transType][0].formDataSubmit, 'transType', '02transtype')
          }

        }
      }).catch(() => {
/*          this.$Modal.error({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })*/
      })
      }
    }).catch(() => {
/*        this.$Modal.error({
        title: this.$t('reminder.err'),
        content: this.$t('reminder.errormessage'),
      })*/
    })
  },

  //根据现岗位现部门判断是否显示押金金额字段
  money_dis(t){
    console.log(t,"t");
    console.log(t.valueMap,"valueMap")
    console.log(t.$refs[t.valueMap.deptIdnew][0].$refs.deptIdnew.id,"123");
    console.log(t.$refs[t.valueMap.postIdnew][0].$refs.postIdnew.id,"321");
    let deptId = t.$refs[t.valueMap.deptIdnew][0].$refs.deptIdnew.id;
    let postId = t.$refs[t.valueMap.postIdnew][0].$refs.postIdnew.id;
    getDataLevelUserLogin({
      _mt: 'orgUnits.selectById',
      logType:'查询部门类型',
      id: deptId,
    }).then((res) => {
      if (isSuccess(res, this.$parent)) {
      let result  = res.data.content[0];
      if(result.unitPartfunct==='101'){
        getDataLevelUserLogin({
          _mt: 'orgPost.getById',
          logType:'查询岗位职级',
          id: postId,
        }).then((res) => {
          if (isSuccess(res, this.$parent)) {
          let postData  = res.data.content[0];
          if(postData.postDfpslevel==='06Manager'){
            if (t.valueMap.transDeposit) {
              t.$refs[t.valueMap.transDeposit][0].$set(t.$refs[t.valueMap.transDeposit][0].formshow, 'transDeposit', '')
            }
          }else{
            if (t.valueMap.transDeposit) {
              t.$refs[t.valueMap.transDeposit][0].$delete(t.$refs[t.valueMap.transDeposit][0].formshow, 'transDeposit');
              t.$refs[t.valueMap.transDeposit][0].$refs.transDeposit.thisValue = ''
            }
          }
        }
      }).catch(() => {
          this.$Modal.error({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      })
      }else{
        if (t.valueMap.transDeposit) {
          t.$refs[t.valueMap.transDeposit][0].$delete(t.$refs[t.valueMap.transDeposit][0].formshow, 'transDeposit');
          t.$refs[t.valueMap.transDeposit][0].$refs.transDeposit.thisValue = ''
        }
      }
    }
    }).catch(() => {
        this.$Modal.error({
        title: this.$t('reminder.err'),
        content: this.$t('reminder.errormessage'),
      })
    })
  }

}
export default emp_transtion
