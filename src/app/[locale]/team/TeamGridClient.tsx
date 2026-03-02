"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { staggerContainer, fadeUp } from "@/lib/animations";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photoUrl: string | null;
  linkedinUrl: string | null;
};

type Props = {
  members: TeamMember[];
  viewLinkedInLabel: string;
};

function LinkedInIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function TeamGridClient({ members, viewLinkedInLabel }: Props) {
  if (members.length === 0) {
    return null;
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {members.map((member, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          className="bg-[#0a2540] border border-white/10 rounded-2xl p-6 text-center"
        >
          {/* Photo */}
          {member.photoUrl ? (
            <Image
              src={member.photoUrl}
              alt={member.name}
              width={96}
              height={96}
              className="rounded-full mx-auto mb-4 object-cover w-24 h-24"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-white/10 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white/40">
              {member.name.charAt(0)}
            </div>
          )}

          {/* Name */}
          <h3 className="font-bold text-white text-lg">{member.name}</h3>

          {/* Role */}
          <p className="text-white/60 text-sm mt-1">{member.role}</p>

          {/* Bio */}
          {member.bio && (
            <p className="text-sm text-white/50 mt-3 leading-relaxed">
              {member.bio}
            </p>
          )}

          {/* LinkedIn */}
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-white/60 hover:text-white transition-colors"
            >
              <LinkedInIcon />
              <span>{viewLinkedInLabel}</span>
            </a>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
