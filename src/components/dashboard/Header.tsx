'use client'

import { Menu, LogOut } from 'lucide-react'
import { useUIStore } from '@/lib/zustand-store'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  const { toggleSidebar } = useUIStore()

  const handleLogout = async () => {
    // Implement logout with Better Auth
    // await signOut()
    window.location.href = '/login'
  }

  return (
    <header className="h-16 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            aria-label="Toggle sidebar"
            title="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </header>
  )
}