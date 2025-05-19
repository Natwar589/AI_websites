'use client'
import { useState, useEffect } from 'react';
import { User, Lock, Mail, ArrowRight, Check, Eye, EyeOff } from 'lucide-react';
import { loginUser, signupUser } from '@/config/index.js'
export default function Auth() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [animate, setAnimate] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await loginUser(loginData);
      setFormSubmitted(true);
      localStorage.setItem('auth-token', response.token);
    //   loginUserContext(response); // Set user in context
    } catch (error) {
      alert(error.message || 'Login failed');
      setFormSubmitted(false);
    }
  };

  const handleSignupSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await signupUser(signupData);
      if (!response.token) {
        throw new Error('Signup failed - no token received');
      }
    } catch (error) {
      alert(error.message || 'Signup failed');
      setFormSubmitted(false);
      return;
    }
    console.log(reponse)
    if (response.token) {
        console.log(repsonse?.token)
        setFormSubmitted(true)
      localStorage.setItem('auth-token', response.token);
    }
    // alert('Sign up successful!');
    // window.location.href = '/dashboard';
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Image */}
        <div className="md:w-1/2 bg-indigo-600 relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/90 to-indigo-700/90 z-10"></div>
          <div 
            className="h-full w-full bg-cover bg-center relative z-0" 
            style={{ backgroundImage: "url('/api/placeholder/800/1200')" }}
          ></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 z-20">
            <div className={`transform transition-all duration-700 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 className="text-3xl font-bold mb-4">Welcome to Our Platform</h2>
              <p className="text-lg text-blue-100 mb-6">Secure, fast, and reliable services to enhance your experience.</p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Check className="text-blue-300 mr-2" size={20} />
                  <span>Easy to use interface</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-blue-300 mr-2" size={20} />
                  <span>Enhanced security</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-blue-300 mr-2" size={20} />
                  <span>24/7 support available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="mb-8 flex justify-center md:justify-start">
            <div className="relative">
              <div className="h-12 w-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                <User className="text-white" size={24} />
              </div>
              <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-blue-400 rounded-full flex items-center justify-center">
                <Lock className="text-white" size={12} />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-gray-100 rounded-lg p-1 flex max-w-xs mx-auto md:mx-0">
              <button
                onClick={() => setIsLogin(true)}
                className={`w-1/2 py-2 px-4 text-sm font-medium rounded-md transition-all duration-300 ${
                  isLogin 
                    ? 'bg-white text-indigo-600 shadow-md' 
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`w-1/2 py-2 px-4 text-sm font-medium rounded-md transition-all duration-300 ${
                  !isLogin 
                    ? 'bg-white text-indigo-600 shadow-md' 
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {isLogin ? (
            <div className={`transition-all duration-500 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Login to your account</h2>
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    id="loginEmail"
                    type="email"
                    name="email"
                    required
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="Your email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    id="loginPassword"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Password"
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                  <button 
                    type="button" 
                    onClick={togglePasswordVisibility} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formSubmitted}
                  className={`w-full flex items-center justify-center bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-1 ${
                    formSubmitted ? 'bg-green-500' : ''
                  }`}
                >
                  {formSubmitted ? (
                    <span className="flex items-center">
                      <Check className="mr-2" size={20} />
                      Success!
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Login
                      <ArrowRight className="ml-2" size={18} />
                    </span>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className={`transition-all duration-500 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Create an account</h2>
              <form onSubmit={handleSignupSubmit} className="space-y-6">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    id="signupName"
                    type="text"
                    name="name"
                    required
                    value={signupData.name}
                    onChange={handleSignupChange}
                    placeholder="Your full name"
                    className="w-full pl-10 pr-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    id="signupEmail"
                    type="email"
                    name="email"
                    required
                    value={signupData.email}
                    onChange={handleSignupChange}
                    placeholder="Your email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-black"
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    id="signupPassword"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={signupData.password}
                    onChange={handleSignupChange}
                    placeholder="Create a password"
                    className="w-full text-black pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                  <button 
                    type="button" 
                    onClick={togglePasswordVisibility} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-black text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                    I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={formSubmitted}
                  className={`w-full flex items-center justify-center bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-1 ${
                    formSubmitted ? 'bg-green-500' : ''
                  }`}
                >
                  {formSubmitted ? (
                    <span className="flex items-center">
                      <Check className="mr-2" size={20} />
                      Success!
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Create Account
                      <ArrowRight className="ml-2" size={18} />
                    </span>
                  )}
                </button>
              </form>
            </div>
          )}

          <div className={`mt-8 text-center text-gray-500 text-sm transition-all duration-700 delay-300 ${animate ? 'opacity-100' : 'opacity-0'}`}>
            {isLogin ? (
              <p>Don't have an account? <button onClick={() => setIsLogin(false)} className="text-indigo-600 hover:text-indigo-500 font-medium">Sign up</button></p>
            ) : (
              <p>Already have an account? <button onClick={() => setIsLogin(true)} className="text-indigo-600 hover:text-indigo-500 font-medium">Log in</button></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

