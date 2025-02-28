import React from 'react';

import Banner from '../Banner/Banner';
import Fetures from '../Fetures/Fetures';
import Delivery from '../Delivery/Delivery';
import Review from '../Fetures/Review/Review';
import Paralexx from '../Paralexx/Paralexx';


const Homepage = () => {
    return (
        <div>
            
            {/* banner secion assingment */}
            <Banner></Banner>

            {/* Our Features Section */}


            <Fetures></Fetures>

            {/* The Top Delivery Man */}

            <Delivery></Delivery>

            {/* user review */}

            <Review></Review>


            {/* Parallax  */}

            <Paralexx></Paralexx>

            

        </div>
    );
};

export default Homepage;