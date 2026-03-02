import { Section, Button } from "@react-email/components";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  accentColor?: string;
}

export function CTAButton({
  href,
  children,
  accentColor = "#d55d25",
}: CTAButtonProps) {
  return (
    <Section style={{ textAlign: "center" as const, margin: "32px 0" }}>
      <Button
        href={href}
        style={{
          backgroundColor: accentColor,
          color: "#FFFFFF",
          fontSize: "16px",
          fontWeight: "bold",
          fontFamily: "Arial, Helvetica, sans-serif",
          padding: "14px 32px",
          borderRadius: "6px",
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        {children}
      </Button>
    </Section>
  );
}
