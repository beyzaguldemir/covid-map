import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
const covidUrl='https://covid-19-statistics.p.rapidapi.com/reports'


const  headers= {
    'x-rapidapi-key': 'a082eb287dmsh1380849a26b0703p124dc5jsn234c14270c84',
    'x-rapidapi-host': 'covid-19-statistics.p.rapidapi.com'
  }




const getData=createAsyncThunk("covid/getData",async({code,query})=>{
  
    // api'a gönderilecek parametreleri hazırla
    const params={iso:code,q:query}
    // isoCode a göre covid verileri al
    const req1= axios.get(covidUrl,{params,headers})
    
    // isoCode a göre ülke verileri al
    const req2= axios.get(
      code ? `https://restcountries.com/v3.1/alpha/${code}` :`https://restcountries.com/v3.1/name/${query}`
    )
    // her iki api istegi aynı anda paralel olarak atıyoruz
    const responses=await Promise.all([req1,req2])
    // region nesnesindeki değerleri bir üst nesne ile aynı düzeye çıkardık
    const covid={...responses[0].data.data[0],
                ...responses[0].data.data[0].region,
            }
    // gereksiz değerleri kaldır
    delete covid.cities;
    delete covid.region;
    
    // payload ı return et
    return {covid,country:responses[1].data[0]}
})

export default getData