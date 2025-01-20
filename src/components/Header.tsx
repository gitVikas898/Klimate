import { Link } from "react-router-dom"
import { useTheme } from "./context/theme-provider"
import { Button } from "./ui/button";

const Header = () => {
    const{theme,setTheme} = useTheme();
    const isDark = theme === "dark";
  return (
   <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link to={"/"}>
                <img src={ isDark ? "/logo.png" : "/logo2.png"} alt="klimate-logo" className="h-14" />
            </Link>

            <div>
            {/**Search Bar */}
            {/**Theme */}
            <div>
                <Button variant={"outline"} onClick={()=>setTheme(isDark?"light":"dark")}>Toggle</Button>
            </div>
        </div>
        </div>
        
   </header>
  )
}

export default Header