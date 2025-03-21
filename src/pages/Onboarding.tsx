
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Onboarding steps
const STEPS = [
  { id: "welcome", title: "Welcome" },
  { id: "account", title: "Create Account" },
  { id: "profile", title: "Personal Info" },
  { id: "goals", title: "Fitness Goals" },
  { id: "experience", title: "Experience" },
  { id: "preferences", title: "Preferences" },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
    goal: "",
    experience: "",
    preferences: [],
    equipment: [],
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Steps UI components
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep nextStep={nextStep} />;
      case 1:
        return <AccountStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 2:
        return <ProfileStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <GoalsStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <ExperienceStep formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <PreferencesStep formData={formData} updateFormData={updateFormData} prevStep={prevStep} />;
      default:
        return <WelcomeStep nextStep={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/50 py-16 px-4">
      <div className="max-w-4xl mx-auto pt-10">
        {/* Progress tracker */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${
                  index === STEPS.length - 1 ? "" : "flex-1"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    index <= currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index < currentStep ? <CheckCircle className="h-5 w-5" /> : index + 1}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-1 flex-1 ${
                      index < currentStep ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between px-2">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`text-xs ${
                  index <= currentStep
                    ? "text-foreground"
                    : "text-muted-foreground"
                } ${index === 0 ? "text-left" : ""} ${
                  index === STEPS.length - 1 ? "text-right" : ""
                }`}
                style={{ width: `${100 / STEPS.length}%`, textAlign: "center" }}
              >
                {step.title}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="animate-fade-in">{renderStepContent()}</div>
      </div>
    </div>
  );
};

// Step 1: Welcome
const WelcomeStep = ({ nextStep }: { nextStep: () => void }) => {
  return (
    <Card className="glass-card">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Welcome to FitTrack</CardTitle>
        <CardDescription className="text-lg">
          Your personalized fitness journey starts here
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 text-center">
        <div className="py-6">
          <h3 className="text-xl font-medium mb-4">What to expect:</h3>
          <ul className="space-y-4 max-w-md mx-auto text-left">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Personalized workout plans based on your goals and fitness level</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Progress tracking to visualize your journey</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Access to a community of fitness enthusiasts</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span>Expert guidance and proper form demonstrations</span>
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>
        <Button onClick={nextStep}>
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Step 2: Account Creation
const AccountStep = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const [activeTab, setActiveTab] = useState("register");
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Create Your Account</CardTitle>
        <CardDescription>
          Set up your account to track your progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          
          <TabsContent value="register" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                />
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline">
                Google
              </Button>
              <Button variant="outline">
                Apple
              </Button>
              <Button variant="outline">
                Facebook
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="login" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="login-email">Email</Label>
                <Input id="login-email" type="email" placeholder="your@email.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" type="password" />
              </div>
              <Button className="w-full">Sign In</Button>
            </div>
            
            <div className="text-center">
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot your password?
              </a>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={nextStep}>
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Step 3: Basic Profile Information
const ProfileStep = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Tell us a bit about yourself to personalize your experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.gender}
              onChange={(e) => updateFormData("gender", e.target.value)}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="25"
              value={formData.age}
              onChange={(e) => updateFormData("age", e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                value={formData.weight}
                onChange={(e) => updateFormData("weight", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="175"
                value={formData.height}
                onChange={(e) => updateFormData("height", e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={nextStep}>
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Step 4: Fitness Goals
const GoalsStep = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const goals = [
    {
      id: "weight-loss",
      title: "Weight Loss",
      description: "Reduce body fat and improve overall health",
    },
    {
      id: "muscle-gain",
      title: "Muscle Gain",
      description: "Build strength and increase muscle mass",
    },
    {
      id: "endurance",
      title: "Improve Endurance",
      description: "Boost stamina and cardiovascular health",
    },
    {
      id: "flexibility",
      title: "Increase Flexibility",
      description: "Enhance range of motion and reduce injury risk",
    },
    {
      id: "general-fitness",
      title: "General Fitness",
      description: "Maintain a healthy lifestyle and feel better",
    },
    {
      id: "athletic-performance",
      title: "Athletic Performance",
      description: "Enhance specific sports or activity capabilities",
    },
  ];

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>What are your fitness goals?</CardTitle>
        <CardDescription>
          Select your primary fitness goal to help us create your personalized program
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                formData.goal === goal.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => updateFormData("goal", goal.id)}
            >
              <div className="flex items-start">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 mt-0.5 ${
                    formData.goal === goal.id
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  }`}
                >
                  {formData.goal === goal.id && (
                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{goal.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {goal.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={nextStep}>
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Step 5: Experience Level
const ExperienceStep = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}: {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const experienceLevels = [
    {
      id: "beginner",
      title: "Beginner",
      description: "New to fitness or returning after a long break",
    },
    {
      id: "intermediate",
      title: "Intermediate",
      description: "Consistent workouts for several months",
    },
    {
      id: "advanced",
      title: "Advanced",
      description: "Experienced with various training methods for 1+ years",
    },
  ];

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>What's your fitness experience?</CardTitle>
        <CardDescription>
          This helps us tailor exercises to your current ability level
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {experienceLevels.map((level) => (
            <div
              key={level.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                formData.experience === level.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => updateFormData("experience", level.id)}
            >
              <div className="flex items-start">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 mt-0.5 ${
                    formData.experience === level.id
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  }`}
                >
                  {formData.experience === level.id && (
                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{level.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {level.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={nextStep}>
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Step 6: Workout Preferences
const PreferencesStep = ({
  formData,
  updateFormData,
  prevStep,
}: {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  prevStep: () => void;
}) => {
  const [preferences, setPreferences] = useState<string[]>(formData.preferences || []);
  const [equipment, setEquipment] = useState<string[]>(formData.equipment || []);
  
  const workoutTypes = [
    { id: "strength", label: "Strength Training" },
    { id: "cardio", label: "Cardio" },
    { id: "hiit", label: "HIIT" },
    { id: "yoga", label: "Yoga" },
    { id: "pilates", label: "Pilates" },
    { id: "calisthenics", label: "Calisthenics" },
    { id: "functional", label: "Functional Training" },
    { id: "sports", label: "Sports-specific" },
  ];
  
  const equipmentOptions = [
    { id: "none", label: "No Equipment" },
    { id: "minimal", label: "Minimal (Resistance Bands, etc.)" },
    { id: "home", label: "Home Gym" },
    { id: "gym", label: "Full Gym Access" },
  ];
  
  const togglePreference = (id: string) => {
    let newPreferences;
    if (preferences.includes(id)) {
      newPreferences = preferences.filter((item) => item !== id);
    } else {
      newPreferences = [...preferences, id];
    }
    setPreferences(newPreferences);
    updateFormData("preferences", newPreferences);
  };
  
  const toggleEquipment = (id: string) => {
    let newEquipment;
    if (equipment.includes(id)) {
      newEquipment = equipment.filter((item) => item !== id);
    } else {
      newEquipment = [...equipment, id];
    }
    setEquipment(newEquipment);
    updateFormData("equipment", newEquipment);
  };

  const handleComplete = () => {
    // Here you would typically send the data to your backend
    console.log("Completed onboarding with data:", formData);
    
    // Navigate to dashboard or next page
    window.location.href = "/dashboard";
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Workout Preferences</CardTitle>
        <CardDescription>
          Select the types of workouts you enjoy and available equipment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">
            What types of workouts do you prefer? (Select all that apply)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {workoutTypes.map((type) => (
              <div
                key={type.id}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  preferences.includes(type.id)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => togglePreference(type.id)}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center mr-2 ${
                      preferences.includes(type.id)
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    }`}
                  >
                    {preferences.includes(type.id) && (
                      <CheckCircle className="h-3 w-3 text-primary-foreground" />
                    )}
                  </div>
                  <span>{type.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">
            What equipment do you have access to?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {equipmentOptions.map((option) => (
              <div
                key={option.id}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  equipment.includes(option.id)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => toggleEquipment(option.id)}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center mr-2 ${
                      equipment.includes(option.id)
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    }`}
                  >
                    {equipment.includes(option.id) && (
                      <CheckCircle className="h-3 w-3 text-primary-foreground" />
                    )}
                  </div>
                  <span>{option.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleComplete}>
          Complete Setup
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Onboarding;
