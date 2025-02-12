"use client";
import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuTrigger , DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { DropdownMenuContent } from "./ui/dropdown-menu";
export default function ThemeToggle() {
  const { setTheme } = useTheme();
  return(
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon">
        <Sun className="size -[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"></Sun>
        <Moon className="size -[1.2rem] absolute rotate-90 scale-0 transition-all dark:scale-100 dark:rotate-0"></Moon>
        <span className="sr-only">Theme Toggle</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={()=> setTheme('light')}>
            Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=> setTheme('dark')}>
            Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=> setTheme('system')}>
            Default System
        </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  );
}
