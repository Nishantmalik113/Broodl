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
    <Button text='Logout' dark clickHandler={logout} />
  )
}
