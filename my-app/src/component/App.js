
//import logo from '../logo.svg';
import '../App.css';
import React, { useState, useEffect } from 'react'
import User from './User'
import UserForm from './UserForm'
import styled from 'styled-components'


// 🔥 STEP 3- FLESH THE SCHEMA IN ITS OWN FILE
// 🔥 STEP 4- IMPORT THE SCHEMA, AXIOS AND YUP
import schema from '../validation/formSchema'
import axios from 'axios'
import * as yup from 'yup'



//////////////// INITIAL STATES ////////////////
const initialFormValues = {
  ///// TEXT INPUTS /////
  first_name: '',
  last_name:'',
  email: '',
  password: '',
  ///// CHECKBOXES /////
  terms: false,
}
const initialFormErrors = {
  first_name: '',
  last_name:'',
  email: '',
  password: '',
  terms:'',
}
const initialUsers = []
const initialDisabled = true


const StyledApp = styled.div `
  margin-left:${pr => pr.theme.leftMargin};
 
`


export default function App() {
  //////////////// STATES ////////////////
 
  const [users, setUsers] = useState(initialUsers)          // array of friend objects
  const [formValues, setFormValues] = useState(initialFormValues) // object
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object
  const [disabled, setDisabled] = useState(initialDisabled)       // boolean

  //////////////// HELPERS ////////////////

  const getUsers = () => {
    // 🔥 STEP 5- IMPLEMENT! ON SUCCESS PUT FRIENDS IN STATE

    axios.get('https://reqres.in/api/users')
      .then(res => {
        setUsers(res.data.data)
      })
      .catch(err => {
        debugger
        console.log(err)
      })
  }

  const postNewUser = newUser => {
    // 🔥 STEP 6- IMPLEMENT! ON SUCCESS ADD NEWLY CREATED FRIEND TO STATE
    //    helper to [POST] `newUser` to `https://reqres.in/api/users`
    //    and regardless of success or failure, the form should reset
    axios.post("https://reqres.in/api/users", newUser)
      .then(res => {
        setUsers([...users, res.data]) // do not do this on auto
        setFormValues(initialFormValues)
      })
      .catch(err => {
        debugger
        console.log(err)
      })
  }

  const validate = (name, value) => {
    // let's validate this specific key/value
    // yup.reach will allow us to "reach" into the schema and test only one part.
    // We give reach the schema as the first argument, and the key we want to test as the second.
    yup
      .reach(schema, name)
      // we can then run validate using the value
      .validate(value)
      // if the validation is successful, we can clear the error message
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: ""
        })
      })
      /* if the validation is unsuccessful, we can set the error message to the message 
        returned from yup (that we created in our schema) */
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });
  }


  ////////////// EVENT HANDLERS ////////////////
  const inputChange = (name, value) => {
    // 🔥 STEP 10- RUN VALIDATION WITH YUP
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  const formSubmit = () => {
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      // 🔥 STEP 7- WHAT ABOUT Terms?
      terms: formValues.terms
    }
    // 🔥 STEP 8- POST NEW FRIEND USING HELPER
    postNewUser(newUser)
  }


  //////////////// SIDE EFFECTS ////////////////
  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    // 🔥 STEP 9- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES

    /* Each time the form value state is updated, check to see if it is valid per our schema. 
    This will allow us to enable/disable the submit button.*/

    /* We pass the entire state into the entire schema, no need to use reach here. 
    We want to make sure it is all valid before we allow a user to submit
    isValid comes from Yup directly */
    schema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid)
      })
  }, [formValues])

  return (
    <StyledApp className='container'>
      <header><h1>Fill out the information below to make an account. </h1></header>

      <UserForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {users.map((user) => {
        return <User user={user} />;
      })}
        
    

    </StyledApp>
  )
}
