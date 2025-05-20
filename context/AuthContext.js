'use client'

import { auth, db } from "@/firebse"
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { Passions_Conflict } from "next/font/google"
import React, { useContext, useState, useEffect } from "react"


const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [globalUser, setGlobalUser] = useState(null)
    const [globalData, setGlobalData] = useState()
    const [loading, setLoading] = useState(true)


    function signup (email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login (email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        setGlobalData(null)
        setGlobalUser(null)
        return signOut(auth)
    }

    function resetPass(email){
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(()=>{

        const unsubscribe = onAuthStateChanged(auth, async user =>{
            try{
                //set user to our local context state
                setLoading(true)
                setGlobalUser(user)
                if(!user){
                    console.log('No User Found')
                    return
                }
                //if user exists fetch data
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)
                let firebaseData = {}
                if(docSnap.exists()){
                    console.log('Found User data')
                    firebaseData=docSnap.data()
                    console.log(firebaseData)
                }
                setGlobalData(firebaseData)
            }catch(err){
                console.log(err.message)
            }finally{
                setLoading(false)
            }      
        })

       
    },[])

    const value = {
        globalUser,
        globalData,
        setGlobalData,
        signup,
        logout,
        login,
        loading,
        resetPass
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}