export default function Navbar() {
  return (
    <header className="nav fixed top-0 inset-x-0 z-50">
      <div className="max-w-6xl mx-auto px-6 ">
        <div className="mt-4 rounded-2xl px-4 py-3 bg-white/5 border border-white/10 backdrop-blur flex items-center justify-between">
          <span className="font-semibold">CodeVibe</span>
          <nav className="flex items-center gap-6 text-sm text-slate-300">
            <a href="#">Home</a>
            <a href="#features">Features</a>
            <a href="#contact" className="px-3 py-1.5 rounded-xl bg-white/10">Contattaci</a>
          </nav>
        </div>
      </div>
    </header>
  );
}