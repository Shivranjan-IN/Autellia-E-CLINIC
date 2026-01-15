import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { 
  Calendar,
  Heart,
  FileText,
  Video,
  Pill,
  Activity,
  Brain,
  Mic,
  Volume2,
  Upload,
  Download,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  LogOut,
  Bell,
  Search,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { User } from "../App";
import { AppointmentBooking } from "./AppointmentBooking";
import { TelemedicineConsultation } from "./TelemedicineConsultation";

interface PatientDashboardProps {
  user: User;
  onLogout: () => void;
}

export function PatientDashboard({ user, onLogout }: PatientDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showBooking, setShowBooking] = useState(false);
  const [showTelemedicine, setShowTelemedicine] = useState(false);

  // Mock data
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Priya Sharma",
      specialty: "Cardiologist",
      date: "Nov 8, 2025",
      time: "10:00 AM",
      type: "Video Consultation",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
      id: 2,
      doctor: "Dr. Rajesh Kumar",
      specialty: "General Physician",
      date: "Nov 12, 2025",
      time: "2:30 PM",
      type: "In-Clinic Visit",
      avatar: "https://i.pravatar.cc/150?img=12"
    }
  ];

  const healthMetrics = [
    { name: "Mon", heartRate: 72, bloodPressure: 120, glucose: 95 },
    { name: "Tue", heartRate: 75, bloodPressure: 118, glucose: 98 },
    { name: "Wed", heartRate: 70, bloodPressure: 122, glucose: 92 },
    { name: "Thu", heartRate: 73, bloodPressure: 119, glucose: 96 },
    { name: "Fri", heartRate: 71, bloodPressure: 121, glucose: 94 },
    { name: "Sat", heartRate: 74, bloodPressure: 117, glucose: 97 },
    { name: "Sun", heartRate: 72, bloodPressure: 120, glucose: 95 }
  ];

  const recentReports = [
    { name: "Blood Test Report", date: "Oct 28, 2025", type: "Lab Report", status: "Reviewed" },
    { name: "X-Ray Chest", date: "Oct 15, 2025", type: "Radiology", status: "AI Analyzed" },
    { name: "ECG Report", date: "Oct 5, 2025", type: "Cardiology", status: "Normal" }
  ];

  const prescriptions = [
    { medicine: "Metformin 500mg", dosage: "1-0-1", duration: "30 days", doctor: "Dr. Sharma" },
    { medicine: "Aspirin 75mg", dosage: "0-0-1", duration: "90 days", doctor: "Dr. Kumar" }
  ];

  const healthScore = 85;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl">E-Clinic</span>
              </div>
              <nav className="hidden md:flex gap-1">
                <Button 
                  variant={activeTab === "dashboard" ? "secondary" : "ghost"}
                  onClick={() => setActiveTab("dashboard")}
                >
                  Dashboard
                </Button>
                <Button 
                  variant={activeTab === "appointments" ? "secondary" : "ghost"}
                  onClick={() => setActiveTab("appointments")}
                >
                  Appointments
                </Button>
                <Button 
                  variant={activeTab === "reports" ? "secondary" : "ghost"}
                  onClick={() => setActiveTab("reports")}
                >
                  Reports
                </Button>
                <Button 
                  variant={activeTab === "ai-tools" ? "secondary" : "ghost"}
                  onClick={() => setActiveTab("ai-tools")}
                >
                  AI Tools
                </Button>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">Patient</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard View */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
              <h1 className="text-3xl mb-2">Welcome back, {user.name}!</h1>
              <p className="text-pink-100 mb-6">Your health score is looking great today</p>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span>Health Score</span>
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="text-3xl mb-2">{healthScore}%</div>
                  <Progress value={healthScore} className="h-2" />
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span>Next Appointment</span>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="text-xl">Nov 8</div>
                  <p className="text-sm text-pink-100">in 2 days</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-auto py-6 flex-col gap-2" variant="outline" onClick={() => setShowBooking(true)}>
                  <Video className="w-6 h-6 text-pink-600" />
                  <span>Book Appointment</span>
                </Button>
                <Button className="h-auto py-6 flex-col gap-2" variant="outline">
                  <Brain className="w-6 h-6 text-purple-600" />
                  <span>AI Symptom Checker</span>
                </Button>
                <Button className="h-auto py-6 flex-col gap-2" variant="outline">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <span>Upload Report</span>
                </Button>
                <Button className="h-auto py-6 flex-col gap-2" variant="outline">
                  <Pill className="w-6 h-6 text-green-600" />
                  <span>Order Medicine</span>
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Upcoming Appointments */}
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3>Upcoming Appointments</h3>
                    <Button variant="ghost" size="sm">View All</Button>
                  </div>
                  <div className="space-y-4">
                    {upcomingAppointments.map((apt) => (
                      <div key={apt.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={apt.avatar} alt={apt.doctor} />
                          <AvatarFallback>{apt.doctor.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p>{apt.doctor}</p>
                          <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{apt.date}</p>
                          <p className="text-sm text-muted-foreground">{apt.time}</p>
                          <Badge variant="secondary" className="mt-1">
                            {apt.type}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Health Reminders */}
              <Card className="p-6">
                <h3 className="mb-4">Reminders</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-pink-50 rounded-lg">
                    <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Pill className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm">Take Metformin</p>
                      <p className="text-xs text-muted-foreground">After breakfast</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Activity className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm">Check Blood Pressure</p>
                      <p className="text-xs text-muted-foreground">Morning & Evening</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm">Blood Test Due</p>
                      <p className="text-xs text-muted-foreground">In 5 days</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Health Trends */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3>Health Trends</h3>
                <div className="flex gap-2">
                  <Badge variant="outline">
                    <div className="w-2 h-2 bg-pink-600 rounded-full mr-2"></div>
                    Heart Rate
                  </Badge>
                  <Badge variant="outline">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                    Blood Pressure
                  </Badge>
                  <Badge variant="outline">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                    Glucose
                  </Badge>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={healthMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="heartRate" stroke="#ec4899" strokeWidth={2} />
                  <Line type="monotone" dataKey="bloodPressure" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="glucose" stroke="#a855f7" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Recent Reports & Prescriptions */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="mb-4">Recent Reports</h3>
                <div className="space-y-3">
                  {recentReports.map((report, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent transition-colors">
                      <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-pink-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{report.name}</p>
                        <p className="text-xs text-muted-foreground">{report.date}</p>
                      </div>
                      <Badge variant="secondary">{report.status}</Badge>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4">Active Prescriptions</h3>
                <div className="space-y-3">
                  {prescriptions.map((rx, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm">{rx.medicine}</p>
                          <p className="text-xs text-muted-foreground">by {rx.doctor}</p>
                        </div>
                        <Badge>{rx.duration}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Dosage: {rx.dosage}</p>
                      <Button size="sm" variant="outline" className="w-full mt-2">
                        Order Refill
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* AI Tools View */}
        {activeTab === "ai-tools" && (
          <div className="space-y-6">
            <div>
              <h1 className="mb-2">AI-Powered Health Tools</h1>
              <p className="text-muted-foreground">Get instant insights about your health using advanced AI</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* AI Symptom Checker */}
              <Card className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2">AI Symptom Checker</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Describe your symptoms and get AI-powered insights with specialist recommendations
                </p>
                <Button className="w-full">Start Diagnosis</Button>
              </Card>

              {/* Voice Input */}
              <Card className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2">Voice-to-Text</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Speak your symptoms in English or Hindi, and AI will analyze them
                </p>
                <Button className="w-full" variant="outline">
                  <Mic className="w-4 h-4 mr-2" />
                  Start Recording
                </Button>
              </Card>

              {/* Report Explainer */}
              <Card className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2">Report Explainer</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload any medical report and get a simple explanation in your language
                </p>
                <Button className="w-full" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Report
                </Button>
              </Card>

              {/* Audio Summary */}
              <Card className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                  <Volume2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2">Audio Summary</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Listen to your health reports and summaries in audio format
                </p>
                <Button className="w-full" variant="outline">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Text-to-Speech
                </Button>
              </Card>

              {/* X-Ray Analysis */}
              <Card className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2">X-Ray & Scan Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  AI-powered analysis of X-rays, CT scans, and MRIs with detailed explanations
                </p>
                <Button className="w-full" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Scan
                </Button>
              </Card>

              {/* Health Insights */}
              <Card className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-2">Health Insights</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get personalized health recommendations based on your medical history
                </p>
                <Button className="w-full">View Insights</Button>
              </Card>
            </div>

            {/* Demo AI Symptom Checker */}
            <Card className="p-6">
              <h3 className="mb-4">Try AI Symptom Checker</h3>
              <div className="space-y-4">
                <div>
                  <Label>Describe your symptoms (English or Hindi)</Label>
                  <div className="flex gap-2 mt-2">
                    <Input placeholder="E.g., I have a headache and fever..." className="flex-1" />
                    <Button size="icon" variant="outline">
                      <Mic className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Button className="w-full">Analyze Symptoms</Button>
                
                {/* Sample Result */}
                <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-pink-600 mt-0.5" />
                    <div>
                      <p className="text-sm mb-2">
                        <strong>AI Analysis:</strong> Based on your symptoms, you may have a common viral infection. 
                        The AI suggests consulting a General Physician or an ENT Specialist.
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">
                        सामान्य वायरल संक्रमण की संभावना है। कृपया सामान्य चिकित्सक से परामर्श लें।
                      </p>
                      <Button size="sm">Book Appointment with GP</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Appointments View */}
        {activeTab === "appointments" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="mb-2">Appointments</h1>
                <p className="text-muted-foreground">Manage your consultations and bookings</p>
              </div>
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Book New Appointment
              </Button>
            </div>

            <Tabs defaultValue="upcoming">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4 mt-6">
                {upcomingAppointments.map((apt) => (
                  <Card key={apt.id} className="p-6">
                    <div className="flex items-start gap-6">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={apt.avatar} alt={apt.doctor} />
                        <AvatarFallback>{apt.doctor.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="mb-1">{apt.doctor}</h3>
                            <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                          </div>
                          <Badge variant="secondary">{apt.type}</Badge>
                        </div>
                        <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {apt.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {apt.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            City Hospital, Main Branch
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button onClick={() => setShowTelemedicine(true)}>
                            {apt.type === "Video Consultation" ? (
                              <>
                                <Video className="w-4 h-4 mr-2" />
                                Join Video Call
                              </>
                            ) : (
                              <>
                                <MapPin className="w-4 h-4 mr-2" />
                                Get Directions
                              </>
                            )}
                          </Button>
                          <Button variant="outline">Reschedule</Button>
                          <Button variant="outline">Cancel</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="past">
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No past appointments</p>
                </Card>
              </TabsContent>

              <TabsContent value="cancelled">
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No cancelled appointments</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Reports View */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="mb-2">Medical Reports</h1>
                <p className="text-muted-foreground">View and manage your health records</p>
              </div>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Upload Report
              </Button>
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search reports..." className="pl-10" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentReports.map((report, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-pink-600" />
                    </div>
                    <Badge variant="secondary">{report.status}</Badge>
                  </div>
                  <h3 className="mb-1">{report.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{report.type} • {report.date}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Brain className="w-4 h-4 mr-2" />
                      AI Explain
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Appointment Booking Modal */}
      {showBooking && (
        <AppointmentBooking
          onClose={() => setShowBooking(false)}
        />
      )}

      {/* Telemedicine Consultation Modal */}
      {showTelemedicine && (
        <TelemedicineConsultation
          onClose={() => setShowTelemedicine(false)}
        />
      )}
    </div>
  );
}
