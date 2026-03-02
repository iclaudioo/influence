import { Section, Text } from "@react-email/components";

interface HeaderProps {
  accentColor?: string;
}

export function Header({ accentColor = "#d55d25" }: HeaderProps) {
  return (
    <>
      {/* Accent stripe */}
      <Section style={{ backgroundColor: accentColor, height: "3px" }} />
      {/* Navy header with logo text */}
      <Section style={{ backgroundColor: "#02182B", padding: "24px 32px" }}>
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: "20px",
            fontWeight: "bold",
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            margin: 0,
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          INFLUENCE
        </Text>
      </Section>
    </>
  );
}
