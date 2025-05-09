
import Link from 'next/link';
import { HandHeart } from 'lucide-react'; 
import ThemeToggle from './ThemeToggle';
// import AuthButton from '@/components/auth/AuthButton'; // Removed

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <HandHeart size={32} className="text-accent" />
          <h1 className="text-2xl font-bold tracking-tight">SevaConnect</h1>
        </Link>
        <div className="flex items-center gap-4">
          {/* <nav>
            <Link href="/about" className="hover:text-accent transition-colors">About</Link>
          </nav> */}
          {/* <AuthButton /> Removed */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
