import { useState } from 'react'
import { ArrowLeft, Send, CheckCircle2, Calculator, Smartphone, Shield, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/ui/logo"
import { Link } from "react-router-dom"

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    window.scrollTo(0, 0)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
        <Card className="max-w-md w-full text-center p-8 shadow-2xl border-none">
          <CardContent className="space-y-6 pt-6">
            <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
              <CheckCircle2 className="size-12" />
            </div>
            <h2 className="text-3xl font-black font-sans">Demande reçue !</h2>
            <p className="text-slate-500 leading-relaxed">
              Merci pour ces précisions. Je prépare votre estimation personnalisée et je reviens vers vous sous 24h pour en discuter.
            </p>
            <Link to="/">
              <Button className="w-full h-12 rounded-full font-bold mt-4">
                Retour à l'accueil
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <header className="bg-white/80 backdrop-blur-xl border-b border-border sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold">Annuler</span>
          </Link>
          <Logo iconOnly />
        </div>
      </header>

      <main className="max-w-3xl mx-auto pt-12 px-6">
        <div className="space-y-4 mb-10 text-center">
          <div className="inline-flex p-3 bg-primary/10 rounded-2xl text-primary mb-2">
            <Calculator className="size-8" />
          </div>
          <h1 className="text-4xl font-black tracking-tight font-sans">Configurez votre offre</h1>
          <p className="text-muted-foreground text-lg italic">
            Répondez à ces quelques questions pour obtenir un devis précis et optimisé.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Parc Mobile */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-xl flex items-center gap-2">
                <Smartphone className="size-5 text-primary" /> 1. Votre Parc Mobile
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="device-count">Nombre total de lignes/terminaux</Label>
                  <Input id="device-count" type="number" placeholder="Ex: 150" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="os-type">Systèmes d'exploitation</Label>
                  <select id="os-type" className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                    <option>Mixte (iOS & Android)</option>
                    <option>iOS uniquement</option>
                    <option>Android uniquement</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: MDM & Sécurité */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-xl flex items-center gap-2">
                <Shield className="size-5 text-primary" /> 2. MDM & Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <Label>Avez-vous déjà un outil MDM ?</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['Non, à installer', 'Intune / Microsoft', 'Autre (Jamf, MobileIron...)'].map((opt) => (
                    <label key={opt} className="flex items-center justify-center p-3 border rounded-xl cursor-pointer hover:bg-primary/5 has-[:checked]:border-primary has-[:checked]:bg-primary/5 transition-all">
                      <input type="radio" name="mdm-status" className="hidden" />
                      <span className="text-sm font-medium">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Besoins Logistiques */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-xl flex items-center gap-2">
                <Truck className="size-5 text-primary" /> 3. Services souhaités
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Support utilisateur direct',
                  'Gestion de la Supply Chain',
                  'Optimisation des contrats',
                  'Masterisation / Préparation',
                  'Gestion des sinistres (SAV)',
                  'Développement d\'offres CA'
                ].map((service) => (
                  <div key={service} className="flex items-center space-x-3 p-2">
                    <input type="checkbox" id={service} className="size-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    <label htmlFor={service} className="text-sm font-medium text-slate-700 leading-none cursor-pointer">
                      {service}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Contact */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-xl">4. Coordonnées</CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="q-name">Nom complet</Label>
                <Input id="q-name" placeholder="Jean Dupont" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="q-company">Entreprise</Label>
                <Input id="q-company" placeholder="Société SAS" required />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="q-email">Email professionnel</Label>
                <Input id="q-email" type="email" placeholder="j.dupont@entreprise.fr" required />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full h-16 text-xl font-black rounded-[2rem] shadow-2xl shadow-primary/30 transition-transform active:scale-95">
            Calculer mon estimation <Send className="ml-2 size-5" />
          </Button>
        </form>
      </main>
    </div>
  )
}
