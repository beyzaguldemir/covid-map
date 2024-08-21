import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import getData from '../../redux/action'
import Loader from "../../components/Loader"
import Error from "../../components/Error"
import InfoCard from './InfoCard'

const Detail = () => {
  const {data,error,isLoading}=useSelector((store)=>store)
  
  const dispatch=useDispatch()
  // url deki arama parametrisini al
  const [params]=useSearchParams()
  const code=params.get("code")
  const query=params.get("q")

  useEffect(()=>{
    // verileri alıp store'a aktaran thunk aksiyonunu tetikler
    dispatch(getData({code,query}))
  },[code,query])
  // covid nesnesini diziye cevirelim
  const covidArr=Object.entries(data?.covid || {})
  console.log(data)
  return (
    <div className='min-h-[calc(100vh-74px)] text-white grid place-items-center p-6'>
      <div className='min-h-[80vh] bg-white p-8 rounded-lg shadow-lg max-w-3xl max-md:w-full'>
        {/* Üst içerik */}
        <div className='flex justify-between items-center'>
          <Link className='bg-gray-700 py-2 px-3 rounded-md hover:bg-gray-800' to="/">Geri</Link>
          
          <div className="flex items-center space-x-2">{isLoading ? (<Loader type="header"/>) : (!error &&( <>
          
          <h1 className='text-gray-900 text-lg lg:text-2xl font-bold'>{data.country.altSpellings[1]}</h1>
          <img className='w-16 lg:w-24 rounded-md' src={data.country.flags.png} alt={data.country.flags.alt} />
          </>) )} </div>
        </div>
        {/* Alt İçerik */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6'>
          {isLoading ? <Loader/> : error ? <Error info={error} retry={()=>dispatch(getData({code,query}))}/> : (covidArr.map((item,key)=> <InfoCard item={item} key={key}/>))}
        </div>
      </div>
    </div>
  )
}

export default Detail