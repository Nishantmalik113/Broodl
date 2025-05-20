'use client'
import React from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function Logout() {

    const { logout, globalUser } = useAuth()

    if(!globalUser){
        return null
    }

  return (
    <Link href={'/'}>
      <Button text='Logout' dark clickHandler={logout} />
    </Link>
  )
}
