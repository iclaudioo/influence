import { AboutClient } from "./AboutClient";
import { AboutServerSections } from "./AboutServerSections";

export default function AboutPage() {
  return (
    <AboutClient
      serverSections={<AboutServerSections />}
    />
  );
}
