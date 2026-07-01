import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Trainers = () => {

  const { speciality } = useParams()
  const [filterTrainer, setFilterTrainer] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { trainers } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterTrainer(trainers.filter(doc => doc.speciality === speciality))
    } else {
      setFilterTrainer(trainers)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [trainers, speciality])

  return (
    <div className="py-10">
      <p className='text-gray-600 text-center mb-4'>Browse through our trainers by training type.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>

        {/* Filters Section */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-2 px-4 border rounded-md text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : 'bg-gray-100'}`}
        >
          Filters
        </button>

        {/* Filters List */}
        <div className={`flex flex-col gap-4 text-sm ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {[
            'Weight Training',
            'Yoga & Meditation',
            'Cardio & Endurance',
            'Nutrition & Diet',
            'Physiotherapy',
            'HIIT & CrossFit'
          ].map((trainingType) => {
            const active = speciality === trainingType
            return (
              <button
                key={trainingType}
                onClick={() =>
                  active
                    ? navigate('/trainers')
                    : navigate(`/trainers/${trainingType}`)
                }
                className={`
          px-6 py-2 
          rounded-full 
          text-white 
          font-medium 
          w-full
          transition 
          transform 
          ${active
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 shadow-lg'
                    : 'bg-gradient-to-r from-orange-300 to-red-300 hover:from-orange-500 hover:to-red-500 shadow-md hover:shadow-lg hover:scale-105'
                  }
        `}
              >
                {trainingType}
              </button>
            )
          })}
        </div>


        {/* Trainers Grid */}
        <div className='w-full grid grid-cols-auto sm:grid-cols-3 gap-6 px-4'>
          {filterTrainer.map((item, index) => (
            <div
              key={index}
              onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0); }}
              className='flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer w-full h-60 border border-gray-300'
            >
              <img
                className='w-28 h-28 object-cover mb-4 rounded-full border-4 border-orange-400 shadow-md'
                src={item.image}
                alt=""
              />
              <p className='text-base font-semibold text-center text-gray-800'>{item.name}</p>
              <p className='text-sm text-center text-gray-600'>{item.speciality}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Trainers
