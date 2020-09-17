import * as yup from 'yup'

export default yup.object().shape({
first_name: yup.string()
    .required('First name is required')
    .min(3, 'First name must be 3 chars or longer'),
last_name: yup.string()
    .required('Last name is required')
    .min(3, 'Last name must be 3 chars or longer'),
  email: yup.string()
    .email('Must be a valid email')
    .required('Email is required'),
password: yup.string()
    .required('password is required')
    .min(3, 'password must be 3 chars or longer'),
  
 terms: yup.boolean()
 .oneOf([true], 'Must accept terms and conditions')
})
