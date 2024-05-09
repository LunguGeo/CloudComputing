import React from 'react'


interface InputProps{
  id: string,
  name: string,
  label: string,
  placeholder: string,
  value: string,
  onChange:(e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
  error: boolean,
  errorMessage: string  | undefined
};

const  Form = ({id, name, label, placeholder, value, onChange, error, errorMessage, ...props}: InputProps) => {
  return (
    <div className='w-full mb-3'>
      <label className='block text-lg' htmlFor={id}>
        {label}
      </label>
      <input value={value} onChange={onChange} autoComplete='off' type='text' id={id} name = {name} placeholder={placeholder}
        className='w-full text-gray-900 placeholder-gray-400 border-gray-500 border-opacity-50 rounded-md 
        focuse:ring-2 focus:ring-purple-500'
      {...props}
      />
      {error ?<p className='text-sm italic text-red-500'>*{errorMessage}</p> : null}
    </div>
  )
};

export default Form;
