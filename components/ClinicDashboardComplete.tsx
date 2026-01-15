// Complete Clinic Dashboard - All Missing Modules and Features
// Appointments Calendar, Settings, Support, IoT, Messaging, etc.

import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Calendar as CalendarIcon, Plus, Edit, Eye, X, Download, Send, Upload,
  Settings, Bell, MessageCircle, Phone, Mail, Video, Search, Filter,
  Clock, CheckCircle, XCircle, AlertCircle, Wifi, Smartphone, Activity,
  Thermometer, Droplet, Heart, TrendingUp, Users, DollarSign, Package,
  FlaskConical, FileText, Printer, CreditCard, Key, Lock, Shield, Database,
  Globe, HelpCircle, Headphones, BookOpen, FileCheck, Repeat, Zap,
  Brain, Target, Sparkles, Mic, Volume2, Languages, Camera, MapPin,
  Building2, Stethoscope, Pill, Receipt, BarChart3, Award, Star,
  UserPlus, MoreVertical, Trash2, ArrowLeft, ArrowRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";

// Comprehensive Appointments Management with Calendar Views
export function AppointmentsCalendarTab() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("day");
  const [showNewAppointment, setShowNewAppointment] = useState(false);

  const appointmentSlots = [
    { time: "09:00 AM", doctor: "Dr. Priya Sharma", patient: "Ramesh Patel", status: "Confirmed", type: "In-Person" },
    { time: "09:30 AM", doctor: "Dr. Rajesh Kumar", patient: null, status: "Available", type: null },
    { time: "10:00 AM", doctor: "Dr. Priya Sharma", patient: "Anjali Verma", status: "Waiting", type: "Video" },
    { time: "10:30 AM", doctor: "Dr. Anita Desai", patient: "Suresh Kumar", status: "In Progress", type: "In-Person" },
    { time: "11:00 AM", doctor: "Dr. Priya Sharma", patient: null, status: "Available", type: null },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Appointment Calendar</h2>
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar Picker */}
          <Card className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-sm">Confirmed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                <span className="text-sm">Waiting</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span className="text-sm">In Progress</span>
              </div>
            </div>
          </Card>

          {/* Time Slots */}
          <Card className="p-4 lg:col-span-2">
            <h3 className="mb-4">Time Slots - {date?.toLocaleDateString()}</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {appointmentSlots.map((slot, idx) => (
                <Card key={idx} className={`p-4 ${
                  slot.status === "Available" ? "bg-green-50 border-green-200" :
                  slot.status === "Confirmed" ? "bg-blue-50 border-blue-200" :
                  slot.status === "Waiting" ? "bg-orange-50 border-orange-200" :
                  "bg-purple-50 border-purple-200"
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {slot.time}
                      </p>
                      <p className="text-sm text-muted-foreground">{slot.doctor}</p>
                      {slot.patient && (
                        <p className="text-sm mt-1">Patient: {slot.patient}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={
                        slot.status === "Available" ? "bg-green-600" :
                        slot.status === "Confirmed" ? "bg-blue-600" :
                        slot.status === "Waiting" ? "bg-orange-600" :
                        "bg-purple-600"
                      }>
                        {slot.status}
                      </Badge>
                      {slot.patient ? (
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm">Book</Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* New Appointment Form */}
        {showNewAppointment && (
          <Card className="p-6 mt-6 border-blue-200 bg-blue-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg">Create New Appointment</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowNewAppointment(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Patient Name</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select or add new patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">+ Add New Patient</SelectItem>
                    <SelectItem value="1">Ramesh Patel</SelectItem>
                    <SelectItem value="2">Anjali Verma</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Doctor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Dr. Priya Sharma - Cardiology</SelectItem>
                    <SelectItem value="2">Dr. Rajesh Kumar - Orthopedics</SelectItem>
                    <SelectItem value="3">Dr. Anita Desai - Pediatrics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Date</Label>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div>
                <Label>Time</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00 AM</SelectItem>
                    <SelectItem value="09:30">09:30 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Appointment Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-person">In-Person</SelectItem>
                    <SelectItem value="video">Video Consultation</SelectItem>
                    <SelectItem value="phone">Phone Consultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label>Reason for Visit / Notes</Label>
                <Textarea placeholder="Enter reason for appointment or any special notes" />
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center gap-2">
                  <Switch id="send-reminder" />
                  <Label htmlFor="send-reminder">Send SMS/Email reminder to patient</Label>
                </div>
              </div>
              <div className="md:col-span-2 flex gap-3">
                <Button className="flex-1">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Create Appointment
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setShowNewAppointment(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}
      </Card>
    </div>
  );
}

// IoT & Wearable Integration Module
export function IoTIntegrationTab() {
  const connectedDevices = [
    { id: 1, name: "BP Monitor - Ward A", patient: "Ramesh Patel", type: "Blood Pressure", status: "Active", lastReading: "120/80 mmHg", time: "2 mins ago" },
    { id: 2, name: "Glucose Monitor", patient: "Suresh Kumar", type: "Blood Glucose", status: "Active", lastReading: "110 mg/dL", time: "5 mins ago" },
    { id: 3, name: "Heart Rate Monitor", patient: "Anjali Verma", type: "Heart Rate", status: "Active", lastReading: "72 bpm", time: "1 min ago" },
    { id: 4, name: "Pulse Oximeter", patient: "Priya Sharma", type: "SpO2", status: "Offline", lastReading: "98%", time: "1 hour ago" }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl flex items-center gap-2">
            <Wifi className="w-6 h-6 text-blue-600" />
            IoT & Wearable Integration
          </h2>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Connect New Device
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-green-50">
            <Wifi className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-sm text-muted-foreground">Active Devices</p>
            <p className="text-2xl">{connectedDevices.filter(d => d.status === "Active").length}</p>
          </Card>
          <Card className="p-4 bg-blue-50">
            <Activity className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-sm text-muted-foreground">Total Readings</p>
            <p className="text-2xl">1,248</p>
          </Card>
          <Card className="p-4 bg-purple-50">
            <Heart className="w-6 h-6 text-purple-600 mb-2" />
            <p className="text-sm text-muted-foreground">Monitored Patients</p>
            <p className="text-2xl">4</p>
          </Card>
          <Card className="p-4 bg-orange-50">
            <AlertCircle className="w-6 h-6 text-orange-600 mb-2" />
            <p className="text-sm text-muted-foreground">Alerts</p>
            <p className="text-2xl">2</p>
          </Card>
        </div>

        <div className="space-y-4">
          {connectedDevices.map(device => (
            <Card key={device.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    device.status === "Active" ? "bg-green-100" : "bg-gray-100"
                  }`}>
                    {device.type === "Blood Pressure" && <Activity className="w-6 h-6 text-green-600" />}
                    {device.type === "Blood Glucose" && <Droplet className="w-6 h-6 text-blue-600" />}
                    {device.type === "Heart Rate" && <Heart className="w-6 h-6 text-red-600" />}
                    {device.type === "SpO2" && <Thermometer className="w-6 h-6 text-purple-600" />}
                  </div>
                  <div>
                    <p className="font-medium">{device.name}</p>
                    <p className="text-sm text-muted-foreground">{device.type} • Patient: {device.patient}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Last Reading</p>
                    <p className="font-medium text-lg">{device.lastReading}</p>
                    <p className="text-xs text-muted-foreground">{device.time}</p>
                  </div>
                  <Badge className={device.status === "Active" ? "bg-green-600" : "bg-gray-600"}>
                    {device.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 mt-6 bg-gradient-to-br from-blue-50 to-purple-50">
          <h3 className="mb-4">Supported Devices</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {["BP Monitor", "Glucose Monitor", "Pulse Oximeter", "ECG Monitor", "Temperature Sensor", "Fitness Tracker"].map((device, idx) => (
              <Card key={idx} className="p-4 bg-white">
                <p className="font-medium">{device}</p>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              </Card>
            ))}
          </div>
        </Card>
      </Card>
    </div>
  );
}

// Messaging & Communication Module
export function MessagingTab() {
  const [selectedChat, setSelectedChat] = useState<any>(null);

  const conversations = [
    { id: 1, name: "Ramesh Patel", role: "Patient", lastMessage: "When is my next appointment?", time: "2 mins ago", unread: 2, avatar: "https://i.pravatar.cc/150?img=33" },
    { id: 2, name: "Dr. Priya Sharma", role: "Doctor", lastMessage: "Patient discharge summary needed", time: "15 mins ago", unread: 0, avatar: "https://i.pravatar.cc/150?img=5" },
    { id: 3, name: "Anjali Verma", role: "Patient", lastMessage: "Thank you for the consultation", time: "1 hour ago", unread: 0, avatar: "https://i.pravatar.cc/150?img=45" },
    { id: 4, name: "Pharmacy Dept", role: "Department", lastMessage: "Low stock alert: Paracetamol", time: "2 hours ago", unread: 1, avatar: "https://i.pravatar.cc/150?img=10" }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-blue-600" />
            Messages & Communication
          </h2>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Message
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <Card className="p-4">
            <div className="mb-4">
              <Input placeholder="Search conversations..." className="w-full" />
            </div>
            <div className="space-y-2">
              {conversations.map(conv => (
                <Card
                  key={conv.id}
                  className={`p-3 cursor-pointer hover:bg-gray-50 ${
                    selectedChat?.id === conv.id ? "border-blue-500 bg-blue-50" : ""
                  } ${conv.unread > 0 ? "border-blue-200" : ""}`}
                  onClick={() => setSelectedChat(conv)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={conv.avatar} alt={conv.name} />
                      <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium truncate">{conv.name}</p>
                        {conv.unread > 0 && (
                          <Badge className="bg-blue-600">{conv.unread}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                      <p className="text-xs text-muted-foreground mt-1">{conv.time}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2 p-4">
            {selectedChat ? (
              <div className="flex flex-col h-[500px]">
                {/* Chat Header */}
                <div className="flex items-center justify-between pb-4 border-b mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                      <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedChat.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedChat.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  <div className="flex justify-start">
                    <Card className="p-3 bg-gray-100 max-w-[70%]">
                      <p className="text-sm">{selectedChat.lastMessage}</p>
                      <p className="text-xs text-muted-foreground mt-1">{selectedChat.time}</p>
                    </Card>
                  </div>
                  <div className="flex justify-end">
                    <Card className="p-3 bg-blue-600 text-white max-w-[70%]">
                      <p className="text-sm">Your next appointment is on January 15th at 10:00 AM with Dr. Priya Sharma</p>
                      <p className="text-xs opacity-80 mt-1">Just now</p>
                    </Card>
                  </div>
                </div>

                {/* Message Input */}
                <div className="flex gap-2">
                  <Input placeholder="Type your message..." className="flex-1" />
                  <Button>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[500px] text-muted-foreground">
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </Card>
    </div>
  );
}

// Comprehensive Settings Module
export function SettingsTab() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl mb-6">Settings & Configuration</h2>

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="payment">Payment Gateway</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6 space-y-6">
            <Card className="p-6">
              <h3 className="mb-4">Working Hours Management</h3>
              <div className="space-y-4">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                  <div key={day} className="flex items-center gap-4">
                    <Switch id={day} defaultChecked={day !== "Sunday"} />
                    <Label htmlFor={day} className="w-24">{day}</Label>
                    <Input type="time" defaultValue="09:00" className="w-32" />
                    <span>to</span>
                    <Input type="time" defaultValue="18:00" className="w-32" />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Holiday Management</h3>
              <div className="space-y-4">
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Holiday
                </Button>
                <div className="space-y-2">
                  {[
                    { date: "2025-01-26", name: "Republic Day" },
                    { date: "2025-03-08", name: "Holi" },
                    { date: "2025-08-15", name: "Independence Day" }
                  ].map((holiday, idx) => (
                    <Card key={idx} className="p-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{holiday.name}</p>
                        <p className="text-sm text-muted-foreground">{holiday.date}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="mt-6 space-y-6">
            <Card className="p-6">
              <h3 className="mb-4">Payment Gateway Configuration</h3>
              <div className="space-y-4">
                <div>
                  <Label>Payment Provider</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="razorpay">Razorpay</SelectItem>
                      <SelectItem value="paytm">Paytm</SelectItem>
                      <SelectItem value="phonepe">PhonePe</SelectItem>
                      <SelectItem value="stripe">Stripe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>API Key</Label>
                  <Input type="password" placeholder="Enter API key" />
                </div>
                <div>
                  <Label>API Secret</Label>
                  <Input type="password" placeholder="Enter API secret" />
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="test-mode" />
                  <Label htmlFor="test-mode">Enable Test Mode</Label>
                </div>
                <Button>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Save Configuration
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Supported Payment Methods</h3>
              <div className="space-y-2">
                {[
                  { name: "Cash", enabled: true },
                  { name: "Credit/Debit Card", enabled: true },
                  { name: "UPI", enabled: true },
                  { name: "Net Banking", enabled: false },
                  { name: "Insurance", enabled: true }
                ].map((method, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <span>{method.name}</span>
                    <Switch defaultChecked={method.enabled} />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6 space-y-6">
            <Card className="p-6">
              <h3 className="mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { title: "Appointment Reminders", desc: "Send SMS/Email to patients before appointment", enabled: true },
                  { title: "Payment Receipts", desc: "Auto-send payment receipts after billing", enabled: true },
                  { title: "Low Stock Alerts", desc: "Alert when inventory reaches minimum level", enabled: true },
                  { title: "Doctor Notifications", desc: "Notify doctors about new appointments", enabled: true },
                  { title: "Admin Announcements", desc: "Broadcast messages to all staff", enabled: false }
                ].map((pref, idx) => (
                  <div key={idx} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{pref.title}</p>
                      <p className="text-sm text-muted-foreground">{pref.desc}</p>
                    </div>
                    <Switch defaultChecked={pref.enabled} />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">SMS/Email Templates</h3>
              <div className="space-y-4">
                <div>
                  <Label>Appointment Reminder Template</Label>
                  <Textarea 
                    placeholder="Your appointment with {doctor} is scheduled for {date} at {time}"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Payment Receipt Template</Label>
                  <Textarea 
                    placeholder="Thank you for your payment of ₹{amount}. Invoice: {invoice_no}"
                    rows={3}
                  />
                </div>
                <Button>Save Templates</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6 space-y-6">
            <Card className="p-6">
              <h3 className="mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add extra security layer</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Password Policy</p>
                      <p className="text-sm text-muted-foreground">Enforce strong passwords</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Data Encryption</p>
                      <p className="text-sm text-muted-foreground">Encrypt patient data</p>
                    </div>
                  </div>
                  <Badge className="bg-green-600">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Audit Logging</p>
                      <p className="text-sm text-muted-foreground">Track all user actions</p>
                    </div>
                  </div>
                  <Badge className="bg-green-600">Enabled</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Session Management</h3>
              <div className="space-y-4">
                <div>
                  <Label>Auto Logout After Inactivity</Label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline">View Active Sessions</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="backup" className="mt-6 space-y-6">
            <Card className="p-6">
              <h3 className="mb-4">Data Backup & Restore</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Automatic Backup</p>
                    <p className="text-sm text-muted-foreground">Schedule automatic backups</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div>
                  <Label>Backup Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Backup Storage Location</Label>
                  <Select defaultValue="cloud">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cloud">Cloud Storage</SelectItem>
                      <SelectItem value="local">Local Server</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Create Backup Now
                  </Button>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Restore from Backup
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Recent Backups</h3>
              <div className="space-y-2">
                {[
                  { date: "2025-01-12 08:00 AM", size: "245 MB", status: "Success" },
                  { date: "2025-01-11 08:00 AM", size: "243 MB", status: "Success" },
                  { date: "2025-01-10 08:00 AM", size: "241 MB", status: "Success" }
                ].map((backup, idx) => (
                  <Card key={idx} className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{backup.date}</p>
                      <p className="text-sm text-muted-foreground">Size: {backup.size}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-600">{backup.status}</Badge>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

// Help & Support Module
export function HelpSupportTab() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl mb-6 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-blue-600" />
          Help & Support Center
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
            <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-medium mb-2">Documentation</h3>
            <p className="text-sm text-muted-foreground">User guides and tutorials</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
            <MessageCircle className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-medium mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground">Chat with support team</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
            <Headphones className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-medium mb-2">Phone Support</h3>
            <p className="text-sm text-muted-foreground">Call us: 1800-123-4567</p>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <h3 className="mb-4">Raise a Support Ticket</h3>
          <div className="space-y-4">
            <div>
              <Label>Issue Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Issue</SelectItem>
                  <SelectItem value="billing">Billing Query</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Subject</Label>
              <Input placeholder="Brief description of the issue" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea placeholder="Provide detailed information about your issue" rows={5} />
            </div>
            <div>
              <Label>Attach Screenshot (optional)</Label>
              <Input type="file" accept="image/*" />
            </div>
            <Button>
              <Send className="w-4 h-4 mr-2" />
              Submit Ticket
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {[
              { q: "How do I add a new doctor?", a: "Go to Doctor Management → Click 'Add New Doctor' → Fill in the details and save." },
              { q: "How to generate GST invoices?", a: "Billing section automatically generates GST-compliant invoices with 18% tax." },
              { q: "Can I export reports?", a: "Yes, all reports can be exported to PDF and Excel formats." },
              { q: "How to enable SMS reminders?", a: "Go to Settings → Notifications → Enable 'Appointment Reminders'." }
            ].map((faq, idx) => (
              <Card key={idx} className="p-4">
                <p className="font-medium mb-2">{faq.q}</p>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </Card>
            ))}
          </div>
        </Card>
      </Card>
    </div>
  );
}

export default {
  AppointmentsCalendarTab,
  IoTIntegrationTab,
  MessagingTab,
  SettingsTab,
  HelpSupportTab
};
