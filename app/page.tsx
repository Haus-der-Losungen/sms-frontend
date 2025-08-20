"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";

import {
  Users,
  BookOpen,
  Award,
  Facebook,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";

export default function LandingPage() {
  const carouselData = [
    {
      src: "/carousel1.png",
      alt: "Students group photo",
      title: "Fidif School Complex:",
      subtitle: "Inspiring Excellence.",
    },
    {
      src: "/carousel2.png",
      alt: "Classroom activity",
      title: "Grooming",
      subtitle: "Transformational leaders",
    },
    {
      src: "/carousel3.png",
      alt: "School event",
      title: "The Road to Success",
      subtitle: "Begins Here!",
    },
    {
      src: "/carousel4.png",
      alt: "School event",
      title: "Education with",
      subtitle: "Heart, Vision, and Results.",
    },
  ];

  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      <Navbar />

      {/* Carousel Section */}
      <section className="w-full relative overflow-hidden bg-white pt-20">
      <div className="w-full h-[50vh] sm:h-[60vh] md:h-[500px] relative overflow-hidden">
  {carouselData.map((item, i) => (
    <div
      key={i}
      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
        i === index ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Image as background layer */}
      <img
        src={item.src}
        alt={item.alt}
        className="w-full h-full object-cover"
      />

      {/* Dark overlay (always on top of image, fades together) */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Text content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h2 className="text-md md:text-2xl font-bold">{item.title}</h2>
        <p className="text-2xl md:text-5xl font-bold text-white bg-[#560015] py-2 rounded px-6 bg-opacity-80 mt-2">
          {item.subtitle}
        </p>
      </div>
    </div>
  ))}

  {/* Arrows */}
  <button
    onClick={prevSlide}
    className="absolute left-4 top-1/2 bg-[#560015] bg-opacity-80 transform -translate-y-1/2 text-white p-2 rounded-full z-30"
  >
    <ChevronLeft className="h-6 w-6" />
  </button>
  <button
    onClick={nextSlide}
    className="absolute right-4 top-1/2 bg-[#560015] bg-opacity-80 transform -translate-y-1/2 text-white p-2 rounded-full z-30"
  >
    <ChevronRight className="h-6 w-6" />
  </button>
</div>


      </section>

      {/* Value Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 w-full min-h-[300px]">


        {[{
          icon: <BookOpen className="h-10 w-10 text-white mb-2" />,
          title: "Spiritual Development",
          bg: "/value1.png"
        }, {
          icon: <Award className="h-10 w-10 text-white mb-2" />,
          title: "Academic Excellence",
          bg: "/value2.png"
        }, {
          icon: <Users className="h-10 w-10 text-white mb-2" />,
          title: "Socialization",
          bg: "/value1.png"
        }].map((card, idx) => (
          <div
            key={idx}
            className="relative text-center bg-cover bg-center text-white min-h-[300px]"
            style={{ backgroundImage: `url('${card.bg}')` }}
          >
            <div className="absolute inset-0 bg-[#800020]/50" />
            <div className="relative flex flex-col items-center justify-center h-full p-8">
              {card.icon}
              <h4 className="font-semibold text-2xl">{card.title}</h4>
            </div>
          </div>
        ))}
      </section>

      {/* Who Are We Section */}
      <section className="p-8 md:mt-20 max-w-3xl mx-auto text-black space-y-12 text-left">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Who Are We?</h2>
          <p className="text-base md:text-lg mb-4">
            Established in 2011, our school has consistently provided quality education and values-based learning.
          </p>
          <p className="text-base md:text-lg">
            We have proudly graduated students who are excelling in academics, leadership, and various professional fields, reflecting the strength of our teaching and community support.
          </p>
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Know Our Numbers.</h2>
          <p className="text-base md:text-lg mb-4">
            With over 450 students currently enrolled across all levels from crèche to Junior High School our institution has made a lasting academic impact in the Teiman-Abokobi community for more than 10 years.
          </p>
          <p className="text-base md:text-lg mb-4">
            We are proud to be staffed entirely by experienced, GES-certified educators who are committed to delivering quality education and nurturing the holistic development of every child entrusted to our care.
          </p>
          <div className="mt-4">
            <Link href="/about">
              <Button className="bg-[#800020] text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-[#5e0018]">Find Out More</Button>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Student Management Portal</h2>
          <p className="text-base md:text-lg mb-4">
            Our all-in-one School Management System simplifies Fidif School Complex’s administration. From attendance tracking and academic records to transcripts and real-time access to student and staff data, everything is just a click away.
          </p>
          <p className="text-base md:text-lg mb-4">
            Built for efficiency, transparency, and growth so teachers can teach, students can thrive, and parents stay connected.
          </p>
          <div className="mt-4">
            <Link href="/login">
              <Button className="bg-[#800020] text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-[#5e0018]">Find Out More</Button>
            </Link>
          </div>
        </div>
      </section>

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
  );
}