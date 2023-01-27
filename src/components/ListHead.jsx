import React from "react";
import NewsList from "./NewsList";

function ListHead({clickHandle, stories, tag, by}) {

    return (
        <div className="flex items-center justify-center">
            <div className="xl:w-3/4 2xl:w-4/5 w-full">
                <div className="px-4 md:px-10 py-4 md:py-7">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">HackerNews</p>
                        
                    </div>
                </div>
                <div className="bg-white px-4 md:px-10 pb-5">
                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed">
                            <tbody>
                                <NewsList stories={stories} tag={tag} />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListHead;