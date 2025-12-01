import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  TagIcon,
  WrenchScrewdriverIcon,
  UsersIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';

const AdminSidebar = ({ onLinkClick, onToggle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Role-based navigation - same as InternalHeader
  const getRoleBasedNavigation = () => {
    if (!user) return [];

    const baseNavigation = [
      { name: 'Profile', href: '/profile', icon: UserCircleIcon },
      { name: 'Sign out', href: '#', icon: ArrowRightOnRectangleIcon, action: logout },
    ];

    if (user.role === 'admin') {
      return [
        { name: 'Admin Dashboard', href: '/admin/dashboard', icon: Cog6ToothIcon },
        { name: 'All Inquiries', href: '/inquiries', icon: DocumentTextIcon },
        { name: 'Order Management', href: '/admin/orders', icon: ClipboardDocumentListIcon },
        ...baseNavigation
      ];
    } else if (user.role === 'backoffice') {
      return [
        { name: 'Back Office Dashboard', href: '/admin/dashboard', icon: BuildingOfficeIcon },
        { name: 'All Inquiries', href: '/inquiries', icon: DocumentTextIcon },
        { name: 'Order Management', href: '/admin/orders', icon: ClipboardDocumentListIcon },
        ...baseNavigation
      ];
    } else if (user.role === 'subadmin') {
      return [
        { name: 'Sub Admin Dashboard', href: '/admin/dashboard', icon: Cog6ToothIcon },
        { name: 'All Inquiries', href: '/inquiries', icon: DocumentTextIcon },
        ...baseNavigation
      ];
    } else {
      // Customer navigation
      return [
        { name: 'Dashboard', href: '/dashboard', icon: Cog6ToothIcon },
        { name: 'New Inquiry', href: '/inquiry/new', icon: ClipboardDocumentListIcon },
        { name: 'My Inquiries', href: '/inquiries', icon: ClipboardDocumentListIcon },
        { name: 'My Orders', href: '/orders', icon: ShoppingCartIcon },
        ...baseNavigation
      ];
    }
  };

  const navigationItems = getRoleBasedNavigation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (href) => {
    if (href === '#') return false;
    // Check if href matches current pathname
    if (href.includes('?')) {
      const [path, query] = href.split('?');
      const [param, value] = query.split('=');
      const currentParams = new URLSearchParams(location.search);
      return location.pathname === path && currentParams.get(param) === value;
    }
    return location.pathname === href;
  };

  return (
    <div className="w-full h-full bg-white shadow-lg border-r border-gray-200 flex flex-col">
      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto px-4 py-4 admin-sidebar-scroll">
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            if (item.action) {
              return (
                <button
                  key={item.name}
                  onClick={handleLogout}
                  className="w-full px-4 py-3 rounded-lg font-medium text-sm flex items-center space-x-3 transition-all duration-200 text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                >
                  <Icon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </button>
              );
            }

            const isDashboard = item.name === 'Dashboard' || item.name === 'Admin Dashboard' || item.name === 'Back Office Dashboard' || item.name === 'Sub Admin Dashboard';
            
            return (
              <div key={item.name} className="relative">
                <Link
                  to={item.href}
                  onClick={() => {
                    // Only close sidebar on mobile when link is clicked
                    if (onLinkClick && window.innerWidth < 1024) {
                      onLinkClick();
                    }
                  }}
                  className={`w-full px-4 py-3 rounded-lg font-medium text-sm flex items-center space-x-3 transition-all duration-200 relative ${
                    active
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`h-5 w-5 flex-shrink-0 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="flex-1 truncate">{item.name}</span>
                  {/* Hamburger Icon - Only for Dashboard tab, positioned on right */}
                  {isDashboard && onToggle && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggle();
                      }}
                      className="ml-auto p-1.5 rounded-md text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors flex-shrink-0"
                      title="Toggle Sidebar"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  )}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>

      {/* User Section at Bottom */}
      <div className="px-4 py-4 border-t border-gray-200 flex-shrink-0 bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <UserCircleIcon className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-900 text-sm font-medium truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-gray-500 text-xs truncate">
              {user?.role === 'admin' ? 'Administrator' : user?.role === 'backoffice' ? 'Back Office' : user?.role === 'subadmin' ? 'Sub Admin' : 'User'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;

