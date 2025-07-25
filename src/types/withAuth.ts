export type WithAuthOptions = {
    allowedRoles?: string[]; // e.g. ["ADMIN", "USER"]
    fallback?: React.ReactNode; // custom fallback if not authorized
    loadingComponent?: React.ReactNode;
};