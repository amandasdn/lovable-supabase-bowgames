import { Twitter, Instagram, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="sobre" className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-extrabold text-gradient inline-block mb-3">
              Bow Games
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              © 2024 Bow Games. Todos os direitos reservados.
              <br />
              Criando experiências inesquecíveis desde 2018.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contato</h4>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
                  <Twitter size={16} /> @bowgames
                </a>
              </li>
              <li>
                <a href="#" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
                  <Instagram size={16} /> @bowgames
                </a>
              </li>
              <li>
                <a href="mailto:contact@bowgames.com" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail size={16} /> contact@bowgames.com
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-bold mb-4">Endereço</h4>
            <p className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 flex-shrink-0" />
              <span>
                Av. Paulista, 1000 - Bela Vista
                <br />
                São Paulo, SP - 01310-100
                <br />
                Brasil
              </span>
            </p>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors mt-4 inline-block">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
