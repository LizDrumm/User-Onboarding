import React from 'react'
import styled, {keyframes} from 'styled-components'

export default function UserForm(props) {
  const {
    values,
    submit,
    change,
    disabled,
    errors,
  } = props

  const onSubmit = evt => {
    evt.preventDefault()
    submit()
  }

  const onChange = evt => {
    /* 🔥 FIX THIS SO IT ALSO WORKS WITH CHECKBOXES */
    const { name, value, type, checked } = evt.target
    const valueToUse = type === 'checkbox' ? checked : value
    change(name, valueToUse)
  
  }
  return (
    <form className='form container' onSubmit={onSubmit}>
      <div className='form-group submit'>
        <h2>Make an account</h2>
       

        <div className='errors'>
          {/* 🔥 RENDER THE VALIDATION ERRORS HERE */}
          <div>{errors.first_name}</div>
          <div>{errors.last_name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
         
        </div>
      </div>

      <div className='form-group inputs'>
        <h4>General information</h4>

        {/* ////////// TEXT INPUTS ////////// */}
    
        <label>First Name&nbsp;
          <input
            value={values.first_name}
            onChange={onChange}
            name='first_name'
            type='text'
          />
        </label>
        <br/>
        <label>Last Name&nbsp;
          <input
            value={values.last_name}
            onChange={onChange}
            name='last_name'
            type='text'
          />
        </label>
        <br/>
        <label>Email &nbsp;
          <input
            value={values.email}
            onChange={onChange}
            name='email'
            type='email'
          />
           </label>
           <br/>
        <label>Password &nbsp;
          <input
            value={values.password}
            onChange={onChange}
            name='password'
            type='password'
          />
        </label>
        <br/>
        </div>

      <div className='form-group checkboxes'>
        <h4>Terms and Conditions</h4>
        <p>Here are the terms and conditions you must agree to if you'd like to be a user.</p>

        {/* ////////// CHECKBOXES ////////// */}

        <label>I agree to the terms and condtions
          <input
            type="checkbox"
            name='terms'
            checked={values.terms}
            onChange={onChange}
          />
        </label>
        <br/>
         {/* 🔥 DISABLE THE BUTTON til all info is filled out*/}
        <br/>
             <button id="button" disabled={disabled}>submit</button>
        </div>
    </form>
        )

        }