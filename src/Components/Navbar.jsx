import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-zinc-200 text-white">
        <nav className="max-w-2xl bg-black mx-auto flex justify-between items-center">
            <div>
                <Link to="/">
                    <img 
                        src="data:image/png;base64,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"
                        alt="instagram logo" 
                        className="w-24 h-12"
                    />
                </Link>
            </div>
            <div>
                <ul className="flex gap-8">
                    <li className="cursor-pointer">
                        Sign In
                    </li>
                    <li className="cursor-pointer">
                        Sign Up
                    </li>
                </ul>
            </div> 
        </nav>
    </div>
    
  )
}

export default Navbar