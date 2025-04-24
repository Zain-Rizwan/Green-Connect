"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "@/components/sidebar-provider"
import { useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  Award,
  Calendar,
  Home,
  Leaf,
  Menu,
  Recycle,
  TreePine,
  Users,
  Building2,
  X,
  LogOut,
  Settings,
  BarChart3,
  ShieldCheck,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
// import { ThemeToggle } from "@/components/theme-toggle"

export function AppSidebar() {
  const pathname = usePathname()
  const { open, setOpen, mobileOpen, setMobileOpen } = useSidebar()
  const { user, logout, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  // Define routes based on user role
  const getRoutes = () => {
    // Common routes for all authenticated users
    const commonRoutes = [
      {
        label: "Dashboard",
        icon: Home,
        href: "/dashboard",
        color: "text-emerald-500",
      },
      {
        label: "My Profile",
        icon: Leaf,
        href: "/profile",
        color: "text-emerald-500",
      },
      {
        label: "Events",
        icon: Calendar,
        href: "/events",
        color: "text-emerald-500",
      },
    ]

    // Routes specific to EcoWarriors
    const ecoWarriorRoutes = [
      {
        label: "Projects",
        icon: Recycle,
        href: "/projects",
        color: "text-emerald-500",
      },
      {
        label: "Organizations",
        icon: Building2,
        href: "/organizations",
        color: "text-emerald-500",
      },
      {
        label: "Community",
        icon: Users,
        href: "/community",
        color: "text-emerald-500",
      },
      {
        label: "Leaderboard",
        icon: Award,
        href: "/leaderboard",
        color: "text-emerald-500",
      },
    ]

    // Routes specific to Organizations
    const organizationRoutes = [
      {
        label: "My Projects",
        icon: Recycle,
        href: "/projects/manage",
        color: "text-emerald-500",
      },
      {
        label: "My Events",
        icon: Calendar,
        href: "/events/manage",
        color: "text-emerald-500",
      },
      {
        label: "EcoWarriors",
        icon: Users,
        href: "/ecowarriors",
        color: "text-emerald-500",
      },
      {
        label: "Analytics",
        icon: BarChart3,
        href: "/analytics",
        color: "text-emerald-500",
      },
    ]

    // Routes specific to Admins
    const adminRoutes = [
      {
        label: "Admin Panel",
        icon: ShieldCheck,
        href: "/admin",
        color: "text-emerald-500",
      },
      {
        label: "User Management",
        icon: Users,
        href: "/admin/users",
        color: "text-emerald-500",
      },
      {
        label: "Content Moderation",
        icon: Calendar,
        href: "/admin/content",
        color: "text-emerald-500",
      },
      {
        label: "System Settings",
        icon: Settings,
        href: "/admin/settings",
        color: "text-emerald-500",
      },
    ]

    // If user is not logged in or still loading, show minimal routes
    if (isLoading || !user) {
      return [
        {
          label: "Home",
          icon: Home,
          href: "/",
          color: "text-emerald-500",
        },
        {
          label: "Login",
          icon: Leaf,
          href: "/login",
          color: "text-emerald-500",
        },
        {
          label: "Register",
          icon: Users,
          href: "/register",
          color: "text-emerald-500",
        },
      ]
    }

    // Return routes based on user role
    if (user.role === "admin") {
      return [...commonRoutes, ...adminRoutes]
    } else if (user.role === "organization") {
      return [...commonRoutes, ...organizationRoutes]
    } else {
      return [...commonRoutes, ...ecoWarriorRoutes]
    }
  }

  const routes = getRoutes()

  const handleLogout = async () => {
    await logout()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/login")
  }

  return (
    <>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0">
          <div className="flex flex-col h-full">
            <div className="px-3 py-4 flex items-center justify-between border-b">
              <div className="flex items-center gap-2">
                <TreePine className="h-6 w-6 text-emerald-600" />
                <span className="font-bold text-xl">GreenConnect</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-1 p-3">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-emerald-100 dark:hover:bg-emerald-900",
                      pathname === route.href ? "bg-emerald-100 dark:bg-emerald-900" : "",
                    )}
                  >
                    <route.icon className={cn("h-5 w-5", route.color)} />
                    {route.label}
                  </Link>
                ))}

                {user && (
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium justify-start mt-4 hover:bg-red-100 dark:hover:bg-red-900 text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Button>
                )}
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
      <div className={cn("hidden md:flex flex-col h-screen border-r transition-all", open ? "w-64" : "w-[70px]")}>
        <div className="px-3 py-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <TreePine className="h-6 w-6 text-emerald-600" />
            {open && <span className="font-bold text-xl">GreenConnect</span>}
          </div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-1 p-3">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-emerald-100 dark:hover:bg-emerald-900",
                  pathname === route.href ? "bg-emerald-100 dark:bg-emerald-900" : "",
                )}
              >
                <route.icon className={cn("h-5 w-5", route.color)} />
                {open && route.label}
              </Link>
            ))}

            {user && (
              <Button
                variant="ghost"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium justify-start mt-4 hover:bg-red-100 dark:hover:bg-red-900 text-red-600",
                  !open && "justify-center",
                )}
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                {open && "Logout"}
              </Button>
            )}
          </div>
        </ScrollArea>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="md:hidden fixed bottom-4 right-4 z-50 rounded-full shadow-lg"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>
    </>
  )
}
