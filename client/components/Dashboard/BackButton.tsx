import Link from 'next/link';

export default function BackButton() {
  return (
    <div className="absolute top-[90px] left-4 z-10">
      <Link
        href="/dashboard"
        className="inline-flex items-center px-3 py-2 border border-gray-600 rounded-md text-text hover:bg-background/80"
      >
        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </Link>
    </div>
  );
}
