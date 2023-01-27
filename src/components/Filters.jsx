import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

function Filters({ changeView, changeBy, changeTime }) {

    function convertToTimestamp(date) {
        const convertedDate = new Date(date);
        return convertedDate.getTime() / 1000;
    }

    function timeHandler(startTime, endTime, ){
        let retValue = "";
        if(startTime === 0 && endTime === 0){
            changeTime('');
        }
        else{
            retValue = `&numericFilters=created_at_i>${startTime},created_at_i<${endTime}`;
            changeTime(retValue);
        }
    }

    const getInitialTag = () => {
        const value = "story";
        return value;
    };

    const getInitialBy = () => {
        const value = "search";
        return value;
    };

    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    const handleValueChange = (newValue) => {
        //console.log("newValue:", newValue);
        let startTime = convertToTimestamp(newValue.startDate);
        let endTime = convertToTimestamp(newValue.endDate);
        setValue(newValue);
        timeHandler(startTime, endTime);
    }

    const [tag, setTag] = useState(getInitialTag);

    const [by, setBy] = useState(getInitialBy);

    function tagHandler(e) {
        setTag(e.target.value);
        changeView(e.target.value);
    };

    function byHandler(e) {
        setBy(e.target.value);
        changeBy(e.target.value);
    };

    return (
        <div className="flex flex-row items-center content-center justify-center">

            <div className="relative w-full lg:max-w-sm px-2">
                <select onChange={tagHandler} className="w-full py-2 px-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                    <option value="story">All</option>
                    <option value="story">Stories</option>
                    <option value="comment">Comments</option>
                </select>
            </div>
            <div className="relative w-full lg:max-w-sm px-2">
                <select onChange={byHandler} className="w-full py-2 px-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                    <option value="search">Popularity</option>
                    <option value="search_by_date">Date</option>
                </select>
            </div>
            <div className="relative w-full lg:max-w-sm px-2">
                <div>
                    <Datepicker toggleClassName="rounded-r-lg bg-opacity-40 bg-gray-400 hover:bg-blue-800 hover:bg-opacity-60 transition-all duration-150 ease-in-out" showShortcuts={true}
                        value={value}
                        onChange={handleValueChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default Filters;