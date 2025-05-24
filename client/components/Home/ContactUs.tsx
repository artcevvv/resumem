'use client'

import React, { useState } from 'react';
import Container from '../Global/Container';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactUs() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-gray-100">
            <Container>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-4">
                            Get in Touch
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Have questions or feedback? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                    Contact Information
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <Mail className="w-6 h-6 text-indigo-500" />
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-sm font-medium text-gray-900">Email</h4>
                                            <p className="mt-1 text-gray-600">support@resumem.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <Phone className="w-6 h-6 text-indigo-500" />
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-sm font-medium text-gray-900">Phone</h4>
                                            <p className="mt-1 text-gray-600">+1 (555) 123-4567</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <MapPin className="w-6 h-6 text-indigo-500" />
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="text-sm font-medium text-gray-900">Location</h4>
                                            <p className="mt-1 text-gray-600">San Francisco, CA</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-indigo-50 rounded-2xl p-8">
                                <h3 className="text-xl font-semibold text-indigo-900 mb-4">
                                    Business Hours
                                </h3>
                                <div className="space-y-2">
                                    <p className="text-indigo-700">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                    <p className="text-indigo-700">Saturday: 10:00 AM - 4:00 PM</p>
                                    <p className="text-indigo-700">Sunday: Closed</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">
                                Send us a Message
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        placeholder="How can we help?"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        placeholder="Your message here..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-5 h-5 mr-2" />
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>

                                {submitStatus === 'success' && (
                                    <p className="text-green-600 text-sm text-center">
                                        Thank you for your message! We&apos;ll get back to you soon.
                                    </p>
                                )}
                                {submitStatus === 'error' && (
                                    <p className="text-red-600 text-sm text-center">
                                        Something went wrong. Please try again later.
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
} 