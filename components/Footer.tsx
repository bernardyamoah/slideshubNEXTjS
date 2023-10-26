
export default function Footer() {
   
    return (
        <>
            <footer className="sticky inset-x-0 bottom-0 w-full p-4 border-t bg-zinc-800 z-[50] ">
       
          <div className="flex justify-between text-sm text-center text-gray-100">
            <p>Slideshub</p>
            <p>&copy; {new Date().getFullYear()} Slideshub. All rights reserved.</p>
          </div>
        
      </footer>

        </>
    )
}
