// Comprehensive Clinic Module - All Features from PRD
// Implements all 18 sections with 200+ features across 29 major modules

import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { 
  Calendar as CalendarIcon, Plus, Edit, Eye, X, Download, Send, Upload,
  Settings, Bell, MessageCircle, Phone, Mail, Video, Search, Filter,
  Clock, CheckCircle, XCircle, AlertCircle, Wifi, Smartphone, Activity,
  Thermometer, Droplet, Heart, TrendingUp, Users, DollarSign, Package,
  FlaskConical, FileText, Printer, CreditCard, Key, Lock, Shield, Database,
  Globe, HelpCircle, Headphones, BookOpen, FileCheck, Repeat, Zap,
  Brain, Target, Sparkles, Mic, Volume2, Languages, Camera, MapPin,
  Building2, Stethoscope, Pill, Receipt, BarChart3, Award, Star,
  UserPlus, MoreVertical, Trash2, ArrowLeft, ArrowRight, AlertTriangle,
  UserCheck, UserX, UserCog, ClipboardList, Wallet, ShoppingCart,
  TestTube, Syringe, Microscope, QrCode, FileCheck, CheckCircle,
  PieChart as PieChartIcon, Monitor, Cpu, Bluetooth, Radio
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

// Import additional module components
import { DoctorManagement, PrescriptionManagement, BillingPayments, PharmacyInventory } from "./ClinicModulesExtended";
import { LabTestManagement, ReportsAnalytics, NotificationsCommunication } from "./ClinicAIandIOT";
import { AIModulesHub, IoTDeviceIntegration, SettingsSupport } from "./ClinicAIModules";
import ClinicTrendAnalysis from "./ClinicTrendAnalysis";

// ============================================================================
// SECTION 1: ROLE-BASED ACCESS CONTROL (RBAC)
// ============================================================================

interface Role {
  id: string;
  name: string;
  permissions: string[];
  color: string;
}

const roles: Role[] = [
  { id: "admin", name: "Admin", permissions: ["all"], color: "red" },
  { id: "doctor", name: "Doctor", permissions: ["patient_view", "patient_edit", "prescriptions", "appointments"], color: "blue" },
  { id: "receptionist", name: "Receptionist", permissions: ["appointments", "patient_view", "billing"], color: "green" },
  { id: "nurse", name: "Nurse", permissions: ["patient_view", "vitals"], color: "purple" },
  { id: "lab_tech", name: "Lab Technician", permissions: ["lab_tests", "reports"], color: "yellow" },
  { id: "pharmacist", name: "Pharmacist", permissions: ["pharmacy", "inventory"], color: "orange" }
];

export function RBACManagement() {
  const [selectedRole, setSelectedRole] = useState<string>("admin");
  const [staffMembers, setStaffMembers] = useState([
    { id: 1, name: "Dr. Rajesh Kumar", role: "doctor", email: "rajesh@eclinic.com", status: "Active" },
    { id: 2, name: "Priya Singh", role: "receptionist", email: "priya@eclinic.com", status: "Active" },
    { id: 3, name: "Nurse Anita", role: "nurse", email: "anita@eclinic.com", status: "Active" },
    { id: 4, name: "Lab Tech Suresh", role: "lab_tech", email: "suresh@eclinic.com", status: "Active" },
  ]);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Role-Based Access Control</h2>
            <p className="text-muted-foreground">Manage roles, permissions, and user access</p>
          </div>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Staff Member
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Roles List */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Roles</h3>
            <div className="space-y-2">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedRole === role.id ? "border-pink-500 bg-pink-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className={`w-4 h-4 text-${role.color}-600`} />
                      <span className="font-medium">{role.name}</span>
                    </div>
                    <Badge variant="secondary">{role.permissions.length}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Permissions */}
          <Card className="p-4 lg:col-span-2">
            <h3 className="font-semibold mb-4">Permissions for {roles.find(r => r.id === selectedRole)?.name}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Patient Data Access", "Patient Edit", "Appointments Management",
                "Billing & Refunds", "Inventory Access", "Reports & Analytics",
                "Prescriptions", "Lab Tests", "Pharmacy Operations",
                "Staff Management", "System Settings", "Backup & Restore"
              ].map((permission) => (
                <div key={permission} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-sm">{permission}</span>
                  <Switch defaultChecked={Math.random() > 0.3} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Staff Members Table */}
        <Card className="p-4 mt-6">
          <h3 className="font-semibold mb-4">Staff Members</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Role</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffMembers.map((member) => (
                  <tr key={member.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span>{member.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge>{roles.find(r => r.id === member.role)?.name}</Badge>
                    </td>
                    <td className="py-3 px-4">{member.email}</td>
                    <td className="py-3 px-4">
                      <Badge variant={member.status === "Active" ? "default" : "secondary"}>
                        {member.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Card>
    </div>
  );
}

// ============================================================================
// SECTION 2: DASHBOARD WITH AI INSIGHTS
// ============================================================================

export function ClinicDashboardOverview() {
  const todayStats = {
    appointments: 24,
    completed: 18,
    pending: 6,
    revenue: 45000,
    patients: 19,
    newPatients: 5
  };

  const revenueData = [
    { month: "Jan", revenue: 35000, expenses: 20000 },
    { month: "Feb", revenue: 42000, expenses: 22000 },
    { month: "Mar", revenue: 38000, expenses: 21000 },
    { month: "Apr", revenue: 45000, expenses: 23000 },
    { month: "May", revenue: 52000, expenses: 25000 },
    { month: "Jun", revenue: 48000, expenses: 24000 },
  ];

  const peakHoursData = [
    { hour: "9 AM", count: 5 },
    { hour: "10 AM", count: 12 },
    { hour: "11 AM", count: 18 },
    { hour: "12 PM", count: 15 },
    { hour: "1 PM", count: 8 },
    { hour: "2 PM", count: 14 },
    { hour: "3 PM", count: 20 },
    { hour: "4 PM", count: 16 },
    { hour: "5 PM", count: 10 },
  ];

  return (
    <div className="space-y-6">
      {/* AI-Powered Insights Banner */}
      <Card className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-lg">
            <Brain className="w-6 h-6 text-pink-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">AI Insights for Today</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-pink-600 mt-1" />
                <div>
                  <p className="text-sm font-medium">Peak Hours Prediction</p>
                  <p className="text-sm text-muted-foreground">Expected rush between 3-4 PM. Consider adding staff.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-green-600 mt-1" />
                <div>
                  <p className="text-sm font-medium">Revenue Trend</p>
                  <p className="text-sm text-muted-foreground">15% increase projected this month based on bookings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Today's Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CalendarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <Badge variant="secondary">+12%</Badge>
          </div>
          <h3 className="text-2xl font-bold">{todayStats.appointments}</h3>
          <p className="text-sm text-muted-foreground">Today's Appointments</p>
          <div className="mt-2 flex gap-2 text-xs">
            <span className="text-green-600">✓ {todayStats.completed} Completed</span>
            <span className="text-orange-600">• {todayStats.pending} Pending</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <Badge variant="secondary">+8%</Badge>
          </div>
          <h3 className="text-2xl font-bold">₹{todayStats.revenue.toLocaleString()}</h3>
          <p className="text-sm text-muted-foreground">Today's Revenue</p>
          <Progress value={75} className="mt-2" />
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <Badge variant="secondary">{todayStats.newPatients} New</Badge>
          </div>
          <h3 className="text-2xl font-bold">{todayStats.patients}</h3>
          <p className="text-sm text-muted-foreground">Patients Served</p>
          <div className="mt-2 text-xs text-muted-foreground">
            Total registered: 1,245
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <Badge variant="destructive">Urgent</Badge>
          </div>
          <h3 className="text-2xl font-bold">8</h3>
          <p className="text-sm text-muted-foreground">Pending Payments</p>
          <div className="mt-2 text-xs text-muted-foreground">
            Amount: ₹12,500
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Revenue Trend (6 Months)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#ec4899" fill="#fce7f3" />
              <Area type="monotone" dataKey="expenses" stroke="#9333ea" fill="#f3e8ff" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Peak Hours Analysis (AI Prediction)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={peakHoursData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#ec4899" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Staff Attendance */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Staff Attendance</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { name: "Dr. Rajesh Kumar", role: "Doctor", status: "Present", time: "9:00 AM" },
            { name: "Dr. Priya Sharma", role: "Doctor", status: "Present", time: "9:15 AM" },
            { name: "Nurse Anita", role: "Nurse", status: "Present", time: "8:45 AM" },
            { name: "Receptionist Priya", role: "Receptionist", status: "Late", time: "9:30 AM" },
          ].map((staff, idx) => (
            <div key={idx} className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{staff.name}</p>
                  <p className="text-xs text-muted-foreground">{staff.role}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <Badge variant={staff.status === "Present" ? "default" : "destructive"}>
                  {staff.status}
                </Badge>
                <span className="text-muted-foreground">{staff.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Notifications & Alerts */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications & Alerts
        </h3>
        <div className="space-y-3">
          {[
            { type: "urgent", icon: AlertCircle, color: "red", message: "Low stock alert: Paracetamol (50 units remaining)", time: "5 min ago" },
            { type: "info", icon: CheckCircle, color: "green", message: "Payment received from Ramesh Patel - ₹2,500", time: "15 min ago" },
            { type: "warning", icon: AlertTriangle, color: "orange", message: "Appointment rescheduled: Anjali Verma to 3:30 PM", time: "1 hour ago" },
            { type: "info", icon: FileText, color: "blue", message: "Lab report ready for Patient ID: PAT-001234", time: "2 hours ago" },
          ].map((notification, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
              <notification.icon className={`w-5 h-5 text-${notification.color}-600 mt-0.5`} />
              <div className="flex-1">
                <p className="text-sm">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
              </div>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ============================================================================
// SECTION 3: PATIENT MANAGEMENT
// ============================================================================

export function PatientManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewPatient, setShowNewPatient] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const patients = [
    { 
      id: "PAT-001234", 
      name: "Ramesh Patel", 
      age: 45, 
      gender: "Male", 
      contact: "+91 98765 43210",
      abhaId: "12-3456-7890-1234",
      lastVisit: "2025-01-10",
      condition: "Diabetes Type 2",
      status: "Active"
    },
    { 
      id: "PAT-001235", 
      name: "Anjali Verma", 
      age: 32, 
      gender: "Female", 
      contact: "+91 98765 43211",
      abhaId: "12-3456-7890-1235",
      lastVisit: "2025-01-12",
      condition: "Hypertension",
      status: "Active"
    },
    { 
      id: "PAT-001236", 
      name: "Suresh Kumar", 
      age: 58, 
      gender: "Male", 
      contact: "+91 98765 43212",
      abhaId: "",
      lastVisit: "2025-01-08",
      condition: "Arthritis",
      status: "Inactive"
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Patient Management</h2>
            <p className="text-muted-foreground">Register, search, and manage patient records</p>
          </div>
          <Button onClick={() => setShowNewPatient(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Register New Patient
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, ID, phone, or ABHA ID..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Gender</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* New Patient Form */}
        {showNewPatient && (
          <Card className="p-6 mb-6 border-pink-200 bg-pink-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Register New Patient</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowNewPatient(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input placeholder="Enter full name" />
                </div>
                <div>
                  <Label>Age *</Label>
                  <Input type="number" placeholder="Age" />
                </div>
                <div>
                  <Label>Gender *</Label>
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

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Contact Number *</Label>
                  <Input placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="email@example.com" />
                </div>
              </div>

              <div>
                <Label>Address</Label>
                <Textarea placeholder="Enter complete address" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>ABHA ID (Optional)</Label>
                  <Input placeholder="12-3456-7890-1234" />
                  <p className="text-xs text-muted-foreground mt-1">Link Ayushman Bharat Health Account</p>
                </div>
                <div>
                  <Label>Blood Group</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                        <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Medical History / Allergies</Label>
                <Textarea placeholder="Any existing conditions, allergies, or important medical history" />
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Register Patient
                </Button>
                <Button variant="outline">
                  <QrCode className="w-4 h-4 mr-2" />
                  Generate QR Card
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Patients Table */}
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Patient ID</th>
                  <th className="text-left py-3 px-4 font-semibold">Name</th>
                  <th className="text-left py-3 px-4 font-semibold">Age/Gender</th>
                  <th className="text-left py-3 px-4 font-semibold">Contact</th>
                  <th className="text-left py-3 px-4 font-semibold">ABHA ID</th>
                  <th className="text-left py-3 px-4 font-semibold">Last Visit</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm font-medium">{patient.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">{patient.condition}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span>{patient.age} / {patient.gender}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3" />
                        {patient.contact}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {patient.abhaId ? (
                        <span className="font-mono text-xs">{patient.abhaId}</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Not linked</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm">{patient.lastVisit}</td>
                    <td className="py-3 px-4">
                      <Badge variant={patient.status === "Active" ? "default" : "secondary"}>
                        {patient.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedPatient(patient)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <Card className="p-6 fixed inset-4 z-50 overflow-auto bg-white shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Patient Details - {selectedPatient.name}</h3>
            <Button variant="ghost" onClick={() => setSelectedPatient(null)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="history">Consultation History</TabsTrigger>
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
              <TabsTrigger value="reports">Lab Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h4 className="font-semibold mb-3">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Patient ID:</span>
                      <span className="font-mono font-medium">{selectedPatient.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Age / Gender:</span>
                      <span>{selectedPatient.age} / {selectedPatient.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contact:</span>
                      <span>{selectedPatient.contact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ABHA ID:</span>
                      <span className="font-mono text-xs">{selectedPatient.abhaId || "Not linked"}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-semibold mb-3">Medical Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Primary Condition:</span>
                      <span>{selectedPatient.condition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Visit:</span>
                      <span>{selectedPatient.lastVisit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Visits:</span>
                      <span>12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Prescriptions:</span>
                      <span>3</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">General Checkup - Dr. Rajesh Kumar</p>
                        <p className="text-sm text-muted-foreground mt-1">2025-01-{10 + i} • 10:30 AM</p>
                        <p className="text-sm mt-2">Diagnosis: {selectedPatient.condition} - Regular monitoring</p>
                      </div>
                      <Badge>Completed</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </div>
  );
}

// ============================================================================
// SECTION 4: APPOINTMENT & QUEUE MANAGEMENT
// ============================================================================

export function AppointmentQueueManagement() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("day");
  const [showNewAppointment, setShowNewAppointment] = useState(false);

  const appointments = [
    { 
      id: "APT-001",
      token: "T01",
      time: "09:00 AM", 
      patient: "Ramesh Patel", 
      patientId: "PAT-001234",
      doctor: "Dr. Priya Sharma", 
      type: "In-Person",
      status: "Confirmed",
      priority: "Normal"
    },
    { 
      id: "APT-002",
      token: "T02",
      time: "09:30 AM", 
      patient: "Anjali Verma", 
      patientId: "PAT-001235",
      doctor: "Dr. Rajesh Kumar", 
      type: "Video",
      status: "Waiting",
      priority: "Normal"
    },
    { 
      id: "APT-003",
      token: "T03",
      time: "10:00 AM", 
      patient: "Suresh Kumar", 
      patientId: "PAT-001236",
      doctor: "Dr. Priya Sharma", 
      type: "In-Person",
      status: "In Progress",
      priority: "Urgent"
    },
    { 
      id: "APT-004",
      token: "T04",
      time: "10:30 AM", 
      patient: "Walk-in Patient", 
      patientId: "",
      doctor: "Dr. Anita Desai", 
      type: "In-Person",
      status: "Available",
      priority: "Normal"
    },
  ];

  const queueStats = {
    waiting: 3,
    inProgress: 1,
    completed: 18,
    avgWaitTime: 12,
    noShows: 2
  };

  return (
    <div className="space-y-6">
      {/* AI Smart Scheduling Banner */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-center gap-3">
          <Brain className="w-6 h-6 text-blue-600" />
          <div className="flex-1">
            <p className="font-medium">AI Smart Scheduling Active</p>
            <p className="text-sm text-muted-foreground">Optimal slot: 2:30 PM with Dr. Rajesh (95% acceptance probability)</p>
          </div>
          <Button variant="outline" size="sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Auto-Schedule
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Appointment & Queue Management</h2>
            <p className="text-muted-foreground">Real-time scheduling and queue control</p>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-1 border rounded-lg p-1">
              <Button
                variant={view === "day" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setView("day")}
              >
                Day
              </Button>
              <Button
                variant={view === "week" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setView("week")}
              >
                Week
              </Button>
              <Button
                variant={view === "month" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setView("month")}
              >
                Month
              </Button>
            </div>
            <Button onClick={() => setShowNewAppointment(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Appointment
            </Button>
          </div>
        </div>

        {/* Queue Stats */}
        <div className="grid md:grid-cols-5 gap-4 mb-6">
          <Card className="p-4 bg-orange-50 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{queueStats.waiting}</p>
                <p className="text-sm text-muted-foreground">Waiting</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </Card>

          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{queueStats.inProgress}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{queueStats.completed}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-4 bg-purple-50 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{queueStats.avgWaitTime} min</p>
                <p className="text-sm text-muted-foreground">Avg Wait</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </Card>

          <Card className="p-4 bg-red-50 border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{queueStats.noShows}</p>
                <p className="text-sm text-muted-foreground">No-Shows</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Calendar</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span>Confirmed</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                <span>Waiting</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span>In Progress</span>
              </div>
            </div>
          </Card>

          {/* Appointments List */}
          <Card className="p-4 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Today's Schedule</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <ScrollArea className="h-[500px]">
              <div className="space-y-3">
                {appointments.map((apt) => (
                  <Card key={apt.id} className={`p-4 border-l-4 ${
                    apt.status === "Waiting" ? "border-l-orange-500" :
                    apt.status === "In Progress" ? "border-l-purple-500" :
                    apt.status === "Confirmed" ? "border-l-blue-500" :
                    "border-l-gray-300"
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3 flex-1">
                        <div className="flex flex-col items-center">
                          <div className="text-2xl font-bold">{apt.token}</div>
                          <div className="text-xs text-muted-foreground">{apt.time}</div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold">{apt.patient}</p>
                            {apt.priority === "Urgent" && (
                              <Badge variant="destructive" className="text-xs">Urgent</Badge>
                            )}
                          </div>
                          {apt.patientId && (
                            <p className="text-xs text-muted-foreground font-mono">{apt.patientId}</p>
                          )}
                          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Stethoscope className="w-3 h-3" />
                              {apt.doctor}
                            </span>
                            <span className="flex items-center gap-1">
                              {apt.type === "Video" ? (
                                <><Video className="w-3 h-3" />Video</>
                              ) : (
                                <><Building2 className="w-3 h-3" />In-Person</>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={
                          apt.status === "Waiting" ? "default" :
                          apt.status === "In Progress" ? "secondary" :
                          apt.status === "Confirmed" ? "outline" :
                          "secondary"
                        }>
                          {apt.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Phone className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </Card>

      {/* New Appointment Form */}
      {showNewAppointment && (
        <Card className="p-6 fixed inset-4 z-50 bg-white shadow-2xl overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Schedule New Appointment</h3>
            <Button variant="ghost" onClick={() => setShowNewAppointment(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4 max-w-2xl">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Patient *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select or register patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">+ Register New Patient</SelectItem>
                    <SelectItem value="PAT-001234">Ramesh Patel (PAT-001234)</SelectItem>
                    <SelectItem value="PAT-001235">Anjali Verma (PAT-001235)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Doctor *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr1">Dr. Rajesh Kumar - Cardiologist</SelectItem>
                    <SelectItem value="dr2">Dr. Priya Sharma - General Physician</SelectItem>
                    <SelectItem value="dr3">Dr. Anita Desai - Pediatrician</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Date *</Label>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div>
                <Label>Time Slot *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00 AM (Available)</SelectItem>
                    <SelectItem value="09:30">09:30 AM (Available)</SelectItem>
                    <SelectItem value="10:00" disabled>10:00 AM (Booked)</SelectItem>
                    <SelectItem value="10:30">10:30 AM (Available)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Appointment Type *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-person">In-Person Consultation</SelectItem>
                    <SelectItem value="video">Video Consultation</SelectItem>
                    <SelectItem value="phone">Phone Consultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Priority</Label>
                <Select defaultValue="normal">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Reason for Visit</Label>
              <Textarea placeholder="Describe the reason for consultation..." />
            </div>

            <div className="flex items-center gap-2">
              <Switch id="reminder" defaultChecked />
              <Label htmlFor="reminder">Send appointment reminders (SMS & Email)</Label>
            </div>

            <Separator />

            <div className="flex gap-2">
              <Button className="flex-1">
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm Appointment
              </Button>
              <Button variant="outline" className="flex-1">
                <Sparkles className="w-4 h-4 mr-2" />
                AI Suggest Best Slot
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

// Export comprehensive clinic module component
export default function ClinicModuleComplete() {
  const [activeModule, setActiveModule] = useState("dashboard");

  const modules = [
    { id: "dashboard", name: "Dashboard", icon: BarChart3 },
    { id: "rbac", name: "Access Control", icon: Shield },
    { id: "patients", name: "Patients", icon: Users },
    { id: "appointments", name: "Appointments & Queue", icon: CalendarIcon },
    { id: "doctors", name: "Doctors", icon: Stethoscope },
    { id: "prescriptions", name: "Prescriptions", icon: FileText },
    { id: "billing", name: "Billing", icon: Receipt },
    { id: "pharmacy", name: "Pharmacy", icon: Pill },
    { id: "lab", name: "Lab Tests", icon: FlaskConical },
    { id: "reports", name: "Reports", icon: BarChart3 },
    { id: "trends", name: "Trend Analysis", icon: TrendingUp },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "ai", name: "AI Modules", icon: Brain },
    { id: "iot", name: "IoT Devices", icon: Wifi },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-pink-600" />
              <div>
                <h1 className="text-2xl font-bold">Clinic Management System</h1>
                <p className="text-sm text-muted-foreground">Comprehensive Healthcare Operations</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                <Badge variant="destructive" className="ml-1">5</Badge>
              </Button>
              <Avatar>
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <Card className="w-64 h-fit sticky top-24">
            <div className="p-4">
              <h3 className="font-semibold mb-3 text-sm text-muted-foreground">MODULES</h3>
              <div className="space-y-1">
                {modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                      activeModule === module.id
                        ? "bg-pink-100 text-pink-700 font-medium"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <module.icon className="w-4 h-4" />
                    <span className="text-sm">{module.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Main Content */}
          <div className="flex-1">
            {activeModule === "dashboard" && <ClinicDashboardOverview />}
            {activeModule === "rbac" && <RBACManagement />}
            {activeModule === "patients" && <PatientManagement />}
            {activeModule === "appointments" && <AppointmentQueueManagement />}
            {/* More modules to be rendered */}
            {activeModule === "doctors" && <DoctorManagement />}
            {activeModule === "prescriptions" && <PrescriptionManagement />}
            {activeModule === "billing" && <BillingPayments />}
            {activeModule === "pharmacy" && <PharmacyInventory />}
            {activeModule === "lab" && <LabTestManagement />}
            {activeModule === "reports" && <ReportsAnalytics />}
            {activeModule === "trends" && <ClinicTrendAnalysis />}
            {activeModule === "notifications" && <NotificationsCommunication />}
            {activeModule === "ai" && <AIModulesHub />}
            {activeModule === "iot" && <IoTDeviceIntegration />}
            {activeModule === "settings" && <SettingsSupport />}
          </div>
        </div>
      </div>
    </div>
  );
}
