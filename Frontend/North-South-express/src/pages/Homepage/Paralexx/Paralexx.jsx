import React from 'react';
import { Parallax } from 'react-parallax';
import paralleximage from '../../../assets/images/banner/banner2.webp'

const Paralexx = () => {
    return (
        <div>
            <Parallax
                blur={{ min: -50, max: 50 }}
                bgImage={paralleximage}
                bgImageAlt="the dog"
                strength={-200}
            >
                <div
                    className="hero md:h-[600px] px-10 lg:px-28"
                >
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-neutral-content text-center bg-cyan-800">
                        <div className="  lg:mx-20 lg:my-20">
                            <h1 className="mb-5 text-2xl md:text-3xl lg:text-5xl font-bold uppercase opacity-85 text-white">Web developer</h1>
                            <p className="mb-5 w-full lg:w-3/4 mx-auto">
                            Over 2 Lac people shop online worldwide, and they appreciate updates on their purchases and returns. Sending order update text messages builds trust in the purchase process and leads to long-lasting relationships between your brand and customers. By showing your customers that you care about their shopping experience, you can encourage repeat purchases and develop a loyal customer base.
                            </p>

                        </div>
                    </div>
                </div>
            </Parallax>

        </div>
    );
};

export default Paralexx;