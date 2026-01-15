// Comprehensive AI Modules & IoT Integration for Clinic
// 13 AI Features + IoT Devices + Settings & Support

import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { 
  Brain, Sparkles, Mic, Volume2, MessageCircle, Camera, Languages,
  Target, AlertCircle, CheckCircle, Zap, Activity, TrendingUp,
  Wifi, Smartphone, Heart, Thermometer, Droplet, Monitor, Cpu,
  Bluetooth, Radio, Clock, Users, Calendar, FileText, Settings,
  Shield, Lock, Database, Key, HelpCircle, BookOpen, Headphones,
  Globe, CreditCard, User, Bell, Mail, Phone, Download, Upload,
  Eye, Edit, X, Plus, Search, Filter, BarChart3, PieChart as PieChartIcon
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

// ============================================================================
// SECTION 12: AI MODULES (13 Features)
// ============================================================================

export function AIModulesHub() {
  const [activeAI, setActiveAI] = useState<string | null>(null);
  const [voiceInput, setVoiceInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const aiModules = [
    {
      id: "appointment-assistant",
      name: "AI Appointment Assistant",
      description: "Smart slot suggestions and automatic scheduling",
      icon: Calendar,
      color: "blue",
      status: "Active"
    },
    {
      id: "virtual-receptionist",
      name: "Virtual Receptionist (Chatbot)",
      description: "24/7 patient query handling",
      icon: MessageCircle,
      color: "green",
      status: "Active"
    },
    {
      id: "symptom-checker",
      name: "AI Symptom Checker",
      description: "Preliminary diagnosis suggestions",
      icon: Activity,
      color: "purple",
      status: "Active"
    },
    {
      id: "prescription-generator",
      name: "Prescription Generator",
      description: "AI-powered medication suggestions with drug interaction checks",
      icon: FileText,
      color: "pink",
      status: "Active"
    },
    {
      id: "analytics-insights",
      name: "Analytics & Insights",
      description: "Predictive analytics and trend analysis",
      icon: BarChart3,
      color: "orange",
      status: "Active"
    },
    {
      id: "health-summarizer",
      name: "Health Record Summarizer",
      description: "AI-generated patient health summaries",
      icon: FileText,
      color: "teal",
      status: "Active"
    },
    {
      id: "voice-to-text",
      name: "Voice-to-Text Notes",
      description: "Hands-free clinical documentation",
      icon: Mic,
      color: "red",
      status: "Active"
    },
    {
      id: "document-scanner",
      name: "Document Scanner (OCR)",
      description: "Extract text from prescriptions and reports",
      icon: Camera,
      color: "indigo",
      status: "Active"
    },
    {
      id: "treatment-recommendation",
      name: "Treatment Recommendation Engine",
      description: "Evidence-based treatment suggestions",
      icon: Target,
      color: "cyan",
      status: "Active"
    },
    {
      id: "feedback-analyzer",
      name: "Feedback & Sentiment Analyzer",
      description: "Analyze patient feedback and satisfaction",
      icon: TrendingUp,
      color: "lime",
      status: "Active"
    },
    {
      id: "face-recognition",
      name: "Face Recognition Attendance",
      description: "Automated staff attendance tracking",
      icon: Camera,
      color: "amber",
      status: "Active"
    },
    {
      id: "clinical-qa",
      name: "Clinical Assistant Q&A",
      description: "Medical knowledge base and query assistance",
      icon: Brain,
      color: "violet",
      status: "Active"
    },
    {
      id: "workload-planner",
      name: "Predictive Workload Planner",
      description: "AI-powered staff scheduling and resource allocation",
      icon: Users,
      color: "fuchsia",
      status: "Active"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white rounded-lg">
            <Brain className="w-8 h-8 text-purple-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">AI-Powered Clinical Intelligence</h2>
            <p className="text-muted-foreground">13 advanced AI modules to enhance clinic operations, improve patient care, and streamline workflows</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-purple-600">13</p>
            <p className="text-sm text-muted-foreground">AI Modules</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-bold mb-6">AI Modules</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiModules.map((module) => (
            <Card 
              key={module.id} 
              className={`p-6 cursor-pointer transition-all hover:shadow-lg border-2 ${
                activeAI === module.id ? 'border-pink-500 bg-pink-50' : 'border-transparent'
              }`}
              onClick={() => setActiveAI(module.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-3 bg-${module.color}-100 rounded-lg`}>
                  <module.icon className={`w-6 h-6 text-${module.color}-600`} />
                </div>
                <Badge variant={module.status === "Active" ? "default" : "secondary"}>
                  {module.status}
                </Badge>
              </div>
              
              <h4 className="font-semibold mb-2">{module.name}</h4>
              <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
              
              <Button variant="outline" size="sm" className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Launch Module
              </Button>
            </Card>
          ))}
        </div>
      </Card>

      {/* AI Module Demos */}
      {activeAI === "symptom-checker" && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold">AI Symptom Checker</h3>
            </div>
            <Button variant="ghost" onClick={() => setActiveAI(null)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="max-w-2xl space-y-4">
            <div>
              <Label>Enter Patient Symptoms</Label>
              <Textarea 
                placeholder="E.g., Fever for 3 days, headache, body ache, no appetite..."
                rows={4}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Patient Age</Label>
                <Input type="number" placeholder="Enter age" />
              </div>
              <div>
                <Label>Gender</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full">
              <Brain className="w-4 h-4 mr-2" />
              Analyze Symptoms with AI
            </Button>

            <Card className="p-4 bg-purple-50 border-purple-200">
              <p className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                AI Analysis Results
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Viral Fever</span>
                    <Badge variant="default">85% Match</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Common symptoms include fever, headache, and body ache. Usually self-limiting.</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Influenza (Flu)</span>
                    <Badge variant="secondary">65% Match</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Similar presentation but may require antiviral medication.</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-medium text-yellow-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Recommendation: Physical examination required for accurate diagnosis
                </p>
              </div>
            </Card>
          </div>
        </Card>
      )}

      {activeAI === "voice-to-text" && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Mic className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-bold">Voice-to-Text Clinical Notes</h3>
            </div>
            <Button variant="ghost" onClick={() => setActiveAI(null)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="max-w-2xl space-y-4">
            <Card className="p-6 bg-gradient-to-br from-red-50 to-pink-50">
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
                  isListening ? 'bg-red-600 animate-pulse' : 'bg-gray-300'
                }`}>
                  <Mic className="w-12 h-12 text-white" />
                </div>
                <p className="font-semibold mb-2">
                  {isListening ? "Listening..." : "Ready to Record"}
                </p>
                <Button 
                  onClick={() => setIsListening(!isListening)}
                  variant={isListening ? "destructive" : "default"}
                >
                  {isListening ? "Stop Recording" : "Start Recording"}
                </Button>
              </div>
            </Card>

            <div>
              <Label>Transcribed Notes</Label>
              <Textarea 
                value={voiceInput}
                onChange={(e) => setVoiceInput(e.target.value)}
                placeholder="Your voice will be transcribed here in real-time..."
                rows={8}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Languages className="w-4 h-4 mr-2" />
                Hindi / English
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Save Notes
              </Button>
              <Button variant="outline" className="flex-1">
                <Volume2 className="w-4 h-4 mr-2" />
                Read Aloud
              </Button>
            </div>
          </div>
        </Card>
      )}

      {activeAI === "virtual-receptionist" && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-bold">Virtual Receptionist Chatbot</h3>
            </div>
            <Button variant="ghost" onClick={() => setActiveAI(null)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="max-w-2xl">
            <Card className="p-4 bg-gray-50 h-[400px] mb-4 overflow-auto">
              <ScrollArea className="h-full">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-green-100 text-green-600">AI</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-white p-3 rounded-lg">
                      <p className="text-sm">Hello! I'm your virtual receptionist. How can I help you today?</p>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <div className="flex-1 bg-pink-100 p-3 rounded-lg max-w-xs ml-auto">
                      <p className="text-sm">I want to book an appointment</p>
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-green-100 text-green-600">AI</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-white p-3 rounded-lg">
                      <p className="text-sm mb-2">Great! I can help you with that. Please select your preferred doctor:</p>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">Dr. Rajesh Kumar - Cardiologist</Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">Dr. Priya Sharma - General Physician</Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">Dr. Anita Desai - Pediatrician</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </Card>

            <div className="flex gap-2">
              <Input placeholder="Type your message..." />
              <Button>
                <Send className="w-4 h-4" />
              </Button>
              <Button variant="outline">
                <Mic className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

// ============================================================================
// SECTION 13: IOT & WEARABLE INTEGRATION
// ============================================================================

export function IoTDeviceIntegration() {
  const [devices, setDevices] = useState([
    {
      id: "BP-001",
      name: "BP Monitor #1",
      type: "Blood Pressure",
      patient: "Ramesh Patel",
      status: "Connected",
      lastReading: { systolic: 128, diastolic: 82, time: "2 min ago" },
      battery: 85
    },
    {
      id: "GLU-001",
      name: "Glucose Meter #1",
      type: "Glucose",
      patient: "Anjali Verma",
      status: "Connected",
      lastReading: { value: 110, unit: "mg/dL", time: "5 min ago" },
      battery: 65
    },
    {
      id: "HR-001",
      name: "Heart Rate Monitor #1",
      type: "Heart Rate",
      patient: "Suresh Kumar",
      status: "Connected",
      lastReading: { bpm: 72, time: "1 min ago" },
      battery: 92
    },
    {
      id: "OX-001",
      name: "Pulse Oximeter #1",
      type: "SpO2",
      patient: "Walk-in Patient",
      status: "Idle",
      lastReading: { spo2: 98, time: "15 min ago" },
      battery: 78
    },
  ]);

  const vitalsHistory = [
    { time: "9:00", bp: 125, hr: 75, glucose: 105, spo2: 98 },
    { time: "10:00", bp: 128, hr: 78, glucose: 108, spo2: 97 },
    { time: "11:00", bp: 130, hr: 76, glucose: 112, spo2: 98 },
    { time: "12:00", bp: 127, hr: 74, glucose: 110, spo2: 99 },
    { time: "13:00", bp: 126, hr: 73, glucose: 109, spo2: 98 },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white rounded-lg">
            <Wifi className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">IoT Device Integration</h2>
            <p className="text-muted-foreground">Real-time vitals monitoring from connected medical devices</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-600">4</p>
            <p className="text-sm text-muted-foreground">Connected</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Connected Devices</h3>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Device
          </Button>
        </div>

        {/* Device Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-muted-foreground">Active Devices</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Readings Today</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-4 bg-orange-50 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Alerts</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </Card>

          <Card className="p-4 bg-purple-50 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm text-muted-foreground">Avg Battery</p>
              </div>
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
          </Card>
        </div>

        {/* Devices Grid */}
        <div className="grid lg:grid-cols-2 gap-4 mb-6">
          {devices.map((device) => (
            <Card key={device.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${
                    device.type === "Blood Pressure" ? "bg-red-100" :
                    device.type === "Glucose" ? "bg-blue-100" :
                    device.type === "Heart Rate" ? "bg-pink-100" :
                    "bg-purple-100"
                  }`}>
                    {device.type === "Blood Pressure" && <Droplet className="w-6 h-6 text-red-600" />}
                    {device.type === "Glucose" && <Activity className="w-6 h-6 text-blue-600" />}
                    {device.type === "Heart Rate" && <Heart className="w-6 h-6 text-pink-600" />}
                    {device.type === "SpO2" && <Monitor className="w-6 h-6 text-purple-600" />}
                  </div>
                  <div>
                    <h4 className="font-semibold">{device.name}</h4>
                    <p className="text-sm text-muted-foreground">{device.type}</p>
                  </div>
                </div>
                <Badge variant={device.status === "Connected" ? "default" : "secondary"}>
                  {device.status}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-muted-foreground">Patient:</span>
                  <span className="font-medium">{device.patient}</span>
                </div>

                <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-muted-foreground mb-2">Latest Reading:</p>
                  <div className="flex items-center justify-between">
                    {device.type === "Blood Pressure" && (
                      <span className="text-2xl font-bold">{device.lastReading.systolic}/{device.lastReading.diastolic} mmHg</span>
                    )}
                    {device.type === "Glucose" && (
                      <span className="text-2xl font-bold">{device.lastReading.value} {device.lastReading.unit}</span>
                    )}
                    {device.type === "Heart Rate" && (
                      <span className="text-2xl font-bold">{device.lastReading.bpm} BPM</span>
                    )}
                    {device.type === "SpO2" && (
                      <span className="text-2xl font-bold">{device.lastReading.spo2}%</span>
                    )}
                    <span className="text-xs text-muted-foreground">{device.lastReading.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-muted-foreground" />
                  <Progress value={device.battery} className="flex-1" />
                  <span className="text-sm font-medium">{device.battery}%</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  View Trends
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Vitals Trend Chart */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Real-Time Vitals Monitoring</h3>
          <Tabs defaultValue="bp">
            <TabsList>
              <TabsTrigger value="bp">Blood Pressure</TabsTrigger>
              <TabsTrigger value="hr">Heart Rate</TabsTrigger>
              <TabsTrigger value="glucose">Glucose</TabsTrigger>
              <TabsTrigger value="spo2">SpO2</TabsTrigger>
            </TabsList>

            <TabsContent value="bp" className="mt-4">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={vitalsHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="bp" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="hr" className="mt-4">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={vitalsHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="hr" stroke="#ec4899" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="glucose" className="mt-4">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={vitalsHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="glucose" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="spo2" className="mt-4">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={vitalsHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[90, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="spo2" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </Card>
      </Card>
    </div>
  );
}

// ============================================================================
// SECTION 14: SETTINGS & SUPPORT
// ============================================================================

export function SettingsSupport() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Settings & Support</h2>

        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 mt-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Clinic Profile</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Clinic Name</Label>
                    <Input defaultValue="City Care Clinic" />
                  </div>
                  <div>
                    <Label>Registration Number</Label>
                    <Input defaultValue="REG-2024-001234" />
                  </div>
                </div>

                <div>
                  <Label>Address</Label>
                  <Textarea defaultValue="123 Healthcare Street, Medical District, Mumbai, Maharashtra 400001" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Contact Phone</Label>
                    <Input defaultValue="+91 98765 43210" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input defaultValue="info@citycare.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Operating Hours</Label>
                    <Input defaultValue="Mon-Sat: 9 AM - 8 PM" />
                  </div>
                  <div>
                    <Label>Emergency Contact</Label>
                    <Input defaultValue="+91 98765 43211" />
                  </div>
                </div>

                <Button>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4 mt-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Data Encryption</p>
                      <p className="text-sm text-muted-foreground">Encrypt all patient data</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Access Logs</p>
                      <p className="text-sm text-muted-foreground">Track all system access</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Change Password</h4>
                  <div className="space-y-3 max-w-md">
                    <Input type="password" placeholder="Current Password" />
                    <Input type="password" placeholder="New Password" />
                    <Input type="password" placeholder="Confirm New Password" />
                    <Button>Update Password</Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 mt-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { title: "Appointment Reminders", desc: "Get notified about upcoming appointments", icon: Calendar },
                  { title: "Payment Alerts", desc: "Notifications for payments and dues", icon: CreditCard },
                  { title: "Inventory Alerts", desc: "Low stock and expiry notifications", icon: AlertCircle },
                  { title: "System Updates", desc: "Important system and feature updates", icon: Bell },
                  { title: "Staff Notifications", desc: "Staff attendance and schedule changes", icon: Users },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                    <Switch defaultChecked={idx < 3} />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4 mt-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Billing & Subscription</h3>
              <div className="space-y-4">
                <Card className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-lg">Professional Plan</h4>
                      <p className="text-sm text-muted-foreground mt-1">Active • Renews on Feb 15, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">₹2,999</p>
                      <p className="text-sm text-muted-foreground">/month</p>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4">
                    <CreditCard className="w-4 h-4 mr-2" />
                    View Plans
                  </Button>
                </Card>

                <div>
                  <h4 className="font-medium mb-3">Payment Methods</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                      <Badge>Default</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-3">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-4 mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Help Center</h3>
                <div className="space-y-3">
                  {[
                    { title: "Getting Started Guide", icon: BookOpen, color: "blue" },
                    { title: "Video Tutorials", icon: Monitor, color: "purple" },
                    { title: "FAQs", icon: HelpCircle, color: "green" },
                    { title: "API Documentation", icon: FileText, color: "orange" },
                  ].map((item, idx) => (
                    <Button key={idx} variant="outline" className="w-full justify-start">
                      <item.icon className={`w-4 h-4 mr-2 text-${item.color}-600`} />
                      {item.title}
                    </Button>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Contact Support</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Headphones className="w-4 h-4 mr-2 text-pink-600" />
                    Live Chat Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2 text-blue-600" />
                    Email: support@eclinic.com
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="w-4 h-4 mr-2 text-green-600" />
                    Call: 1800-123-4567
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2 text-purple-600" />
                    WhatsApp Support
                  </Button>
                </div>

                <Separator className="my-4" />

                <div>
                  <h4 className="font-medium mb-3">Raise a Ticket</h4>
                  <div className="space-y-3">
                    <Input placeholder="Subject" />
                    <Textarea placeholder="Describe your issue..." rows={4} />
                    <Button className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Ticket
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

// Export all modules
export {
  AIModulesHub,
  IoTDeviceIntegration,
  SettingsSupport
};
