import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, Dumbbell, Clock, BarChart2, Award, Plus, Flame } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, CartesianGrid } from 'recharts';

// Mock data for demonstration
const activityData = [
  { day: 'Mon', workouts: 2 },
  { day: 'Tue', workouts: 0 },
  { day: 'Wed', workouts: 1 },
  { day: 'Thu', workouts: 3 },
  { day: 'Fri', workouts: 2 },
  { day: 'Sat', workouts: 0 },
  { day: 'Sun', workouts: 1 },
];

const upcomingWorkouts = [
  { id: 1, name: 'Full Body Strength', time: 'Today, 5:30 PM', duration: '45 min' },
  { id: 2, name: 'Cardio Blast', time: 'Tomorrow, 6:00 AM', duration: '30 min' },
  { id: 3, name: 'Core Focus', time: 'Thu, 7:00 PM', duration: '20 min' },
];

const recentAchievements = [
  { id: 1, title: '5 Workouts Completed', description: 'You\'ve completed 5 workouts!', date: '2 days ago' },
  { id: 2, title: 'New Personal Best', description: 'You lifted 10% more than last time!', date: '1 week ago' },
];

const Dashboard = () => {
  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  });
  
  // Mock user data
  const user = {
    name: 'Alex',
    streak: 5,
    level: 'Intermediate',
    lastWorkout: 'Yesterday',
    nextWorkout: 'Today, 5:30 PM',
  };

  return (
    <div className="container py-8 max-w-6xl mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{greeting}, {user.name}</h1>
            <p className="text-muted-foreground">
              {user.streak > 0 ? 
                `You're on a ${user.streak}-day streak! Keep it up!` : 
                'Start your fitness journey today!'}
            </p>
          </div>
          <Button size="lg" className="flex items-center" asChild>
            <Link to="/workout-customization">
              <Dumbbell className="mr-2 h-5 w-5" />
              Start Workout
            </Link>
          </Button>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Weekly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">9</span>
                  <span className="text-muted-foreground text-sm">Workouts</span>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">5.2</span>
                  <span className="text-muted-foreground text-sm">Hours</span>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Calories Burned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">1,240</span>
                  <span className="text-muted-foreground text-sm">Calories</span>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Flame className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Your workout sessions this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ChartContainer
                  config={{
                    workouts: {
                      label: "Workouts",
                      color: "hsl(var(--primary))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="day"
                        tickLine={false}
                        axisLine={true}
                        padding={{ left: 10, right: 10 }}
                      />
                      <YAxis 
                        tickLine={false} 
                        axisLine={true}
                        allowDecimals={false}
                        domain={[0, 'dataMax + 1']}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                      Day
                                    </span>
                                    <span className="font-bold text-muted-foreground">
                                      {payload[0].payload.day}
                                    </span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                      Workouts
                                    </span>
                                    <span className="font-bold">
                                      {payload[0].value}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar
                        dataKey="workouts"
                        radius={[4, 4, 0, 0]}
                        className="fill-primary"
                        animationDuration={1500}
                      >
                        {activityData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            className={entry.workouts > 0 ? "fill-primary" : "fill-primary/30"} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Upcoming Workouts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Upcoming Workouts</CardTitle>
              <CardDescription>Your scheduled training sessions</CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-2">
                {upcomingWorkouts.map((workout) => (
                  <div 
                    key={workout.id}
                    className="flex items-center p-3 cursor-pointer hover:bg-muted rounded-lg transition-colors"
                  >
                    <div className="mr-3 p-2 rounded-full bg-primary/10">
                      <Dumbbell className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-medium">{workout.name}</h4>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{workout.time}</span>
                        <span className="flex items-center">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {workout.duration}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/workout-customization">
                  <Plus className="mr-2 h-4 w-4" />
                  Plan New Workout
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Achievements */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Your latest fitness milestones</CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-2">
                {recentAchievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className="flex items-center p-3 hover:bg-muted rounded-lg transition-colors"
                  >
                    <div className="mr-3 p-2 rounded-full bg-primary/10">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <span className="text-xs text-muted-foreground">{achievement.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/progress">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  View All Progress
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/workout-customization">
                  <Plus className="mr-2 h-4 w-4" /> Create Custom Workout
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" /> Schedule Workout
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/progress">
                  <BarChart2 className="mr-2 h-4 w-4" /> Track Progress
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
