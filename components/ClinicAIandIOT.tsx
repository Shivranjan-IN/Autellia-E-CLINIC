// Clinic AI Modules & IoT Integration
// Lab Tests, Reports, Notifications, AI Features, IoT Devices, Settings & Support

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
  FlaskConical, TestTube, Microscope, Plus, Eye, Download, Upload,
  BarChart3, FileText, Printer, TrendingUp, Calendar, Filter,
  Bell, Mail, Phone, MessageCircle, Send, Search,
  Brain, Sparkles, Mic, Volume2, Camera, Languages, Target,
  Wifi, Smartphone, Heart, Thermometer, Droplet, Activity, Monitor,
  AlertCircle, CheckCircle, Settings, Shield, Lock, Database, Key,
  HelpCircle, BookOpen, Headphones, Globe, CreditCard, User,
  Clock, Users, DollarSign, Package, Stethoscope, Receipt,
  Edit, X, Zap, Cpu, Bluetooth, Radio, TrendingDown
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

// ============================================================================
// SECTION 9: LAB TEST & DIAGNOSTICS
// ============================================================================

export function LabTestManagement() {
  const [labTests, setLabTests] = useState([
    {
      id: "LAB-001234",
      patientName: "Ramesh Patel",
      patientId: "PAT-001234",
      tests: ["Complete Blood Count", "Lipid Profile", "Blood Sugar (Fasting)"],
      orderedBy: "Dr. Rajesh Kumar",
      date: "2025-01-12",
      status: "Completed",
      reportUrl: "#",
      cost: 1200
    },
    {
      id: "LAB-001235",
      patientName: "Anjali Verma",
      patientId: "PAT-001235",
      tests: ["Thyroid Profile", "Vitamin D"],
      orderedBy: "Dr. Priya Sharma",
      date: "2025-01-12",
      status: "In Progress",
      reportUrl: null,
      cost: 1800
    },
    {
      id: "LAB-001236",
      patientName: "Suresh Kumar",
      patientId: "PAT-001236",
      tests: ["HbA1c", "Kidney Function Test"],
      orderedBy: "Dr. Rajesh Kumar",
      date: "2025-01-12",
      status: "Sample Collected",
      reportUrl: null,
      cost: 1500
    },
  ]);

  const testCategories = [
    { name: "Blood Tests", count: 45, icon: Droplet, color: "red" },
    { name: "Radiology", count: 12, icon: Activity, color: "blue" },
    { name: "Pathology", count: 28, icon: Microscope, color: "purple" },
    { name: "Biochemistry", count: 35, icon: FlaskConical, color: "green" },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Lab Test & Diagnostics</h2>
            <p className="text-muted-foreground">Manage lab orders and diagnostic reports</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Lab Order
          </Button>
        </div>

        {/* Test Categories */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {testCategories.map((category) => (
            <Card key={category.name} className={`p-4 bg-${category.color}-50 border-${category.color}-200`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{category.count}</p>
                  <p className="text-sm text-muted-foreground">{category.name}</p>
                </div>
                <category.icon className={`w-8 h-8 text-${category.color}-600`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search lab orders..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="progress">In Progress</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Lab Orders List */}
        <div className="space-y-4">
          {labTests.map((test) => (
            <Card key={test.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{test.patientName}</h3>
                    <Badge variant="outline">{test.patientId}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Order ID: {test.id}</span>
                    <span>•</span>
                    <span>Ordered by: {test.orderedBy}</span>
                    <span>•</span>
                    <span>{test.date}</span>
                  </div>
                </div>
                <Badge variant={
                  test.status === "Completed" ? "default" :
                  test.status === "In Progress" ? "secondary" :
                  "outline"
                }>
                  {test.status}
                </Badge>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="font-medium mb-2">Tests Ordered</p>
                <div className="flex flex-wrap gap-2">
                  {test.tests.map((testName, idx) => (
                    <Badge key={idx} variant="outline" className="flex items-center gap-1">
                      <TestTube className="w-3 h-3" />
                      {testName}
                    </Badge>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Cost:</span>
                  <span className="font-semibold">₹{test.cost}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                {test.status === "Completed" && (
                  <>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <Send className="w-4 h-4 mr-2" />
                      Share with Patient
                    </Button>
                  </>
                )}
                {test.status !== "Completed" && (
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Results
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ============================================================================
// SECTION 10: REPORTS & ANALYTICS
// ============================================================================

export function ReportsAnalytics() {
  const appointmentData = [
    { month: "Jul", count: 245 },
    { month: "Aug", count: 289 },
    { month: "Sep", count: 312 },
    { month: "Oct", count: 295 },
    { month: "Nov", count: 334 },
    { month: "Dec", count: 298 },
    { month: "Jan", count: 356 },
  ];

  const revenueData = [
    { month: "Jul", revenue: 450000, expenses: 280000 },
    { month: "Aug", revenue: 520000, expenses: 290000 },
    { month: "Sep", revenue: 580000, expenses: 310000 },
    { month: "Oct", revenue: 550000, expenses: 305000 },
    { month: "Nov", revenue: 620000, expenses: 320000 },
    { month: "Dec", revenue: 590000, expenses: 315000 },
    { month: "Jan", revenue: 680000, expenses: 335000 },
  ];

  const doctorPerformance = [
    { name: "Dr. Rajesh", consultations: 245, rating: 4.8 },
    { name: "Dr. Priya", consultations: 320, rating: 4.9 },
    { name: "Dr. Anita", consultations: 189, rating: 4.7 },
    { name: "Dr. Suresh", consultations: 156, rating: 4.6 },
  ];

  const patientDemographics = [
    { age: "0-18", count: 120, color: "#3b82f6" },
    { age: "19-35", count: 340, color: "#10b981" },
    { age: "36-50", count: 280, color: "#f59e0b" },
    { age: "51-65", count: 195, color: "#ef4444" },
    { age: "65+", count: 145, color: "#8b5cf6" },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Reports & Analytics</h2>
            <p className="text-muted-foreground">Comprehensive clinic performance insights</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="7days">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 Days</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Quick Report Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 cursor-pointer hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Daily Report</h3>
            </div>
            <p className="text-sm text-muted-foreground">Today's appointments, revenue & operations</p>
            <Button variant="ghost" size="sm" className="mt-2">
              <FileText className="w-4 h-4 mr-2" />
              Generate
            </Button>
          </Card>

          <Card className="p-4 cursor-pointer hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold">Patient Report</h3>
            </div>
            <p className="text-sm text-muted-foreground">Patient visits & demographics</p>
            <Button variant="ghost" size="sm" className="mt-2">
              <FileText className="w-4 h-4 mr-2" />
              Generate
            </Button>
          </Card>

          <Card className="p-4 cursor-pointer hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">Financial Report</h3>
            </div>
            <p className="text-sm text-muted-foreground">Revenue, expenses & profitability</p>
            <Button variant="ghost" size="sm" className="mt-2">
              <FileText className="w-4 h-4 mr-2" />
              Generate
            </Button>
          </Card>

          <Card className="p-4 cursor-pointer hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold">Inventory Report</h3>
            </div>
            <p className="text-sm text-muted-foreground">Stock levels & purchases</p>
            <Button variant="ghost" size="sm" className="mt-2">
              <FileText className="w-4 h-4 mr-2" />
              Generate
            </Button>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Appointment Trends (7 Months)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" fill="#dbeafe" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-4">Revenue vs Expenses</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#10b981" />
                <Bar dataKey="expenses" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-4">Doctor Performance</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={doctorPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Bar dataKey="consultations" fill="#ec4899" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-4">Patient Demographics by Age</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={patientDemographics}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.age}: ${entry.count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {patientDemographics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </Card>
    </div>
  );
}

// ============================================================================
// SECTION 11: NOTIFICATIONS & COMMUNICATION
// ============================================================================

export function NotificationsCommunication() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "appointment",
      title: "Appointment Reminder",
      message: "Ramesh Patel has an appointment tomorrow at 10:00 AM",
      time: "2 hours ago",
      read: false,
      channels: ["SMS", "Email"]
    },
    {
      id: 2,
      type: "payment",
      title: "Payment Received",
      message: "Payment of ₹2,500 received from Anjali Verma",
      time: "4 hours ago",
      read: false,
      channels: ["Email"]
    },
    {
      id: 3,
      type: "inventory",
      title: "Low Stock Alert",
      message: "Paracetamol 500mg is running low (35 units left)",
      time: "1 day ago",
      read: true,
      channels: ["In-App"]
    },
  ]);

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Health Checkup Campaign",
      type: "Promotional",
      channels: ["SMS", "WhatsApp", "Email"],
      sent: 450,
      delivered: 442,
      opened: 285,
      status: "Active"
    },
    {
      id: 2,
      name: "Appointment Reminders",
      type: "Transactional",
      channels: ["SMS", "Email"],
      sent: 1245,
      delivered: 1240,
      opened: 980,
      status: "Active"
    },
  ]);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <Tabs defaultValue="notifications">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Notifications & Communication</h2>
              <p className="text-muted-foreground">Manage notifications and patient communications</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>

          <TabsList>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4 mt-6">
            {/* Notification Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">248</p>
                    <p className="text-sm text-muted-foreground">Total Today</p>
                  </div>
                  <Bell className="w-8 h-8 text-blue-600" />
                </div>
              </Card>

              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">189</p>
                    <p className="text-sm text-muted-foreground">SMS Sent</p>
                  </div>
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
              </Card>

              <Card className="p-4 bg-purple-50 border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">142</p>
                    <p className="text-sm text-muted-foreground">Emails Sent</p>
                  </div>
                  <Mail className="w-8 h-8 text-purple-600" />
                </div>
              </Card>

              <Card className="p-4 bg-orange-50 border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">95%</p>
                    <p className="text-sm text-muted-foreground">Delivery Rate</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-orange-600" />
                </div>
              </Card>
            </div>

            {/* Notifications List */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Recent Notifications</h3>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`p-4 border rounded-lg ${notif.read ? 'bg-white' : 'bg-blue-50 border-blue-200'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3 flex-1">
                        <Bell className={`w-5 h-5 mt-1 ${notif.read ? 'text-gray-400' : 'text-blue-600'}`} />
                        <div className="flex-1">
                          <h4 className="font-medium">{notif.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                          <div className="flex items-center gap-2 mt-2">
                            {notif.channels.map((channel) => (
                              <Badge key={channel} variant="outline" className="text-xs">
                                {channel}
                              </Badge>
                            ))}
                            <span className="text-xs text-muted-foreground ml-2">{notif.time}</span>
                          </div>
                        </div>
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-4 mt-6">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Active Campaigns</h3>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">{campaign.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{campaign.type}</Badge>
                          {campaign.channels.map((channel) => (
                            <Badge key={channel} variant="secondary" className="text-xs">
                              {channel}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge variant={campaign.status === "Active" ? "default" : "secondary"}>
                        {campaign.status}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Sent</p>
                        <p className="text-2xl font-bold">{campaign.sent}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Delivered</p>
                        <p className="text-2xl font-bold text-green-600">{campaign.delivered}</p>
                        <Progress value={(campaign.delivered / campaign.sent) * 100} className="mt-1" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Opened</p>
                        <p className="text-2xl font-bold text-blue-600">{campaign.opened}</p>
                        <Progress value={(campaign.opened / campaign.sent) * 100} className="mt-1" />
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Analytics
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4 mt-6">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Message Templates</h3>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Template
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: "Appointment Reminder", type: "SMS", variables: ["PatientName", "Date", "Time"] },
                  { name: "Payment Receipt", type: "Email", variables: ["PatientName", "Amount", "BillID"] },
                  { name: "Lab Report Ready", type: "WhatsApp", variables: ["PatientName", "TestName"] },
                  { name: "Follow-up Reminder", type: "SMS", variables: ["PatientName", "DoctorName", "Date"] },
                ].map((template, idx) => (
                  <Card key={idx} className="p-4 hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{template.name}</h4>
                      <Badge variant="outline">{template.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Variables: {template.variables.join(", ")}
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 mt-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Appointment Reminders</p>
                    <p className="text-sm text-muted-foreground">Send automatic reminders 24 hours before appointments</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Payment Notifications</p>
                    <p className="text-sm text-muted-foreground">Notify patients when payments are received</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Low Stock Alerts</p>
                    <p className="text-sm text-muted-foreground">Alert when inventory items are running low</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Promotional Messages</p>
                    <p className="text-sm text-muted-foreground">Send health tips and clinic updates to patients</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Channel Configuration</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <h4 className="font-medium">SMS Gateway</h4>
                    <Badge variant="default">Connected</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Provider:</span>
                      <span>Twilio</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SMS Credits:</span>
                      <span>2,450</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium">Email Service</h4>
                    <Badge variant="default">Connected</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Provider:</span>
                      <span>SendGrid</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly Quota:</span>
                      <span>8,450 / 10,000</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

// Export all modules
export {
  LabTestManagement,
  ReportsAnalytics,
  NotificationsCommunication
};
