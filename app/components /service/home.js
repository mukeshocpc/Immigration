const axios = require('axios');

import {removeNull} from '../../common/util';
import {getData} from '../../utils/utility';
import customAxios from './axios';

const createApplication = async data => {
  //sample
  // console.log(payload, `/login/user`)
  let {
    fname,
    lname,
    email,
    mobile,
    gender,
    dob,
    marital,
    children,
    citizenship1,
    residence1,
    citizenship2,
    residence2,
    education,
    study,
    occupation,
    experience,
    ielts,
    ielts_score,
    mgmtExp,
    schengenVisa,
    citizenOf,
    tuitionFee,
    accomplishments,
    investAmt,
    assetAmt,
    notes,
  } = data;

  let customFieldDic = {
    cf_first_name: fname,
    cf_last_name: lname,
    cf_email: email,
    cf_mobile: mobile,
    cf_gender: gender,
    cf_date_of_birth: dob,
    cf_marital_status: marital,
    cf_number_of_children: children,
    cf_country_of_citizenship_1: citizenship1,
    cf_country_of_residence_1: residence1,
    cf_country_of_citizenship_2: citizenship2,
    cf_country_of_residence_2: residence2,
    cf_highest_level_of_education: education,
    cf_field_of_study: study,
    cf_current_occupation: occupation,
    cf_years_of_work_experience: experience,
    cf_do_you_have_ielts: ielts,
    cf_what_is_your_ielts_score: ielts_score,
    cf_do_you_have_any_management_or_business_ownership_experience: mgmtExp,
    cf_do_you_have_or_have_you_had_schengen_visa: schengenVisa,
    cf_do_you_have_an_immediate_family_member_parents_spouse_siblings_who_is_a_permanent_resident_or_citizen_of_usa_or_canada:
      citizenOf,
    cf_have_you_had_accomplishments_in_sports_business_science_or_arts:
      accomplishments,
    cf_are_you_able_to_pay_10000_to_15000_on_tuition_fees: tuitionFee,
    cf_how_much_can_you_invest_in_us_dollars: investAmt,
    cf_how_much_is_your_total_value_of_all_your_assets_in_us_dollar: assetAmt,
    cf_notes: notes,
  };
  console.log(customFieldDic);

  customFieldDic = removeNull(customFieldDic);

  console.log(customFieldDic);

  let token = await getData('fcmToken');
  let fcmToken = token.fcmToken;

  let payload = {
    deal: {
      name: fname + ' ' + lname,
      //   amount: 0,
      //   contacts_added_list: [22003424578],
      custom_field: customFieldDic,
    },
  };

  console.log(payload);

  //   delete data.deal.custom_field.cf_date_of_birth;
  let response = await customAxios.post(`/crm/sales/api/deals/`, payload);
  console.log('Response sales/api/deals - ', response);
  return response;
};

export {createApplication};
