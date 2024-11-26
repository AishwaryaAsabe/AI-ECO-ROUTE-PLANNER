import Link from 'next/link';
import Image from 'next/image';

// Button component for reuse
function Button({ text, href }) {
  return (
    <Link href={href} className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition">
      {text}
    </Link>
  );
}

export default function Home() {
  return (

    
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Optimize Your Routes with AI
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Smart, eco-friendly route planning to reduce fuel consumption and
            emissions.
          </p>
          <Button text="Get Started" href="/auth/registration" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Features of AI EcoRoute Planner
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                AI-Driven Optimization
              </h3>
              <p>
                Utilizes AI to find the most efficient routes based on traffic,
                fuel usage, and environmental impact.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Real-Time Traffic</h3>
              <p>
                Adjusts routes dynamically with real-time traffic updates to
                avoid congestion and reduce delays.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Eco-Friendly</h3>
              <p>
                Minimizes carbon footprint by calculating the most eco-friendly
                paths for your journeys.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <Image
                src="/needed1.jpeg"
                alt="Step 1"
                width={200}
                height={100}
                className="w-full h-auto"
              />
              <h3 className="text-xl font-semibold mb-2">Step 1</h3>
              <p>Enter your starting point and destination.</p>
            </div>

            <div className="p-6">
              <Image
                src="/needed2.jpeg"
                alt="Step 2"
                width={200}
                height={100}
                className="w-full h-auto"
              />
              <h3 className="text-xl font-semibold mb-2">Step 2</h3>
              <p>AI calculates the most efficient and eco-friendly route.</p>
            </div>
            <div className="p-6">
              <Image
                src="/needed3.jpeg"
                alt="Step 3"
                width={200}
                height={100}
                className="w-full h-auto"
              />
              <h3 className="text-xl font-semibold mb-2">Step 3</h3>
              <p>
                Start your journey and enjoy reduced fuel costs and emissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Us in Creating a Greener Future
          </h2>
          <p className="text-lg mb-6">
            Start optimizing your routes today with AI EcoRoute Planner and help
            reduce your environmental impact.
          </p>
          <Button text="Sign Up Now" href="/auth/signup" />
        </div>
      </section>

    </div>
  );
}
