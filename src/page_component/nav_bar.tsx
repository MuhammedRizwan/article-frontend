import { useState } from "react";
import { User, Menu, X } from "lucide-react"; // Import the X icon for the close button
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="border-b">
      <nav className="max-w-screen-2xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <Link to="/home" className="block">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">L</span>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center justify-center space-x-8 absolute left-1/2 -translate-x-1/2">
          <Link 
            to="/home" 
            className="text-sm font-medium hover:text-primary"
          >
            Home
          </Link>
          <Link 
            to="/my-article" 
            className="text-sm font-medium hover:text-primary"
          >
            My Articles
          </Link>
          <Link 
            to="/categories" 
            className="text-sm font-medium hover:text-primary"
          >
            Categories
          </Link>
        </div>

        {/* Right - User Profile & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() =>navigate('/profile')}
          >
            <User className="h-5 w-5" />
            <span className="sr-only">User profile</span>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu} 
          >
            {menuOpen ? (
              <X className="h-5 w-5" /> 
            ) : (
              <Menu className="h-5 w-5" /> 
            )}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {menuOpen && ( 
        <div className="md:hidden border-t">
          <nav className="flex flex-col py-2">
            <Link 
              to="/" 
              className="px-4 py-2 text-sm hover:bg-accent"
              onClick={() => setMenuOpen(false)} 
            >
              Home
            </Link>
            <Link 
              to="/pages" 
              className="px-4 py-2 text-sm hover:bg-accent"
              onClick={() => setMenuOpen(false)} 
            >
              Pages
            </Link>
            <Link 
              to="/settings" 
              className="px-4 py-2 text-sm hover:bg-accent"
              onClick={() => setMenuOpen(false)} 
            >
              Settings
            </Link>
            <button 
              className="flex items-center px-4 py-2 text-sm hover:bg-accent"
              onClick={() => setMenuOpen(false)}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
