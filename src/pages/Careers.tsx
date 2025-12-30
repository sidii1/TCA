import { useState } from "react";
import { ArrowRight, Mail, User, Briefcase, Phone } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { NeumorphicButton } from "@/components/ui/neumorphic-button";
import { NeumorphicCard } from "@/components/ui/neumorphic-card";
import { AnimatedHeading, AnimatedText } from "@/components/ui/animated-text";
import { number } from "framer-motion";

/* ---------------- TYPES ---------------- */

type CareerFormData = {
  name: string;
  email: string;
  contact: string;
  role: string;
  experience: string;
  message: string;
};

/* ---------------- PAGE ---------------- */

const Careers = () => {
  const [form, setForm] = useState<CareerFormData>({
    name: "",
    email: "",
    contact: "",
    role: "",
    experience: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "careerApplications"), {
        ...form,
        createdAt: serverTimestamp(),
      });

      alert(
        "✅ Application submitted successfully!\n\nOur team will review your profile and contact you soon.\n\n📧 theconsistentacademy@gmail.com"
      );

      setForm({
        name: "",
        email: "",
        contact: "",
        role: "",
        experience: "",
        message: "",
      });
    } catch (error) {
      console.error("Career form error:", error);
      alert("❌ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <SectionWrapper className="pt-32">
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedText className="text-primary uppercase text-sm mb-3">
            Careers
          </AnimatedText>

          <AnimatedHeading>
            Join <span className="text-gradient">The Consistent Academy</span>
          </AnimatedHeading>

          <AnimatedText className="text-muted-foreground text-lg mt-6">
            We’re always looking for passionate educators and mentors who believe
            in consistent growth and meaningful learning.
          </AnimatedText>
        </div>
      </SectionWrapper>

      {/* ROLES */}
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            "IELTS Trainer",
            "Spoken English Mentor",
            "Teaching Assistant",
            "Writing Skills Coach",
            "Corporate Communication Trainer",
          ].map((role) => (
            <NeumorphicCard key={role} className="text-center p-6">
              <Briefcase className="mx-auto text-primary mb-3" />
              <h3 className="font-semibold text-lg">{role}</h3>
              <p className="text-muted-foreground text-sm mt-2">
                Part-time / Full-time opportunities available
              </p>
            </NeumorphicCard>
          ))}
        </div>
      </SectionWrapper>

      {/* FORM */}
      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          <NeumorphicCard className="p-10">
            <div className="text-center mb-8">
              <AnimatedHeading>Apply Now</AnimatedHeading>
              <AnimatedText className="text-muted-foreground mt-3">
                Your application will be securely stored and reviewed by our
                team.
              </AnimatedText>

              <p className="mt-4 text-sm text-primary flex justify-center items-center gap-2">
                <Mail size={16} />
                theconsistentacademy@gmail.com
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-muted-foreground" size={18} />
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-background shadow-neu-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-muted-foreground" size={18} />
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-background shadow-neu-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Contact No */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Contact Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-muted-foreground" size={18} />
                  <input
                    type="number"
                    name="contact"
                    required
                    value={form.contact}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-background shadow-neu-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Applying For
                </label>
                <select
                  name="role"
                  required
                  value={form.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background shadow-neu-sm focus:outline-none"
                >
                  <option value="">Select a role</option>
                  <option>IELTS Trainer</option>
                  <option>Spoken English Mentor</option>
                  <option>Teaching Assistant</option>
                  <option>Writing Skills Coach</option>
                  <option>Corporate Communication Trainer</option>
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Years of Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background shadow-neu-sm focus:outline-none"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Brief Introduction
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-background shadow-neu-sm focus:outline-none"
                />
              </div>

              {/* Submit */}
              <div className="pt-4 text-center">
                <NeumorphicButton type="submit" size="lg" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Application"}
                  <ArrowRight size={18} />
                </NeumorphicButton>
              </div>
            </form>
          </NeumorphicCard>
        </div>
      </SectionWrapper>

      <Footer />
    </div>
  );
};

export default Careers;
