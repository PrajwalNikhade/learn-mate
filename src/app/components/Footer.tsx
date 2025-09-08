import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm text-gray-600 dark:text-gray-300">© 2024 LearnMate. All rights reserved.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/about" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
            About
          </Link>
          <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
            Contact
          </Link>
          <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
            Terms of Service
          </Link>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <GithubIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <TwitterIcon className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

function GithubIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    )
}

function TwitterIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.4 3.3 4.4s-1.4 1.4-3.3 1.4c0 .1 0 .2 0 .3 0 2.8-2.2 5.1-5 5.1-2.8 0-5-2.3-5-5.1 0-.1 0-.2 0-.3-1.9 0-3.3-1.4-3.3-1.4s1.7-3 3.3-4.4c-1.3-1.3-2-3.4-2-3.4s2.1.7 3.4 2C10.7 7.1 12.9 7 15 7.1c1.3-1.3 3.4-2 3.4-2z" />
      </svg>
    )
}