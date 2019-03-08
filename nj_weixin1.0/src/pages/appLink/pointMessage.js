
export const pointMessage = (Obj) =>{
    //紧急联系人相关的  //居住相关的 户籍相关
    if(
      Obj.hasOwnProperty('empnhEmergcontact') &&
      Obj.hasOwnProperty('empnhEmcrelation') &&
      Obj.hasOwnProperty('empnhEmcrelationDis') &&
      Obj.hasOwnProperty('empnhEmcphone') &&

      Obj.hasOwnProperty('empnhResidecuntry') &&
      Obj.hasOwnProperty('empnhResidecuntryDis') &&
      Obj.hasOwnProperty('empnhResideprovince') &&
      Obj.hasOwnProperty('empnhResideprovinceDis') &&

      Obj.hasOwnProperty('empnhResidecity') &&
      Obj.hasOwnProperty('empnhResidecityDis') &&
      Obj.hasOwnProperty('empnhResideaddr') &&
      Obj.hasOwnProperty('empnhResidezip') &&

      Obj.hasOwnProperty('empnhRegisterproperty') &&
      Obj.hasOwnProperty('empnhRegisterpropertyDis') &&
      Obj.hasOwnProperty('empnhRegistercuntry') &&
      Obj.hasOwnProperty('empnhRegistercuntryDis') &&
      Obj.hasOwnProperty('empnhRegisterprovince') &&
      Obj.hasOwnProperty('empnhRegisterprovinceDis') &&
      Obj.hasOwnProperty('empnhRegistercity') &&
      Obj.hasOwnProperty('empnhRegistercityDis') &&
      Obj.hasOwnProperty('empnhRegisteaddr') &&

      Obj.hasOwnProperty('empnhEducationlevel') &&
      Obj.hasOwnProperty('empnhEducationlevelDis') &&
      Obj.hasOwnProperty('empnhEducuntry') &&
      Obj.hasOwnProperty('empnhEducuntryDis') &&
      Obj.hasOwnProperty('empnhSchool') &&
      Obj.hasOwnProperty('empnhDegree') &&
      Obj.hasOwnProperty('empnhSpecialty') &&
      Obj.hasOwnProperty('empnhEdusdate') &&
      Obj.hasOwnProperty('empnhEduedate') &&

      Obj.hasOwnProperty('empnhSalbank') &&
      Obj.hasOwnProperty('empnhSalbankDis') &&
      Obj.hasOwnProperty('empnhSalaccount') &&
      Obj.hasOwnProperty('empnhSalaccname') &&
      Obj.hasOwnProperty('empnhIsexpensecard') &&
      Obj.hasOwnProperty('empnhIsexpensecardsDis')

    )
    {

      if(Obj.empnhIsexpensecard == 1){

        if(Obj.hasOwnProperty('empnhExpenseaccount') && Obj.hasOwnProperty('empnhExpensebank') && Obj.hasOwnProperty('empnhExpensebankDis') && Obj.hasOwnProperty('empnhExpenseaccname')) {

          if (
            Obj.empnhExpenseaccount !== '' &&
            Obj.empnhExpenseaccname !== '' &&
            Obj.empnhEmergcontact !== '' &&
            Obj.empnhEmcphone !== '' &&
            Obj.empnhResideaddr !== '' &&
            Obj.empnhResidezip !== '' &&
            Obj.empnhRegisteaddr !== '' &&
            Obj.empnhSchool !== '' &&
            Obj.empnhDegree !== '' &&
            Obj.empnhSpecialty !== '' &&
            Obj.empnhSalaccount !== '' &&
            Obj.empnhSalaccname !== ''
          ) {

            return true
          } else {
            return false
          }
        } else {
          return false
        }
      } else {
        if(
          Obj.empnhEmergcontact !== '' &&
          Obj.empnhEmcphone !== '' &&
          Obj.empnhResideaddr !== '' &&
          Obj.empnhResidezip !== '' &&
          Obj.empnhRegisteaddr !== '' &&
          Obj.empnhSchool !== '' &&
          Obj.empnhDegree !== '' &&
          Obj.empnhSpecialty !== '' &&
          Obj.empnhSalaccount !== '' &&
          Obj.empnhSalaccname !== ''
        ){

          return true
        } else {

          return false
        }
      }

    } else {
      return false
    }
}
