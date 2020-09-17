import React from 'react'

function User(props) {
    const { user } = props
  if (!user) {
    return <h3>Working fetching your friend&apos;s details...</h3>
  }

  return (
    <div className='User container'>
      <h2>{user.first_name} {user.last_name}</h2>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>

    </div>
  )
}
export default User