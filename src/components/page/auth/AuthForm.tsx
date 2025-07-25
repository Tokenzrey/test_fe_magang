import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormLabel,
	FormControl,
	FormItem,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { Mail, Lock } from "lucide-react";
import { useLogin, useRegister } from "@/hooks/useAuthApi";
import { useAuthStore } from "@/store/auth";
import Typography from "@/components/ui/typography";

const loginSchema = z.object({
	email: z.string().email({ message: "Email tidak valid" }),
	password: z.string().min(6, { message: "Minimal 6 karakter" }),
});

const registerSchema = z
	.object({
		email: z.string().email({ message: "Email tidak valid" }),
		password: z.string().min(6, { message: "Minimal 6 karakter" }),
		confirmPassword: z.string().min(6),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Konfirmasi password tidak cocok.",
		path: ["confirmPassword"],
	});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export function LoginForm() {
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "" },
	});
	const loginMutation = useLogin();
	const authError = useAuthStore((s) => s.authError);
	const authLoading = useAuthStore((s) => s.authLoading);

	function onSubmit(values: LoginFormValues) {
		loginMutation.mutate(values);
	}

	const isLoading =
		authLoading ||
		loginMutation.status === "pending" ||
		(loginMutation as any).isPending;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								<Typography as="span" variant="s2">
									Email
								</Typography>
							</FormLabel>
							<FormControl>
								{/* Icon input wrapper */}
								<div className="relative">
									<div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
										<Mail size={16} />
									</div>
									<Input
										type="email"
										placeholder="you@example.com"
										className="pl-11"
										{...field}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								<Typography as="span" variant="s2">
									Password
								</Typography>
							</FormLabel>
							<FormControl>
								<div className="relative">
									<div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
										<Lock size={16} />
									</div>
									<Input
										type="password"
										placeholder="••••••••"
										className="pl-11"
										{...field}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{authError && (
					<FormDescription className="text-red-600 text-sm">
						{authError}
					</FormDescription>
				)}
				<Button type="submit" className="w-full" disabled={isLoading}>
					<Typography as="span" variant="s2" className="font-medium">
						{isLoading ? "Memproses..." : "Masuk"}
					</Typography>
				</Button>
			</form>
		</Form>
	);
}

export function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: { email: "", password: "", confirmPassword: "" },
	});
	const registerMutation = useRegister();
	const authLoading = useAuthStore((s) => s.authLoading);

	const isLoading =
		authLoading ||
		registerMutation.status === "pending" ||
		(registerMutation as any).isPending;

	function onSubmit(values: RegisterFormValues) {
		registerMutation.mutate(
			{ email: values.email, password: values.password },
			{
				onSuccess: () => {
					onSuccess?.();
				},
			}
		);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								<Typography as="span" variant="s2">
									Email
								</Typography>
							</FormLabel>
							<FormControl>
								<div className="relative">
									<div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
										<Mail size={16} />
									</div>
									<Input
										type="email"
										placeholder="anda@contoh.com"
										className="pl-11"
										{...field}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								<Typography as="span" variant="s2">
									Password
								</Typography>
							</FormLabel>
							<FormControl>
								<div className="relative">
									<div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
										<Lock size={16} />
									</div>
									<Input
										type="password"
										placeholder="Minimal 6 karakter"
										className="pl-11"
										{...field}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								<Typography as="span" variant="s2">
									Konfirmasi Password
								</Typography>
							</FormLabel>
							<FormControl>
								<div className="relative">
									<div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
										<Lock size={16} />
									</div>
									<Input
										type="password"
										placeholder="Ulangi password"
										className="pl-11"
										{...field}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{registerMutation.isSuccess && (
					<FormDescription className="text-green-600 text-sm">
						Registrasi berhasil! Silakan login.
					</FormDescription>
				)}
				{registerMutation.isError && (
					<FormDescription className="text-red-600 text-sm">
						{typeof registerMutation.error === "object" &&
						registerMutation.error &&
						"message" in registerMutation.error
							? (registerMutation.error as any).message
							: "Registrasi gagal."}
					</FormDescription>
				)}
				<Button type="submit" className="w-full" disabled={isLoading}>
					<Typography as="span" variant="s2" className="font-medium">
						{isLoading ? "Mendaftarkan..." : "Buat Akun"}
					</Typography>
				</Button>
			</form>
		</Form>
	);
}
