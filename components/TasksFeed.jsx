"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick, interval }) => {

    const newData = data.filter((post)=>{
        const firstDay = new Date(post.createdAt); // DBの作成日から日付オブジェクトを作成
        const toDay = new Date();
        const intervalNum = parseInt(interval);
        const targetDay = new Date(toDay.getFullYear(),toDay.getMonth(),toDay.getDate()-intervalNum);
        if(firstDay.toDateString() == targetDay.toDateString()){
            return true;
        }

    });
    
  return (
    <div>
      {newData.length !== 0 ? (
          newData.map((post) => (
            <div className="mb-2">
              <PromptCard
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
              />

            </div>
          ))

      ):(
        <>

            <p>今日の復習はありません。</p>
        </>
      )}
      

    </div>

  );
};

const TasksFeed = (props) => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };
  return (
    
      
      

        <PromptCardList data={allPosts} handleTagClick={handleTagClick} interval={props.interval}/>
      

    
  );
};

export default TasksFeed;
