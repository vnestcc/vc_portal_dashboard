import {useState,useEffect} from 'react';
import { Eye, EyeOff, Building2, CheckCircle, Clock, Shield } from 'lucide-react';

const Login = ({ 
  onSubmit, 
  onViewChange, 
  loading, 
  error, 
  setError,
  formData, 
  setFormData,
  onInputChange, 
  showPassword, 
  setShowPassword 
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
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to access your portfolio dashboard</p>
      </div>

      {error && error !== "Your account is submitted for approval" && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Enter your email"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={onInputChange}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your password"
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

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" disabled={loading} />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => onViewChange('forgot')}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            disabled={loading}
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => {
              setError("");
              setFormData([]);
              onViewChange('signup');
            }}
            className="text-blue-600 hover:text-blue-800 font-medium"
            disabled={loading}
          >
            Sign up
          </button>
        </p>
      </div>
      </div>
      :
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50vw] bg-white p-6">
      {/* Approval Waiting Screen */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Login Successful!</h1>
        
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
                onViewChange('signup');
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
      }
      
      
    </div>
  );
};

export default Login;










// src/components/auth/Login.js
// import {useState,useEffect} from 'react';
// import { Eye, EyeOff, Building2 } from 'lucide-react';

// const Login = ({ 
//   onSubmit, 
//   onViewChange, 
//   loading, 
//   error, 
//   setError,
//   formData, 
//   setFormData,
//   onInputChange, 
//   showPassword, 
//   setShowPassword 
// }) => {

//   const [showWaiting,setShowWaiting]=useState(false);

//   useEffect(()=>{
//   if(error==="Your account is submitted for approval"){
//       setShowWaiting(true);
//   }
//   },[error])
  

//   return (
//     <div className="w-full max-w-md mx-auto">
//       {!showWaiting?
//       <>
//       <div className="text-center mb-8">
//         <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
//           <Building2 className="w-8 h-8 text-white" />
//         </div>
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
//         <p className="text-gray-600">Sign in to access your portfolio dashboard</p>
//       </div>

//       {error && (
//         <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//           <p className="text-red-600 text-sm">{error}</p>
//         </div>
//       )}

//       <form onSubmit={onSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={onInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//             placeholder="Enter your email"
//             required
//             disabled={loading}
//           />
//         </div>

//         <div>
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//             Password
//           </label>
//           <div className="relative">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={onInputChange}
//               className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//               placeholder="Enter your password"
//               required
//               disabled={loading}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//               disabled={loading}
//             >
//               {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <label className="flex items-center">
//             <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" disabled={loading} />
//             <span className="ml-2 text-sm text-gray-600">Remember me</span>
//           </label>
//           <button
//             type="button"
//             onClick={() => onViewChange('forgot')}
//             className="text-sm text-blue-600 hover:text-blue-800 font-medium"
//             disabled={loading}
//           >
//             Forgot Password?
//           </button>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {loading ? 'Signing In...' : 'Sign In'}
//         </button>
//       </form>

//       <div className="mt-6 text-center">
//         <p className="text-gray-600">
//           Don't have an account?{' '}
//           <button
//             onClick={() => {
//               setError("");
//               setFormData([]);
//               onViewChange('signup');
//             }}
//             className="text-blue-600 hover:text-blue-800 font-medium"
//             disabled={loading}
//           >
//             Sign up
//           </button>
//         </p>
//       </div>
//       </>
//       :
//       <>
      
//       </>
//       }
      
      
//     </div>
//   );
// };

// export default Login;












// import { Eye, EyeOff, Building2 } from 'lucide-react';

// export default function SignIn({ formData, handleInputChange, handleSubmit, setCurrentView, showPassword, setShowPassword }) {
//   return (
//     <div className="w-full max-w-md mx-auto">
//       <div className="text-center mb-8">
//         <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
//           <Building2 className="w-8 h-8 text-white" />
//         </div>
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
//         <p className="text-gray-600">Sign in to access your portfolio dashboard</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//             placeholder="Enter your email"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//             Password
//           </label>
//           <div className="relative">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//               placeholder="Enter your password"
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

//         <div className="flex items-center justify-between">
//           <label className="flex items-center">
//             <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
//             <span className="ml-2 text-sm text-gray-600">Remember me</span>
//           </label>
//           <button
//             type="button"
//             onClick={() => setCurrentView('forgot')}
//             className="text-sm text-blue-600 hover:text-blue-800 font-medium"
//           >
//             Forgot Password?
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//         >
//           Sign In
//         </button>
//       </form>

//       <div className="mt-6 text-center">
//         <p className="text-gray-600">
//           Don't have an account?{' '}
//           <button
//             onClick={() => setCurrentView('signup')}
//             className="text-blue-600 hover:text-blue-800 font-medium"
//           >
//             Sign up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }
