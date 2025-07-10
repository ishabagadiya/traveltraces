import React from 'react';

const AnimatedBackground = () => {
    return (
        <div className="absolute inset-0 z-0 w-full h-full">
            {/* Container for all the layered shapes */}
            <div className="absolute inset-0">
                {/* Layer 1: Large, dark green shape on the right */}
                <div className="blur-[2px] absolute top-0 left-0 w-[90%] h-[100vh] bg-gradient-to-r from-[#8c78d7] to-[rgba(140,120,215,0.1)] rounded-r-[4rem]" />
                {/* Layer 2: Large, light purple shape on the left */}
                <div className="blur-[2px] absolute h-[calc(100vh-100px)] w-[70%] left-0 top-[100px] bg-gradient-to-r from-[#e1b9ff] to-[rgba(225,185,255,0.1)] rounded-r-[4rem]" />
                {/* Layer 3: Inner, darker blue/purple shape */}
                <div className="blur-[2px] absolute h-[calc(100vh-300px)] w-[60%] top-[300px] -left-12 bg-gradient-to-r from-[#003c3a] via-[#003c3a] to-[rgba(0,60,58,0.1)] rounded-r-[4rem]" />
                {/* Layer 4: Smaller light purple shape at the bottom */}
                <div className="blur-[2px] absolute h-[calc(100vh-300px)] w-[40%] top-[300px] -left-12 bg-gradient-to-r from-[#8c78d7] to-[rgba(140,120,215,0.1)] rounded-r-[4rem]" />
                {/* Layer 5: The innermost, slightly darker central panel */}
                <div className="absolute h-[300px] w-[45%] -left-12 bottom-0 bg-gradient-to-r from-[#e1b9ff] to-[rgba(225,185,255,0.1)] rounded-tr-[4rem]" />
                {/* Layer 6: Additional gradient layer */}
                <div className=" absolute h-[400px] w-[60%] right-0 bottom-0 bg-gradient-to-r from-transparent via-[rgba(225,185,255,0.6)] to-[rgba(225,185,255,0.1)] rounded-l-[4rem]" />
            </div>
        </div>
    );
};

export default AnimatedBackground; 