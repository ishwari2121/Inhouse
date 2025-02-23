import React from 'react'
import college from '../../assets/college.jpg'

export default function Midbar() {
    return (
        <>
        <div
            className="flex h-screen bg-cover bg-center justify-between"
            style={{ backgroundImage: `url(${college})` }}>

            {/* <div className="h-70 w-75 backdrop-blur-lg p-6 rounded-lg shadow-lg ">
                <h1 className="text-xl font-bold text-gray">Worrying About Placements?</h1>
                <p className="text-xl font-bold text-gray">We've got you covered! Kickstart your career with the right guidance!</p>
            </div> */}

        </div>
        </>
      );
}
