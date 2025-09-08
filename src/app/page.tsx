import Link from 'next/link';
import Home_Page from './components/Home_Page';
import Features from './components/Features';
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
    
      <main className="flex-1">
        <Home_Page />
        <Features/>
      </main>
    
    </div>
  );
}


