import {logo} from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
        <nav className='flex justify-between items-center w-full mb-10 pt-3'>
            <img src={logo} alt="logo" className='w-28 object-contain' />
            <button 
            type='button'
            onClick={()=>window.open('https://Github.com')}
            className='black_btn'
            >
                Github
            </button>
        </nav>
        <h1 className='head_text'>
            Summarize Articles With<br
            className="max-md:hidden"/>
            <span className='orange_gradient'>OPENAI GPT-4</span>

        </h1>
        <h2 className='desc'>
            Simplify your reading with summize,an
            open-source articles summarizer
            that transforms lenghty articles into
            clear and concise summarise
        </h2>

        <h1 className='mt-6 text-slate-500'>@Developed By vijay</h1>

    </header>
  )
}

export default Hero