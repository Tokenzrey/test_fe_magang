import * as React from "react";
import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { Car } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LoginForm, RegisterForm } from "@/components/page/auth/AuthForm";
import Typography from "@/components/ui/typography";
import { useNavigate } from "@tanstack/react-router";

function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
			<div className="flex items-center justify-center py-12 px-4">
				{children}
			</div>
			<div className="hidden bg-slate-100 lg:flex items-center justify-center dark:bg-slate-900/50 flex-col p-10">
				<div className="w-full max-w-md text-center">
					<Car className="mx-auto h-24 w-24 text-blue-600 dark:text-blue-500" />
					<Typography
						as="h2"
						className="mt-6 mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100"
					>
						Lacak Armada Anda dengan Mudah
					</Typography>
					<Typography
						as="p"
						className="mt-4 text-base text-slate-600 dark:text-slate-400"
					>
						Dashboard pemantauan kendaraan yang intuitif, real-time, dan andal
						untuk semua kebutuhan bisnis Anda.
					</Typography>
				</div>
			</div>
		</div>
	);
}

function LoginPage({ navigateToRegister }: { navigateToRegister: () => void }) {
	return (
		<AuthLayout>
			<div className="w-full max-w-md space-y-6">
				<div className="text-center">
					<Typography
						as="h1"
						className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-1"
					>
						Selamat Datang Kembali
					</Typography>
					<Typography
						as="p"
						className="text-base text-slate-500 dark:text-slate-400"
					>
						Masuk untuk melanjutkan ke dashboard.
					</Typography>
				</div>
				<Card>
					<CardContent className="space-y-4 pt-6">
						<LoginForm />
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<Typography as="p" className="text-center text-sm text-slate-500">
							Belum punya akun?{" "}
							<button
								className={cn(
									"font-medium text-blue-600 hover:underline dark:text-blue-400 bg-transparent p-0 h-auto"
								)}
								type="button"
								onClick={navigateToRegister}
							>
								<Typography as="span" className="underline-offset-2">
									Daftar
								</Typography>
							</button>
						</Typography>
					</CardFooter>
				</Card>
			</div>
		</AuthLayout>
	);
}

function RegisterPage({ navigateToLogin }: { navigateToLogin: () => void }) {
	const [message, setMessage] = useState<string | null>(null);

	return (
		<AuthLayout>
			<div className="w-full max-w-md space-y-6">
				<div className="text-center">
					<Typography
						as="h1"
						className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-1"
					>
						Buat Akun Baru
					</Typography>
					<Typography
						as="p"
						className="text-base text-slate-500 dark:text-slate-400"
					>
						Mulai lacak armada Anda dalam hitungan menit.
					</Typography>
				</div>
				<Card>
					<CardContent className="space-y-4 pt-6">
						<RegisterForm
							onSuccess={() => {
								setMessage(
									"Registrasi berhasil! Anda akan dialihkan ke halaman login."
								);
								setTimeout(() => {
									setMessage(null);
									navigateToLogin();
								}, 2000);
							}}
						/>
						{message && (
							<Typography
								as="p"
								className={cn(
									"text-center text-sm p-3 rounded-lg",
									message.includes("berhasil")
										? "text-green-600 bg-green-100 dark:bg-green-900/30"
										: "text-red-600 bg-red-100 dark:bg-red-900/30"
								)}
							>
								{message}
							</Typography>
						)}
					</CardContent>
					<CardFooter className="flex-col gap-4">
						<Typography as="p" className="text-center text-sm text-slate-500">
							Sudah punya akun?{" "}
							<button
								className={cn(
									"font-medium text-blue-600 hover:underline dark:text-blue-400 bg-transparent p-0 h-auto"
								)}
								type="button"
								onClick={navigateToLogin}
							>
								<Typography as="span" className="underline-offset-2">
									Masuk
								</Typography>
							</button>
						</Typography>
					</CardFooter>
				</Card>
			</div>
		</AuthLayout>
	);
}

export default function AuthPage() {
	const [authPage, setAuthPage] = useState<"login" | "register">("login");
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
	const navigate = useNavigate();

	React.useEffect(() => {
		if (isAuthenticated) {
			navigate({ to: "/" });
		}
	}, [isAuthenticated, navigate]);

	React.useEffect(() => {
		useAuthStore.getState().setAuthLoading(false);
	}, []);

	return authPage === "login" ? (
		<LoginPage navigateToRegister={() => setAuthPage("register")} />
	) : (
		<RegisterPage navigateToLogin={() => setAuthPage("login")} />
	);
}
