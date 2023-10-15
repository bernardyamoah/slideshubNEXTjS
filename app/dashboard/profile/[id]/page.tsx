
function Page({ params }: any) {

  return (
    <>
    <span className='inline-block text-center'>Profile page</span>
 <h1>Profile {params.name} </h1>   
    
    </>

  )
}

export default Page