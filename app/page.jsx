import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Building, Globe, Landmark, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 py-24 md:py-32 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
              <span className="block">Decentralized Property</span>
              <span className="block text-emerald-600 dark:text-emerald-500">Tokenization System</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-8 text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Tokenize your physical property as NFTs on the Sonic blockchain. Secure, transparent, and immutable record
              of ownership.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/auth/signup">
                <Button size="lg" className="px-8">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 lg:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Key Features</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Revolutionize the way you manage and transfer property ownership
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Property Mapping</h3>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Mark your land or building on digital maps with precise boundaries and save to the blockchain.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mb-6">
                <Landmark className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Tokenization</h3>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Mint your properties as unique NFTs with metadata including geolocation, size, and ownership details.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Ownership Management</h3>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Transfer ownership via sale, gift, inheritance, or co-ownership with all transactions recorded on the
                blockchain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Use Cases</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Real-world applications of the Landify platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700">
              <Building className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Property Tokenization</h3>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                A landlord tokenizes a building and shares ownership with tenants, creating a transparent record of
                co-ownership.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700">
              <Globe className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Land Management</h3>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                A farmer maps and tokenizes 20 land plots, making it easy to manage, transfer, or sell individual
                parcels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 lg:px-8 bg-emerald-600 dark:bg-emerald-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">Ready to tokenize your property?</h2>
          <p className="mt-4 text-lg text-emerald-100 max-w-3xl mx-auto">
            Join the future of property ownership and management today.
          </p>
          <div className="mt-10">
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="px-8">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white">Landify</h2>
              <p className="mt-2">Decentralized Property Tokenization System</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="/features" className="hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center">
            <p>&copy; {new Date().getFullYear()} Landify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
