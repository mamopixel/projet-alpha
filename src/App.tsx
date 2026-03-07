import { useState } from 'react'
import { Rocket, Utensils, Calendar, MapPin, Users, Clock, Sparkles } from "lucide-react"
import { ThemeProvider } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DottedSurface } from "@/components/ui/dotted-surface"

function AppContent() {
  const [name, setName] = useState("")
  const [isRsvp, setIsRsvp] = useState(false)

  const attendees = [
    { 
      name: "Alex Chen", 
      role: "Frontend Dev", 
      initial: "AC",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" 
    },
    { 
      name: "Sarah Miller", 
      role: "UX Designer", 
      initial: "SM",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" 
    },
    { 
      name: "Jordan Lee", 
      role: "DevOps", 
      initial: "JL",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" 
    },
    { 
      name: "Taylor Swift", 
      role: "Music Tech", 
      initial: "TS",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" 
    },
  ]

  return (
    <div className="relative min-h-screen selection:bg-primary/10 bg-slate-50/50">
      {/* Background Effect */}
      <DottedSurface className="fixed inset-0" />

      {/* Main Content */}
      <div className="relative z-10 font-sans text-slate-900">
        <header className="bg-white/70 backdrop-blur-md border-b sticky top-0 z-20">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-1.5 shadow-sm">
                <Rocket className="size-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tight">TechLunch<span className="text-primary">.io</span></span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <a href="#" className="hover:text-primary transition-colors">Upcoming</a>
              <a href="#" className="hover:text-primary transition-colors">Speakers</a>
              <a href="#" className="hover:text-primary transition-colors">Archive</a>
            </nav>
            <Button variant="outline" size="sm">Sign In</Button>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="px-2.5 py-0.5 rounded-full font-semibold">Next Event</Badge>
                <span className="text-sm text-slate-500 flex items-center gap-1">
                  <Sparkles className="size-3 text-amber-500 fill-amber-500" />
                  Featured Topic
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Scaling React Apps with <span className="text-primary italic">Modern Infrastructure</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                Join us for our monthly deep dive into engineering excellence. This month, we're discussing micro-frontends and edge computing.
              </p>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50">
                <CardContent className="pt-6 flex items-start gap-4">
                  <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                    <Calendar className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Friday, March 20</h3>
                    <p className="text-sm text-slate-500">12:30 PM — 2:00 PM</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/60 backdrop-blur-sm border-slate-200/50">
                <CardContent className="pt-6 flex items-start gap-4">
                  <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">The Atrium, Level 4</h3>
                    <p className="text-sm text-slate-500">Innovation Hub, SF</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <section className="space-y-4 bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-slate-200/50 shadow-sm">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Utensils className="size-5 text-primary" />
                On the Menu
              </h2>
              <Separator className="bg-slate-200/50" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <h4 className="font-semibold">Main Course</h4>
                  <p className="text-sm text-slate-600">Artisan Sandwich Platter & Harvest Salad</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold">Beverages</h4>
                  <p className="text-sm text-slate-600">Cold Brew Coffee & Kombucha on tap</p>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <Card className="shadow-xl border-primary/10 bg-white/70 backdrop-blur-md sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl">Reserve your spot</CardTitle>
                <CardDescription>Limited to 50 seats per session.</CardDescription>
              </CardHeader>
              <CardContent>
                {!isRsvp ? (
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsRsvp(true); }}>
                    <div className="space-y-2">
                      <Label htmlFor="rsvp-name">Full Name</Label>
                      <Input 
                        id="rsvp-name" 
                        placeholder="Jane Doe" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-white/50 border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rsvp-email">Work Email</Label>
                      <Input id="rsvp-email" type="email" placeholder="jane@company.com" required className="bg-white/50 border-slate-200" />
                    </div>
                    <Button type="submit" className="w-full font-semibold shadow-lg shadow-primary/20">RSVP Now</Button>
                  </form>
                ) : (
                  <div className="text-center py-4 space-y-3 animate-in fade-in zoom-in duration-300">
                    <div className="bg-emerald-100 text-emerald-700 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                      <Sparkles className="size-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-lg">You're on the list!</p>
                      <p className="text-sm text-slate-500">See you there, {name.split(' ')[0]}.</p>
                    </div>
                    <Button variant="outline" className="w-full mt-4" onClick={() => setIsRsvp(false)}>Change RSVP</Button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="bg-slate-50/30 rounded-b-xl py-3 border-t border-slate-100">
                <p className="text-xs text-slate-500 text-center w-full flex items-center justify-center gap-1">
                  <Clock className="size-3" /> Ends in 3 days
                </p>
              </CardFooter>
            </Card>

            <div className="space-y-4 px-1">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Users className="size-4" />
                Already Attending
              </h3>
              <div className="space-y-3">
                {attendees.map((person, i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-default">
                    <Avatar className="size-9 border-2 border-white shadow-sm transition-transform group-hover:scale-110">
                      <AvatarImage src={person.image} alt={person.name} />
                      <AvatarFallback className="text-[10px] bg-slate-100">{person.initial}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-700 leading-none">{person.name}</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-tighter mt-1">{person.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </main>

        <footer className="bg-white/40 backdrop-blur-sm border-t border-slate-200/50 mt-12 py-8">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="text-sm text-slate-400 font-medium tracking-tight">© 2026 TechLunch Hub. Built with excellence.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AppContent />
    </ThemeProvider>
  )
}

export default App
