
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Dumbbell, 
  Play, 
  BarChart2,
  LogOut
} from 'lucide-react';

const AppSidebar = () => {
  const location = useLocation();
  const isOnboarding = location.pathname === '/onboarding';
  const isLanding = location.pathname === '/';
  
  // Don't show sidebar on landing or onboarding
  if (isOnboarding || isLanding) {
    return null;
  }

  const menuItems = [
    {
      title: 'Dashboard',
      icon: Home,
      path: '/dashboard',
    },
    {
      title: 'Workouts',
      icon: Dumbbell,
      path: '/workout-customization',
    },
    {
      title: 'Start Workout',
      icon: Play,
      path: '/workout/1', // Example workout ID
    },
    {
      title: 'Progress',
      icon: BarChart2,
      path: '/progress',
    },
  ];

  return (
    <nav className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-16 bg-background border-r border-border flex flex-col justify-between">
      <div className="flex flex-col items-center py-4 gap-6">
        {menuItems.map((item) => (
          <Link 
            key={item.title}
            to={item.path}
            className={`p-2 rounded-md hover:bg-muted transition-colors relative group ${
              location.pathname === item.path ? 'bg-muted text-primary' : 'text-muted-foreground'
            }`}
            title={item.title}
          >
            <item.icon size={20} />
            <span className="absolute left-full ml-2 bg-background border border-border text-sm px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
      <div className="p-4">
        <button 
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors group relative"
          title="Logout"
        >
          <LogOut size={20} />
          <span className="absolute left-full ml-2 bg-background border border-border text-sm px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap">
            Logout
          </span>
        </button>
      </div>
    </nav>
  );
};

export default AppSidebar;
