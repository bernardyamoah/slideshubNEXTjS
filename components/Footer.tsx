
import { Card } from './ui/card'

export default function Footer() {
   
    return (
        <>
            <footer className="py-10 mt-auto bg-zinc-800 ">
       
          <div className="text-center text-gray-100">
            <h3>Slideshub</h3>
            <p>&copy; {new Date().getFullYear()} Slideshub. All rights reserved.</p>
          </div>
        
      </footer>

        </>
    )
}
