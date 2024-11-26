import Link from 'next/link';
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
     

      {/* Main About Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">About AI Eco Route Planner</h2>
          <p className="text-lg mb-6">
            AI Eco Route Planner is designed to optimize your travel routes, reduce your carbon footprint, and save fuel costs. 
            By utilizing AI-driven algorithms, we create the most efficient and eco-friendly routes based on traffic, 
            fuel consumption, and environmental impact.
          </p>
          <Image 
            src="/about/aboutimage1.jpeg" 
            alt="AI Eco Route" 
            width={600} 
            height={350} 
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg mb-4">
            We believe in a greener future. Our mission is to reduce the environmental impact of transportation by 
            leveraging technology to make smarter, eco-conscious decisions. With AI Eco Route Planner, 
            you're not just optimizing your travel, you're contributing to a more sustainable planet.
          </p>
          <p className="text-lg">
            Whether you're a business managing a fleet or an individual planning a road trip, our platform 
            helps you make informed choices for the benefit of both your wallet and the environment.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
              <p>We prioritize sustainability in every aspect of route planning, reducing emissions and fuel use.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p>We use cutting-edge AI technology to ensure our routes are efficient and eco-friendly.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">User-Friendly</h3>
              <p>Our platform is built with a focus on simplicity, making route planning easy for everyone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Routes?</h2>
          <p className="text-lg mb-6">
            Join the movement towards a greener, more efficient future. Start planning your eco-friendly routes today!
          </p>
          <Link href="/auth/registration">
            <span className="bg-white text-blue-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-gray-200 transition cursor-pointer">
              Sign Up Now
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 AI Eco Route Planner. All rights reserved.</p>
          <div className="mt-4">
            <Link href="/about" className="text-gray-400 hover:text-white px-4">About</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white px-4">Contact</Link>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
