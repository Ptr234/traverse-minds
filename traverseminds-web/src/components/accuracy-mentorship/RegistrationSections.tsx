"use client";

import { useState } from "react";
import { StudentRegistrationForm } from "./StudentRegistrationForm";
import { SchoolRegistrationForm } from "./SchoolRegistrationForm";
import { TextReveal } from "@/components/ui/TextReveal";
import { SectionReveal, RevealItem } from "@/components/ui/SectionReveal";
import { Users, Building2 } from "lucide-react";

export function RegistrationSections() {
  const [activeTab, setActiveTab] = useState<"student" | "school">("student");

  return (
    <section
      style={{
        background: "#ffffff",
        borderTop: "1px solid rgba(0,0,0,0.3)",
        paddingTop: 56,
        paddingBottom: 56,
      }}
      className="relative overflow-hidden"
    >
      <div className="container-max relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p
            className="eyebrow"
            style={{ color: "#ff4c00", marginBottom: 16 }}
          >
            GET STARTED
          </p>

          <TextReveal
            as="h2"
            variant="blur-in"
            className="font-display text-4xl md:text-5xl font-bold mb-6"
            style={{ color: "#000" }}
          >
            Join the Program
          </TextReveal>

          <TextReveal
            as="p"
            variant="fade-up"
            delay={0.2}
            className="text-lg"
            style={{ color: "#515459" }}
          >
            Whether you're a young person ready to commit to your own growth or an institution wanting to support this work, we have a place for you.
          </TextReveal>
        </div>

        {/* Info Cards */}
        <SectionReveal variant="fade-up" staggerChildren={0.1} className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <RevealItem variant="scale-fade">
            <div className="bg-white p-8 border" style={{ borderColor: "rgba(0,0,0,0.1)", borderRadius: 8 }}>
              <div className="h-10 w-10 flex items-center justify-center mb-4" style={{ background: "#ff4c00", borderRadius: 4 }}>
                <Users className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-display text-lg font-bold mb-2" style={{ color: "#000" }}>
                For Students
              </h4>
              <p className="text-sm mb-4" style={{ color: "#515459" }}>
                Ages 14–25, ready to commit to a disciplined formation journey.
              </p>
              <ul className="space-y-2 text-xs" style={{ color: "#515459" }}>
                <li>10-week programs (Foundation & Execution)</li>
                <li>Cohort-based learning with peer mentors</li>
                <li>Personal accountability partnerships</li>
                <li>Certificate of completion</li>
              </ul>
            </div>
          </RevealItem>

          <RevealItem variant="scale-fade">
            <div className="bg-white p-8 border" style={{ borderColor: "rgba(0,0,0,0.1)", borderRadius: 8 }}>
              <div className="h-10 w-10 flex items-center justify-center mb-4" style={{ background: "#ff4c00", borderRadius: 4 }}>
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-display text-lg font-bold mb-2" style={{ color: "#000" }}>
                For Schools
              </h4>
              <p className="text-sm mb-4" style={{ color: "#515459" }}>
                Bring this program to your students and support their formation.
              </p>
              <ul className="space-y-2 text-xs" style={{ color: "#515459" }}>
                <li>Customizable cohort sizes</li>
                <li>Mentor training & support</li>
                <li>School-branded implementation</li>
                <li>Impact tracking & reporting</li>
              </ul>
            </div>
          </RevealItem>
        </SectionReveal>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("student")}
            style={{
              background: activeTab === "student" ? "#313439" : "#f0f1f4",
              color: activeTab === "student" ? "#ffffff" : "#515459",
              borderRadius: 4,
              transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)"
            }}
            className="flex items-center gap-2 px-6 py-3 font-semibold"
          >
            <Users className="h-5 w-5" />
            Student Registration
          </button>
          <button
            onClick={() => setActiveTab("school")}
            style={{
              background: activeTab === "school" ? "#313439" : "#f0f1f4",
              color: activeTab === "school" ? "#ffffff" : "#515459",
              borderRadius: 4,
              transition: "all 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)"
            }}
            className="flex items-center gap-2 px-6 py-3 font-semibold"
          >
            <Building2 className="h-5 w-5" />
            School Registration
          </button>
        </div>

        {/* Registration Forms */}
        <div className="max-w-2xl mx-auto">
          <SectionReveal variant="fade-up">
            {activeTab === "student" ? (
              <div>
                <h3 className="font-display text-2xl font-bold mb-2" style={{ color: "#000" }}>
                  Apply as a Student
                </h3>
                <p className="mb-8" style={{ color: "#515459" }}>
                  Complete this form to apply for the Accuracy Mentorship Program. We're looking for young people ready to commit to genuine growth and transformation.
                </p>
                <StudentRegistrationForm />
              </div>
            ) : (
              <div>
                <h3 className="font-display text-2xl font-bold mb-2" style={{ color: "#000" }}>
                  Register Your School
                </h3>
                <p className="mb-8" style={{ color: "#515459" }}>
                  Schools and institutions can partner with us to bring the program to their students. Tell us about your interest and how you'd like to participate.
                </p>
                <SchoolRegistrationForm />
              </div>
            )}
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
