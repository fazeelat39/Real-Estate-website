import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      
      <CategoryList/>

      <BannerProduct/>
      <HorizontalCardProduct category={"watchingmachine"}   heading={"Watching Machine "}/>


      <HorizontalCardProduct category={"refrigerator"}   heading={"Refrigerator "}/>

      <HorizontalCardProduct category={"microwave"}   heading={"Microwave"}/>


      <HorizontalCardProduct category={"iron"}   heading={"Iron"}/>

      <HorizontalCardProduct category={"coffeemaker"}   heading={"Coffee Maker"}/>

      <HorizontalCardProduct category={"stove"}   heading={"Stove"}/>

      <HorizontalCardProduct category={"vacumcleaner"}   heading={"Vacum Cleaner"}/>


         {/**Vertical Card Product */}

    <VerticalCardProduct category={"airconditioner"}   heading={"Air Conditioner"}/>
    <VerticalCardProduct category={"dishwasher"}   heading={"Dishwasher"}/>
    <VerticalCardProduct category={"blende"}   heading={"Blender"}/>
    <VerticalCardProduct category={"mixer"}   heading={"Mixer"}/>
    <VerticalCardProduct category={"toaster"}   heading={"Toaster"}/>
    <VerticalCardProduct category={"ricecooker"}   heading={"Rice Cooker"}/>
    <VerticalCardProduct category={"crockpot"}   heading={"Crockpot"}/>

    </div>
  )
}

export default Home