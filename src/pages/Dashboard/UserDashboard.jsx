import React, { useState } from 'react';
import {
  FiVideo,
  FiCalendar,
  FiClock,
  FiExternalLink,
  
  FiSearch,
  FiPlay,
  FiCopy,
  FiCheck,
  FiGrid,
  FiList,
  FiChevronDown,
  FiDollarSign,
  FiTrendingUp,
  
  FiArrowRight,
  FiBookOpen,
} from "react-icons/fi";



// Mock data
const mockPurchases = {
  live: [
    {
      id: 1,
      title: "Advanced React Patterns & Performance",
      instructor: "Sarah Johnson",
      purchaseDate: "2026-01-05",
      scheduledDate: "2026-01-15T14:00:00Z",
      duration: 90,
      price: "1999",
      status: "upcoming",
      zoomLink: "https://zoom.us/j/123456789?pwd=abc123",
      meetingId: "123 456 789",
      passcode: "react2026",
      coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80"
    },
    {
      id: 2,
      title: "TypeScript Masterclass 2026",
      instructor: "Michael Chen",
      purchaseDate: "2026-01-08",
      scheduledDate: "2026-01-09T10:00:00Z",
      duration: 120,
      price: "2499",
      status: "live",
      zoomLink: "https://zoom.us/j/987654321?pwd=xyz789",
      meetingId: "987 654 321",
      passcode: "ts2026",
      coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=80"
    }
  ],
  recorded: [
    {
      id: 4,
      title: "Complete Python Development Bootcamp",
      instructor: "Emma Wilson",
      purchaseDate: "2026-01-07",
      duration: 180,
      price: "2999",
      watchLink: "https://zoom.us/rec/play/video456",
      downloadLink: "https://zoom.us/rec/download/video456",
      coverImage: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&q=80",
      progress: 45,
      status: "recorded"
    },
    {
      id: 5,
      title: "AWS Cloud Architecture Fundamentals",
      instructor: "David Lee",
      purchaseDate: "2026-01-03",
      duration: 150,
      price: "3499",
      watchLink: "https://zoom.us/rec/play/video789",
      downloadLink: "https://zoom.us/rec/download/video789",
      coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
      progress: 100,
      status: "recorded"
    }
  ],
  completed: [
    {
      id: 3,
      title: "Node.js Backend Architecture",
      instructor: "Alex Kumar",
      purchaseDate: "2025-12-20",
      scheduledDate: "2026-01-02T16:00:00Z",
      duration: 60,
      price: "1499",
      status: "completed",
      recordingUrl: "https://zoom.us/rec/share/recording123",
      coverImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&q=80"
    }
  ]
};

function UserDashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('cards');
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const allPurchases = [...mockPurchases.live, ...mockPurchases.recorded, ...mockPurchases.completed];
  
  const totalInvestment = allPurchases.reduce((sum, item) => sum + parseInt(item.price), 0);
  const upcomingCount = mockPurchases.live.filter(w => w.status === 'upcoming').length;
  const recordedCount = mockPurchases.recorded.length;
  const completionRate = allPurchases.length > 0 
    ? Math.round((mockPurchases.completed.length / allPurchases.length) * 100) 
    : 0;

  const getFilteredPurchases = () => {
    let filtered = allPurchases;
    
    if (activeTab === 'upcoming') {
      filtered = mockPurchases.live.filter(w => w.status === 'upcoming');
    } else if (activeTab === 'recorded') {
      filtered = mockPurchases.recorded;
    } else if (activeTab === 'completed') {
      filtered = mockPurchases.completed;
    } else if (activeTab === 'missed') {
      filtered = [];
    }
    
    return filtered.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredPurchases = getFilteredPurchases();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-black text-blue-600 mb-2">My Enrollments</h1>
              <p className="text-gray-600">Manage your enrolled webinars and track your learning journey</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                <FiGrid className="w-4 h-4" />
                Orders
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                <FiVideo className="w-4 h-4" />
                Recordings (0)
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-blue-50 rounded-xl p-5 border-2 border-blue-100">
              <div className="flex items-center gap-3 mb-2">
                <FiBookOpen className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">Total</span>
              </div>
              <div className="text-3xl font-black text-blue-600">{allPurchases.length}</div>
              <div className="text-xs text-blue-600 mt-1">Enrollments</div>
            </div>

            <div className="bg-green-50 rounded-xl p-5 border-2 border-green-100">
              <div className="flex items-center gap-3 mb-2">
                <FiTrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-green-700">Rate</span>
              </div>
              <div className="text-3xl font-black text-green-600">{completionRate}%</div>
              <div className="text-xs text-green-600 mt-1">Completion</div>
            </div>

            <div className="bg-purple-50 rounded-xl p-5 border-2 border-purple-100">
              <div className="flex items-center gap-3 mb-2">
                <FiDollarSign className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">Spent</span>
              </div>
              <div className="text-3xl font-black text-purple-600">₹{totalInvestment.toLocaleString()}</div>
              <div className="text-xs text-purple-600 mt-1">Investment</div>
            </div>

            <div className="bg-indigo-50 rounded-xl p-5 border-2 border-indigo-100">
              <div className="flex items-center gap-3 mb-2">
                <FiCalendar className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-700">Upcoming</span>
              </div>
              <div className="text-3xl font-black text-indigo-600">{upcomingCount}</div>
              <div className="text-xs text-indigo-600 mt-1">Upcoming</div>
            </div>

            <div className="bg-rose-50 rounded-xl p-5 border-2 border-rose-100">
              <div className="flex items-center gap-3 mb-2">
                <FiVideo className="w-5 h-5 text-rose-600" />
                <span className="text-sm font-semibold text-rose-700">Owned</span>
              </div>
              <div className="text-3xl font-black text-rose-600">{recordedCount}</div>
              <div className="text-xs text-rose-600 mt-1">Recordings</div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search webinars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            
            <button className="flex items-center gap-2 px-5 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              All Categories
              <FiChevronDown className="w-4 h-4" />
            </button>
            
            <button className="flex items-center gap-2 px-5 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Sort by Date
              <FiChevronDown className="w-4 h-4" />
            </button>

            <div className="flex gap-2 border-2 border-gray-200 rounded-xl p-1">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'cards' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b-2 border-gray-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 px-6 py-4 font-bold transition-colors relative ${
                activeTab === 'all' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              All
              <span className="ml-2 px-2 py-0.5 bg-gray-200 rounded-full text-xs">{allPurchases.length}</span>
              {activeTab === 'all' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" />}
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex-1 px-6 py-4 font-bold transition-colors relative ${
                activeTab === 'upcoming' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Upcoming
              <span className="ml-2 px-2 py-0.5 bg-gray-200 rounded-full text-xs">{upcomingCount}</span>
              {activeTab === 'upcoming' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" />}
            </button>
            <button
              onClick={() => setActiveTab('recorded')}
              className={`flex-1 px-6 py-4 font-bold transition-colors relative ${
                activeTab === 'recorded' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Recorded
              <span className="ml-2 px-2 py-0.5 bg-gray-200 rounded-full text-xs">{recordedCount}</span>
              {activeTab === 'recorded' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" />}
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 px-6 py-4 font-bold transition-colors relative ${
                activeTab === 'completed' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Completed
              <span className="ml-2 px-2 py-0.5 bg-gray-200 rounded-full text-xs">{mockPurchases.completed.length}</span>
              {activeTab === 'completed' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" />}
            </button>
            <button
              onClick={() => setActiveTab('missed')}
              className={`flex-1 px-6 py-4 font-bold transition-colors relative ${
                activeTab === 'missed' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Missed
              <span className="ml-2 px-2 py-0.5 bg-gray-200 rounded-full text-xs">0</span>
              {activeTab === 'missed' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" />}
            </button>
          </div>

          {/* Content Area */}
          <div className="p-8 min-h-[500px]">
            {filteredPurchases.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <FiBookOpen className="w-20 h-20 text-gray-300 mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No enrollments yet</h3>
                <p className="text-gray-600 mb-8 text-center max-w-md">
                  Start learning by enrolling in webinars that interest you.
                </p>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg">
                  Browse Webinars
                  <FiArrowRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPurchases.map((item) => (
                  <WebinarCard key={item.id} w={item} onCopy={copyToClipboard} copiedId={copiedId} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function WebinarCard({ w, onCopy, copiedId }) {
  const getStatusBadge = () => {
    if (w.status === 'upcoming') {
      return <span className="bg-blue-500 text-white text-xs px-3 py-1.5 rounded-full font-bold">Upcoming</span>;
    } else if (w.status === 'live') {
      return <span className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-full font-bold animate-pulse">Live Now</span>;
    } else if (w.status === 'completed') {
      return <span className="bg-gray-500 text-white text-xs px-3 py-1.5 rounded-full font-bold">Completed</span>;
    } else if (w.status === 'recorded') {
      return <span className="bg-emerald-500 text-white text-xs px-3 py-1.5 rounded-full font-bold">On Demand</span>;
    }
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={w.coverImage} 
          alt={w.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          {getStatusBadge()}
        </div>

        {/* Progress for recorded */}
        {w.progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-800/50">
            <div 
              className="h-full bg-emerald-500"
              style={{ width: `${w.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <h3 className="font-bold text-lg text-gray-900 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 transition-colors">
          {w.title}
        </h3>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
            {w.instructor.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{w.instructor}</p>
            <p className="text-xs text-gray-500">Instructor</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <FiClock className="w-4 h-4" />
            <span>{w.duration} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiCalendar className="w-4 h-4" />
            <span>{new Date(w.purchaseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Zoom Details */}
        {w.zoomLink && w.status !== 'completed' && (
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Meeting ID:</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-900">{w.meetingId}</span>
                <button
                  onClick={() => onCopy(w.meetingId, `meeting-${w.id}`)}
                  className="text-blue-600 hover:text-blue-700 p-1"
                >
                  {copiedId === `meeting-${w.id}` ? <FiCheck className="w-3 h-3" /> : <FiCopy className="w-3 h-3" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Passcode:</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-900">{w.passcode}</span>
                <button
                  onClick={() => onCopy(w.passcode, `pass-${w.id}`)}
                  className="text-blue-600 hover:text-blue-700 p-1"
                >
                  {copiedId === `pass-${w.id}` ? <FiCheck className="w-3 h-3" /> : <FiCopy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          {w.zoomLink && w.status !== 'completed' && (
            <a
              href={w.zoomLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
            >
              <FiExternalLink className="w-4 h-4" />
              Join Zoom
            </a>
          )}
          
          {w.recordingUrl && (
            <a
              href={w.recordingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
            >
              <FiPlay className="w-4 h-4" />
              View Recording
            </a>
          )}
          
          {w.watchLink && (
            <a
              href={w.watchLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
            >
              <FiPlay className="w-4 h-4" />
              Watch Now
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;