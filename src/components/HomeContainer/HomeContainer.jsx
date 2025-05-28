import React from 'react';
import HomeTopPart from '../HomeTopPart/HomeTopPart';
import Features from '../FeaturesView/FeaturesView';
import Testimonials from '../Testimonials/Testimonials';
import Creativity from '../Creativity/Creativity';
import Footer from '../Footer/Footer';
import HomeBottomPart from '../HomeBottomPart/HomeBottomPart';
import FeaturesNew from '../FeaturesNew/FeaturesNew';

const HomeContainer = () => {
    return (
        <div>
            <HomeTopPart/>
            {/* <Features/> */}
            <FeaturesNew/>
            <Testimonials/>
            {/* <Creativity/> */}
            <HomeBottomPart/>
            
        </div>
    );
};

export default HomeContainer;