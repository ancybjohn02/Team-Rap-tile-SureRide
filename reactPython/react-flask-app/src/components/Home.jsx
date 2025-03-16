import React from 'react'
import Heatmap from "./Heatmap";
import RouteCalculator from './RouteCalculator';
import CustomSlider from './CustomSlider';
import PredictAcceptance from './PredictAccptance';
// import Navigation from './Navigation';


const Home = () => {
  return (
    <div>

 
   <div className='home'>
    <h2 className='homeH2 poppins-semibold'>Peak Hour Predictions</h2>
    <Heatmap/>
    <div className='calc'>
    <RouteCalculator/>
    </div>
    <CustomSlider/>
<PredictAcceptance/>
   </div>
    </div>
  


  )
}

export default Home;
