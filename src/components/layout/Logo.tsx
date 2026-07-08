import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "header" | "footer";
  onClick?: () => void;
};

export default function Logo({ variant = "header", onClick }: LogoProps) {
  return (
    <Link
      href="/"
      className={`logo logo-${variant}`}
      prefetch
      onClick={onClick}
      aria-label="ProCareerVista home"
    >
      <Image
        src="/logo.png"
        alt="ProCareerVista"
        width={192}
        height={192}
        className="logo-image"
        priority
      />
    </Link>
  );
}
