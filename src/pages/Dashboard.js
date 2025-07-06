import { User, LogOut, Building2, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';

const apiUrl = process.env.REACT_APP_BACKEND_API;

// Updated mock data to match the new format
// const mockCompanies = {
//   "1": {
//     "description": "ZVIA Tech provides an AI-powered platform that offers personalized learning experiences and data-driven insights.",
//     "name": "ZVIA Tech Pvt. Ltd.",
//     "sector": "EdTech"
//   },
//   "2": {
//     "description": "Autonomous ship hull cleaning and inspection robots",
//     "name": "Mafkin Robotics",
//     "sector": "HealthTech"
//   },
//   "3": {
//     "description": "Cittaa Health Services is transforming mental healthcare in educational institutions through integrated solutions.",
//     "name": "Cittaa Health Service",
//     "sector": "Healthcare"
//   },
//   "4": {
//     "description": "Advanced workflow automation and AI-driven business process optimization platform.",
//     "name": "TechFlow Solutions",
//     "sector": "AI"
//   }
// };


const colors=[
  "from-green-500 to-teal-600",
  "from-purple-500 to-indigo-600",
  "from-orange-500 to-red-500",
  "from-blue-500 to-cyan-600"
]

// Additional company details for display (colors and letters)
// const companyDisplayDetails = {
//   "1": {
//     letter: "Z",
//     color: "from-purple-500 to-indigo-600",
//     tags: ["EdTech", "Digital Learning", "Education Analytics"]
//   },
//   "2": {
//     letter: "M",
//     color: "from-green-500 to-teal-600",
//     tags: ["HealthTech", "Medical Imaging"]
//   },
//   "3": {
//     letter: "C",
//     color: "from-orange-500 to-red-500",
//     tags: ["Healthcare", "Telemedicine", "Patient Care"]
//   },
//   "4": {
//     letter: "T",
//     color: "from-blue-500 to-cyan-600",
//     tags: ["AI", "Automation", "Business Process"]
//   }
// };

const DashboardPage = () => {
  const { user, logout, token } = useAuth();
  const [activeTab, setActiveTab] = useState('All Sectors');
  const [companies, setCompanies] = useState([]);

  const sectors = ['All Sectors', 'EdTech', 'HealthTech', 'Healthcare', 'AI', 
                  'Digital Learning', 'Education Analytics', 'Medical Imaging', 
                  'Telemedicine', 'Patient Care', 'Automation', 'Business Process'];

  useEffect(() => {
    const fetchCompanyList = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/company/list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        const data = await response.json();
        if (response.ok) {
          setCompanies(data);
          return { success: true, message: 'Company List Fetch successful' };
        } else {
          return { success: false, message: data.message || 'Company List Fetch failed' };
        }
      } catch (error) {
        console.error('Company List Fetch error:', error);
        return { success: false, message: 'Network error. Please try again.' };
      }
    }

    fetchCompanyList();
  }, [token]);

  const handleCompanyClick = (companyId, companyName) => {
    const url=`/vc/company/${companyId}/${encodeURIComponent(companyName)}`;
    window.open(url, '_blank');
  };

  // Filter companies based on active tab
  const filteredCompanies = activeTab === 'All Sectors' 
    ? Object.entries(companies)
    : Object.entries(companies).filter(([id, company]) => {
        const displayDetails = company[id];
        return company.sector === activeTab || 
               (displayDetails && displayDetails.tags.includes(activeTab));
      });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Portfolio Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-700">
                <User className="w-5 h-5 mr-2" />
                <span>Welcome, {user?.firstName || 'User'}</span>
              </div>
              <button
                onClick={logout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Portfolio Companies</h2>
              
              {/* Sector Filter Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {sectors.map((sector) => (
                  <button
                    key={sector}
                    onClick={() => setActiveTab(sector)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTab === sector
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {sector}
                  </button>
                ))}
              </div>

              {/* Companies Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.map(([id, company]) => {
                  // Get additional display details
                  const displayDetails = company[id] || {
                    letter: company.name.charAt(0),
                    color: colors[id%4],
                    tags: company.sector ? [company.sector] : []
                  };

                  return (
                    <div
                      key={id}
                      onClick={() => handleCompanyClick(id, company.name)}
                      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
                    >
                      <div className={`h-32 bg-gradient-to-br ${displayDetails.color} rounded-t-lg flex items-center justify-center`}>
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-gray-700">{displayDetails.letter}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                          <ExternalLink className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{company.description || "No description available"}</p>
                        <div className="flex flex-wrap gap-1">
                          {displayDetails.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;















// import { User, LogOut, Building2, ExternalLink } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useAuth } from '../auth/AuthProvider';
// import PopUpQR from '../components/PopUpQR';
// import { useNavigate } from 'react-router-dom';

// const apiUrl = process.env.REACT_APP_BACKEND_API;

// // Updated mock data to match the simplified format
// const mockCompanies = {
//   "1": "ZVIA Tech Pvt. Ltd.",
//   "2": "Mafkin Robotics",
//   "3": "Cittaa Health Service",
//   "4": "TechFlow Solutions"
// };

// // Additional company details that we'll use for display
// const companyDetails = {
//   "1": {
//     description: "ZVIA Tech provides an AI-powered platform that offers personalized learning experiences and data-driven insights.",
//     letter: "Z",
//     color: "from-purple-500 to-indigo-600",
//     tags: ["EdTech", "Digital Learning", "Education Analytics"]
//   },
//   "2": {
//     description: "Autonomous ship hull cleaning and inspection robots",
//     letter: "M",
//     color: "from-green-500 to-teal-600",
//     tags: ["HealthTech", "Medical Imaging"]
//   },
//   "3": {
//     description: "Cittaa Health Services is transforming mental healthcare in educational institutions through integrated solutions.",
//     letter: "C",
//     color: "from-orange-500 to-red-500",
//     tags: ["Healthcare", "Telemedicine", "Patient Care"]
//   },
//   "4": {
//     description: "Advanced workflow automation and AI-driven business process optimization platform.",
//     letter: "T",
//     color: "from-blue-500 to-cyan-600",
//     tags: ["AI Diagnostics", "Healthcare"]
//   }
// };

// const DashboardPage = () => {
//   const { user, logout, showQr, token } = useAuth();
//   const [activeTab, setActiveTab] = useState('All Sectors');
//   const [companies, setCompanies] = useState(mockCompanies);

//   const navigate = useNavigate();

//   const sectors = ['All Sectors', 'EdTech', 'Digital Learning', 'Education Analytics', 'HealthTech', 'Medical Imaging', 'AI Diagnostics', 'Healthcare', 'Telemedicine', 'Patient Care'];

//   useEffect(() => {
//     const fetchCompanyList = async () => {
//       try {
//         const response = await fetch(`${apiUrl}/api/company/list`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//         });

//         const data = await response.json();
//         console.log(data)
//         if (response.ok) {
//           setCompanies(data);
//           return { success: true, message: 'Company List Fetch successful' };
//         } else {
//           return { success: false, message: data.message || 'Company List Fetch failed' };
//         }
//       } catch (error) {
//         console.error('Company List Fetch error:', error);
//         return { success: false, message: 'Network error. Please try again.' };
//       }
//     }

//     fetchCompanyList();
//   }, [token]);

//   const handleCompanyClick = (companyId, companyName) => {
//     const url=`/vc/company/${companyId}/${encodeURIComponent(companyName)}`;
//     window.open(url, '_blank');
//   };

//   // For filtering, we'll use the companyDetails data since that contains the tags
//   const filteredCompanies = activeTab === 'All Sectors' 
//     ? Object.entries(companies)
//     : Object.entries(companies).filter(([id]) => {
//         const details = companyDetails[id];
//         return details && details.tags.includes(activeTab);
//       });

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center">
//               <Building2 className="w-8 h-8 text-blue-600 mr-3" />
//               <h1 className="text-xl font-semibold text-gray-900">Portfolio Dashboard</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center text-gray-700">
//                 <User className="w-5 h-5 mr-2" />
//                 <span>Welcome, {user?.firstName || 'User'}</span>
//               </div>
//               <button
//                 onClick={logout}
//                 className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 <LogOut className="w-4 h-4 mr-2" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Portfolio Companies</h2>
              
//               {/* Sector Filter Tabs */}
//               <div className="flex flex-wrap gap-2 mb-8">
//                 {sectors.map((sector) => (
//                   <button
//                     key={sector}
//                     onClick={() => setActiveTab(sector)}
//                     className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                       activeTab === sector
//                         ? 'bg-blue-500 text-white'
//                         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                     }`}
//                   >
//                     {sector}
//                   </button>
//                 ))}
//               </div>

//               {/* Companies Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredCompanies.map(([id, companyName]) => {
//                   // Get additional details for display
//                   const details = companyDetails[id] || {
//                     description: "No description available",
//                     letter: companyName.charAt(0),
//                     color: "from-gray-500 to-gray-600",
//                     tags: []
//                   };

//                   return (
//                     <div
//                       key={id}
//                       onClick={() => handleCompanyClick(id, companyName)}
//                       className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
//                     >
//                       <div className={`h-32 bg-gradient-to-br ${details.color} rounded-t-lg flex items-center justify-center`}>
//                         <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
//                           <span className="text-2xl font-bold text-gray-700">{details.letter}</span>
//                         </div>
//                       </div>
//                       <div className="p-4">
//                         <div className="flex items-center justify-between mb-2">
//                           <h3 className="text-lg font-semibold text-gray-900">{companyName}</h3>
//                           <ExternalLink className="w-4 h-4 text-gray-400" />
//                         </div>
//                         <p className="text-sm text-gray-600 mb-3 line-clamp-2">{details.description}</p>
//                         <div className="flex flex-wrap gap-1">
//                           {details.tags.map((tag) => (
//                             <span
//                               key={tag}
//                               className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
//                             >
//                               {tag}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//         </div>
//       </main>

//       {/* QR Code Modal */}
//       {showQr && (
//         <PopUpQR/>
//       )}
//     </div>
//   );
// };

// export default DashboardPage;
















//UNCOMMENT THIS BELOW CODE WHEN JSON IS IN THIS FORMAT: 
// {
//     "1": {"Acme Inc", "EdTech", "Acme Inc is an Ai powered Platform"},
//     "4": {"Fake Company", "FinTech", "Acme Inc is an Ai assisted Platform"}
// }


// import { User, LogOut, Building2, Check, X, Trash2, ExternalLink } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useAuth } from '../auth/AuthProvider';
// import PopUpQR from '../components/PopUpQR';

// const apiUrl = process.env.REACT_APP_BACKEND_API;

// const mockCompanies = {
//   "1": {
//     name: "ZVIA Tech Pvt. Ltd.",
//     description: "ZVIA Tech provides an AI-powered platform that offers personalized learning experiences and data-driven insights.",
//     letter: "Z",
//     color: "from-purple-500 to-indigo-600",
//     tags: ["EdTech", "Digital Learning", "Education Analytics"]
//   },
//   "2": {
//     name: "Mafkin Robotics",
//     description: "Autonomous ship hull cleaning and inspection robots",
//     letter: "M",
//     color: "from-green-500 to-teal-600",
//     tags: ["HealthTech", "Medical Imaging"]
//   },
//   "3": {
//     name: "Cittaa Health Service",
//     description: "Cittaa Health Services is transforming mental healthcare in educational institutions through integrated solutions.",
//     letter: "C",
//     color: "from-orange-500 to-red-500",
//     tags: ["Healthcare", "Telemedicine", "Patient Care"]
//   },
//   "4": {
//     name: "TechFlow Solutions",
//     description: "Advanced workflow automation and AI-driven business process optimization platform.",
//     letter: "T",
//     color: "from-blue-500 to-cyan-600",
//     tags: ["AI Diagnostics", "Healthcare"]
//   }
// };

// const DashboardPage = () => {
//   const { user, logout, showQr, token } = useAuth();
//   const [activeTab, setActiveTab] = useState('All Sectors');
//   const [companies, setCompanies] = useState(mockCompanies);

//   const sectors = ['All Sectors', 'EdTech', 'Digital Learning', 'Education Analytics', 'HealthTech', 'Medical Imaging', 'AI Diagnostics', 'Healthcare', 'Telemedicine', 'Patient Care'];

//   useEffect(() => {
//     const fetchCompanyList = async () => {
//       try {
//         const response = await fetch(`${apiUrl}/api/company/list`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setCompanies(data);
//           return { success: true, message: 'Company List Fetch successful' };
//         } else {
//           return { success: false, message: data.message || 'Company List Fetch failed' };
//         }
//       } catch (error) {
//         console.error('Company List Fetch error:', error);
//         return { success: false, message: 'Network error. Please try again.' };
//       }
//     }

//     fetchCompanyList();
//   }, [token]);

//   const handleCompanyClick = (companyId, company) => {
//     // Open company details in new tab
//     const newWindow = window.open('', '_blank');
//     newWindow.document.write(`
//       <html>
//         <head>
//           <title>${company.name} - Details</title>
//           <style>
//             body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
//             .header { background: linear-gradient(135deg, ${company.color.replace('from-', '').replace('to-', '').replace('-500', '').replace('-600', '')}); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
//             .tag { display: inline-block; background: #e5e7eb; padding: 4px 12px; border-radius: 20px; margin: 4px; font-size: 12px; }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <h1>${company.name}</h1>
//           </div>
//           <p><strong>Description:</strong> ${company.description}</p>
//           <div>
//             <strong>Tags:</strong>
//             ${company.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
//           </div>
//         </body>
//       </html>
//     `);
//   };

//   const filteredCompanies = activeTab === 'All Sectors' 
//     ? Object.entries(companies)
//     : Object.entries(companies).filter(([id, company]) => company.tags.includes(activeTab));

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center">
//               <Building2 className="w-8 h-8 text-blue-600 mr-3" />
//               <h1 className="text-xl font-semibold text-gray-900">Portfolio Dashboard</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center text-gray-700">
//                 <User className="w-5 h-5 mr-2" />
//                 <span>Welcome, {user?.firstName || 'User'}</span>
//               </div>
//               <button
//                 onClick={logout}
//                 className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 <LogOut className="w-4 h-4 mr-2" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Portfolio Companies</h2>
              
//               {/* Sector Filter Tabs */}
//               <div className="flex flex-wrap gap-2 mb-8">
//                 {sectors.map((sector) => (
//                   <button
//                     key={sector}
//                     onClick={() => setActiveTab(sector)}
//                     className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                       activeTab === sector
//                         ? 'bg-blue-500 text-white'
//                         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                     }`}
//                   >
//                     {sector}
//                   </button>
//                 ))}
//               </div>

//               {/* Companies Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredCompanies.map(([id, company]) => (
//                   <div
//                     key={id}
//                     onClick={() => handleCompanyClick(id, company)}
//                     className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
//                   >
//                     <div className={`h-32 bg-gradient-to-br ${company.color} rounded-t-lg flex items-center justify-center`}>
//                       <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
//                         <span className="text-2xl font-bold text-gray-700">{company.letter}</span>
//                       </div>
//                     </div>
//                     <div className="p-4">
//                       <div className="flex items-center justify-between mb-2">
//                         <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
//                         <ExternalLink className="w-4 h-4 text-gray-400" />
//                       </div>
//                       <p className="text-sm text-gray-600 mb-3 line-clamp-2">{company.description}</p>
//                       <div className="flex flex-wrap gap-1">
//                         {company.tags.map((tag) => (
//                           <span
//                             key={tag}
//                             className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//         </div>
//       </main>

//       {/* QR Code Modal */}
//       {showQr && (
//         <PopUpQR/>
//       )}
//     </div>
//   );
// };

// export default DashboardPage;


















// import { User, LogOut, Building2, Check, X, Trash2, ExternalLink } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useAuth } from '../auth/AuthProvider';
// import PopUpQR from '../components/PopUpQR';

// const apiUrl = process.env.REACT_APP_BACKEND_API;

// const mockCompanies = [
//   {
//     id: 1,
//     name: "ZVIA Tech Pvt. Ltd.",
//     description: "ZVIA Tech provides an AI-powered platform that offers personalized learning experiences and data-driven insights.",
//     letter: "Z",
//     color: "from-purple-500 to-indigo-600",
//     tags: ["EdTech", "Digital Learning", "Education Analytics"]
//   },
//   {
//     id: 2,
//     name: "Mafkin Robotics",
//     description: "Autonomous ship hull cleaning and inspection robots",
//     letter: "M",
//     color: "from-green-500 to-teal-600",
//     tags: ["HealthTech", "Medical Imaging"]
//   },
//   {
//     id: 3,
//     name: "Cittaa Health Service",
//     description: "Cittaa Health Services is transforming mental healthcare in educational institutions through integrated solutions.",
//     letter: "C",
//     color: "from-orange-500 to-red-500",
//     tags: ["Healthcare", "Telemedicine", "Patient Care"]
//   },
//   {
//     id: 4,
//     name: "TechFlow Solutions",
//     description: "Advanced workflow automation and AI-driven business process optimization platform.",
//     letter: "T",
//     color: "from-blue-500 to-cyan-600",
//     tags: ["AI Diagnostics", "Healthcare"]
//   }
// ];

// const DashboardPage = () => {
//   // Use actual auth context
//   const { user, logout, showQr, token } = useAuth();
//   const [activeTab, setActiveTab] = useState('All Sectors');
//   const [companies, setCompanies] = useState({});

//   const sectors = ['All Sectors', 'EdTech', 'Digital Learning', 'Education Analytics', 'HealthTech', 'Medical Imaging', 'AI Diagnostics', 'Healthcare', 'Telemedicine', 'Patient Care'];

  
//   useEffect(()=>{
//     const fetchCompanyList=async()=>{
//       try {
//         const response = await fetch(`${apiUrl}/api/company/list`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization':`Bearer ${token}`
//           },
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setCompanies(data);
//           console.log(data)
//           return { success: true, message: 'Company List Fetch successful' };
//         } else {
//           return { success: false, message: data.message || 'Company List Fetch failed' };
//         }
//       } catch (error) {
//         console.error('Company List Fetch error:', error);
//         return { success: false, message: 'Network error. Please try again.' };
//       }
//     }

//   fetchCompanyList();
//   },[])



//   const handleCompanyClick = (company) => {
//     // Open company details in new tab
//     const newWindow = window.open('', '_blank');
//     newWindow.document.write(`
//       <html>
//         <head>
//           <title>${company.name} - Details</title>
//           <style>
//             body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
//             .header { background: linear-gradient(135deg, ${company.color.replace('from-', '').replace('to-', '').replace('-500', '').replace('-600', '')}); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
//             .tag { display: inline-block; background: #e5e7eb; padding: 4px 12px; border-radius: 20px; margin: 4px; font-size: 12px; }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <h1>${company.name}</h1>
//           </div>
//           <p><strong>Description:</strong> ${company.description}</p>
//           <div>
//             <strong>Tags:</strong>
//             ${company.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
//           </div>
//         </body>
//       </html>
//     `);
//   };

//   const filteredCompanies = activeTab === 'All Sectors' 
//     ? mockCompanies 
//     : mockCompanies.filter(company => company.tags.includes(activeTab));

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center">
//               <Building2 className="w-8 h-8 text-blue-600 mr-3" />
//               <h1 className="text-xl font-semibold text-gray-900">Portfolio Dashboard</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center text-gray-700">
//                 <User className="w-5 h-5 mr-2" />
//                 <span>Welcome, {user?.firstName || 'User'}</span>
//               </div>
//               <button
//                 onClick={logout}
//                 className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 <LogOut className="w-4 h-4 mr-2" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Portfolio Companies</h2>
              
//               {/* Sector Filter Tabs */}
//               <div className="flex flex-wrap gap-2 mb-8">
//                 {sectors.map((sector) => (
//                   <button
//                     key={sector}
//                     onClick={() => setActiveTab(sector)}
//                     className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                       activeTab === sector
//                         ? 'bg-blue-500 text-white'
//                         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                     }`}
//                   >
//                     {sector}
//                   </button>
//                 ))}
//               </div>

//               {/* Companies Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredCompanies.map((company) => (
//                   <div
//                     key={company.id}
//                     onClick={() => handleCompanyClick(company)}
//                     className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
//                   >
//                     <div className={`h-32 bg-gradient-to-br ${company.color} rounded-t-lg flex items-center justify-center`}>
//                       <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
//                         <span className="text-2xl font-bold text-gray-700">{company.letter}</span>
//                       </div>
//                     </div>
//                     <div className="p-4">
//                       <div className="flex items-center justify-between mb-2">
//                         <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
//                         <ExternalLink className="w-4 h-4 text-gray-400" />
//                       </div>
//                       <p className="text-sm text-gray-600 mb-3 line-clamp-2">{company.description}</p>
//                       <div className="flex flex-wrap gap-1">
//                         {company.tags.map((tag) => (
//                           <span
//                             key={tag}
//                             className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//         </div>
//       </main>

//       {/* QR Code Modal */}
//       {showQr && (
//         <PopUpQR/>
//       )}
//     </div>
//   );
// };

// export default DashboardPage;


















// import { User, LogOut, Shield, Building2 } from 'lucide-react';
// import { useAuth } from '../auth/AuthProvider';
// import PopUpQR from '../components/PopUpQR';

// const DashboardPage = () => {
//   const { user, logout, showQr } = useAuth();
  

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center">
//               <Building2 className="w-8 h-8 text-blue-600 mr-3" />
//               <h1 className="text-xl font-semibold text-gray-900">Portfolio Dashboard</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center text-gray-700">
//                 <User className="w-5 h-5 mr-2" />
//                 <span>Welcome, {user?.firstName || 'User'}</span>
//               </div>
//               <button
//                 onClick={logout}
//                 className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 <LogOut className="w-4 h-4 mr-2" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
//             <div className="text-center">
//               <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">Protected Dashboard</h2>
//               <p className="text-gray-600 mb-4">
//                 You are successfully authenticated and can access this protected content!
//               </p>
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
//                 <h3 className="font-medium text-blue-900 mb-2">Your Information:</h3>
//                 <p className="text-sm text-blue-800">
//                   <strong>Email:</strong> {user?.email}<br />
//                   <strong>Name:</strong> {user?.firstName} {user?.lastName}<br />
//                   {user?.company && (
//                     <>
//                       <strong>Company:</strong> {user.company}
//                     </>
//                   )}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* QR Code Modal */}
//       {showQr && (
//         <PopUpQR/>
//       )}
//     </div>
//   );
// };

// export default DashboardPage;


















// // src/pages/DashboardPage.js
// import { User, LogOut, Shield, Building2 } from 'lucide-react';
// import { useAuth } from '../auth/AuthProvider';

// const DashboardPage = () => {
//   const { user, logout, showQr } = useAuth();

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center">
//               <Building2 className="w-8 h-8 text-blue-600 mr-3" />
//               <h1 className="text-xl font-semibold text-gray-900">Portfolio Dashboard</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center text-gray-700">
//                 <User className="w-5 h-5 mr-2" />
//                 <span>Welcome, {user?.firstName || 'User'}</span>
//               </div>
//               <button
//                 onClick={logout}
//                 className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 <LogOut className="w-4 h-4 mr-2" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
//             <div className="text-center">
//               <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">Protected Dashboard</h2>
//               <p className="text-gray-600 mb-4">
//                 You are successfully authenticated and can access this protected content!
//               </p>
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
//                 <h3 className="font-medium text-blue-900 mb-2">Your Information:</h3>
//                 <p className="text-sm text-blue-800">
//                   <strong>Email:</strong> {user?.email}<br />
//                   <strong>Name:</strong> {user?.firstName} {user?.lastName}<br />
//                   {user?.company && (
//                     <>
//                       <strong>Company:</strong> {user.company}
//                     </>
//                   )}
//                 </p>
//               </div>
//             </div>
//             {showQr?<>Show QR</>:<>Dont't Show QR</>}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DashboardPage;