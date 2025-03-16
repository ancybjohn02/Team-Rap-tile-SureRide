import React from 'react'
import Heatmap from './Heatmap'
import PredictAcceptance from './PredictAccptance'

const DriverPage = () => {
  return (
    <div>
<Heatmap/>
<h2 className='perform'>Check Your Performance</h2>
<div className='image-container'>

{/* <img src="/images/pic1.jpg" alt="" /> */}
<img src="/images/pic2.jpg" alt="" />
<img src="/images/pic3.jpg" alt="" />
<img src="/images/pic4.jpg" alt="" />
</div>
    </div>
  )
}

export default DriverPage
