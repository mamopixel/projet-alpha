import { useState, useEffect } from 'react'
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom"
import { 
  Smartphone, 
  ShieldCheck, 
  Truck, 
  FileText, 
  Users, 
  TrendingUp, 
  Check, 
  Mail, 
  Linkedin,
  ArrowRight,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DottedSurface } from "@/components/ui/dotted-surface"
import { Logo } from "@/components/ui/logo"
import MDMPage from "./pages/MDMPage"

// Helper component to handle anchor links across pages
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

function Home() {
  const [isSent, setIsSent] = useState(false)

  const services = [
    { icon: <ShieldCheck className="size-6" />, title: "Gestion MDM", desc: "Configuration, sécurisation et administration à distance de votre parc mobile." },
    { icon: <Smartphone className="size-6" />, title: "Ressources", desc: "Inventaire précis et optimisation de l'allocation des terminaux." },
    { icon: <Truck className="size-6" />, title: "Supply Chain", desc: "Gestion complète du cycle de vie : approvisionnement, déploiement et SAV." },
    { icon: <FileText className="size-6" />, title: "Contrats", desc: "Optimisation des coûts télécoms et gestion rigoureuse des engagements." },
    { icon: <Users className="size-6" />, title: "Relation Client", desc: "Support expert et interface dédiée pour vos utilisateurs et partenaires." },
    { icon: <TrendingUp className="size-6" />, title: "Business Dev", desc: "Développement d'offres stratégiques pour maximiser votre CA." },
  ]

  const pricing = [
    { name: "Audit & Conseil", price: "À partir de 1 500€", features: ["Analyse de l'existant", "Optimisation des coûts", "Rapport de sécurité MDM"], accent: false },
    { name: "Gestion Flotte", price: "Sur Devis", features: ["Management MDM complet", "Support utilisateur", "Logistique Supply Chain", "Reporting mensuel"], accent: true },
    { name: "Stratégie & Offres", price: "Tarification TJM", features: ["Développement de catalogue", "Négociation contrats", "Accompagnement Business"], accent: false },
  ]

  return (
    <div className="relative min-h-screen selection:bg-primary/20 text-foreground">
      {/* Background Effects */}
      <DottedSurface className="fixed inset-0 opacity-40" />

      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/#hero" className="hover:text-primary transition-colors">Accueil</Link>
            <Link to="/mdm-innovation" className="hover:text-primary transition-colors">Innovation MDM</Link>
            <Link to="/#about" className="hover:text-primary transition-colors">Expertise</Link>
            <Link to="/#pricing" className="hover:text-primary transition-colors">Tarifs</Link>
            <Link to="/#contact" className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">Contact</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="hero" className="pt-40 pb-20 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-1.5 text-sm rounded-full bg-primary/10 text-primary border-primary/20">
              Freelance Expert Flotte Mobile
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight font-sans">
              Externalisez la gestion de votre <br />
              <span className="text-primary italic">parc mobile</span> de bout en bout.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-serif">
              Optimisez vos coûts, sécurisez vos terminaux avec le MDM et déléguez la logistique complète à un expert dédié.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/mdm-innovation">
                <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-full group w-full sm:w-auto">
                  Discuter de mon projet <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/#about">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold rounded-full border-2 w-full sm:w-auto">
                  Voir mes services
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ABOUT / SERVICES SECTION */}
        <section id="about" className="py-24 bg-accent/50 backdrop-blur-sm border-y border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-extrabold tracking-tight font-sans">
                  Une expertise complète pour <br />votre transformation mobile.
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  En tant que freelance, je propose une approche agile et personnalisée pour gérer chaque aspect de votre flotte, du déploiement initial à l'optimisation financière.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-1 rounded-full"><Check className="size-4 text-primary" /></div>
                    <span className="font-medium">Réduction des coûts télécoms (ROI)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-1 rounded-full"><Check className="size-4 text-primary" /></div>
                    <span className="font-medium">Conformité RGPD & Sécurité via MDM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-1 rounded-full"><Check className="size-4 text-primary" /></div>
                    <span className="font-medium">Externalisation complète de la supply chain</span>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((s, i) => (
                  <Card key={i} className="bg-background/60 border-border/50 hover:border-primary/50 transition-colors shadow-sm">
                    <CardHeader className="p-6">
                      <div className="text-primary mb-2">{s.icon}</div>
                      <CardTitle className="text-lg font-bold font-sans">{s.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">{s.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="py-24 px-6">
          <div className="max-w-5xl mx-auto text-center mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight font-sans">Des offres adaptées à votre taille.</h2>
            <p className="text-muted-foreground text-lg">Choisissez le niveau d'accompagnement dont vous avez besoin.</p>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {pricing.map((p, i) => (
              <Card key={i} className={`relative flex flex-col p-2 bg-background/80 ${p.accent ? 'border-2 border-primary shadow-2xl scale-105 z-10' : 'border-border shadow-md'}`}>
                {p.accent && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground font-bold">
                    Plus Populaire
                  </Badge>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl font-bold font-sans">{p.name}</CardTitle>
                  <div className="mt-4 text-3xl font-black text-primary font-mono">{p.price}</div>
                </CardHeader>
                <CardContent className="flex-grow space-y-4 px-8">
                  <Separator />
                  {p.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm">
                      <ChevronRight className="size-4 text-primary" />
                      <span>{f}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="pb-8 px-8">
                  <Button className={`w-full h-12 rounded-full font-bold ${p.accent ? 'bg-primary' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
                    Demander un devis
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 px-6 bg-primary text-primary-foreground">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-sans">Prêt à optimiser votre flotte ?</h2>
              <p className="text-xl opacity-90 font-serif">
                Analysons ensemble vos besoins MDM et supply chain pour construire une offre sur-mesure.
              </p>
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-full"><Mail className="size-6" /></div>
                  <div>
                    <div className="text-sm opacity-70">Email</div>
                    <div className="font-bold">contact@mobileops.fr</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-full"><Linkedin className="size-6" /></div>
                  <div>
                    <div className="text-sm opacity-70">LinkedIn</div>
                    <div className="font-bold">linkedin.com/in/expert-mobile</div>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="bg-white text-slate-900 border-none shadow-2xl p-2">
              <CardContent className="p-8">
                {!isSent ? (
                  <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsSent(true); }}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom</Label>
                        <Input id="name" placeholder="Votre nom" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Entreprise</Label>
                        <Input id="company" placeholder="Nom de société" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email professionnel</Label>
                      <Input id="email" type="email" placeholder="nom@entreprise.fr" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Votre projet (nombre de lignes, enjeux...)</Label>
                      <textarea 
                        id="message" 
                        className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        placeholder="Ex: Migration 200 lignes vers Intune..."
                      />
                    </div>
                    <Button type="submit" className="w-full h-12 text-lg font-bold shadow-xl shadow-primary/20">
                      Envoyer ma demande
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-12 space-y-4">
                    <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                      <Check className="size-8" />
                    </div>
                    <h3 className="text-2xl font-bold">Message envoyé !</h3>
                    <p className="text-slate-500">Je reviens vers vous sous 24h ouvrées.</p>
                    <Button variant="outline" className="mt-4" onClick={() => setIsSent(false)}>Nouveau message</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/">
            <Logo iconOnly className="grayscale opacity-50" />
          </Link>
          <p className="text-sm text-muted-foreground font-mono">
            © 2026 MobileOps Freelance. Expert Flotte Mobile & MDM.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary">Mentions Légales</a>
            <a href="#" className="hover:text-primary">RGPD</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mdm-innovation" element={<MDMPage />} />
      </Routes>
    </Router>
  )
}

export default App
