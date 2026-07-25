"use client";

import { useState } from "react";
import { TeamMember, uploadUrl } from "@/lib/api";

export function TeamMemberSocials({ member, className = "leader-socials" }: { member: TeamMember; className?: string }) {
  const links = [
    member.linkedinUrl ? { href: member.linkedinUrl, label: "in" } : null,
    member.twitterUrl ? { href: member.twitterUrl, label: "𝕏" } : null,
    member.email ? { href: `mailto:${member.email}`, label: "✉" } : null,
  ].filter(Boolean) as { href: string; label: string }[];

  if (!links.length) return null;

  return (
    <div className={className}>
      {links.map((link) => (
        <a
          key={link.href}
          className={className.includes("team") ? "team-social" : "leader-social"}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export function TeamAvatar({
  member,
  className,
  style,
}: {
  member: TeamMember;
  className: string;
  style?: React.CSSProperties;
}) {
  const [failed, setFailed] = useState(false);
  const src = member.photoUrl ? uploadUrl(member.photoUrl) : "";

  if (src && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={member.name}
        className={className}
        style={{ ...style, objectFit: "cover" }}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className={className} style={style} aria-label={member.name}>
      {member.initials || member.name.slice(0, 2).toUpperCase()}
    </div>
  );
}
