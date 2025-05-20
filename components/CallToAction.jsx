'use client'
import Link from 'next/link'
import React from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'

export default function CallToAction() {
  
  const {globalUser} = useAuth()
  
  if(globalUser){
    return(
        <div className='w-full max-w-[600px] mx-auto'>
            <Link href={'/dashboard'} ><Button text = "Go to Dashboard" dark full /></Link>
        </div>
    )
  }

    return (
    <div>
        <div className='grid grid-cols-2 gap-4 w-fit mx-auto'>
            <Link href={'/dashboard'} ><Button text = "Sign Up" /></Link>
            <Link href={'/dashboard'} ><Button text = "Login" dark /></Link>
        </div>
    </div>
  )
}
