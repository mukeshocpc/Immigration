const axios = require('axios');

import customAxios from './axios';

const createApplication = async data => {
  //sample
  // console.log(payload, `/login/user`)
  //   let {fname} = data;
  let payload = {
    deal: {
      name: 'Deal Milan',
      amount: 0,
      contacts_added_list: [22003424578],
      custom_field: {
        cf_first_name: 'Milan',
        cf_last_name: 'Mendpara',
        cf_email: 'test@1.com',
        cf_mobile: '1111111111',
        cf_gender: 'Male',
        cf_date_of_birth: '05/30/1990',
        cf_marital_status: 'Married',
        cf_number_of_children: 1,
        cf_country_of_citizenship_1: 'india',
        cf_country_of_residence_1: 'India',
        cf_highest_level_of_education: "Master's",
        cf_field_of_study: 'Engineering and technology',
        cf_current_occupation: 'self employed',
        cf_years_of_work_experience: '9',
        cf_do_you_have_ielts: 'Yes',
        cf_what_is_your_ielts_score: '6.5',
        cf_do_you_have_any_management_or_business_ownership_experience: 'Yes',
        cf_do_you_have_or_have_you_had_schengen_visa: 'No',
        cf_do_you_have_an_immediate_family_member_parents_spouse_siblings_who_is_a_permanent_resident_or_citizen_of_usa_or_canada:
          'No',
        cf_have_you_had_accomplishments_in_sports_business_science_or_arts:
          'No',
        cf_are_you_able_to_pay_10000_to_15000_on_tuition_fees: 'Yes',
        cf_how_much_can_you_invest_in_us_dollars: 'Between $100k to $250k',
        cf_how_much_is_your_total_value_of_all_your_assets_in_us_dollar:
          '$150k',
        cf_notes: 'my personal note',
      },
    },
  };
  //   delete data.deal.custom_field.cf_date_of_birth;
  let response = await customAxios.post(`/crm/sales/api/deals/`, payload);
  //   console.log('Response sales/api/deals - ', response);
  return response.data;
};

export {createApplication};
