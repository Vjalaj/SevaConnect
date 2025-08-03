
import Link from 'next/link';
import { HandHeart, Info } from 'lucide-react'; 
import ThemeToggle from './ThemeToggle';
import InfoDialog from './InfoDialog';
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
          <nav className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Link href="/gallery" className="hover:text-accent transition-colors">Gallery</Link>
              <InfoDialog />
            </div>
            <Link href="/admin" className="hover:text-accent transition-colors text-sm">Admin</Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
