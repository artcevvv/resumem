'use client'

import React from 'react';
import Container from '@/components/Global/Container';
import ContactUs from '@/components/Home/ContactUs';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
            {/* Hero Section */}
            <div className="bg-indigo-600 text-white">
                <Container>
                    <div className="py-16 md:py-24">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Contact Us
                            </h1>
                            <p className="text-lg md:text-xl text-indigo-100 mb-8">
                                We&apos;re here to help you create the perfect resume. Get in touch with our team for any questions or support.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/dashboard/new"
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                >
                                    Create Resume
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                                <Link
                                    href="/templates"
                                    className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-xl text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                >
                                    View Templates
                                </Link>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* FAQ Section */}
            <Container>
                <div className="py-16">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-8">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    How do I get started?
                                </h3>
                                <p className="text-gray-600">
                                    Simply sign up for an account, choose a template, and start creating your resume. Our intuitive interface will guide you through the process.
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Can I customize my resume template?
                                </h3>
                                <p className="text-gray-600">
                                    Yes! All our templates are fully customizable. You can adjust colors, fonts, layouts, and more to match your personal style.
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    How do I download my resume?
                                </h3>
                                <p className="text-gray-600">
                                    Once you&apos;ve completed your resume, you can download it in PDF format with a single click. Premium users can also export to other formats.
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    Is my data secure?
                                </h3>
                                <p className="text-gray-600">
                                    Absolutely. We take data security seriously. Your information is encrypted and stored securely. You can delete your data at any time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Contact Form Section */}
            <ContactUs />

            {/* CTA Section */}
            <div className="bg-indigo-50">
                <Container>
                    <div className="py-16 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Ready to Create Your Professional Resume?
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                            Join thousands of professionals who have already created their resumes with ResumeM.
                        </p>
                        <Link
                            href="/dashboard/new"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            Get Started Now
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </Container>
            </div>
        </div>
    );
} 