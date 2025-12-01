import React, { useState } from 'react';
import AdminSidebar from '../AdminSidebar';
import InternalHeader from './InternalHeader';
import { Bars3Icon } from '@heroicons/react/24/outline';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <InternalHeader />
      <div className="flex relative pt-20">
      {/* Desktop Sidebar - Collapsible, starts exactly below header (80px) - no gap */}
      <div className={`hidden lg:block fixed left-0 top-[80px] h-[calc(100vh-80px)] z-40 shadow-xl transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-0'
      }`}>
        <div className={`h-full bg-white border-r border-gray-200 ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
          <AdminSidebar onToggle={() => setSidebarOpen(!sidebarOpen)} />
        </div>
      </div>

      {/* Hamburger Icon - Show when sidebar is closed */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="hidden lg:flex fixed left-4 top-[100px] z-50 bg-white border border-gray-200 rounded-md p-2 shadow-md hover:bg-gray-50 transition-colors"
          title="Open Sidebar"
        >
          <Bars3Icon className="h-6 w-6 text-gray-600" />
        </button>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed left-0 top-[80px] h-[calc(100vh-80px)] w-64 z-50 transition-transform duration-300 lg:hidden shadow-xl`}>
        <AdminSidebar onLinkClick={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className={`flex-1 w-full transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        <div className="w-full py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminLayout;

