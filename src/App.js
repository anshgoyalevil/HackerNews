import axios from 'axios';
import ListHead from './components/ListHead';
import React, { useEffect, useState } from 'react';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Filters from './components/Filters';

function App() {

  const [stories, setStories] = useState([]);

  const [page, setPage] = useState(0);

  const [tag, setTag] = useState('story');

  const [by, setBy] = useState('search');

  const [time, setTime] = useState('');

  const [query, setQuery] = useState('');

  async function fetchStories() {
    const response = await axios.get(`http://hn.algolia.com/api/v1/${by}?tags=${tag}&page=${page}${time}${query}`);
    console.log(page);
    console.log(response.data.hits);
    if (tag === 'comment') {
      console.log("entered here");
      var upd = response.data.hits.map(obj => {
        var upt = obj.comment_text.replace(/<[^>]+>/g, '');
        var sz = upt.length;
        if (sz > 200) {
          upt = upt.substring(0, 200) + '...';
        }
        return { ...obj, comment_text: upt };
      });
      setStories(upd);
    }
    else{
      setStories(response.data.hits);
    }
    
  };

  async function nextPage(currPage) {
    setPage(currPage + 1);
  };

  async function changeSearch(search) {
    setQuery(search);
    setPage(0);
  };

  async function previousPage(currPage) {
    if (currPage === 0) {
      return;
    }
    setPage(currPage - 1);

  };

  async function changeTime(time) {
    setTime(time);
    setPage(0);
  };

  useEffect(() => {
    fetchStories();
  }, [page, tag, by, time, query]);

  async function changeView(tag) {
    setTag(tag);
    setPage(0);
  }

  async function changeBy(by) {
    setBy(by);
    setPage(0);
  }


  /*
{
            "created_at": "2023-01-26T03:38:21.000Z",
            "title": "Hindenburg vs. Adani: The Short Seller Taking on Asia's Richest Person",
            "url": "https://www.bloomberg.com/news/articles/2023-01-26/short-seller-nate-anderson-s-hiindenburg-is-targeting-billionaire-gautam-adani",
            "author": "mfiguiere",
            "points": 1,
            "story_text": null,
            "comment_text": null,
            "num_comments": 0,
            "story_id": null,
            "story_title": null,
            "story_url": null,
            "parent_id": null,
            "created_at_i": 1674704301,
            "_tags": [
                "story",
                "author_mfiguiere",
                "story_34527409"
            ],
            "objectID": "34527409",
            "_highlightResult": {
                "title": {
                    "value": "Hindenburg vs. Adani: The Short Seller Taking on Asia's Richest Person",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "url": {
                    "value": "https://www.bloomberg.com/news/articles/2023-01-26/short-seller-nate-anderson-s-hiindenburg-is-targeting-billionaire-gautam-adani",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "author": {
                    "value": "mfiguiere",
                    "matchLevel": "none",
                    "matchedWords": []
                }
            }
        }
  */

  /*
{
            "created_at": "2023-01-27T04:35:37.000Z",
            "title": null,
            "url": null,
            "author": "not-chatgpt",
            "points": null,
            "story_text": null,
            "comment_text": "Their current demos seem worse than riffusion results I get on average. Music gen is hard because music is inherently a composed of many many different instruments, each with unique sound and function. Simply training end-to-end will almost always end up badly.",
            "num_comments": null,
            "story_id": 34541836,
            "story_title": "MusicLM: Generating music from text",
            "story_url": "https://arxiv.org/abs/2301.11325",
            "parent_id": 34542467,
            "created_at_i": 1674794137,
            "_tags": [
                "comment",
                "author_not-chatgpt",
                "story_34541836"
            ],
            "objectID": "34542527",
            "_highlightResult": {
                "author": {
                    "value": "not-chatgpt",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "comment_text": {
                    "value": "Their current demos seem worse than riffusion results I get on average. Music gen is hard because music is inherently a composed of many many different instruments, each with unique sound and function. Simply training end-to-end will almost always end up badly.",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "story_title": {
                    "value": "MusicLM: Generating music from text",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "story_url": {
                    "value": "https://arxiv.org/abs/2301.11325",
                    "matchLevel": "none",
                    "matchedWords": []
                }
            }
        }
*/

  return (
    <div>
      <Header changeBy={changeBy} />
      <SearchBar changeSearch={changeSearch} />
      <Filters changeView={changeView} changeBy={changeBy} changeTime={changeTime} />
      <ListHead stories={stories} clickHandle={fetchStories} tag={tag} />
      <Pagination nextPage={nextPage} previousPage={previousPage} currPage={page} ></Pagination>



    </div>
  );
}

export default App;
