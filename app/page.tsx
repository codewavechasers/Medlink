export const metadata = {
  title: "Welcome to Medlink | Your Healthcare Companion",
  description: "Medlink is a trusted healthcare platform that connects patients to the best medical professionals. Book appointments, consult doctors, and manage your healthcare needs all in one place.",
};
import Welcome from "./onboarding/welcome-to-medlink/index";
export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "100px" }}>
      <Welcome />
    </div>
  );
}
