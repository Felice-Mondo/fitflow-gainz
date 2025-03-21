
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">FitTrack</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="#features" className="text-foreground/80 hover:text-foreground transition-colors">
              Features
            </Link>
            <Link to="#pricing" className="text-foreground/80 hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link to="#about" className="text-foreground/80 hover:text-foreground transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Link to="/login">Login</Link>
            </Button>
            <Button size="sm">
              <Link to="/onboarding">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-foreground"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open menu</span>
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="#features"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
              onClick={toggleMobileMenu}
            >
              Features
            </Link>
            <Link
              to="#pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
              onClick={toggleMobileMenu}
            >
              Pricing
            </Link>
            <Link
              to="#about"
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-muted">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <Button variant="outline" className="w-full mb-2">
                  <Link to="/login" onClick={toggleMobileMenu}>
                    Login
                  </Link>
                </Button>
                <Button className="w-full">
                  <Link to="/onboarding" onClick={toggleMobileMenu}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
