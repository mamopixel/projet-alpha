import { DottedSurface } from "@/components/ui/dotted-surface";
import { cn } from '@/lib/utils';

export default function DemoOne() {
 return (
		<DottedSurface className="size-full">
			<div className="absolute inset-0 flex items-center justify-center">
				<div
					aria-hidden="true"
					className={cn(
						'pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full',
						'bg-[radial-gradient(ellipse_at_center,var(--primary),transparent_50%)]',
						'opacity-10 blur-[30px]',
					)}
				/>
				<h1 className="font-mono text-5xl font-extrabold tracking-tighter text-slate-900">Dotted Surface</h1>
			</div>
		</DottedSurface>
	);
}
