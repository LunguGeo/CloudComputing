"use client"
import {useState} from 'react'
import TextArea from './form'
import Form from './form'
import {validateForm} from '../../utils/validateform'
import { emit } from 'process'

export default function Home(){
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<{name?: string; email?: string; message?: string}>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errors = validateForm(values)
    const isError = Object.keys(errors).length
    if(isError && isError>0){
      setErrors(errors)
      return
    }
    try {
      const res = await fetch('https://cloud-computing-lovat.vercel.app/api/form',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      })
      if(!res.ok){
        setValues({name: '', message: '', email: ''})
      }
    } catch (error) {
      console.error(error)
    }
    console.log(values)
  }


  const onChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) =>{
    setValues((prev) => ({...prev, [e.target.name]: e.target.value})) 
  }

  return <div className="w-full h-screen bg-blue-50">
    <div className="px-3">
      <form className="flex flex-col items-center w-1/3 mx-auto" 
      onSubmit={handleSubmit}>
        <Form error={!!errors.name} errorMessage={errors.name} value={values.name} onChange={onChange} id="name" name="name" placeholder="Your Name" label="Your Name" />
        <Form error={!!errors.email} errorMessage={errors.email} value={values.email}  onChange={onChange} id="email" name='email' placeholder='email@gmail.com' label='Your Email'></Form>
        <TextArea error={!!errors.message} errorMessage={errors.message} value={values.message} onChange={onChange} id="message" name="message" placeholder='Write your message' label='Write your message'></TextArea>
        <button className='w-full py-2 mt-6 text-lg text-white bg-purple-500 rounded-md outline-none active:bg-purple-600 focus:ring-2 focus:ring-purple-400 disabled:bg-opacity-50 disabled:cursor-not-allowed'
        type="submit">Submit</button>
      </form>
    </div>
  </div>
}