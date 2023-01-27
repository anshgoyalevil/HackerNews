import React from "react";
const { htmlToText } = require('html-to-text');

function NewsItem({ title, created_at, author, points, num_comments, url, story_title, story_id, comment_text, tag, story_url }) {

    let heading = '';
    if (tag === 'story') {
        heading = title;
    }
    else {
        //console.log(comment_text);
        heading = comment_text;
    }

    var commentText = '';
    if (tag === 'story') {
        commentText = `${num_comments} comments`;
    }
    else {
        commentText = story_title;
    }
    let storyId = '';
    if (tag === 'story') {
        storyId = `${points} points`;
    }
    else {
        storyId = story_id;
    }

    let storyUrl = '';
    if (tag === 'story') {
        storyUrl = url;
    }
    else {
        storyUrl = story_url;
    }
    let dateX = '';
    var dates = created_at.split("T");
    created_at = `Date: ${dates[0]} Time: ${dates[1]}`;

    return (

        <tr className="text-sm leading-none text-gray-600 h-16 py-10">
            <td className="w-1/2">
                <div className="flex items-center">

                    <div className="pl-2">
                        <p className="text-sm font-medium text-gray-800 leading-5">{heading} <a rel="noreferrer" target="_blank" href={storyUrl}><span className="text-sm text-gray-400 mt-2 leading-5">{url}</span></a></p>
                        <p className="text-xs leading-5 text-gray-600 mt-2">{author} | {storyId} | {commentText} | {created_at}</p>
                    </div>
                </div>
            </td>

        </tr>

    );
}

export default NewsItem;