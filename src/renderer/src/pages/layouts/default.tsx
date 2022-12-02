import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import * as Collapsible from '@radix-ui/react-collapsible'
import { useState } from 'react'

export function Default() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <Collapsible.Root
      defaultOpen
      className="h-screen w-screen bg-rotion-900 text-rotion-900 flex"
      onOpenChange={setIsSidebarOpen}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header isSidebarOpen={isSidebarOpen} />
        <Outlet />x
      </div>
    </Collapsible.Root>
  )
}

export default Default
