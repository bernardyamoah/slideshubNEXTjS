
import { Card } from './ui/card'

export default function Footer() {
   
    return (
        <>
            <footer className="py-10 mt-auto ">
       
          <div className="text-center">
            <h3>Slideshub</h3>
            <p>&copy; {new Date().getFullYear()} Slideshub. All rights reserved.</p>
          </div>
        
      </footer>

        </>
    )
}
