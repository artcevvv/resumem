'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getToken } from '../config/api';

interface Resume {
  id: number;
  fullname: string;
  email: string;
  phone_number: string;
  summary: string;
  created_at: string;
}

export default function DashboardPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = getToken();
        const response = await fetch('http://localhost:8080/resumes', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch resumes');
        }

        const data = await response.json();
        setResumes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">My Resumes</h3>
        <Link
          href="/dashboard/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create New Resume
        </Link>
      </div>
      <ul className="divide-y divide-gray-200">
        {resumes.map((resume) => (
          <li key={resume.id}>
            <Link href={`/dashboard/resumes/${resume.id}`} className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">{resume.fullname}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {new Date(resume.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {resume.email}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      {resume.phone_number}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 line-clamp-2">{resume.summary}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
        {resumes.length === 0 && (
          <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
            No resumes found. Create your first resume!
          </li>
        )}
      </ul>
    </div>
  );
} 