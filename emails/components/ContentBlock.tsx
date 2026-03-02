import { Section } from "@react-email/components";

interface ContentBlockProps {
  children: React.ReactNode;
}

export function ContentBlock({ children }: ContentBlockProps) {
  return (
    <Section
      style={{
        backgroundColor: "#FFFFFF",
        padding: "32px",
      }}
    >
      {children}
    </Section>
  );
}
