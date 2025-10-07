import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code2, Zap, Shield, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">DevBoost AI</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
            AI for Developer Teams
          </div>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-balance">
            Accelerate Development with AI-Powered Productivity
          </h1>
          <p className="mb-8 text-xl text-muted-foreground text-pretty">
            Reduce code review time by 24% with automated test generation, intelligent documentation, and real-time
            insights for your entire team.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="h-12 px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link href="#demo">
              <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent">
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card/50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24%</div>
              <div className="text-sm text-muted-foreground">Faster Code Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">35%</div>
              <div className="text-sm text-muted-foreground">Fewer Security Issues</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">31%</div>
              <div className="text-sm text-muted-foreground">Faster Deployments</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">40%</div>
              <div className="text-sm text-muted-foreground">Higher Adoption</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful Features for Modern Teams</h2>
          <p className="text-muted-foreground text-lg">Everything you need to boost developer productivity</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Code2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Test Generation</h3>
            <p className="text-muted-foreground">
              Automatically generate comprehensive test cases for your code with intelligent coverage analysis.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Security Analysis</h3>
            <p className="text-muted-foreground">
              JWT authentication, RBAC, and automated security vulnerability detection built-in.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Telemetry</h3>
            <p className="text-muted-foreground">
              Monitor team performance with live dashboards and WebSocket-powered notifications.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Documentation</h3>
            <p className="text-muted-foreground">
              AI-powered documentation suggestions that keep your codebase well-documented.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Code2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">CI/CD Optimization</h3>
            <p className="text-muted-foreground">
              Docker-based builds with intelligent caching to reduce deployment time by 31%.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
            <p className="text-muted-foreground">
              Granular permissions and role management for enterprise-grade security.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to boost your team's productivity?</h2>
          <p className="text-muted-foreground text-lg mb-8">Join thousands of developers already using DevBoost AI</p>
          <Link href="/signup">
            <Button size="lg" className="h-12 px-8">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">DevBoost AI</span>
            </div>
            <div className="text-sm text-muted-foreground">© 2025 DevBoost AI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
