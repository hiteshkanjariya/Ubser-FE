import React from 'react'
import { useSelector } from 'react-redux';

const LocationSearchPanel = (props) => {
    const { suggestions } = useSelector((state) => state.location);

    const { setVehicalPanelOpen, setPanelOpen, handleSelectLocation } = props
    return (
        <div>
            {suggestions?.map((item, idx) => (
                <div
                    onClick={() => {
                        // handleSelectLocation(item);
                        // setVehicalPanelOpen(true);
                        handleSelectLocation(item.display_name)
                    }}
                    className='flex gap-4 item-center justify-start my-4 border-2 active:border-black border-white rounded-xl'
                    key={idx}
                >
                    <h2 className='bg-[#eee] h-10 flex items-center justify-center w-16 rounded-full'>
                        <i className='ri-map-pin-fill text-xl'></i>
                    </h2>
                    <h4 className='font-medium'>{item.
                        display_name}</h4>
                </div>
            ))}
        </div>

    )
}

export default LocationSearchPanel
