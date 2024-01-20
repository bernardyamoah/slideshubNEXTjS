import { AlertTriangle, CheckCircleIcon, Info } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bannerVariants = cva(
	"border text-center p-4 text-sm flex items-center w-full",
	{
		variants: {
			variant: {
				warning:
					"bg-yellow-200/80 border-yellow-500 dark:border-yellow-200/50 text-primary dark:bg-yellow-600/40 dark:text-zinc-100",
				success: "bg-emerald-700 border-emerald-800 text-secondary",
				info: "bg-cyan-700 border-cyan-800 text-secondary dark:text-cyan-100",
			},
		},
		defaultVariants: {
			variant: "warning",
		},
	}
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
	label: string;
}

const iconMap = {
	warning: AlertTriangle,
	success: CheckCircleIcon,
	info: Info,
};

export const Banner = ({ label, variant }: BannerProps) => {
	const Icon = iconMap[variant || "warning"];

	return (
		<div className={cn(bannerVariants({ variant }))}>
			<Icon className="h-4 w-4 mr-2" />
			{label}
		</div>
	);
};
