
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Dumbbell, Heart, Users, Clock, Award, BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 lg:py-36 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 z-0"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 heading-gradient">
              Train Anywhere, Achieve Your Goals
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 text-balance">
              Personalized workout plans, expert guidance, and progress tracking all in one place.
              Your fitness journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="button-transition">
                <Link to="/onboarding" className="flex items-center">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="button-transition">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Platform</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine technology and fitness expertise to deliver a personalized experience that helps you reach your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="glass-card card-hover">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Dumbbell className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Personalized Plans</h3>
                </div>
                <p className="text-muted-foreground">
                  Workouts tailored to your goals, fitness level, and available equipment.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="glass-card card-hover">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Health Tracking</h3>
                </div>
                <p className="text-muted-foreground">
                  Monitor your progress, heart rate, and calories burned in real-time.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="glass-card card-hover">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Community Support</h3>
                </div>
                <p className="text-muted-foreground">
                  Join groups, participate in challenges, and connect with like-minded fitness enthusiasts.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="glass-card card-hover">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Flexible Schedule</h3>
                </div>
                <p className="text-muted-foreground">
                  Plan workouts at your convenience with smart scheduling that adapts to your lifestyle.
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="glass-card card-hover">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Expert Guidance</h3>
                </div>
                <p className="text-muted-foreground">
                  Access to professional trainers and detailed exercise guides for proper form.
                </p>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="glass-card card-hover">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Progress Analytics</h3>
                </div>
                <p className="text-muted-foreground">
                  Visualize your improvement with detailed charts and performance metrics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Fitness Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already achieved their fitness goals with our personalized approach.
          </p>
          <Button size="lg" className="button-transition">
            <Link to="/onboarding" className="flex items-center">
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 px-4 mt-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">FitTrack</h3>
              <p className="text-muted-foreground">
                Your personal fitness companion for achieving your health and wellness goals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Workout Plans</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Progress Tracking</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Community</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Expert Guidance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Instagram</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Twitter</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} FitTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
