import React from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='inline-block mb-1 pl-1'></label>}
      <select
      {...props}
      id= {id}
      ref= {ref}
      className={`px-3 py-2 rounded-lg bg-whitetext-black outline-none focus:bg-gray-50duration-200 border border-gray-200 w-full
        ${className}`}>

            {options?.map((option)=>(
                <option key={option} value={option}>{option}</option>
            ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)
