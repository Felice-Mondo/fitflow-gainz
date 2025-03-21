import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Calendar, Award, TrendingUp, ListFilter, Calendar as CalendarIcon, ArrowRight, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for charts
const weeklyWorkouts = [
  { name: 'Mon', workouts: 1 },
  { name: 'Tue', workouts: 2 },
  { name: 'Wed', workouts: 0 },
  { name: 'Thu', workouts: 3 },
  { name: 'Fri', workouts: 1 },
  { name: 'Sat', workouts: 0 },
  { name: 'Sun', workouts: 2 },
];

const monthlyWorkouts = [
  { name: 'Week 1', workouts: 5 },
  { name: 'Week 2', workouts: 8 },
  { name: 'Week 3', workouts: 6 },
  { name: 'Week 4', workouts: 9 },
];

const weightData = [
  { date: '1 Jun', weight: 82 },
  { date: '8 Jun', weight: 81.5 },
  { date: '15 Jun', weight: 80.8 },
  { date: '22 Jun', weight: 79.6 },
  { date: '29 Jun', weight: 79.2 },
  { date: '6 Jul', weight: 78.4 },
  { date: '13 Jul', weight: 77.9 },
  { date: '20 Jul', weight: 77.2 },
];

const workoutTypeData = [
  { name: 'Strength', value: 45 },
  { name: 'Cardio', value: 30 },
  { name: 'HIIT', value: 15 },
  { name: 'Flexibility', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const achievements = [
  {
    id: 1,
    title: '10 Workouts Completed',
    description: 'You\'ve completed 10 workouts!',
    date: '2 days ago',
    icon: Award,
  },
  {
    id: 2,
    title: 'Weight Loss Goal',
    description: 'You\'ve lost 5kg since you started!',
    date: '1 week ago',
    icon: TrendingUp,
  },
  {
    id: 3,
    title: 'Consistency Champion',
    description: 'You\'ve worked out 3 times per week for 4 weeks!',
    date: '2 weeks ago',
    icon: Calendar,
  },
];

const recentWorkouts = [
  { 
    id: 1, 
    name: 'Full Body Strength', 
    date: 'Today',
    duration: '45 min',
    calories: 320,
    exercises: 8
  },
  { 
    id: 2, 
    name: 'HIIT Cardio', 
    date: 'Yesterday',
    duration: '30 min',
    calories: 280,
    exercises: 6
  },
  { 
    id: 3, 
    name: 'Upper Body Focus', 
    date: '3 days ago',
    duration: '40 min',
    calories: 260,
    exercises: 7
  },
  { 
    id: 4, 
    name: 'Core Crusher', 
    date: '5 days ago',
    duration: '20 min',
    calories: 150,
    exercises: 5
  },
];

const Progress = () => {
  const [timeRange, setTimeRange] = useState('week');
  
  return (
    <div className="container py-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Progress Tracking</h1>
          <p className="text-muted-foreground">Track your fitness journey and achievements</p>
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="3month">Last 3 Months</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Custom Range
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-3xl font-bold">24</span>
                <span className="text-muted-foreground text-sm">
                  <span className="text-green-500">+12%</span> vs previous {timeRange}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Minutes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-3xl font-bold">720</span>
                <span className="text-muted-foreground text-sm">
                  <span className="text-green-500">+8%</span> vs previous {timeRange}
                </span>
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
                <span className="text-3xl font-bold">5,240</span>
                <span className="text-muted-foreground text-sm">
                  <span className="text-green-500">+15%</span> vs previous {timeRange}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <Tabs defaultValue="activity">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="measurements">Measurements</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Workout Frequency</CardTitle>
                <CardDescription>Number of workouts per {timeRange === 'week' ? 'day' : 'week'}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  <ChartContainer
                    config={{
                      workouts: {
                        label: "Workouts",
                        color: "hsl(var(--primary))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={timeRange === 'week' ? weeklyWorkouts : monthlyWorkouts}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="name"
                          tickLine={false}
                          axisLine={true}
                        />
                        <YAxis 
                          tickLine={false} 
                          axisLine={true}
                          allowDecimals={false}
                          domain={[0, 'dataMax + 1']}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value} workouts`, 'Workouts']}
                          labelFormatter={(label) => `${label}`}
                        />
                        <Legend />
                        <ReferenceLine y={0} stroke="#000" />
                        <Bar 
                          dataKey="workouts" 
                          fill="hsl(var(--primary))" 
                          radius={[4, 4, 0, 0]} 
                          className="fill-primary"
                          animationDuration={1500}
                          name="Workouts"
                        >
                          {(timeRange === 'week' ? weeklyWorkouts : monthlyWorkouts).map((entry, index) => (
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
          </TabsContent>
          
          <TabsContent value="measurements" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Weight Progress</CardTitle>
                <CardDescription>Track your weight changes over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  <ChartContainer
                    config={{
                      weight: {
                        label: "Weight (kg)",
                        color: "hsl(var(--primary))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={weightData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                        <Tooltip formatter={(value) => [`${value} kg`, 'Weight']} />
                        <Legend />
                        <Line 
                          name="Weight (kg)"
                          type="monotone" 
                          dataKey="weight" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                          activeDot={{ r: 6, stroke: "hsl(var(--primary))", fill: "white", strokeWidth: 2 }}
                          animationDuration={1500}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="breakdown" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Workout Type Breakdown</CardTitle>
                <CardDescription>Distribution of your workout categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full flex items-center justify-center">
                  <div className="w-full max-w-lg h-full flex flex-col md:flex-row items-center justify-center">
                    <ResponsiveContainer width={200} height={200}>
                      <PieChart>
                        <Pie
                          data={workoutTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          animationDuration={1500}
                          nameKey="name"
                        >
                          {workoutTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                        <Legend 
                          layout="vertical" 
                          verticalAlign="middle" 
                          align="right"
                          payload={
                            workoutTypeData.map((item, index) => ({
                              id: item.name,
                              type: 'square',
                              value: `${item.name} (${item.value}%)`,
                              color: COLORS[index % COLORS.length]
                            }))
                          }
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Workouts</CardTitle>
              <CardDescription>Your latest training sessions</CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-2">
                {recentWorkouts.map((workout) => (
                  <div 
                    key={workout.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors"
                  >
                    <div className="flex-1 mb-2 sm:mb-0">
                      <h4 className="text-base font-medium">{workout.name}</h4>
                      <div className="flex flex-wrap gap-x-4 text-xs text-muted-foreground">
                        <span>{workout.date}</span>
                        <span>{workout.duration}</span>
                        <span>{workout.calories} kcal</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Workouts <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your fitness milestones</CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-2">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-start p-3 hover:bg-muted rounded-lg transition-colors"
                  >
                    <div className="mr-3 p-2 rounded-full bg-primary/10">
                      <achievement.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-base font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <span className="text-xs text-muted-foreground">{achievement.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                All Achievements <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Progress;
