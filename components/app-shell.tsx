"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLang } from "@/lib/context/lang-context";
import { useAuth } from "@/lib/context/auth-context";
import { Home, ClipboardList, MapPin, Users, CalendarCheck, Lightbulb, LogIn, LogOut, User as UserIcon } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, labelKey: "welcome" as const, emoji: "🏠" },
  { href: "/register", icon: ClipboardList, labelKey: "registration" as const, emoji: "📝" },
  { href: "/booth", icon: MapPin, labelKey: "findBooth" as const, emoji: "📍" },
  { href: "/candidates", icon: Users, labelKey: "candidates" as const, emoji: "👤" },
  { href: "/poll-day", icon: CalendarCheck, labelKey: "pollDay" as const, emoji: "🗓️" },
  { href: "/myths", icon: Lightbulb, labelKey: "myths" as const, emoji: "💡" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { dict } = useLang();
  const { user, signInWithGoogle, logout } = useAuth();

  return (
    <div className="flex min-h-[100dvh] bg-muted/30">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-[280px] md:shrink-0 bg-background border-r sticky top-0 h-[100dvh]">
        <div className="p-6 border-b">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-3xl">🗳️</span>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight">Election Sathi</h1>
              <p className="text-xs text-muted-foreground">
                {dict.askMe ? dict.askMe.substring(0, 30) + '...' : 'Voter Education Assistant'}
              </p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            const label = item.labelKey === "welcome"
              ? dict.home
              : (dict as Record<string, string>)[item.labelKey] || item.labelKey;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t space-y-4">
          {user ? (
            <div className="flex items-center gap-3 px-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || "User"} className="h-full w-full object-cover" />
                ) : (
                  <UserIcon className="h-4 w-4 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user.displayName || "User"}</p>
                <button 
                  onClick={() => logout()}
                  className="text-[10px] text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
                >
                  <LogOut className="h-3 w-3" /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => signInWithGoogle()}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm active:scale-[0.98]"
            >
              <LogIn className="h-4 w-4" /> Sign In
            </button>
          )}
          <p className="text-[10px] text-muted-foreground text-center pt-2 border-t border-muted/50">
            Election Sathi • Powered by Gemini
          </p>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-[100dvh] md:min-h-0">
        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between px-4 h-14 bg-background/80 backdrop-blur-md border-b sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <span className="text-xl">🗳️</span>
            <span className="font-bold text-sm tracking-tight">Election Sathi</span>
          </div>
          {user ? (
            <button 
              onClick={() => logout()}
              className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20"
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <UserIcon className="h-4 w-4 text-primary" />
              )}
            </button>
          ) : (
            <button 
              onClick={() => signInWithGoogle()}
              className="text-xs font-semibold text-primary px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors flex items-center gap-1.5"
            >
              <LogIn className="h-3.5 w-3.5" /> Sign In
            </button>
          )}
        </header>
        {children}
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around items-center h-16 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const label = item.labelKey === "welcome"
            ? dict.home
            : (dict as Record<string, string>)[item.labelKey] || item.labelKey;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 px-1 py-1 rounded-lg transition-colors flex-1 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[9px] font-medium text-center line-clamp-1">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
