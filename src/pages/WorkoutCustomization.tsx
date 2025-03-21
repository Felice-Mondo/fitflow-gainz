
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Clock, Filter, Search, Plus, Trash2, ArrowRight, Save, PlayCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Mock data
const workoutTemplates = [
  { 
    id: 1, 
    name: 'Full Body Strength', 
    description: 'A complete workout targeting all major muscle groups',
    duration: '45 min',
    level: 'Intermediate',
    category: 'strength',
    exercises: 8
  },
  { 
    id: 2, 
    name: 'HIIT Cardio', 
    description: 'High-intensity interval training to burn calories fast',
    duration: '30 min',
    level: 'Advanced',
    category: 'cardio',
    exercises: 6
  },
  { 
    id: 3, 
    name: 'Core Crusher', 
    description: 'Focus on abdominal and core muscles for better stability',
    duration: '20 min',
    level: 'Beginner',
    category: 'core',
    exercises: 5
  },
  { 
    id: 4, 
    name: 'Upper Body Power', 
    description: 'Build strength in your chest, back, shoulders and arms',
    duration: '40 min',
    level: 'Intermediate',
    category: 'strength',
    exercises: 7
  },
  { 
    id: 5, 
    name: 'Lower Body Focus', 
    description: 'Target your legs, glutes and calves for more power',
    duration: '35 min',
    level: 'Intermediate',
    category: 'strength',
    exercises: 6
  },
];

const exerciseLibrary = [
  { 
    id: 1, 
    name: 'Push-Ups', 
    category: 'strength',
    target: 'chest',
    equipment: 'none',
    difficulty: 'beginner'
  },
  { 
    id: 2, 
    name: 'Squats', 
    category: 'strength',
    target: 'legs',
    equipment: 'none',
    difficulty: 'beginner'
  },
  { 
    id: 3, 
    name: 'Mountain Climbers', 
    category: 'cardio',
    target: 'full body',
    equipment: 'none',
    difficulty: 'intermediate'
  },
  { 
    id: 4, 
    name: 'Plank', 
    category: 'core',
    target: 'abs',
    equipment: 'none',
    difficulty: 'beginner'
  },
  { 
    id: 5, 
    name: 'Burpees', 
    category: 'cardio',
    target: 'full body',
    equipment: 'none',
    difficulty: 'advanced'
  },
  { 
    id: 6, 
    name: 'Dumbbell Rows', 
    category: 'strength',
    target: 'back',
    equipment: 'dumbbells',
    difficulty: 'intermediate'
  },
  { 
    id: 7, 
    name: 'Lunges', 
    category: 'strength',
    target: 'legs',
    equipment: 'none',
    difficulty: 'beginner'
  },
  { 
    id: 8, 
    name: 'Deadlifts', 
    category: 'strength',
    target: 'back',
    equipment: 'barbell',
    difficulty: 'intermediate'
  },
];

