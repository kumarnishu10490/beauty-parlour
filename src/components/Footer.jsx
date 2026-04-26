import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Phone, MapPin, Mail, Instagram, Facebook } from "lucide-react";

const Footer = () => {

  const [contact, setContact] = useState({
    phone: "9304825053",
    email: "Rubeeyadav10490@gmail.com",
    address: " Pali road, jhabar, Dipka , Korba , Chhattisgarh-495452",
    instagram: "sakshi_beauty_parlour202",
    facebook: ""
  });

  // Removed redundant local server fetch as we use Firebase for storage and management
  useEffect(() => {
    // Contact info is maintained in state with fallback defaults
  }, []);


  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Sakshi Beauty Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain brightness-0 invert" />
              <span className="font-heading text-lg sm:text-xl font-bold">
                Sakshi Beauty
              </span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed mb-4">
              Premium beauty parlour & training centre. Where beauty meets excellence.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/20 border border-primary/30 text-xs font-medium text-gold">
              🇮🇳 MSME Registered Business
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-gold">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["Services", "Courses", "Gallery", "About", "Contact"].map((item) =>
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                
                  {item}
                </Link>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-gold">Services</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70">
              <span>Bridal Makeup</span>
              <span>Party Makeup</span>
              <span>Facial & Skin Care</span>
              <span>Hair Styling</span>
              <span>Mehndi Design</span>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4 text-gold">Contact</h4>
            <div className="flex flex-col gap-3 text-sm opacity-70">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold" />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                <span>{contact.email} </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold mt-0.5" />
                <span>{contact.address} </span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <a href={`https://instagram.com/${contact.instagram}`} target="_blank" rel="noreferrer">
  <Instagram className="w-5 h-5 hover:text-gold transition-colors cursor-pointer" />
</a>
                <Facebook className="w-5 h-5 hover:text-gold transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm opacity-50">
          © 2026 Sakshi Beauty Parlour & Training Centre. All rights reserved.
        </div>
      </div>
    </footer>);

};

export default Footer;