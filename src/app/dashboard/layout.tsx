"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { AuthProvider, useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, getInitials } from "@/lib/utils";
import { navigation } from "@/config";
import {
  Brain,
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Settings,
  Bell,
  CreditCard,
  User,
  HelpCircle,
  LayoutDashboard,
  FolderOpen,
  Upload,
  Quote,
  BarChart3,
  Presentation,
  Search,
  MessageSquare,
  Bookmark,
  FileText,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  FolderOpen,
  Upload,
  Brain,
  Quote,
  BarChart3,
  Presentation,
  Search,
  MessageSquare,
  Bookmark,
  FileText,
  CreditCard,
  User,
  HelpCircle,
};

function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside
        className={cn(
          "hidden lg:flex flex-col border-r border-border bg-card/50 transition-all duration-300 fixed inset-y-0 left-0 z-30",
          sidebarOpen ? "w-64" : "w-[72px]"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center flex-shrink-0">
              <Brain className="w-4 h-4 text-white" />
            </div>
            {sidebarOpen && (
              <span className="text-lg font-bold whitespace-nowrap">
                Research<span className="gradient-text">AI</span>
              </span>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground cursor-pointer"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {sidebarOpen && (
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
                Research
              </p>
            )}
            {navigation.dashboard.map((item) => {
              const Icon = iconMap[item.icon] || LayoutDashboard;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    !sidebarOpen && "justify-center px-2"
                  )}
                  title={!sidebarOpen ? item.name : undefined}
                >
                  <Icon className={cn("w-4.5 h-4.5 flex-shrink-0", isActive && "text-primary")} />
                  {sidebarOpen && <span>{item.name}</span>}
                </Link>
              );
            })}
          </div>

          {/* Account Section */}
          <div className="mt-6 space-y-1">
            {sidebarOpen && (
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
                Account
              </p>
            )}
            {navigation.account.map((item) => {
              const Icon = iconMap[item.icon] || Settings;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    !sidebarOpen && "justify-center px-2"
                  )}
                  title={!sidebarOpen ? item.name : undefined}
                >
                  <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                  {sidebarOpen && <span>{item.name}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Plan Card */}
        {sidebarOpen && (
          <div className="p-3 border-t border-border">
            <div className="rounded-xl bg-gradient-to-br from-blue-600/10 to-violet-600/10 border border-primary/20 p-3">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold">
                  {user?.subscription?.plan?.name || "Free"} Plan
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mb-3">
                {user?.creditBalance?.amount ?? 0} credits remaining
              </p>
              <Link href="/dashboard/billing">
                <Button variant="outline" size="sm" className="w-full text-xs h-8">
                  Upgrade Plan
                </Button>
              </Link>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className={cn("flex-1 flex flex-col min-h-screen transition-all duration-300", sidebarOpen ? "lg:ml-64" : "lg:ml-[72px]")}>
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 h-16 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-4 lg:px-6">
          {/* Mobile menu */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-accent cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Page title area */}
          <div className="hidden lg:block" />

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              <Sun className="w-4 h-4 hidden dark:block" />
              <Moon className="w-4 h-4 block dark:hidden" />
            </button>

            <button className="p-2 rounded-lg hover:bg-accent transition-colors relative cursor-pointer" aria-label="Notifications">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                  {user?.name ? getInitials(user.name) : "U"}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 top-12 w-56 rounded-xl border border-border bg-card shadow-xl z-50 py-2 animate-fade-in">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium">{user?.name || "User"}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <Link
                        href="/dashboard/billing"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <CreditCard className="w-4 h-4" /> Billing
                      </Link>
                      <Link
                        href="/dashboard/support"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <HelpCircle className="w-4 h-4" /> Help & Support
                      </Link>
                    </div>
                    <div className="border-t border-border pt-1">
                      <button
                        onClick={logout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-accent transition-colors w-full cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
            <div className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border z-40 lg:hidden animate-slide-in-left overflow-y-auto">
              <div className="flex items-center justify-between h-16 px-4 border-b border-border">
                <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-bold">
                    Research<span className="gradient-text">AI</span>
                  </span>
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded-lg hover:bg-accent cursor-pointer" aria-label="Close menu">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="p-3 space-y-1">
                {navigation.dashboard.map((item) => {
                  const Icon = iconMap[item.icon] || LayoutDashboard;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="w-4.5 h-4.5" />
                      {item.name}
                    </Link>
                  );
                })}
                <div className="my-4 border-t border-border" />
                {navigation.account.map((item) => {
                  const Icon = iconMap[item.icon] || Settings;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="w-4.5 h-4.5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </>
        )}

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DashboardShell>{children}</DashboardShell>
    </AuthProvider>
  );
}