const WorkoutCustomization = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState<null | typeof workoutTemplates[0]>(null);
  const [customWorkout, setCustomWorkout] = useState<{
    name: string;
    exercises: Array<{
      id: number;
      name: string;
      sets: number;
      reps: number;
      restTime: number;
    }>;
  }>({
    name: 'My Custom Workout',
    exercises: []
  });
  
  const filteredExercises = exerciseLibrary.filter(exercise => 
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.target.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const addExerciseToWorkout = (exercise: typeof exerciseLibrary[0]) => {
    setCustomWorkout(prev => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        {
          id: exercise.id,
          name: exercise.name,
          sets: 3,
          reps: 10,
          restTime: 60
        }
      ]
    }));
    
    toast({
      title: "Exercise added",
      description: `${exercise.name} added to your workout`,
    });
  };
  
  const removeExerciseFromWorkout = (exerciseId: number) => {
    setCustomWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.filter(ex => ex.id !== exerciseId)
    }));
  };
  
  const handleWorkoutNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomWorkout(prev => ({
      ...prev,
      name: e.target.value
    }));
  };
  
  const handleUpdateExercise = (exerciseId: number, field: 'sets' | 'reps' | 'restTime', value: number) => {
    setCustomWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex => 
        ex.id === exerciseId ? { ...ex, [field]: value } : ex
      )
    }));
  };
  
  const handleSelectTemplate = (template: typeof workoutTemplates[0]) => {
    setSelectedWorkout(template);
    // In a real app, you would fetch the exercises for this template
    // For now, we'll just simulate this with random exercises
    const randomExercises = exerciseLibrary
      .sort(() => 0.5 - Math.random())
      .slice(0, template.exercises)
      .map(ex => ({
        id: ex.id,
        name: ex.name,
        sets: 3,
        reps: 10,
        restTime: 60
      }));
      
    setCustomWorkout({
      name: template.name,
      exercises: randomExercises
    });
  };
  
  const saveWorkout = () => {
    // In a real app, you would save this to your backend
    toast({
      title: "Workout saved",
      description: `${customWorkout.name} has been saved to your workouts`,
    });
  };
  
  const startWorkout = () => {
    // In a real app, you would save and then navigate
    // For demo purposes, we'll just navigate
    if (customWorkout.exercises.length === 0) {
      toast({
        title: "Cannot start empty workout",
        description: "Please add at least one exercise to your workout",
        variant: "destructive"
      });
      return;
    }
    
    navigate(`/workout/custom-${Date.now()}`);
  };

  return (
    <div className="container py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Customize Your Workout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Customization Area */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Input 
                  value={customWorkout.name} 
                  onChange={handleWorkoutNameChange}
                  className="text-xl font-bold border-none px-0 text-foreground"
                  placeholder="Workout Name"
                />
              </CardTitle>
              <CardDescription>
                {customWorkout.exercises.length} exercises • Estimated time: {customWorkout.exercises.length * 5} min
              </CardDescription>
            </CardHeader>
            <CardContent>
              {customWorkout.exercises.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <Dumbbell className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No exercises added yet</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Start by selecting a template or adding exercises from the library
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {customWorkout.exercises.map((exercise, index) => (
                    <div key={`${exercise.id}-${index}`} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1 mb-3 sm:mb-0">
                        <div className="flex items-center">
                          <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm mr-3">
                            {index + 1}
                          </span>
                          <h4 className="font-medium">{exercise.name}</h4>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-2 ml-9">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Sets:</span>
                            <input 
                              type="number" 
                              className="w-12 h-6 text-center border rounded" 
                              value={exercise.sets}
                              min={1}
                              max={10}
                              onChange={(e) => handleUpdateExercise(exercise.id, 'sets', parseInt(e.target.value) || 1)}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Reps:</span>
                            <input 
                              type="number" 
                              className="w-12 h-6 text-center border rounded" 
                              value={exercise.reps}
                              min={1}
                              max={100}
                              onChange={(e) => handleUpdateExercise(exercise.id, 'reps', parseInt(e.target.value) || 1)}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Rest:</span>
                            <input 
                              type="number" 
                              className="w-16 h-6 text-center border rounded" 
                              value={exercise.restTime}
                              min={0}
                              max={300}
                              onChange={(e) => handleUpdateExercise(exercise.id, 'restTime', parseInt(e.target.value) || 0)}
                            />
                            <span className="text-xs text-muted-foreground">sec</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeExerciseFromWorkout(exercise.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={saveWorkout}>
                <Save className="mr-2 h-4 w-4" />
                Save Workout
              </Button>
              <Button onClick={startWorkout}>
                <PlayCircle className="mr-2 h-4 w-4" />
                Start Workout
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          {/* Templates and Exercise Library */}
          <Tabs defaultValue="templates">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="exercises">Exercises</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Workout Templates</CardTitle>
                  <CardDescription>
                    Quick start with pre-designed programs
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="space-y-2">
                    {workoutTemplates.map((template) => (
                      <div 
                        key={template.id}
                        className={`flex items-start p-3 cursor-pointer rounded-lg transition-colors ${
                          selectedWorkout?.id === template.id ? 'bg-primary/10' : 'hover:bg-muted'
                        }`}
                        onClick={() => handleSelectTemplate(template)}
                      >
                        <div className="mr-3 p-2 rounded-full bg-primary/10">
                          <Dumbbell className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base font-medium">{template.name}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">{template.description}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <Clock className="inline h-3 w-3 mr-1" />
                              {template.duration}
                            </span>
                            <span>Level: {template.level}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="exercises" className="mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Exercise Library</CardTitle>
                  <CardDescription>
                    Browse and add individual exercises
                  </CardDescription>
                  <div className="relative mt-3">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search exercises..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="h-[500px] overflow-y-auto px-2">
                  <div className="space-y-2">
                    {filteredExercises.map((exercise) => (
                      <div 
                        key={exercise.id}
                        className="flex items-start justify-between p-3 hover:bg-muted rounded-lg transition-colors"
                      >
                        <div className="flex items-start">
                          <div className="mr-3 p-2 rounded-full bg-primary/10">
                            <Dumbbell className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-base font-medium">{exercise.name}</h4>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <span className="px-2 py-0.5 bg-muted text-xs rounded-full">
                                {exercise.category}
                              </span>
                              <span className="px-2 py-0.5 bg-muted text-xs rounded-full">
                                {exercise.target}
                              </span>
                              <span className="px-2 py-0.5 bg-muted text-xs rounded-full">
                                {exercise.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => addExerciseToWorkout(exercise)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCustomization;
