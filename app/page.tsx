import MemoryGAme from "@/components/MemoryGame";

// Building a Memory Game in Next.js: A step by step guide
// https://www.youtube.com/watch?v=2FpfLOde5kg

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MemoryGAme />
    </main>
  );
}
