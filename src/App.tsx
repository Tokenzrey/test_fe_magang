import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import type { FunctionComponent } from "./common/types";
import type { TanstackRouter } from "./main";
import { TanStackRouterDevelopmentTools } from "./components/utils/development-tools/TanStackRouterDevelopmentTools";
import { useDarkModeStore } from "./store/darkMode";
import { useEffect } from "react";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			refetchOnMount: false,
			staleTime: 1000 * 60 * 5,
		},
	},
});

type AppProps = { router: TanstackRouter };

const App = ({ router }: AppProps): FunctionComponent => {
	const isDarkMode = useDarkModeStore((state) => state.isDarkMode);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDarkMode);
	}, [isDarkMode]);
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<Toaster />
			<TanStackRouterDevelopmentTools
				initialIsOpen={false}
				position="bottom-left"
				router={router}
			/>
			<ReactQueryDevtools initialIsOpen={false} position="bottom" />
		</QueryClientProvider>
	);
};

export default App;
