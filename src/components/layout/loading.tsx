"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface FallbackLoadingProps {
	/**
	 * Optional children to display under the spinner/skeleton (e.g., loading message).
	 */
	children?: React.ReactNode;
	/**
	 * If true, will show the animated spinner.
	 * If false, will show a skeleton box.
	 * Default: true
	 */
	spinner?: boolean;
	/**
	 * Optional className for the wrapper div.
	 */
	className?: string;
	/**
	 * Size of the spinner or skeleton (width/height in px).
	 * Default: 48
	 */
	size?: number;
}

export function FallbackLoading({
	children,
	spinner = true,
	className,
	size = 48,
}: FallbackLoadingProps) {
	return (
		<div
			className={cn(
				"fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm",
				className
			)}
			data-testid="fallback-loading"
		>
			<div className="flex flex-col items-center">
				{spinner ? (
					<Loader2
						className="animate-spin text-muted-foreground mb-2"
						size={size}
						strokeWidth={2.5}
					/>
				) : (
					<Skeleton
						className="mb-2"
						style={{ width: size, height: size, borderRadius: "50%" }}
					/>
				)}
				{children ? (
					<div className="text-sm text-muted-foreground text-center">
						{children}
					</div>
				) : null}
			</div>
		</div>
	);
}

export default FallbackLoading;
