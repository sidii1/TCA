import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Users,
  Trophy,
  Target,
  Heart,
  Lightbulb,
} from "lucide-react";

import { NeumorphicButton } from "@/components/ui/neumorphic-button";
import { NeumorphicCard } from "@/components/ui/neumorphic-card";
import { FloatingBlob } from "@/components/ui/floating-blob";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { AnimatedHeading, AnimatedText } from "@/components/ui/animated-text";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import Founder from "./Founder";
import Testimonials from "./Testimonials";

/* ---------------- DATA ---------------- */

const stats = [
  { icon: Users, value: "1500+", label: "Students Trained" },
  { icon: BookOpen, value: "6+", label: "Expert Courses" },
  { icon: Trophy, value: "95%", label: "Success Rate" },
];

const courses = [
  { title: "IELTS Preparation", description: "Comprehensive training for all four modules", icon: "📚" },
  { title: "Spoken English", description: "Build confidence in everyday communication", icon: "🎯" },
  { title: "Writing Skills", description: "Master academic and professional writing", icon: "✍️" },
  { title: "Grammar Mastery", description: "Strong foundation from basics to advanced", icon: "📖" },
  { title: "Business English", description: "Professional communication for corporate settings", icon: "💼" },
  { title: "Interview Preparation", description: "Ace interviews with confidence", icon: "🎤" },
  { title: "IELTS Writing", description: "Focused training to boost writing band scores", icon: "📝" },
];

const values = [
  { icon: Target, title: "Consistency", description: "Small, consistent steps towards fluency." },
  { icon: Heart, title: "Passion", description: "Dedicated to helping every learner succeed." },
  { icon: Lightbulb, title: "Innovation", description: "Modern methods blended with proven techniques." },
];

const images = [
  "/vidya.png",
  "/v1.png",
  "/classroom.png",
  "/workshop.png",
  "/session.png",
  "/students.png",
];

/* ---------------- PHOTO SLIDESHOW ---------------- */

const PhotoSlideshow = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-6 overflow-hidden">
      {images.map((src, index) => {
        const isActive = index === active;
        return (
          <motion.div
            key={index}
            onClick={() => setActive(index)}
            animate={{ scale: isActive ? 1.15 : 0.85, opacity: isActive ? 1 : 0.5 }}
            transition={{ duration: 0.6 }}
            className={`rounded-3xl overflow-hidden cursor-pointer shadow-neu-xl ${isActive ? "z-10" : ""}`}
            style={{ width: isActive ? 360 : 260, height: 420 }}
          >
            <img src={src} className="w-full h-full object-cover" />
          </motion.div>
        );
      })}
    </div>
  );
};

/* ---------------- COURSES SLIDESHOW ---------------- */

const CoursesSlideshow = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % courses.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center gap-6 overflow-hidden">
      {courses.map((course, index) => {
        const isActive = index === active;

        return (
          <motion.div
            key={index}
            onClick={() => setActive(index)}
            animate={{ scale: isActive ? 1.1 : 0.9, opacity: isActive ? 1 : 0.5 }}
            transition={{ duration: 0.5 }}
            className={`cursor-pointer ${isActive ? "z-10" : ""}`}
          >
            <NeumorphicCard className="w-[300px] text-center p-6">
              <div className="text-4xl mb-4">{course.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-muted-foreground text-sm">{course.description}</p>
            </NeumorphicCard>
          </motion.div>
        );
      })}
    </div>
  );
};

/* ---------------- PAGE ---------------- */

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <FloatingBlob className="top-20 -left-32" size="xl" color="primary" />
        <FloatingBlob className="top-40 right-0" size="lg" color="accent" />

        <div className="container mx-auto text-center">
          <motion.h1 className="text-6xl md:text-8xl font-bold mb-6">
            The <span className="text-gradient">Consistent</span><br />Academy
          </motion.h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Master English with consistent practice and expert guidance.
          </p>

          <Link to="/contact">
            <NeumorphicButton size="lg">
              Enroll Now <ArrowRight />
            </NeumorphicButton>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {stats.map((s, i) => (
              <NeumorphicCard key={i} className="text-center">
                <s.icon className="mx-auto text-primary mb-2" />
                <div className="text-3xl font-bold text-gradient">{s.value}</div>
                <div className="text-muted-foreground">{s.label}</div>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      </section>

      <Founder />

      {/* ABOUT */}
      <SectionWrapper>
        <div className="text-center mb-14">
          <AnimatedText className="text-primary text-sm uppercase">About Us</AnimatedText>
          <AnimatedHeading>
            Building <span className="text-gradient">Confident Speakers</span>
          </AnimatedHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <NeumorphicCard key={i} className="text-center p-8">
              <v.icon className="mx-auto text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{v.title}</h3>
              <p className="text-muted-foreground">{v.description}</p>
            </NeumorphicCard>
          ))}
        </div>
      </SectionWrapper>

      {/* COURSES SLIDESHOW */}
      <SectionWrapper>
        <div className="text-center mb-10">
          <AnimatedText className="text-primary text-sm uppercase">Courses</AnimatedText>
          <AnimatedHeading>
            Learn with <span className="text-gradient">Clarity & Confidence</span>
          </AnimatedHeading>
        </div>

        <CoursesSlideshow />
      </SectionWrapper>

      {/* PHOTOS */}
      <SectionWrapper>
        <div className="text-center mb-10">
          <AnimatedHeading>
            Learning in <span className="text-gradient">Action</span>
          </AnimatedHeading>
        </div>
        <PhotoSlideshow />
      </SectionWrapper>

      <Testimonials />

      <Footer />
    </div>
  );
};

export default Index;
