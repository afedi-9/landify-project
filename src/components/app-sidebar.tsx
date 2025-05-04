"use client"

import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { useSidebar } from "./sidebar-provider"
import { Button } from "./ui/button"
import { Sheet, SheetContent } from "./ui/sheet"
import { cn } from "../lib/utils"
import {
  Building,
  Globe,
  Home,
  Landmark,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeft,
  Settings,
  Shield,
  Users,
} from "lucide-react"
import { useAuth } from "./auth-provider"

export function AppSidebar() {
  const location = useLocation()
  const pathname = location.pathname
  const { isMobile, state, openMobile, setOpenMobile, toggleSidebar } = useSidebar()
  const { user, logout, isAuthenticated } = useAuth()

  // Don't show sidebar on auth pages
  if (pathname.startsWith("/auth/")) {
    return null
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, requiresAuth: true },
    { name: "Property Mapping", href: "/mapping", icon: Globe, requiresAuth: true },
    { name: "Tokenization", href: "/tokenize", icon: Landmark, requiresAuth: true },
    { name: "My Properties", href: "/properties", icon: Building, requiresAuth: true },
    { name: "Transactions", href: "/transactions", icon: Shield, requiresAuth: true },
    { name: "Settings", href: "/settings", icon: Settings, requiresAuth: true },
  ]

  // Filter nav items based on authentication status
  const filteredNavItems = navItems.filter((item) => !item.requiresAuth || isAuthenticated)

  if (isMobile) {
    return (
      <>
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 md:hidden" onClick={toggleSidebar}>
          <Menu className="h-6 w-6" />
        </Button>

        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent
            side="left"
            className="w-[--sidebar-width] bg-white dark:bg-slate-950 p-0 border-r"
            style={{ "--sidebar-width": "18rem" } as React.CSSProperties}
          >
            <div className="flex h-full w-full flex-col">
              <div className="flex h-16 items-center border-b px-6">
                <Link
                  to="/"
                  className="flex items-center gap-2 font-bold text-xl text-emerald-600 dark:text-emerald-500"
                >
                  <Landmark className="h-6 w-6" />
                  <span>Landify</span>
                </Link>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <nav className="grid gap-1 px-2">
                  {filteredNavItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        isActive(item.href)
                          ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-50"
                          : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>
              {isAuthenticated ? (
                <div className="border-t p-4">
                  <div className="flex items-center gap-3 rounded-lg px-3 py-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                      <Users className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start mt-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="border-t p-4">
                  <Link to="/auth/signin">
                    <Button className="w-full">Sign In</Button>
                  </Link>
                  <div className="mt-2 text-center text-sm text-slate-500">
                    Don&apos;t have an account?{" "}
                    <Link to="/auth/signup" className="text-emerald-600 hover:underline">
                      Sign Up
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return (
    <div className="group peer hidden md:block text-slate-900 dark:text-slate-200" data-state={state}>
      <div className="duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear group-data-[state=collapsed]:w-[--sidebar-width-icon]" />
      <div className="duration-200 fixed inset-y-0 left-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex group-data-[state=collapsed]:w-[--sidebar-width-icon] border-r">
        <div className="flex h-full w-full flex-col bg-white dark:bg-slate-950">
          {/* Header */}
          <div className="flex h-16 items-center border-b px-6 group-data-[state=collapsed]:justify-center">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-emerald-600 dark:text-emerald-500">
              <Landmark className="h-6 w-6" />
              <span className="group-data-[state=collapsed]:hidden">Landify</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto group-data-[state=collapsed]:hidden"
              onClick={toggleSidebar}
            >
              <PanelLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive(item.href)
                      ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-50"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="group-data-[state=collapsed]:hidden">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* User Profile */}
          {isAuthenticated ? (
            <div className="border-t p-4 group-data-[state=collapsed]:p-2 group-data-[state=collapsed]:flex group-data-[state=collapsed]:justify-center">
              <div className="flex items-center gap-3 rounded-lg px-3 py-2 group-data-[state=collapsed]:p-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
                  <Users className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
                </div>
                <div className="group-data-[state=collapsed]:hidden">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start mt-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 group-data-[state=collapsed]:hidden"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="border-t p-4 group-data-[state=collapsed]:p-2">
              <Link to="/auth/signin">
                <Button className="w-full group-data-[state=collapsed]:p-2 group-data-[state=collapsed]:h-10">
                  <span className="group-data-[state=collapsed]:hidden">Sign In</span>
                  <Users className="hidden group-data-[state=collapsed]:block h-5 w-5" />
                </Button>
              </Link>
              <div className="mt-2 text-center text-sm text-slate-500 group-data-[state=collapsed]:hidden">
                Don&apos;t have an account?{" "}
                <Link to="/auth/signup" className="text-emerald-600 hover:underline">
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
