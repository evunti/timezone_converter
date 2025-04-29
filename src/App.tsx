import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Header } from "./components/layout/Header";
import { TimezoneConverter } from "./components/timezone/TimezoneConverter";
import { Toaster } from "sonner";
import { SignInForm } from "./SignInForm";

export default function App() {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  if (loggedInUser === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-8 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex flex-col gap-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold accent-text mb-4">
                Timezone Converter
              </h1>
              <Authenticated>
                <p className="text-xl text-slate-600">
                  Select "From" or "To" timezone, then click a location on the
                  map
                </p>
              </Authenticated>
              <Unauthenticated>
                <p className="text-xl text-slate-600">Sign in to get started</p>
              </Unauthenticated>
            </div>

            <Unauthenticated>
              <SignInForm />
            </Unauthenticated>

            <Authenticated>
              <TimezoneConverter />
            </Authenticated>
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
