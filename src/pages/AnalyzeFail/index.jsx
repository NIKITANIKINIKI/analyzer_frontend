import React from 'react'
import {useParams} from 'react-router'



function AnalyzeFail() {

  const {id}=useParams()

    
  return (
    <div>{id}</div>
  )
}

export default AnalyzeFail