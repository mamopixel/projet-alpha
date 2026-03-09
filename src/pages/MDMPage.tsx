import { TrendingUp, ShieldCheck, ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DottedSurface } from "@/components/ui/dotted-surface"
import { Logo } from "@/components/ui/logo"
import { Link } from "react-router-dom"

export default function MDMPage() {
  return (
    <div className="relative min-h-screen selection:bg-primary/20 text-foreground bg-slate-50/50">
      <DottedSurface className="fixed inset-0 opacity-30" />
      
      {/* Header for the subpage */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold">Retour à l'accueil</span>
          </Link>
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Main Content */}
          <div className="space-y-8 text-center">
            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-xs">
              Innovation & Rentabilité
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.1] font-sans">
              Le MDM : Pilotez votre <br />
              <span className="text-primary">croissance</span> par l'automatisation.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed font-serif max-w-3xl mx-auto italic">
              "Dans un monde hybride, le Mobile Device Management n'est plus une option de sécurité, c'est votre principal moteur d'efficacité opérationnelle."
            </p>
          </div>

          {/* Cards Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 text-white rounded-[2rem] p-10 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
               <TrendingUp className="size-12 text-primary mb-6" />
               <h3 className="text-2xl font-bold mb-4 font-sans">ROI Immédiat</h3>
               <p className="text-slate-400 leading-relaxed mb-6">
                 Réduisez vos coûts de support IT de 40% en automatisant les tâches répétitives et en éliminant les erreurs de configuration manuelle.
               </p>
               <ul className="space-y-3">
                 <li className="flex items-center gap-2 text-sm font-medium"><Check className="size-4 text-emerald-400" /> Zéro intervention manuelle</li>
                 <li className="flex items-center gap-2 text-sm font-medium"><Check className="size-4 text-emerald-400" /> Analyse des coûts en temps réel</li>
                 <li className="flex items-center gap-2 text-sm font-medium"><Check className="size-4 text-emerald-400" /> Prolongation de vie des terminaux</li>
               </ul>
            </div>

            <div className="bg-white rounded-[2rem] p-10 shadow-xl border border-border group">
               <ShieldCheck className="size-12 text-primary mb-6" />
               <h3 className="text-2xl font-bold mb-4 font-sans">Sécurité Native</h3>
               <p className="text-muted-foreground leading-relaxed mb-6">
                 Protégez vos données critiques sans entraver la liberté de vos collaborateurs. Un équilibre parfait pour la performance.
               </p>
               <ul className="space-y-3">
                 <li className="flex items-center gap-2 text-sm font-medium text-slate-700"><Check className="size-4 text-primary" /> Conformité RGPD automatisée</li>
                 <li className="flex items-center gap-2 text-sm font-medium text-slate-700"><Check className="size-4 text-primary" /> Verrouillage à distance instantané</li>
                 <li className="flex items-center gap-2 text-sm font-medium text-slate-700"><Check className="size-4 text-primary" /> Séparation Pro / Perso (BYOD)</li>
               </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary/5 rounded-[2.5rem] p-12 border-2 border-primary/20 text-center space-y-6">
            <h2 className="text-3xl font-bold font-sans">Prêt à simplifier vos processus ?</h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              Découvrez comment l'implémentation d'un MDM (Intune, Jamf, MobileIron) peut transformer votre gestion de flotte dès aujourd'hui.
            </p>
            <div className="pt-4">
              <Link to="/#contact">
                <Button size="lg" className="h-14 px-10 text-lg font-extrabold rounded-full shadow-lg shadow-primary/30">
                  Lancer mon projet
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-border bg-white/50 text-center">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
           <Logo iconOnly className="mx-auto grayscale opacity-30" />
           <p className="text-sm text-muted-foreground font-mono">
             © 2026 MobileOps Freelance. L'innovation au service de votre mobilité.
           </p>
        </div>
      </footer>
    </div>
  )
}
