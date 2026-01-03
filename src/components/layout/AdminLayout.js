import React, { useState } from 'react';
import AdminSidebar from '../AdminSidebar';
import InternalHeader from './InternalHeader';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <InternalHeader />
      
      <div className="flex relative" style={{ paddingTop: '90px' }}>
        {/* Desktop Sidebar - Optimized Design */}
        <aside 
          className={`hidden lg:block fixed left-0 z-40 transition-all duration-200 ${
            sidebarOpen ? 'w-64' : 'w-20'
          }`}
          style={{ top: '90px', height: 'calc(100vh - 90px)' }}
        >
          <div className={`h-full bg-white border-r border-gray-200 shadow-lg relative overflow-hidden ${
            sidebarOpen ? 'w-64' : 'w-20'
          }`}>
            {/* Clickable overlay when collapsed - click anywhere to expand */}
            {!sidebarOpen && (
              <div 
                className="absolute inset-0 z-50 cursor-pointer"
                onClick={() => setSidebarOpen(true)}
                title="Click to expand sidebar"
              ></div>
            )}
            
            {/* Sidebar Content */}
            <div className="h-full relative z-40">
              <AdminSidebar 
                onToggle={() => setSidebarOpen(!sidebarOpen)} 
                isCollapsed={!sidebarOpen}
                onLogoClick={() => sidebarOpen && setSidebarOpen(false)}
              />
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Mobile Sidebar - Optimized */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed left-0 w-64 z-40 transition-transform duration-200 lg:hidden shadow-lg bg-white border-r border-gray-200`}
        style={{ top: '90px', height: 'calc(100vh - 90px)' }}>
          <AdminSidebar onLinkClick={() => setSidebarOpen(false)} />
        </aside>

        {/* Main Content Area - Optimized */}
        <main className={`flex-1 w-full transition-all duration-200 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        }`} style={{ minWidth: 0 }}>
          <div className="w-full min-h-[calc(100vh-5rem)] py-6 px-4 sm:px-6 lg:px-8" style={{ minWidth: 0, overflowX: 'auto' }}>
            <div className="max-w-7xl mx-auto" style={{ minWidth: 0 }}>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

