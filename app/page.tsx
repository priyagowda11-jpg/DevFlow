import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle, Rocket, Code, Layout, Zap, BookOpen, Trophy, TrendingUp, ShieldCheck, Cpu, Globe, MessageSquare, ArrowRight, Star, Users, Award } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 selection:bg-primary-500 selection:text-white">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-md">
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-primary-600 rounded-xl flex items-center justify-center text-white font-black shadow-sm ring-2 ring-primary-500/20">D</div>
            <span className="text-xl font-bold tracking-tight">DevFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8 mr-6">
            <a href="#features" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Features</a>
            <a href="#learning" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Learning</a>
            <a href="#productivity" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Productivity</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors px-2">Login</Link>
            <Link href="/register">
              <Button variant="primary" size="sm" className="rounded-full px-6 font-bold">Join DevFlow</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-24 pb-32 md:pt-32 md:pb-48 max-w-7xl mx-auto w-full">
        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -left-24 h-[500px] w-[500px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 -right-24 h-[500px] w-[500px] bg-secondary-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-bold uppercase tracking-widest border border-primary-200 dark:border-primary-800">
              <Zap className="h-3 w-3 fill-current" />
              <span>The Engineering-First Learning Hub</span>
            </div>
            <h1 className="text-display max-w-3xl mx-auto lg:mx-0 leading-[1.1] tracking-tight">
              Plan. Build. <span className="text-primary-600 dark:text-primary-400">Ship.</span>
            </h1>
            <p className="text-body text-text-muted max-w-xl mx-auto lg:mx-0 text-lg leading-relaxed opacity-80">
              Stop getting stuck in tutorial hell. DevFlow combines curated professional learning paths with high-performance productivity tooling to help student developers build real-world software.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <Link href="/register">
                <Button size="lg" variant="primary" className="rounded-2xl px-8 h-14 font-bold text-lg shadow-xl shadow-primary-500/20 hover:scale-105 transition-transform group">
                  Start Building Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="rounded-2xl px-8 h-14 font-bold text-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
                  Sign In
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-white dark:border-neutral-950 bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-secondary font-medium">
                <span className="font-bold text-text-main dark:text-neutral-100">2,000+</span> students already shipping
              </p>
            </div>
          </div>

          {/* Hero Visual: Platform Mockup */}
          <div className="relative lg:block hidden">
            <div className="relative z-10 p-4 surface-layered rounded-[2rem] shadow-2xl border border-neutral-200 dark:border-neutral-800 rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-inner">
                {/* Mockup Header */}
                <div className="h-12 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-4 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-amber-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <div className="h-6 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                </div>
                {/* Mockup Content */}
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="h-6 w-32 bg-neutral-300 dark:bg-neutral-700 rounded-md" />
                      <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
                    </div>
                    <div className="h-8 w-24 bg-primary-500/20 rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-3">
                      <div className="h-3 w-12 bg-neutral-300 dark:bg-neutral-700 rounded-md mb-2" />
                      <div className="h-5 w-16 bg-primary-500/40 rounded-md" />
                    </div>
                    <div className="h-24 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-3">
                      <div className="h-3 w-12 bg-neutral-300 dark:bg-neutral-700 rounded-md mb-2" />
                      <div className="h-5 w-16 bg-secondary-500/40 rounded-md" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-neutral-100 dark:bg-neutral-800 rounded-md" />
                    <div className="h-4 w-4/5 bg-neutral-100 dark:bg-neutral-800 rounded-md" />
                    <div className="h-4 w-3/4 bg-neutral-100 dark:bg-neutral-800 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
            {/* Floating Badges */}
            <div className="absolute -top-6 -right-6 z-20 surface-layered p-4 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 animate-bounce-slow">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center">
                  <Trophy className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold">New Achievement</p>
                  <p className="text-[10px] text-secondary">Frontend Master!</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 z-20 surface-layered p-4 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 animate-float">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold">Task Completed</p>
                  <p className="text-[10px] text-secondary">API Route implemented</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-16 border-y border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold text-neutral-400 uppercase tracking-widest mb-12">Trusted by students from world-class programs</p>
          <div className="flex flex-wrap justify-center items-center gap-16 opacity-60 grayscale contrast-125">
             <div className="flex items-center gap-2 font-bold text-2xl text-neutral-600 dark:text-neutral-400"><Cpu className="h-7 w-7" /> TechStack</div>
             <div className="flex items-center gap-2 font-bold text-2xl text-neutral-600 dark:text-neutral-400"><Globe className="h-7 w-7" /> GlobalDev</div>
             <div className="flex items-center gap-2 font-bold text-2xl text-neutral-600 dark:text-neutral-400"><ShieldCheck className="h-7 w-7" /> SecureCode</div>
             <div className="flex items-center gap-2 font-bold text-2xl text-neutral-600 dark:text-neutral-400"><MessageSquare className="h-7 w-7" /> DevComm</div>
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      <section id="features" className="px-6 py-32 max-w-7xl mx-auto w-full">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-page-title">Everything you need to ship software.</h2>
          <p className="text-secondary max-w-2xl mx-auto text-lg">
            We've integrated the entire development lifecycle—from learning the basics to managing complex projects—into one cohesive platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <Card variant="elevated" className="p-8 space-y-6 group hover:border-primary-500/50 transition-all">
            <div className="h-16 w-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-4 ring-primary-500/10">
              <BookOpen className="h-8 w-8" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold">Curated Learning Paths</h3>
              <p className="text-secondary leading-relaxed">
                Move beyond basics with industry-standard courses. From Frontend Mastery to AI Engineering, our paths are designed for actual production skills.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
              <CheckCircle className="h-3 w-3" />
              Certification upon completion
            </div>
          </Card>

          <Card variant="elevated" className="p-8 space-y-6 group hover:border-secondary-500/50 transition-all">
            <div className="h-16 w-16 rounded-2xl bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-4 ring-secondary-500/10">
              <Layout className="h-8 w-8" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold">Project Workspaces</h3>
              <p className="text-secondary leading-relaxed">
                Stop using random notes. Organise your build with a professional workspace, integrating task boards and project health tracking.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-secondary-600 dark:text-secondary-400 uppercase tracking-wider">
              <CheckCircle className="h-3 w-3" />
              Full project lifecycle tracking
            </div>
          </Card>

          <Card variant="elevated" className="p-8 space-y-6 group hover:border-accent-500/50 transition-all">
            <div className="h-16 w-16 rounded-2xl bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-4 ring-accent-500/10">
              <Rocket className="h-8 w-8" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold">Productivity Engine</h3>
              <p className="text-secondary leading-relaxed">
                Maintain flow with integrated task management and gamified progress. Earn points and achievements as you ship real code.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-accent-600 dark:text-accent-400 uppercase tracking-wider">
              <CheckCircle className="h-3 w-3" />
              Gamified XP and achievements
            </div>
          </Card>
        </div>
      </section>

      {/* Mastery Path Section */}
      <section id="learning" className="px-6 py-24 bg-neutral-100 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary-500 to-secondary-500 rounded-3xl blur-2xl opacity-20" />
            <div className="relative surface-layered p-8 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800">
               <div className="space-y-6">
                 <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
                   <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 flex items-center justify-center">
                       <Users className="h-5 w-5" />
                     </div>
                     <span className="font-bold text-lg">Student Journey</span>
                   </div>
                   <Badge variant="project">Active</Badge>
                 </div>
                 <div className="space-y-6">
                   {[
                     { label: 'Frontend Mastery', progress: 100, icon: <Code className="h-4 w-4" />, status: 'Completed' },
                     { label: 'System Design', progress: 65, icon: <Cpu className="h-4 w-4" />, status: 'In Progress' },
                     { label: 'AI Integration', progress: 30, icon: <Zap className="h-4 w-4" />, status: 'Starting' },
                   ].map((item, i) => (
                     <div key={i} className="space-y-2 group">
                       <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                         <span className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600 transition-colors">{item.icon} {item.label}</span>
                         <span className="text-neutral-400">{item.progress}%</span>
                       </div>
                       <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                         <div className={cn("h-full bg-primary-500 transition-all duration-1000", item.progress === 100 ? "bg-emerald-500" : "")} style={{ width: `${item.progress}%` }} />
                       </div>
                       <div className="flex justify-end">
                         <span className="text-[10px] font-medium text-secondary uppercase">{item.status}</span>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-page-title leading-tight">Prove Your Skills <br />to the World.</h2>
              <p className="text-body text-text-muted text-lg opacity-80">
                Learning is only half the battle. DevFlow provides the evidence of your growth through a verified achievement system and global leaderboard.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-700 space-y-3 hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-500 flex items-center justify-center">
                  <Trophy className="h-6 w-6" />
                </div>
                <h4 className="font-bold">Verified Certs</h4>
                <p className="text-sm text-secondary">Get recognized for completing professional-grade curricula.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200 dark:border-neutral-700 space-y-3 hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-500 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h4 className="font-bold">Global Ranking</h4>
                <p className="text-sm text-secondary">Compete with the best student developers across the platform.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-32 text-center max-w-5xl mx-auto w-full">
        <div className="relative p-12 md:p-24 rounded-[3rem] bg-neutral-900 dark:bg-primary-900 text-white overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 h-64 w-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-display text-white leading-tight">Ready to stop guessing <br />and start shipping?</h2>
            <p className="text-lg text-neutral-300 max-w-xl mx-auto opacity-90">
              Join thousands of student developers who are building their portfolios and mastering their craft with DevFlow.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg" variant="primary" className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-2xl px-8 h-14 font-bold text-lg shadow-lg transition-transform hover:scale-105">
                  Create Your Free Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="px-6 py-20 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">D</div>
                <span className="text-lg font-bold tracking-tight">DevFlow</span>
              </div>
              <p className="text-secondary max-w-xs leading-relaxed">
                The comprehensive platform for student developers to learn professional engineering and build a world-class portfolio.
              </p>
              <div className="flex items-center gap-4">
                {[Globe, MessageSquare, ShieldCheck].map((Icon, i) => (
                  <a key={i} href="#" className="h-10 w-10 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-primary-600 transition-colors">
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-text-main dark:text-neutral-100">Product</h4>
              <ul className="space-y-4 text-sm text-secondary">
                <li><Link href="#features" className="hover:text-primary-600 transition-colors">Features</Link></li>
                <li><Link href="#learning" className="hover:text-primary-600 transition-colors">Learning Paths</Link></li>
                <li><Link href="#productivity" className="hover:text-primary-600 transition-colors">Productivity</Link></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-text-main dark:text-neutral-100">Company</h4>
              <ul className="space-y-4 text-sm text-secondary">
                <li><a href="#" className="hover:text-primary-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-text-main dark:text-neutral-100">Legal</h4>
              <ul className="space-y-4 text-sm text-secondary">
                <li><a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-neutral-400">
              &copy; {new Date().getFullYear()} DevFlow. Built for the next gen of engineers.
            </p>
            <div className="flex items-center gap-6 text-xs text-neutral-400">
              <a href="#" className="hover:text-primary-600 transition-colors">System Status</a>
              <a href="#" className="hover:text-primary-600 transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
