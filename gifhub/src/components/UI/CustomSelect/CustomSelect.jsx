import React from 'react'
import uniqid from 'uniqid'

const CustomSelect = (props) => {
  const { options, onChange, value } = props

  return (
    <select onChange={onChange} value={value}>
      {options.map((option) => (
        <option key={uniqid()} value={option.value}>
          {option.title}
        </option>
      ))}
    </select>
  )
}

export default CustomSelect
