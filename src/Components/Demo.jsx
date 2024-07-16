import { useState,useEffect } from "react";
import {copy,linkIcon,loader,tick} from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";



const Demo = () => {
    const [article, setarticle] = useState({
        url:'',
        summary:'',
    });
    const [allArticles,setallArticles]=useState([]);
    const [getSummary,{error,isFetching}] = useLazyGetSummaryQuery();
    const [copied, setcopied] = useState("");

    useEffect(()=>{
        const articlesFromLocalStorage=JSON.parse(
            localStorage.getItem('articles')
        )
        if(articlesFromLocalStorage){
            setallArticles(articlesFromLocalStorage)
        }

    },[])

    const handlesubmit = async (e) => {
        e.preventDefault();
     try{
      const {data}=await getSummary({articleUrl:article.url})
      if(data?.summary){
        const newArticle={...article,summary:data.summary};
        const updatedAllArticles=[newArticle,...allArticles]
        setarticle(newArticle);
        setallArticles(updatedAllArticles)
        localStorage.setItem('articles',json.stringify(updatedAllArticles))
      }
    } catch(error){
        console.error("error",error)
    }

    }
    const handlecopy =(copyurl)=>{
        setcopied(copyurl);
        navigator.clipboard.writeText(copyurl);
        setTimeout(()=>setcopied(false),3000)
    }
  return (
    <section className="mt-16 w-full max-w-xl">
        <div className="flex flex-col w-full gap-2">
            <form 
             className="relative flex justify-center items-center"
             onSubmit={handlesubmit}>
                <img src={linkIcon} 
                alt="linkicon" 
                className="absolute left-0 my-2 ml-3 w-5"/>

                <input 
                type="url" 
                value={article.url}
                onChange={(e)=>{setarticle({...article,url:e.target.value})}}
                placeholder="Enter a Url"
                className="url_input peer"
                required />

                <button
                type="submit"
                className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
                    +
                </button>
            </form>
            {/* Browse URL History */}
            <div className=" flex flex-col gap-1 max-h-60 overflow-hidden">
                {allArticles.map((item,index)=>(
                    <div
                    key={`link-${index}`}
                    onClick={()=>setarticle(item)}
                    className="link_card">
                        <div className="copy_btn" onClick={()=>handlecopy(item.url)}>
                            <img
                            src={copied === item.url ? tick : copy}
                            alt="copy-icon"
                            className="w-[40%] h-[40%] object-contain"
                            />
                        </div>
                        <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                            {item.url}

                        </p>

                    </div>

                ))}

            </div>
           
        </div>
        {/* Display Result */}
        <div className="my-10 max-w-full flex justify-center items-center">
            {isFetching ?(
                <img src={loader} alt="loader" className="w-10 h-20 object-contain"/>
            ):error?(
                <p className="font-inter font-bold text-black text-center">
                    well,that wasn't supposed to happen <br />
                    <span className="text-red-700">503 Service Unavailable</span>
                  
                
                <br/>
                <span className="font-satoshi font-normal text-gray-700">
                    {error?.JSONdata?.error}
                </span>
                </p>
            ):(
                article.summary && (
                    <div className="flex flex-col gap-3">
                        <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                            Article<span 
                            className="blue_gradient">summary</span></h2>
                            <div className="summary_box">
                              <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>  

                            </div>
                    </div>
                )
            )
        }

        </div>
    </section>
  )
}

export default Demo