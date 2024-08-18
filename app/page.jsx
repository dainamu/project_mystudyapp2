import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>

    <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
      <h2
        className="dark:invert text-transparent bg-clip-text bg-gradient-to-r text-gray-900
         from-indigo-500 via-sky-500 to-emerald-500 relative z-[1] mb-3 text-2xl font-semibold"
      >
        学習を記録する
      </h2>

    </div>

    <Feed />
  </section>
);

export default Home;
