"use client";

import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  HelpCircle,
  Users,
  Zap,
  Shield,
  CheckCircle2,
  XCircle
} from "lucide-react";

export default function ContactPage() {
  type FormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  type FormErrors = {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate form submission
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours",
      details: "support@droply.com",
      link: "mailto:support@droply.com",
      buttonText: "Send Email"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      details: "Available 9AM-6PM PST",
      link: "#chat",
      buttonText: "Start Chat"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      description: "Speak directly with our support team",
      details: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      buttonText: "Call Now"
    }
  ];

  const faqs = [
    {
      question: "How secure is my data with Droply?",
      answer: "We use industry-standard 256-bit encryption and comply with global security standards to ensure your data remains protected."
    },
    {
      question: "What file types can I store?",
      answer: "Droply supports all common file types including images, documents, videos, and more. There are no restrictions on file types."
    },
    {
      question: "How do I upgrade my storage plan?",
      answer: "You can upgrade your plan anytime from your account dashboard. Changes take effect immediately."
    },
    {
      question: "Is there a file size limit?",
      answer: "Premium accounts can upload files up to 10GB. Free accounts have a 2GB file size limit."
    }
  ];

  const teamContacts = [
    {
      department: "Technical Support",
      email: "support@droply.com",
      response: "Within 24 hours"
    },
    {
      department: "Sales Inquiries",
      email: "sales@droply.com",
      response: "Within 2 business hours"
    },
    {
      department: "Partnerships",
      email: "partnerships@droply.com",
      response: "Within 48 hours"
    },
    {
      department: "Security Reports",
      email: "security@droply.com",
      response: "Within 4 hours"
    }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Get in <span className="text-blue-600 dark:text-blue-400">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            We're here to help you get the most out of Droply. Reach out to our team for support, questions, or feedback.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How Can We Help You?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the most convenient way to get in touch with our team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 dark:text-blue-400">
                    {method.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                  {method.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">
                  {method.description}
                </p>
                <p className="text-gray-700 dark:text-gray-300 font-medium mb-6 text-center">
                  {method.details}
                </p>
                <a
                  href={method.link}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 text-center"
                >
                  {method.buttonText}
                </a>
              </div>
            ))}
          </div>

          {/* Contact Form and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Send us a Message
              </h3>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="What is this regarding?"
                    />
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="How can we help you?"
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    Send Message
                    <Send className="h-4 w-4 ml-2" />
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  Office Location
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  123 Cloud Street
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  San Francisco, CA 94107
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Support Hours
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM PST
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <strong>Weekends:</strong> 10:00 AM - 4:00 PM PST
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  Department Contacts
                </h3>
                <div className="space-y-4">
                  {teamContacts.map((contact, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                      <h4 className="font-medium text-gray-900 dark:text-white">{contact.department}</h4>
                      <p className="text-blue-600 dark:text-blue-400 text-sm">{contact.email}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">Response: {contact.response}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
              <HelpCircle className="h-8 w-8 mr-3 text-blue-600" />
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Quick answers to common questions about Droply
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Still have questions? We're here to help!
            </p>
            <a
              href="mailto:support@droply.com"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300"
            >
              Contact Support
              <Mail className="h-4 w-4 ml-2" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}  