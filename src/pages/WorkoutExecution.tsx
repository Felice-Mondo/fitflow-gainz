
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, SkipForward, ChevronLeft, ChevronRight, Volume2, Volume1, VolumeX, XCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

// Mock workout data
const mockWorkout = {
  id: 'custom-123',
  name: 'Full Body Workout',
  exercises: [
    { id: 1, name: 'Push-Ups', sets: 3, reps: 10, restTime: 60, completed: false },
    { id: 2, name: 'Squats', sets: 3, reps: 12, restTime: 60, completed: false },
    { id: 3, name: 'Plank', sets: 3, reps: 30, restTime: 45, completed: false }, // reps here is seconds
    { id: 4, name: 'Mountain Climbers', sets: 3, reps: 20, restTime: 30, completed: false },
    { id: 5, name: 'Lunges', sets: 3, reps: 10, restTime: 45, completed: false },
  ]
};

type WorkoutState = 'not_started' | 'exercise' | 'rest' | 'completed';

const WorkoutExecution = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [workout, setWorkout] = useState(mockWorkout);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [workoutState, setWorkoutState] = useState<WorkoutState>('not_started');
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [completedExercises, setCompletedExercises] = useState(0);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
  const currentExercise = workout.exercises[currentExerciseIndex];
  const totalExercises = workout.exercises.length;
  const totalSets = currentExercise?.sets || 0;
  
  // Calculate overall workout progress
  const exerciseProgress = (currentExerciseIndex / totalExercises) * 100;
  const setProgress = (currentSetIndex / totalSets) * (100 / totalExercises);
  const totalProgress = exerciseProgress + setProgress;
  
  // Format time for display
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Start the workout
  const startWorkout = () => {
    setWorkoutState('exercise');
    setIsActive(true);
    startTimeRef.current = Date.now();
  };
  
  // Toggle timer pause/resume
  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  // Mark current set as completed and move to next set or exercise
  const completeSet = () => {
    if (currentSetIndex < totalSets - 1) {
      // Move to next set
      setCurrentSetIndex(currentSetIndex + 1);
      setWorkoutState('rest');
      setTimer(currentExercise.restTime);
      setIsActive(true);
    } else {
      // Mark exercise as completed
      const updatedExercises = [...workout.exercises];
      updatedExercises[currentExerciseIndex].completed = true;
      setWorkout({ ...workout, exercises: updatedExercises });
      setCompletedExercises(completedExercises + 1);
      
      // Check if all exercises are completed
      if (currentExerciseIndex === totalExercises - 1) {
        completeWorkout();
      } else {
        // Move to next exercise
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSetIndex(0);
        setWorkoutState('exercise');
      }
    }
  };
  
  // Skip to next exercise
  const skipExercise = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSetIndex(0);
      setWorkoutState('exercise');
      setIsActive(true);
    } else {
      completeWorkout();
    }
  };
  
  // Complete the entire workout
  const completeWorkout = () => {
    setWorkoutState('completed');
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    toast({
      title: "Workout Completed!",
      description: `You've completed "${workout.name}" in ${formatTime(elapsedTime)}`,
    });
  };
  
  // Skip rest period
  const skipRest = () => {
    setWorkoutState('exercise');
  };
  
  // Navigate back to the dashboard
  const exitWorkout = () => {
    if (workoutState !== 'completed' && workoutState !== 'not_started') {
      if (confirm("Are you sure you want to exit? Your progress will be lost.")) {
        navigate('/dashboard');
      }
    } else {
      navigate('/dashboard');
    }
  };
  
  // Timer effect for counting down rest periods
  useEffect(() => {
    if (isActive && workoutState === 'rest' && timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && workoutState === 'rest') {
      // Rest period completed, move back to exercise
      setWorkoutState('exercise');
      
      // Play sound when rest period ends
      if (soundEnabled) {
        try {
          // This would be replaced with an actual sound effect in a real app
          console.log('Playing sound: Rest period ended');
        } catch (error) {
          console.error('Failed to play sound:', error);
        }
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timer, workoutState, soundEnabled]);
  
  // Timer effect for tracking overall workout duration
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && workoutState !== 'not_started' && workoutState !== 'completed') {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else if (!isActive && interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, workoutState]);
  
  // Render different UI based on workout state
  const renderWorkoutContent = () => {
    switch (workoutState) {
      case 'not_started':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">{workout.name}</h2>
            <p className="text-muted-foreground mb-6">
              {totalExercises} exercises • Estimated time: {Math.round(
                workout.exercises.reduce((acc, ex) => acc + (ex.sets * ex.restTime) + (ex.sets * 45), 0) / 60
              )} minutes
            </p>
            <div className="mb-8 space-y-2 max-w-md mx-auto">
              {workout.exercises.map((exercise, index) => (
                <div key={exercise.id} className="flex items-center text-left p-2 border rounded-lg">
                  <span className="w-6 h-6 flex items-center justify-center bg-primary/10 rounded-full text-xs mr-3">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium">{exercise.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {exercise.sets} sets × {exercise.reps} reps
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button size="lg" onClick={startWorkout}>
              <Play className="mr-2 h-5 w-5" />
              Start Workout
            </Button>
          </div>
        );
        
      case 'exercise':
        return (
          <div className="text-center">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-1">{currentExercise.name}</h2>
              <p className="text-xl">
                Set {currentSetIndex + 1}/{currentExercise.sets}
              </p>
              <p className="text-lg font-medium mt-4">
                {currentExercise.reps} {currentExercise.name === 'Plank' ? 'seconds' : 'reps'}
              </p>
            </div>
            
            <div className="flex justify-center space-x-4 mb-8">
              <Button variant="outline" size="icon" onClick={toggleTimer}>
                {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button variant="outline" size="icon" onClick={skipExercise}>
                <SkipForward className="h-5 w-5" />
              </Button>
              <Button 
                variant={soundEnabled ? "outline" : "secondary"} 
                size="icon" 
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </Button>
            </div>
            
            <Button size="lg" className="w-full py-6" onClick={completeSet}>
              <CheckCircle className="mr-2 h-5 w-5" />
              Complete Set
            </Button>
          </div>
        );
        
      case 'rest':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Rest Time</h2>
            <div className="relative inline-flex flex-col items-center justify-center w-48 h-48 mb-6">
              <svg className="w-48 h-48 -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="90"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-muted opacity-20"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="90"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-primary"
                  strokeDasharray={2 * Math.PI * 90}
                  strokeDashoffset={2 * Math.PI * 90 * (1 - timer / currentExercise.restTime)}
                />
              </svg>
              <span className="absolute text-4xl font-bold">{timer}</span>
              <span className="absolute mt-12 text-sm">seconds left</span>
            </div>
            
            <p className="mb-4 text-lg">
              Next: {currentExercise.name} - Set {currentSetIndex + 1}/{currentExercise.sets}
            </p>
            
            <div className="flex justify-center space-x-4 mb-8">
              <Button variant="outline" size="icon" onClick={toggleTimer}>
                {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button 
                variant={soundEnabled ? "outline" : "secondary"} 
                size="icon" 
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </Button>
            </div>
            
            <Button onClick={skipRest}>Skip Rest</Button>
          </div>
        );
        
      case 'completed':
        return (
          <div className="text-center py-12">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Workout Complete!</h2>
              <p className="text-muted-foreground mt-2">
                Great job on completing your workout!
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium">{formatTime(elapsedTime)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Exercises</p>
                    <p className="font-medium">{completedExercises}/{totalExercises}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Sets</p>
                    <p className="font-medium">
                      {workout.exercises.reduce((acc, ex) => acc + ex.sets, 0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Est. Calories</p>
                    <p className="font-medium">{Math.round(elapsedTime * 0.15)} kcal</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1" asChild>
                <a href="/progress">View Progress</a>
              </Button>
              <Button className="flex-1" asChild>
                <a href="/dashboard">Back to Dashboard</a>
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container py-8 mx-auto max-w-md">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" size="icon" onClick={exitWorkout}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="text-center">
          <p className="text-sm font-medium">{workout.name}</p>
          {workoutState !== 'not_started' && workoutState !== 'completed' && (
            <p className="text-xs text-muted-foreground">
              {formatTime(elapsedTime)} elapsed
            </p>
          )}
        </div>
        <div className="w-10"></div> {/* Empty div for flex alignment */}
      </div>
      
      {workoutState !== 'not_started' && workoutState !== 'completed' && (
        <div className="mb-6">
          <Progress value={totalProgress} className="h-2 mb-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Exercise {currentExerciseIndex + 1}/{totalExercises}</span>
            <span>Set {currentSetIndex + 1}/{currentExercise.sets}</span>
          </div>
        </div>
      )}
      
      <Card>
        <CardContent className="pt-6">
          {renderWorkoutContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutExecution;
