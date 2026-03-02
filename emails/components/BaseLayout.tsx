import {
  Html,
  Head,
  Preview,
  Body,
  Container,
} from "@react-email/components";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface BaseLayoutProps {
  children: React.ReactNode;
  accentColor?: string;
  unsubscribeUrl?: string;
  language?: "nl" | "en";
  previewText?: string;
}

export function BaseLayout({
  children,
  accentColor = "#d55d25",
  unsubscribeUrl,
  language = "nl",
  previewText,
}: BaseLayoutProps) {
  return (
    <Html lang={language}>
      <Head />
      {previewText && <Preview>{previewText}</Preview>}
      <Body
        style={{
          backgroundColor: "#F4F4F5",
          fontFamily: "Arial, Helvetica, sans-serif",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Header accentColor={accentColor} />
          {children}
          <Footer unsubscribeUrl={unsubscribeUrl} language={language} />
        </Container>
      </Body>
    </Html>
  );
}
