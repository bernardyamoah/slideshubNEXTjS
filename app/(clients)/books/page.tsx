'use client'
import algoliasearch from "algoliasearch/lite"; 
import { InstantSearch, SearchBox, Hits } 
	from "react-instantsearch-dom"; 
import SearchBar from "@/components/searchbar"; 

const searchClient = algoliasearch( 
'APPLICATION_API_KEY', 
"SEARCH_ONLY_API_KEY", 
); 


const Page = () => {
  const post = {
    url: 'https://cloud.appwrite.io/v1/storage/buckets/6489a0a6b548f2079126/files/653a72b378ae98a10f1d/view?project=647a8fc613adfa0667f9',
    id:1
  }
  return (
  
    <>
      <div className="flex items-center justify-center">
      <InstantSearch 
		searchClient={searchClient} 
		indexName="gfg_dev"> 

		{/* Adding Search Box */} 
		<SearchBar/> 

		{/* Adding Data */} 
		<Hits /> 
	</InstantSearch> 
      </div>
      <div className="mt-2.5 flex mx-auto max-w-3xl">
      
    <div
        className="relative aspect-video max-h-[580px] max-w-[260px] flex items-center bg-black rounded-xl cursor-pointer"
    >
        <video 
            id={`video-${post.id}`}
            loop
            controls
            muted
            className="object-cover mx-auto aspect-video rounded-xl" 
            src={post.url}
        />
        <img 
            className="absolute right-2 bottom-10" 
            width="90" 
            src="https://images.unsplash.com/photo-1696918950949-45d0d6624a45?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      </div>
    </>
  )
}

export default Page
