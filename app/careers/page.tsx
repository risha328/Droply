import React from "react";
import { 
  Zap, 
  Shield, 
  Users, 
  Heart, 
  Globe, 
  Award, 
  Clock, 
  DollarSign, 
  Home,
  Calendar,
  MapPin,
  BookOpen,
  Send
} from "lucide-react";

export default function CareersPage() {
  // Open positions data
  const openPositions = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      type: "Full-time",
      location: "Remote",
      experience: "5+ years",
      description: "Build intuitive user interfaces for our cloud storage platform using React and Next.js."
    },
    {
      id: 2,
      title: "DevOps Engineer",
      department: "Engineering",
      type: "Full-time",
      location: "Hybrid",
      experience: "4+ years",
      description: "Manage our cloud infrastructure and ensure high availability and scalability."
    },
    {
      id: 3,
      title: "Product Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote",
      experience: "3+ years",
      description: "Create exceptional user experiences for our file management platform."
    },
    {
      id: 4,
      title: "Security Specialist",
      department: "Security",
      type: "Full-time",
      location: "On-site",
      experience: "4+ years",
      description: "Implement and maintain security protocols to protect user data."
    },
    {
      id: 5,
      title: "Technical Support Engineer",
      department: "Customer Success",
      type: "Full-time",
      location: "Remote",
      experience: "2+ years",
      description: "Help customers get the most out of Droply's features and services."
    }
  ];

  // Benefits data
  const benefits = [
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Competitive Salary",
      description: "Industry-leading compensation packages with equity options"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Flexible Hours",
      description: "Work when you're most productive with flexible scheduling"
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: "Remote Work",
      description: "Work from anywhere with our distributed team model"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Learning Budget",
      description: "Annual stipend for professional development and courses"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Career Growth",
      description: "Clear promotion paths and mentorship opportunities"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    }
  ];

  // Values data
  const values = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Innovation",
      description: "We embrace new ideas and push the boundaries of what's possible"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trust",
      description: "We build products that users can trust with their most important files"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Collaboration",
      description: "We believe great things happen when diverse minds work together"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Impact",
      description: "We're committed to making a positive difference in the world"
    }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Build the Future of <span className="text-blue-600 dark:text-blue-400">Cloud Storage</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Join our mission to create the most secure, intuitive, and powerful file management platform
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300">
              View Open Positions
            </button>
            <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium py-3 px-8 rounded-full transition-colors duration-300">
              Learn About Our Culture
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-400">Team Members</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">15+</div>
              <div className="text-gray-600 dark:text-gray-400">Countries</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">10M+</div>
              <div className="text-gray-600 dark:text-gray-400">Users Served</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-400">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join our team of passionate professionals building the next generation of cloud storage
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {openPositions.map((position) => (
              <div key={position.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {position.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {position.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-1" />
                        {position.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        {position.type}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Award className="h-4 w-4 mr-1" />
                        {position.experience}
                      </div>
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Don't see your perfect role? We're always interested in meeting talented people.
            </p>
            <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium py-3 px-8 rounded-full transition-colors duration-300">
              Send Open Application
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Join Droply?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We invest in our team's success with comprehensive benefits and a supportive culture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 dark:text-blue-400">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do at Droply
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 dark:text-blue-400 flex-shrink-0">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build the Future with Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our team of innovators and help shape the future of cloud storage
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-full transition-colors duration-300 flex items-center">
              View Open Positions
              <Send className="h-4 w-4 ml-2" />
            </button>
            <button className="border border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-full transition-colors duration-300">
              Learn More About Our Culture
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}