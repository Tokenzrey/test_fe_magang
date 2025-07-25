import * as React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Car, Sun, Moon, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useDarkModeStore } from "@/store/darkMode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";

export type NavbarProps = {
	className?: string;
	children?: React.ReactNode;
};

export function Navbar({ className, children }: NavbarProps) {
	const isDarkMode = useDarkModeStore((state) => state.isDarkMode);
	const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);
	const navigate = useNavigate();
	const logout = useAuthStore((state) => state.logout);

	const handleSignOut = React.useCallback(() => {
		logout();
		navigate({ to: "/auth" });
		toast("Logout berhasil!", {
			style: { background: "#dc2626", color: "white" },
			duration: 3000,
			icon: <LogOut className="h-4 w-4" />,
		});
	}, [logout]);

	return (
		<header
			className={cn(
				"sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-slate-200 dark:border-slate-800",
				className
			)}
		>
			<div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
				<Link
					to="/"
					className="flex items-center gap-2 cursor-pointer"
					role="button"
					tabIndex={0}
				>
					<div className="p-2 bg-slate-900 dark:bg-slate-50 rounded-lg">
						<Car className="h-6 w-6 text-white dark:text-slate-900" />
					</div>
					<Typography as="h1" variant="i1" font="poppins" weight="bold">
						Vehicle Tracker
					</Typography>
				</Link>
				<div className="flex items-center gap-2">
					{children}
					<Button
						variant="ghost"
						size="icon"
						onClick={toggleDarkMode}
						aria-label="Toggle dark mode"
						className="hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md p-1 cursor-pointer"
					>
						{isDarkMode ? (
							<Sun className="h-7 w-7" />
						) : (
							<Moon className="h-7 w-7" />
						)}
					</Button>
					{/* Avatar Profile with Dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="relative rounded-full"
								aria-label="Open user menu"
							>
								<Avatar className="h-8 w-8">
									<AvatarImage src="" alt="User avatar" />
									<AvatarFallback>U</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className={cn(
								"w-48 mt-2 p-2 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800",
								"bg-white/80 dark:bg-slate-950/90 backdrop-blur-sm"
							)}
							sideOffset={10}
						>
							<Link to="/" tabIndex={-1}>
								<DropdownMenuItem
									className={cn(
										"group cursor-pointer rounded-md transition-colors",
										"hover:bg-slate-200/70 dark:hover:bg-slate-800/70",
										"hover:text-blue-700 dark:hover:text-blue-200"
									)}
								>
									<User className="mr-2 h-4 w-4" />
									<span>Profile</span>
								</DropdownMenuItem>
							</Link>
							<DropdownMenuSeparator className="my-1 bg-slate-200 dark:bg-slate-800" />
							<DropdownMenuItem
								onClick={handleSignOut}
								className={cn(
									"group cursor-pointer rounded-md transition-colors",
									"text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300",
									"hover:bg-red-100/70 dark:hover:bg-red-900/40"
								)}
							>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Sign Out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}

export default Navbar;
export type NavbarComponent = typeof Navbar;
