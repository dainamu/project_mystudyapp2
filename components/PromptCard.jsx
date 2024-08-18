"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    //console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };
  // Debug
  // createdAtがUndefineでなければcreatedAt,Undefineであれば空文字
  var createDate = post.createdAt || "";
  const firstDay = new Date(post.createdAt); // DBの作成日から日付オブジェクトを作成
  //const firstDay = new Date("2024", "07", "09");
  
  const toDay = new Date();
  const targetDay1 = new Date(toDay.getFullYear(),toDay.getMonth(),toDay.getDate()-1);
  const targetDay2 = new Date(targetDay1.getFullYear(),targetDay1.getMonth(),targetDay1.getDate()-7);
  const targetDay3 = new Date(targetDay2.getFullYear(),targetDay2.getMonth(),targetDay2.getDate()-14);
  const targetDay4 = new Date(targetDay3.getFullYear(),targetDay3.getMonth(),targetDay3.getDate()-28);
  // console.log("初日："+firstDay);
  // console.log("1日前："+targetDay1);
  // console.log("8日前："+targetDay2);
  // console.log("22日前："+targetDay3);
  // console.log("59日前："+targetDay4);
  //　Debug
  //console.log(targetDay1.toDateString() + " : " + firstDay.toDateString());
  //console.log(targetDay2.toDateString() + " : " + firstDay.toDateString());
  if(createDate.length != 0){ // createDateが

    createDate = createDate.slice(0,10);
  }
  var promptCardStyle = 'prompt_card';
  var bgcolor = "";
  const defaultBg = 'bg-white/20';
  const bg1 =  'bg-green-200';
  const bg2 =  'bg-violet-200';
  const bg3 =  'bg-amber-200';
  const bg4 =  'bg-red-200';
  // 復讐周期によって背景色変更
  if(firstDay.toDateString() ==targetDay1.toDateString()){
    // 1日後
    bgcolor = bg1;
  }else if(firstDay.toDateString() == targetDay2.toDateString()){
    //　１日後 +　1週間後
    bgcolor = bg2;
    console.log("１日後 +　1週間後");
  }else if(firstDay.toDateString() == targetDay3.toDateString()){
    //　１日後 +　１週間後 + ２週間後
    bgcolor = bg3;
  }else if(firstDay.toDateString() == targetDay4.toDateString()){
    //　１日後 +　１週間後 + ２週間後 + 4週間後
    bgcolor = bg4;

  }else {
    // それ以外
    bgcolor = defaultBg;
    //console.log("それ以外");
  }
  promptCardStyle = promptCardStyle + ' ' + bgcolor;
  return (
    <div className={`shadow-xl ${promptCardStyle}`}>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              
              {createDate}
            </p>
            <div className="flex justify-between gap-x-1 text-sm text-gray-500 font-inter pointer-events-none">
              {/* チェックボックスがチェックされていない場合、名前も値もサーバーに送信されない */}
              <input type="checkbox" id="1d" defaultChecked={post.history1}></input>
              <label htmlFor="1d">1day</label>
              <input type="checkbox" id="1w" defaultChecked={post.history2}></input>
              <label htmlFor="1w">1w</label>
              <input type="checkbox" id="2w" defaultChecked={post.history3}></input>
              <label htmlFor="2w">2w</label>
              <input type="checkbox" id="4w" defaultChecked={post.history4}></input>
              <label htmlFor="4w">4w</label>
            </div>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm text-gray-500 cursor-pointer blue_btn opacity-85'
            onClick={handleEdit}
          >
            編集
          </p>
          <p
            className='font-inter text-sm text-gray-500 cursor-pointer rose_btn opacity-85'
            onClick={handleDelete}
          >
            削除
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
