import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import bowLogo from "@/assets/bow-games-logo.png";

const navItems = [
  { label: "Home", href: "#home", sectionId: "home" },
  { label: "Games", href: "#games", sectionId: "games" },
  { label: "About", href: "#about", sectionId: "about" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY + 100;

    for (let i = navItems.length - 1; i >= 0; i--) {
      const section = document.getElementById(navItems[i].sectionId);
      if (section && section.offsetTop <= scrollY) {
        setActiveSection(navItems[i].sectionId);
        return;
      }
    }
    setActiveSection("home");
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="flex items-center gap-2">
          <img src={bowLogo} alt="Bow Games Logo" width={36} height={36} className="w-9 h-9" />
          <span className="text-2xl font-extrabold text-gradient tracking-tight">
            Bow Games
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-sm font-semibold tracking-wide transition-colors ${
                activeSection === item.sectionId
                  ? "text-primary border-b-2 border-primary pb-0.5"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden glass border-t px-4 pb-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-sm font-semibold py-2 ${
                activeSection === item.sectionId ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
