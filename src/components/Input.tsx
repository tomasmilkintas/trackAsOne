import React from 'react'

export const Input: React.FC<InputProps> = ({
  handleChange,
  value,
  placeholder,
  max,
}) => {
  return (
    <input
      onChange={handleChange}
      value={value}
      spellCheck='false'
      autoComplete='off'
      className='w-[95%] md:w-[550px] h-[36px] bg-inputbg rounded-[36px] px-[20px] text-sm outline-none border-2 focus:border-primary'
      type='text'
      placeholder={placeholder}
      maxLength={max}
    />
  )
}