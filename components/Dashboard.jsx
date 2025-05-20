'use client'
import { Fugaz_One } from 'next/font/google';
import React, {useState, useEffect} from 'react'
import Calender from './Calender';
import { useAuth } from '@/context/AuthContext';
import { average, doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebse';
import Login from './Login';
import Loading from './Loading';

const Fugaz = Fugaz_One({
  subsets: ["latin"],
  weight: ['400']
});

export default function Dashboard() {

    const {globalUser, globalData, setGlobalData, loading} = useAuth()
    const [data, setData] = useState({})

    const now = new Date()

    function countValues(){
        let total_number_of_days = 0
        let sum_moods = 0
        for(let year in data){
            for (let month in data[year]){
                for(let day in data[year][month]){
                    let days_mood = data[year][month][day]
                    total_number_of_days++
                    sum_moods += days_mood
                }
            }
        }
        return {num_days: total_number_of_days, average_mood: sum_moods/total_number_of_days}
    }
    const statuses = {
        num_days: 14,
        ...countValues(),
        time_remaining: `${23-now.getHours()}H ${60-now.getMinutes()}M`
        

    }
    
    async function handleSetMood(mood){
        
        const day = now.getDate()
        const month = now.getMonth()
        const year = now.getFullYear()
          try{
            const newData = {...globalData}
            if(!newData?.[year]){
                newData[year]={}
            }
            if(!newData?.[year]?.[month]){
                newData[year][month]={}
            }
            newData[year][month][day] = mood
            //update current state
            setData(newData)
            //update global state
            setGlobalData(newData)
            //update firebase
            const docRef = doc(db, 'users', globalUser.uid)
            const res = await setDoc(docRef, {
                [year]: {
                    [month]: {
                        [day]: mood
                    }
                }
            },{merge: true}) 
        }catch(err){
            console.log('Failed to set data :', err.message)
        }finally{

        }
    }
    

    const moods={
        '&*@#$' : '😭',
        'Sad' : '😢',
        'Existing' : '😶',
        'Good' : '😊',
        'Elated' : '😍',
    }

    useEffect(()=>{
        if(!globalUser || !globalData){
            return
        }
        setData(globalData)
    },[globalData,globalUser])



     if(loading){
        return <Loading/>
     }

     if (!globalUser){
        return <Login/>
     }

  return (
    <div className='flex flex-col flex-1 gap-8 md:gap-12'>
        <div className='grid grid-cols-3 bg-indigo-50
         text-indigo-500 rounded-lg gap-4 p-4'>
            {Object.keys(statuses).map((status, statusIndex)=>{
                return(
                    <div key={statusIndex} className='flex flex-col gap-1 sm:gap-2'>
                        <p className='font-medium capitalize text-xs sm:text-sm truncate'>{status.replaceAll('_',' ')}</p>
                        <p className={'text-base sm:text-lg truncate ' + Fugaz.className}>{statuses[status]}{(status === 'num_days' ? ' 🔥':'')}</p>
                    </div>
                )
            })}
        </div>
        <h4 className={'text-5xl sm:text-6xl md:text-7xl text-center ' + Fugaz.className}>
            How do you <span className='textGradient'>feel</span> today?
        </h4>
        <div className='flex flex-wrap items-stretch gap-4'>
            {Object.keys(moods).map((mood, moodIndex)=>{
                return(
                    <button onClick={()=>{
                        const currentMoodValue = moodIndex + 1
                        handleSetMood(currentMoodValue)
                    }} key={moodIndex} className={'p-4 px-5 text-center rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 flex flex-col gap-2 flex-1'}>
                        <p className='text-4xl sm:text-5xl md:text-6xl'>{moods[mood]}</p>
                        <p className={'text-indigo-500 text-xs sm:text-sm md:text-base ' + Fugaz.className}>{mood}</p>
                    </button>
                )
            })}
        </div>
        <Calender completeData={data} handleSetMood={handleSetMood}/>
    </div>
  )
}
