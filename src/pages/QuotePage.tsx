import { useState, useMemo } from 'react'
import { ArrowLeft, Send, CheckCircle2, Calculator, Smartphone, Shield, Truck, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/ui/logo"
import { Link } from "react-router-dom"
import { jsPDF } from "jspdf"

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    deviceCount: 0,
    osType: 'Mixte (iOS & Android)',
    mdmStatus: 'Non, à installer',
    services: [] as string[]
  })

  // Pricing Logic
  const calculation = useMemo(() => {
    const SETUP_FEE = 490
    const BASE_PER_DEVICE = 5
    
    // Premiums for additional services
    const servicePremiums: Record<string, number> = {
      'Support utilisateur direct': 2,
      'Gestion de la Supply Chain': 1.5,
      'Optimisation des contrats': 0.5,
      'Masterisation / Préparation': 1,
      'Gestion des sinistres (SAV)': 1,
      'Développement d\'offres CA': 1
    }

    let monthlyPerDevice = BASE_PER_DEVICE
    formData.services.forEach(service => {
      if (servicePremiums[service]) {
        monthlyPerDevice += servicePremiums[service]
      }
    })

    const totalMonthly = formData.deviceCount * monthlyPerDevice
    const totalSetup = SETUP_FEE

    return {
      setup: totalSetup,
      monthly: totalMonthly,
      perDevice: monthlyPerDevice
    }
  }, [formData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    const key = id.replace('q-', '').replace('device-count', 'deviceCount').replace('os-type', 'osType')
    setFormData(prev => ({ ...prev, [key]: id === 'device-count' ? parseInt(value) || 0 : value }))
  }

  const handleCheckboxChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    const date = new Date().toLocaleDateString('fr-FR')
    
    // Header
    doc.setFontSize(22)
    doc.setTextColor(96, 91, 255) // Primary color
    doc.text("MobileOps Freelance", 20, 20)
    
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text(`Date: ${date}`, 150, 20)
    doc.text("Estimation de Devis", 150, 25)

    doc.setDrawColor(230)
    doc.line(20, 35, 190, 35)

    // Client Info
    doc.setFontSize(12)
    doc.setTextColor(0)
    doc.setFont("helvetica", "bold")
    doc.text("Client :", 20, 50)
    doc.setFont("helvetica", "normal")
    doc.text(`${formData.name}`, 20, 57)
    doc.text(`${formData.company}`, 20, 64)
    doc.text(`${formData.email}`, 20, 71)

    // Fleet Info
    doc.setFont("helvetica", "bold")
    doc.text("Détails du parc :", 120, 50)
    doc.setFont("helvetica", "normal")
    doc.text(`Appareils : ${formData.deviceCount}`, 120, 57)
    doc.text(`Système : ${formData.osType}`, 120, 64)
    doc.text(`MDM : ${formData.mdmStatus}`, 120, 71)

    // Table Header
    doc.setFillColor(245, 245, 255)
    doc.rect(20, 85, 170, 10, 'F')
    doc.setFont("helvetica", "bold")
    doc.text("Désignation", 25, 92)
    doc.text("Prix Unit.", 130, 92)
    doc.text("Total", 170, 92)

    // Line items
    doc.setFont("helvetica", "normal")
    let y = 105
    
    // Setup Fee
    doc.text("Frais de mise en service (One-shot)", 25, y)
    doc.text(`${calculation.setup}€`, 135, y)
    doc.text(`${calculation.setup}€`, 175, y)
    y += 10

    // Monthly Fee
    doc.text(`Gestion mensuelle (${formData.deviceCount} mobiles)`, 25, y)
    doc.text(`${calculation.perDevice}€/m`, 135, y)
    doc.text(`${calculation.monthly}€`, 175, y)
    y += 15

    // Services list
    doc.setFontSize(9)
    doc.setTextColor(120)
    doc.text("Services inclus :", 25, y)
    y += 7
    formData.services.forEach(s => {
      doc.text(`- ${s}`, 30, y)
      y += 6
    })

    // Totals
    y = Math.max(y + 10, 160)
    doc.setDrawColor(200)
    doc.line(120, y, 190, y)
    y += 10
    
    doc.setFontSize(12)
    doc.setTextColor(0)
    doc.setFont("helvetica", "bold")
    doc.text("Total Mise en service :", 120, y)
    doc.text(`${calculation.setup}€ HT`, 175, y)
    y += 10
    doc.text("Total Mensuel :", 120, y)
    doc.text(`${calculation.monthly}€ HT / mois`, 170, y)

    // Footer
    doc.setFontSize(8)
    doc.setTextColor(150)
    doc.text("Ce document est une estimation commerciale non contractuelle.", 105, 280, { align: "center" })

    doc.save(`Devis_MobileOps_${formData.company.replace(/\s+/g, '_')}.pdf`)
  }

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
              Votre estimation est prête. Vous pouvez la télécharger ci-dessous ou attendre que je vous recontacte.
            </p>
            <div className="flex flex-col gap-3 pt-4">
              <Button onClick={generatePDF} className="w-full h-12 rounded-full font-bold bg-emerald-600 hover:bg-emerald-700">
                <Download className="mr-2 size-5" /> Télécharger mon devis (PDF)
              </Button>
              <Link to="/">
                <Button variant="outline" className="w-full h-12 rounded-full font-bold">
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
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

      <main className="max-w-5xl mx-auto pt-12 px-6 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4 mb-10">
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
                    <Input id="device-count" type="number" placeholder="Ex: 150" value={formData.deviceCount || ''} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="os-type">Systèmes d'exploitation</Label>
                    <select id="os-type" className="w-full h-10 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm" value={formData.osType} onChange={handleInputChange}>
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
                      <label key={opt} className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer hover:bg-primary/5 transition-all ${formData.mdmStatus === opt ? 'border-primary bg-primary/5 ring-1 ring-primary' : ''}`}>
                        <input type="radio" name="mdm-status" className="hidden" checked={formData.mdmStatus === opt} onChange={() => setFormData(prev => ({...prev, mdmStatus: opt}))} />
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
                    <div key={service} className={`flex items-center space-x-3 p-3 rounded-xl border transition-colors cursor-pointer ${formData.services.includes(service) ? 'border-primary bg-primary/5' : 'border-transparent hover:bg-slate-50'}`} onClick={() => handleCheckboxChange(service)}>
                      <input type="checkbox" checked={formData.services.includes(service)} readOnly className="size-4 rounded border-gray-300 text-primary focus:ring-primary" />
                      <label className="text-sm font-medium text-slate-700 leading-none cursor-pointer">
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
                  <Input id="q-name" placeholder="Jean Dupont" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="q-company">Entreprise</Label>
                  <Input id="q-company" placeholder="Société SAS" value={formData.company} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="q-email">Email professionnel</Label>
                  <Input id="q-email" type="email" placeholder="j.dupont@entreprise.fr" value={formData.email} onChange={handleInputChange} required />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full h-16 text-xl font-black rounded-[2rem] shadow-2xl shadow-primary/30 transition-transform active:scale-95">
              Obtenir mon estimation <Send className="ml-2 size-5" />
            </Button>
          </form>
        </div>

        {/* PRICE PREVIEW SIDEBAR */}
        <div className="lg:col-start-3">
          <Card className="sticky top-32 border-2 border-primary shadow-2xl overflow-hidden bg-white">
            <CardHeader className="bg-primary text-primary-foreground p-6">
              <CardTitle className="text-lg uppercase tracking-widest font-bold">Estimation en direct</CardTitle>
              <CardDescription className="text-primary-foreground/80">Basé sur vos critères</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Mise en service (One-shot)</span>
                  <span className="font-bold text-slate-900">{calculation.setup}€</span>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-500">Abonnement mensuel</span>
                    <span className="text-xs text-primary font-bold">{calculation.perDevice}€ / mobile / mois</span>
                  </div>
                  <span className="text-2xl font-black text-primary">{calculation.monthly}€</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Récapitulatif</div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Smartphone className="size-4 text-primary" /> {formData.deviceCount} terminaux
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="size-4 text-primary" /> {formData.services.length} services optionnels
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200">
                <p className="text-[10px] text-slate-400 leading-tight">
                  * Les tarifs sont indicatifs et HT. L'estimation finale dépendra de la complexité technique de votre infrastructure MDM.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
