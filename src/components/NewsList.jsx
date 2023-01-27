import NewsItem from "./NewsItem";

function NewsList({ stories, tag, by }) {
    console.log(stories, "NewsList");
    const renderedNews = stories.map(function (newsItem) {
        return (<NewsItem key={newsItem.objectID} title={newsItem.title} author={newsItem.author} points={newsItem.points} created_at={newsItem.created_at} num_comments={newsItem.num_comments} url={newsItem.url} comment_text={newsItem.comment_text} story_id={newsItem.story_id} story_title={newsItem.story_title} story_url={newsItem.story_url} tag={tag} />);
    });

    //console.log(renderedNews);

    return (
        <div>
            {renderedNews}
        </div>
    );
};

export default NewsList;