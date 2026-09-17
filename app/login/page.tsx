import Link from "next/link";
import { GraduationCap } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background abstract shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 rounded-full filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>

      <Reveal className="relative z-10 max-w-md w-full">
        <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-2xl mb-4">
              <GraduationCap className="h-8 w-8 text-amber-500" />
            </div>
            <h2 className="text-3xl font-bold text-blue-900">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-500">
              Sign in to access your account
            </p>
          </div>
          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input id="email" name="email" type="email" required className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition" placeholder="Enter your email" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input id="password" name="password" type="password" required className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition" placeholder="Enter your password" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-amber-500 hover:text-amber-400">Forgot password?</a>
              </div>
            </div>

            <div>
              <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 transition">
                Sign in
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm font-medium text-gray-500 hover:text-blue-900">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}