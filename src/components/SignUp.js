// src/components/auth/Signup.js
import { Eye, EyeOff, Building2, CheckCircle, Clock, Shield } from 'lucide-react';
import {useState,useEffect} from 'react';

const Signup = ({ 
  onSubmit, 
  onViewChange, 
  loading, 
  error, 
  setError,
  formData,
  setFormData, 
  onInputChange, 
  showPassword, 
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) => {

  const [showWaiting,setShowWaiting]=useState(false);

  useEffect(()=>{
  if(error==="Your account is submitted for approval"){
      setShowWaiting(true);
  }
  },[error])

  return (
    <div>
      {!showWaiting?
      <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-xl mb-4">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p className="text-gray-600">Join our portfolio management platform</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              placeholder="John"
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              placeholder="Doe"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Company (Optional)
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
            placeholder="Your company name"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="signupEmail" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="signupEmail"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
            placeholder="Enter your email"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="signupPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="signupPassword"
              name="password"
              value={formData.password}
              onChange={onInputChange}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              placeholder="Create a strong password"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              disabled={loading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onInputChange}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              placeholder="Confirm your password"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              disabled={loading}
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
            required
            disabled={loading}
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
            I agree to the{' '}
            <a href="{}" className="text-green-600 hover:text-green-800 font-medium">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="{}" className="text-green-600 hover:text-green-800 font-medium">
              Privacy Policy
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => {
              setError("")
              setFormData([])
              onViewChange('login')
            }}
            className="text-green-600 hover:text-green-800 font-medium"
            disabled={loading}
          >
            Sign in
          </button>
        </p>
      </div>
      </div>
      :
      <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50vw] bg-white p-6">
      {/* Approval Waiting Screen */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h1>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-blue-900">Pending Admin Approval</h2>
          </div>
          
          <p className="text-blue-800 mb-4 leading-relaxed">
            Your account has been successfully created and is currently under review by our administration team.
          </p>
          
          <div className="space-y-3 text-left">
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-blue-900">Security Review</p>
                <p className="text-sm text-blue-700">We verify all accounts to ensure platform security and compliance.</p>
              </div>
            </div>
            
            {/* <div className="flex items-start">
              <Mail className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-blue-900">Email Notification</p>
                <p className="text-sm text-blue-700">You'll receive an email confirmation once your account is approved.</p>
              </div>
            </div> */}
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
          <ul className="text-sm text-gray-700 space-y-1 text-left">
            <li>• Admin team reviews your registration details</li>
            <li>• Account verification process (typically 24-48 hours)</li>
            {/* <li>• Email notification sent upon approval</li> */}
            <li>• Full access to your dashboard</li>
          </ul>
        </div>
        
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            <strong>Expected approval time:</strong> 24-48 business hours
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setShowWaiting(false);
                setError("");
                setFormData({email: "", password: ""});
                onViewChange('login');
              }}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Back to Login
            </button>
            
            <button
              onClick={() => {
                setShowWaiting(false);
                setError("");
                setFormData([]);
                setShowWaiting(false)
              }}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors border border-gray-300"
            >
              Register Another Account
            </button>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Need immediate assistance?</strong> Contact our support team if you have any questions about the approval process.
          </p>
          <p><strong>Email: </strong>yashpanatala@gmail.com</p>
        </div>
      </div>
      </div>
      </>
      }
      
    </div>
  );
};

export default Signup;

















// import { Eye, EyeOff, Building2 } from 'lucide-react';

// export default function SignUp({formData,handleInputChange,handleSubmit,setCurrentView,showPassword,setShowPassword,showConfirmPassword,setShowConfirmPassword}) {
//   return (
//     <div className="w-full max-w-md mx-auto">
//       <div className="text-center mb-8">
//         <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-xl mb-4">
//           <Building2 className="w-8 h-8 text-white" />
//         </div>
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
//         <p className="text-gray-600">Join our portfolio management platform</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
//               First Name
//             </label>
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
//               placeholder="John"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
//               Last Name
//             </label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
//               placeholder="Doe"
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
//             Company (Optional)
//           </label>
//           <input
//             type="text"
//             id="company"
//             name="company"
//             value={formData.company}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
//             placeholder="Your company name"
//           />
//         </div>

//         <div>
//           <label htmlFor="signupEmail" className="block text-sm font-medium text-gray-700 mb-2">
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="signupEmail"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
//             placeholder="Enter your email"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="signupPassword" className="block text-sm font-medium text-gray-700 mb-2">
//             Password
//           </label>
//           <div className="relative">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               id="signupPassword"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
//               placeholder="Create a strong password"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//             >
//               {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>

//         <div>
//           <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//             Confirm Password
//           </label>
//           <div className="relative">
//             <input
//               type={showConfirmPassword ? 'text' : 'password'}
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
//               placeholder="Confirm your password"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//             >
//               {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>

//         <div className="flex items-start">
//           <input
//             type="checkbox"
//             id="terms"
//             className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
//             required
//           />
//           <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
//             I agree to the{' '}
//             <a href="{}" className="text-green-600 hover:text-green-800 font-medium">
//               Terms of Service
//             </a>{' '}
//             and{' '}
//             <a href="{}" className="text-green-600 hover:text-green-800 font-medium">
//               Privacy Policy
//             </a>
//           </label>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
//         >
//           Create Account
//         </button>
//       </form>

//       <div className="mt-6 text-center">
//         <p className="text-gray-600">
//           Already have an account?{' '}
//           <button
//             onClick={() => setCurrentView('login')}
//             className="text-green-600 hover:text-green-800 font-medium"
//           >
//             Sign in
//           </button>
//         </p>
//       </div>
//     </div>
//   )
// }
