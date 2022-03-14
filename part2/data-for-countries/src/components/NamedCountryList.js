import React, { useState } from 'react'
import Button from './Button';
import Single from './Single';



const NamedCountryList = ({country: {name: {common}, capital, area, languages, flags: {png}}, weatherData}) => { 
  const [show, setShow] = useState(false);

   const toggleShow = () => { setShow(!show) };
   const text = show ? "Hide" : "Show";

  const render = show ? (
   <>
    {common}: &nbsp; 
    <Button onClick={toggleShow} text={text}/>
    <Single common={common} capital={capital} area={area} languages={languages} png={png} weatherData={weatherData}/>
   </>  ) : (
    <>
      {common}: &nbsp; 
      {<Button onClick={toggleShow} text={text}/>}
    </>
  )

  return (
    <div>
      {render}
    </div>
  )
}

export default NamedCountryList;