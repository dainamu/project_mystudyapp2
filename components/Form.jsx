"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const pathName = usePathname();
  console.log(pathName);
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>記録を{type}</span>
      </h1>
      <p className='desc text-left max-w-md'>
        学習内容を{type}します。
      </p>
      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        {pathName != "/create-prompt" && (
            <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
              復習履歴
            </span>
            <div className="flex  gap-x-1 text-sm text-gray-500 font-inter">
              <input
                type="checkbox"
                id="1d"
                checked={post.history1}
                onChange={(e) => setPost({ ...post, history1: e.target.checked })}
              />
              <label htmlFor="1d">1day</label>
              <input
                type="checkbox"
                id="1w"
                checked={post.history2}
                onChange={(e) => setPost({ ...post, history2: e.target.checked })}
              />
              <label htmlFor="1w">1w</label>
              <input
                type="checkbox"
                id="2w"
                checked={post.history3}
                onChange={(e) => setPost({ ...post, history3: e.target.checked })}
              />
              <label htmlFor="2w">2w</label>
  
              <input
                type="checkbox"
                id="4w"
                checked={post.history4}
                onChange={(e) => setPost({ ...post, history4: e.target.checked })}
              />
              <label htmlFor="4w">4w</label>
            </div>
          </label>
        )}
        
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            内容
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder=''
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            タグ{" "}
            <span className='font-normal'>
              (#プログラミング, #web開発, #アルゴリズム, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            キャンセル
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
