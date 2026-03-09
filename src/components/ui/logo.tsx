import { Smartphone, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  iconOnly?: boolean
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5 group select-none", className)}>
      {/* Dynamic Logo Icon */}
      <div className="relative flex items-center justify-center">
        {/* Outer Circle / Ring */}
        <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md group-hover:bg-primary/30 transition-colors" />
        
        {/* Main Logo Container */}
        <div className="relative bg-primary rounded-xl p-2 shadow-lg shadow-primary/25 border border-white/10 overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
          <div className="relative z-10">
            <Smartphone className="size-6 text-primary-foreground stroke-[2.5px]" />
            {/* Overlay Zap for "Ops" / Innovation / Speed */}
            <Zap className="absolute -top-1 -right-1 size-3 text-emerald-400 fill-emerald-400 stroke-[1px]" />
          </div>
          
          {/* Subtle Shine Effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        </div>
      </div>

      {/* Brand Name */}
      {!iconOnly && (
        <div className="flex flex-col -space-y-1">
          <span className="font-sans font-black text-2xl tracking-tighter leading-none">
            Mobile<span className="text-primary italic">Ops</span>
          </span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground opacity-80">
            Freelance Expert
          </span>
        </div>
      )}
    </div>
  )
}
