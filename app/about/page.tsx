"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, Heart, Target,  ArrowLeft,Facebook,
  MessageCircle,
  Phone,
  Mail, } from "lucide-react"
  import Navbar from "@/components/Navbar";

export default function AboutPage() {
  const communityImages = [
    "/carousel1.png", 
    "/image 5.png", 
    " /carousel2.png",          
    "/image 2.png",          
    "/image 8.png",     
  ];
  

  const facultyMembers = Array.from({ length: 6 }, (_, i) => ({
    name: `Coming Soon ${i + 1}`,
    title: "Faculty Member",
    image: `https://via.placeholder.com/400x300?text=Coming+Soon+${i + 1}`,
  }));
  
  


  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-red-900 text-white">
  <div
    className="relative bg-cover h-[500px] bg-center bg-no-repeat text-white py-24 sm:py-32 md:py-48 mt-16 flex items-end"
    style={{ backgroundImage: "url('/carousel4.png')" }}
  >
    {/* Black overlay */}
    <div className="absolute inset-0 bg-black opacity-50"></div>

    {/* Text content */}
    <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
      <div className="max-w-3xl text-left">
        <h1 className="text-2xl sm:text-5xl md:text-3xl font-bold mb-4 drop-shadow-lg">
          Learn More
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase bg-[#800020] bg-opacity-80 inline-block px-4 py-2 rounded-md">
          ABOUT US
        </h2>
      </div>
    </div>
  </div>
</section>


<main className="flex-grow">
  {/* Who Are We? Section */}
  <section id="who-are-we" className="py-12 px-4 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="md:w-1/3 text-left md:border-r-4 md:border-[#800020] pr-4">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#800020] leading-none">
            <span className="block">Who</span>
            <span className="block">Are</span>
            <span className="block">We?</span>
          </h2>
        </div>
        <div className="md:w-2/3 pl-4 space-y-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            Founded in 2011, Fidif School Complex is a respected educational institution
            located in Teiman Abokobi, providing quality Pre School, Primary, and Junior
            High School (JHS) education. We are committed to nurturing well-rounded
            students through the Ghana Education Service (GES) curriculum, combining
            academic excellence with strong values.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            With small class sizes and a team of experienced, GES certified teachers,
            Fidif emphasizes both hands-on learning and deep theoretical understanding.
            We focus on developing confident, curious, and capable learners who go on to
            thrive in academics, leadership, and various professional fields.
          </p>
        </div>
      </div>

      <img
        src="/Who.png"
        alt="Students learning together"
        className="w-full h-auto rounded-lg shadow-lg mt-12 mx-auto max-h-[520px] object-cover"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "https://via.placeholder.com/800x450?text=Who+Are+We";
        }}
      />
    </div>
  </section>

  {/* Vision, Mission, Core Values Section */}
  <section className="py-16 px-4 bg-white">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      {[
        {
          title: "Our Vision",
          text: "To provide excellent second-cycle education",
        },
        {
          title: "Our Mission",
          text: "To form holistic and responsible citizens for society through excellent teaching and learning, using state-of-the-art facilities, highly qualified and motivated staff.",
        },
        {
          title: "Our Core Values",
          text: "Commitment, Dedication, Team Work, Integrity, Excellence",
        },
      ].map((item, idx) => (
        <div key={idx} className="p-6 rounded-lg shadow-md bg-white border border-gray-200">
          <h3 className="text-4xl font-semibold text-[#800020] mb-3 underline">{item.title}</h3>
          <p className="text-gray-700">{item.text}</p>
        </div>
      ))}
    </div>
  </section>

  {/* Our Faculty Section */}
  <section className="py-16 px-4 bg-gray-50">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl sm:text-5xl font-bold text-[#800020] text-center mb-10">
        Our Faculty
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {facultyMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center border border-gray-200"
          >
            <img
              src={member.image || "https://via.placeholder.com/400x300?text=Coming+Soon"}
              alt={member.name}
              className="w-24 h-32 rounded-full mb-4 object-cover border-2 border-[#800020]"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://via.placeholder.com/400x300?text=Coming+Soon";
              }}
            />
            <h4 className="text-xl font-semibold text-gray-800">{member.name}</h4>
            <p className="text-[#800020] text-lg">{member.title}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Our Community Section */}
  <section className="py-16 px-4 bg-white">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#800020] mb-6">
        Our Community
      </h2>

      <div className="text-left mb-12">
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          At Fidif School Complex, we foster a respectful and supportive environment
          where teachers, students, and parents work together as one community.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          This strong partnership between home and school builds trust, harmony, and shared responsibility. Together, we create a nurturing space where learners grow with confidence, character, and a sense of belonging.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {communityImages.slice(0, 3).map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc || "https://via.placeholder.com/400x300?text=Coming+Soon"}
            alt={`Community Image ${index + 1}`}
            className="rounded-lg shadow-md w-full h-48 object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://via.placeholder.com/400x300?text=Coming+Soon";
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {communityImages.slice(3).map((imgSrc, index) => (
          <img
            key={index + 3}
            src={imgSrc || "https://via.placeholder.com/400x300?text=Coming+Soon"}
            alt={`Community Image ${index + 4}`}
            className="rounded-lg shadow-md w-full h-48 object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://via.placeholder.com/400x300?text=Coming+Soon";
            }}
          />
        ))}
      </div>
    </div>
  </section>

  {/* Inspiring Excellence */}
  <section className="py-12 px-4 bg-white text-center">
    <div className="max-w-4xl mx-auto">
      <h3 className="text-4xl sm:text-5xl font-extrabold tracking-wide text-[#800020]">
        Inspiring Excellence!!
      </h3>
    </div>
  </section>
</main>



       {/* Footer */}
       <footer className="bg-[#800020] text-white py-12 px-4 mt-16">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <img
                src="/School Logo - Header.png"
                alt="FIDIF School Logo"
                width={60}
                height={60}
                className="py-4"
              />
              <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                FIDIF <span className="font-normal block sm:inline">SCHOOL COMPLEX</span>
              </h2>
            </div>
            <p className="text-sm leading-relaxed max-w-md">
              With a proud history of academic excellence and student success, Fidif School Complex is committed to nurturing minds and shaping futures.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-lg mt-4 mb-4">Useful Links</h5>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li><Link href="/login" className="hover:underline">Portal</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-lg mt-4 mb-4">Socials</h5>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Facebook className="h-4 w-4" />
                <span>Facebook</span>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 " />
                <span>WhatsApp</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-lg mt-4 mb-4">Contact Us</h5>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 " />
                <span>+233000000000</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 " />
                <span>fidifschoolcomplex2011@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs mt-8">
          © 2025 Fidif School Complex. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
