"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Home, Info, BookOpen, FileQuestion, Menu, X } from "lucide-react";
import { ThemeModeToggle } from "@/components/ui/theme-toggle";
// import { AppInitializer } from "@/components/app-initializer";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: <Home className="mr-2 h-4 w-4" />,
      active: pathname === "/",
    },
    {
      href: "/about",
      label: "About",
      icon: <Info className="mr-2 h-4 w-4" />,
      active: pathname === "/about",
    },
    {
      href: "/courses",
      label: "Courses",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
      active: pathname === "/courses" || pathname.startsWith("/courses/"),
    },
    {
      href: "/quizzes",
      label: "Quizzes",
      icon: <FileQuestion className="mr-2 h-4 w-4" />,
      active: pathname === "/quizzes" || pathname.startsWith("/quiz/"),
    },
  ];

  return (
    <>
      {/* Include the AppInitializer here as well for redundancy */}
      {/* <AppInitializer /> */}

      <header className="flex items-center justify-between sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60  md:px-16 px-4 md:py-3 py-4">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-clr bg-clip-text text-transparent">
            Amoa
          </span>
        </Link>

        {/* Desktop Navigation */}
        <menu className="hidden md:flex items-center space-x-16 ">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center text-base font-medium transition-colors hover:text-primary-clr",
                route.active
                  ? "text-primary-clr border-b-2 border-primary-clr"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </menu>
        <div className="flex items-center gap-2">
          <div className="md:flex hidden items-center  space-x-4 ">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button
              size="sm"
              asChild
              className="bg-primary-clr hover:bg-primary-clr/80"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
            <ThemeModeToggle />
          </div>
          {/* Mobile Navigation */}
          <div className="md:hidden flex flex-1 justify-end">
            {isMobileMenuOpen ? (
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="mr-4"
              >
                <X className="h-8 w-8 font-bold text-primary-clr" />
              </button>
            ) : (
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="mr-4"
              >
                <Menu className="h-8 w-8 text-primary-clr" />
              </button>
            )}
            <ThemeModeToggle />
            {isMobileMenuOpen && (
              <div className="absolute top-16 left-0 right-0 bg-background border-b p-4 shadow-lg">
                <nav className="flex flex-col space-y-4">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "flex items-center text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                        route.active
                          ? "bg-muted text-primary"
                          : "text-muted-foreground"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {route.icon}
                      {route.label}
                    </Link>
                  ))}
                  <div className="border-t pt-4 mt-2">
                    <div className="flex items-center  space-x-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button
                        size="sm"
                        asChild
                        className="bg-primary-clr hover:bg-primary-clr/80"
                      >
                        <Link href="/signup">Sign Up</Link>
                      </Button>
                    </div>
                  </div>
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
