'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '../../config/api';

interface ResumeFormData {
  fullname: string;
  email: string;
  phone_number: string;
  summary: string;
  links: Array<{ type: string; url: string }>;
  skills: Array<{ type: string; level: string }>;
  educations: Array<{
    school: string;
    degree: string;
    start_date: string;
    end_date: string;
    city: string;
    description: string;
  }>;
  careers: Array<{
    job_title: string;
    employer: string;
    start_date: string;
    end_date: string;
    city: string;
    description: string;
  }>;
  courses: Array<{
    name: string;
    url: string;
    start_date: string;
    end_date: string;
  }>;
}

export default function NewResumePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<ResumeFormData>({
    fullname: '',
    email: '',
    phone_number: '',
    summary: '',
    links: [{ type: '', url: '' }],
    skills: [{ type: '', level: '' }],
    educations: [{
      school: '',
      degree: '',
      start_date: '',
      end_date: '',
      city: '',
      description: '',
    }],
    careers: [{
      job_title: '',
      employer: '',
      start_date: '',
      end_date: '',
      city: '',
      description: '',
    }],
    courses: [{
      name: '',
      url: '',
      start_date: '',
      end_date: '',
    }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = getToken();
      const response = await fetch('http://localhost:8080/api/v1/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create resume');
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                value={formData.fullname}
                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
                Summary
              </label>
              <textarea
                id="summary"
                rows={4}
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            {formData.links.map((link, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor={`link-type-${index}`} className="block text-sm font-medium text-gray-700">
                    Link Type
                  </label>
                  <input
                    type="text"
                    id={`link-type-${index}`}
                    value={link.type}
                    onChange={(e) => {
                      const newLinks = [...formData.links];
                      newLinks[index] = { ...link, type: e.target.value };
                      setFormData({ ...formData, links: newLinks });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor={`link-url-${index}`} className="block text-sm font-medium text-gray-700">
                    URL
                  </label>
                  <input
                    type="url"
                    id={`link-url-${index}`}
                    value={link.url}
                    onChange={(e) => {
                      const newLinks = [...formData.links];
                      newLinks[index] = { ...link, url: e.target.value };
                      setFormData({ ...formData, links: newLinks });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setFormData({ ...formData, links: [...formData.links, { type: '', url: '' }] })}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Link
            </button>
          </div>
        );
      // Add more steps for skills, education, careers, and courses
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Resume</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Fill in your information step by step.</p>
          </div>
          <form onSubmit={handleSubmit} className="mt-5">
            {error && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
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
            )}
            {renderStep()}
            <div className="mt-5 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Previous
                </button>
              )}
              {step < 6 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? 'Creating...' : 'Create Resume'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 