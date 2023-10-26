'use client'
import algoliasearch from "algoliasearch/lite"; 
import { InstantSearch, SearchBox, Hits } 
	from "react-instantsearch-dom"; 
import SearchBar from "@/components/searchbar"; 
import { CardContent,  CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    


      
      <aside className="container ">
      
  
        <CardHeader className="flex mt-6 space-y-4">
        <CardTitle className="text-2xl">
          Books
    
      </CardTitle>
      <InstantSearch 
      searchClient={searchClient} 
      indexName="gfg_dev" > 
  
      {/* Adding Search Box */} 
      <SearchBar/> 
  
      {/* Adding Data */} 
      <Hits /> 
    </InstantSearch> 
        
  
    
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-8 mt-20 lg:gap-10 md:grid-cols-3 lg:grid-cols-4 ">

</CardContent>
        
    
      </aside>
    </>
  )
}

export default Page
