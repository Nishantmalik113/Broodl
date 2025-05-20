'use client'

import { Fugaz_One } from 'next/font/google';
import React, { useState } from 'react'
import Button from './Button';
import { useAuth } from '@/context/AuthContext';


const Fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: ['400']
});

export default function Login() {

    const {signup, login, resetPass} = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegister, setIsRegister] = useState(false)
    const [isReset, setIsReset] = useState(false)

    const [authenticating, setAuthenticating] = useState(false)

    async function handleSubmit() {
        
        setAuthenticating(true)
        try{
            if(isRegister && !isReset){
                if(!email || !password || password.length < 6){
                    return
                }
                await signup(email, password)
            }
            else if(!isReset && !isRegister){
                if(!email || !password || password.length < 6){
                     return
                 }
                await login(email, password)
            }
            else if(isReset){
                if(!email){
                    return
                }
                await resetPass(email)
            }
        }catch(err){
            alert(`❌Wrong Email/Password......❌ \n
                Correct Way : \n
                Email: *****@gmail.com \n
                Password Rules:
                1. Must be 6 characters long`)
            console.log(err.messgae)
        }finally{
            setAuthenticating(false)
            if(isReset){
                alert(`✅Reset Password Email sent..
                    Check Your registered Email....`)
            }
        }
    }


  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
        <h3 className={'text-4xl sm:text-5xl md:text-6xl ' + Fugaz.className}>{(isReset)?'Reset Password':(!isRegister)?'Log In':'Register'}</h3>
        <p>You're one step away!</p>
        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className='w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none duration-200 focus:border-indigo-600 hover:border-indigo-600' placeholder='Email' type="text" />
        {(!isReset)&&<input value={password} onChange={(e)=>{setPassword(e.target.value)}} className='w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none duration-200 focus:border-indigo-600 hover:border-indigo-600' placeholder='Password' type="password" />}
        <div className='max-w-[400px] w-full mx-auto'>
            <Button clickHandler={handleSubmit} text={(authenticating)?"Submitting..":"Submit"} full/>
        </div>
        <p className='text-center'>{(!isRegister)?"Don't have an account ":"Already have an account ? " }<button onClick={()=>{setIsRegister(!isRegister)}} className='text-indigo-600 hover:underline'>{(isRegister)?'Login':'Sign Up'}</button></p>
        {(!isRegister) && <p className='text-center'>{(!isReset)?'Forgot your Password':'Try Logging in ?'} ? <button onClick={()=>{
            setIsReset(!isReset)
        }} className='text-indigo-600 hover:underline'>Click Here</button></p>}
    </div>
  )
}
