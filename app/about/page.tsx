import React from "react";
import { Shield, Zap, Users, Heart, Award, Globe } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former cloud infrastructure lead with 10+ years in enterprise storage solutions.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Security expert specializing in encryption and distributed systems.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Elena Rodriguez",
      role: "Product Lead",
      bio: "User experience designer focused on creating intuitive workflows.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "David Kim",
      role: "Engineering Manager",
      bio: "Full-stack developer with passion for scalable architecture.",
      image: "/api/placeholder/200/200"
    }
  ];

  const stats = [
    { value: "10M+", label: "Files stored daily" },
    { value: "99.9%", label: "Uptime guarantee" },
    { value: "150+", label: "Countries served" },
    { value: "256-bit", label: "Encryption standard" }
  ];

  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security First",
      description: "We implement industry-leading security measures to protect your data with end-to-end encryption."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Performance",
      description: "Our globally distributed CDN ensures lightning-fast uploads and downloads from anywhere in the world."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "User-Centric",
      description: "We prioritize intuitive design and workflows that make file management effortless for everyone."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Sustainability",
      description: "Our carbon-neutral data centers help reduce environmental impact while delivering reliable service."
    }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            About <span className="text-blue-600 dark:text-blue-400">Droply</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing cloud storage with security, speed, and simplicity at our core.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                At Droply, we're on a mission to transform how individuals and businesses manage their digital assets. 
                We believe that file storage should be effortless, secure, and accessible to everyone—without compromising on performance or privacy.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Founded in 2020, our team of industry experts has built a platform that combines enterprise-grade security 
                with consumer-friendly simplicity, serving millions of users worldwide.
              </p>
              <div className="flex items-center gap-4 mt-8">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Award className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                  ISO 27001 Certified
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Heart className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Carbon Neutral
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why Choose Droply?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-white/20 p-1 rounded mr-3 mt-1">
                    <Zap className="h-4 w-4" />
                  </div>
                  <span>Global CDN for lightning-fast transfers</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white/20 p-1 rounded mr-3 mt-1">
                    <Shield className="h-4 w-4" />
                  </div>
                  <span>End-to-end encryption for maximum security</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white/20 p-1 rounded mr-3 mt-1">
                    <Users className="h-4 w-4" />
                  </div>
                  <span>Collaboration tools for teams of all sizes</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white/20 p-1 rounded mr-3 mt-1">
                    <Globe className="h-4 w-4" />
                  </div>
                  <span>Sustainable infrastructure with carbon-neutral data centers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            By The Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 dark:text-blue-400">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Our Team
          </h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16">
            Meet the passionate experts behind Droply's innovative platform
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-xl p-6 text-center shadow-sm">
                <div className="w-24 h-24 mx-auto bg-gray-200 dark:bg-gray-600 rounded-full mb-4 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to experience the future of file storage?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join millions of users who trust Droply with their important files and data.
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full transition-colors duration-300">
            Get Started Today
          </button>
        </div>
      </section>
    </main>
  );
}