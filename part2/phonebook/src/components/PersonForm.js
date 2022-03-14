import React from 'react'

const PersonForm = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addName}>
          <table>
           <tbody>
              <tr>
              <td>Name: </td>
              <td>
                <input
                  type="text"
                  value = {newName.split(' ').map(item => item.replace(item.charAt(0), item.charAt(0).toUpperCase())).join(' ')}
                  onChange = {handleNameChange}
                />
             </td>
            </tr>
            <tr>
              <td>Number: </td>
              <td>
                 <input
                  type="tel"
                  value={newNumber}
                  onChange = {handleNumberChange}
                  />
              </td>
            </tr>
           </tbody>
          </table>
          <br />
          <div>
            <button type="submit">Add</button>
          </div>
      </form>
  )
}

export default PersonForm;