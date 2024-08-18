import TasksFeed from "@components/TasksFeed"

export default function Tasks(){
  
  return (
    <>
    
    <div className=" grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 w-full font-inter font-satoshi text-gray-500">
      <div className="col-span-1 ">
        <p>1日</p>
        <TasksFeed interval="1"/>
      </div>
      <div className="col-span-1 ">
      <p className="">1週間</p>
        <TasksFeed interval="8"/>
      </div>
      <div className="col-span-1 ">
      <p className="">2週間</p>
        <TasksFeed interval="22"/>
      </div>
      <div className="col-span-1">
      <p className="">4週間</p>
      <TasksFeed interval="50"/>
      </div>
      

    </div>
    
    </>
  )
}

