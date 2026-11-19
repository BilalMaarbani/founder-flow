// A STATIC segment next to the dynamic [id] segment.
// /leads/profile matches this file, not leads/[id]: static wins.
// (<section>, not <main>: leads/layout.tsx already provides <main>.)
export default function LeadProfilePage() {
  return (
    <section>
      <h2>Lead profile</h2>
    </section>
  );
}
