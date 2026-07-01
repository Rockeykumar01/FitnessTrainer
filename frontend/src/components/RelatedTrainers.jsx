import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

// this component is rendered after Appointment.jsx
// it will show the related trainers based on the speciality of the trainer
const RelatedTrainers = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { trainers } = useContext(AppContext)

    const [relTrainer, setRelTrainer] = useState([])

    useEffect(() => {
        if (trainers.length > 0 && speciality) {
            const trainersData = trainers.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelTrainer(trainersData)
        }
    }, [trainers, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900'>
            <h1 className='text-3xl font-medium'>Related Trainers</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of certified trainers.</p>
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {relTrainer.map((item, index) => (
                    <div onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                        <img className='bg-blue-100' src={item.image} alt="" />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedTrainers

