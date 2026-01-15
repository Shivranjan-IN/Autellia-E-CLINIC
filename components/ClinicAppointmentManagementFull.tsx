// Comprehensive Appointment Management Module for Clinic Admin
// Online/offline workflows, token queue, calendar views, auto reminders

import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { 
  Calendar as CalendarIcon, Plus, Edit, Eye, X, Search, Filter,
  Clock, CheckCircle, XCircle, AlertCircle, Phone, Mail, MessageCircle,
  Video, Building2, Stethoscope, Users, Activity, Send, Printer,
  QrCode, TrendingUp, Brain, Sparkles, Zap, Languages, Bell,
  UserPlus, ChevronLeft, ChevronRight, MoreVertical, Trash2,
  UserCheck, PlayCircle, PauseCircle, ArrowRight, RefreshCw,
  Download, Upload, Smartphone, Wifi, Globe, Share2, Copy
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Appointment {
  id: string;
  token: string;
  date: string;
  time: string;
  patient: {
    id: string;
    name: string;
    contact: string;
    email?: string;
  };
  doctor: {
    id: string;
    name: string;
    specialization: string;
  };
  type: "In-Person" | "Video" | "Phone";
  status: "Scheduled" | "Confirmed" | "Waiting" | "In Progress" | "Completed" | "Cancelled" | "No-Show" | "Pending";
  priority: "Normal" | "Urgent" | "Emergency";
  reason?: string;
  notes?: string;
  reminderSent: {
    sms: boolean;
    email: boolean;
    whatsapp: boolean;
  };
  createdOnline: boolean;
  checkedIn?: string;
  completedAt?: string;
}

const mockAppointments: Appointment[] = [
  {
    id: "APT-001",
    token: "T01",
    date: "2025-01-12",
    time: "09:00",
    patient: { id: "PAT-001234", name: "रमेश पटेल / Ramesh Patel", contact: "+91 98765 43210", email: "ramesh@email.com" },
    doctor: { id: "DOC-001", name: "Dr. Priya Sharma", specialization: "General Physician" },
    type: "In-Person",
    status: "In Progress",
    priority: "Normal",
    reason: "Diabetes follow-up",
    reminderSent: { sms: true, email: true, whatsapp: true },
    createdOnline: true,
    checkedIn: "08:55"
  },
  {
    id: "APT-002",
    token: "T02",
    date: "2025-01-12",
    time: "09:30",
    patient: { id: "PAT-001235", name: "अंजलि वर्मा / Anjali Verma", contact: "+91 98765 43212", email: "anjali@email.com" },
    doctor: { id: "DOC-002", name: "Dr. Rajesh Kumar", specialization: "Cardiologist" },
    type: "Video",
    status: "Waiting",
    priority: "Normal",
    reason: "Chest pain consultation",
    reminderSent: { sms: true, email: true, whatsapp: true },
    createdOnline: true,
    checkedIn: "09:25"
  },
  {
    id: "APT-003",
    token: "T03",
    date: "2025-01-12",
    time: "10:00",
    patient: { id: "PAT-001236", name: "सुरेश कुमार / Suresh Kumar", contact: "+91 98765 43214" },
    doctor: { id: "DOC-001", name: "Dr. Priya Sharma", specialization: "General Physician" },
    type: "In-Person",
    status: "Scheduled",
    priority: "Urgent",
    reason: "Severe headache",
    reminderSent: { sms: true, email: false, whatsapp: false },
    createdOnline: false
  },
  {
    id: "APT-004",
    token: "T04",
    date: "2025-01-12",
    time: "10:30",
    patient: { id: "PAT-001237", name: "प्रिया शर्मा / Priya Sharma", contact: "+91 98765 43215", email: "priya@email.com" },
    doctor: { id: "DOC-003", name: "Dr. Anita Desai", specialization: "Pediatrician" },
    type: "In-Person",
    status: "Confirmed",
    priority: "Normal",
    reason: "Child vaccination",
    reminderSent: { sms: true, email: true, whatsapp: true },
    createdOnline: true
  },
  {
    id: "APT-005",
    token: "T05",
    date: "2025-01-12",
    time: "11:00",
    patient: { id: "PAT-001238", name: "Amit Singh", contact: "+91 98765 43216" },
    doctor: { id: "DOC-002", name: "Dr. Rajesh Kumar", specialization: "Cardiologist" },
    type: "Phone",
    status: "Pending",
    priority: "Normal",
    reason: "Blood pressure check",
    reminderSent: { sms: false, email: false, whatsapp: false },
    createdOnline: false
  }
];

const mockDoctors = [
  { id: "DOC-001", name: "Dr. Priya Sharma", specialization: "General Physician", available: true, color: "#ec4899" },
  { id: "DOC-002", name: "Dr. Rajesh Kumar", specialization: "Cardiologist", available: true, color: "#3b82f6" },
  { id: "DOC-003", name: "Dr. Anita Desai", specialization: "Pediatrician", available: true, color: "#10b981" },
  { id: "DOC-004", name: "Dr. Suresh Mehta", specialization: "Orthopedic", available: false, color: "#f59e0b" },
];

const weeklyStats = [
  { day: "Mon", appointments: 32 },
  { day: "Tue", appointments: 38 },
  { day: "Wed", appointments: 35 },
  { day: "Thu", appointments: 42 },
  { day: "Fri", appointments: 45 },
  { day: "Sat", appointments: 28 }
];

export default function ClinicAppointmentManagementFull() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("day");
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [appointmentType, setAppointmentType] = useState<"online" | "offline">("online");

  // New appointment form state
  const [newAppointment, setNewAppointment] = useState({
    patientId: "",
    doctorId: "",
    date: new Date().toISOString().split('T')[0],
    time: "",
    type: "In-Person" as "In-Person" | "Video" | "Phone",
    priority: "Normal" as "Normal" | "Urgent" | "Emergency",
    reason: "",
    sendReminder: true,
    smsReminder: true,
    emailReminder: true,
    whatsappReminder: true
  });

  const queueStats = {
    scheduled: appointments.filter(a => a.status === "Scheduled").length,
    confirmed: appointments.filter(a => a.status === "Confirmed").length,
    waiting: appointments.filter(a => a.status === "Waiting").length,
    inProgress: appointments.filter(a => a.status === "In Progress").length,
    pending: appointments.filter(a => a.status === "Pending").length,
    completed: appointments.filter(a => a.status === "Completed").length,
    cancelled: appointments.filter(a => a.status === "Cancelled").length,
    noShows: appointments.filter(a => a.status === "No-Show").length,
    avgWaitTime: 12,
    totalToday: appointments.length
  };

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "Scheduled": return "bg-gray-100 text-gray-700 border-gray-300";
      case "Confirmed": return "bg-blue-100 text-blue-700 border-blue-300";
      case "Waiting": return "bg-orange-100 text-orange-700 border-orange-300";
      case "In Progress": return "bg-purple-100 text-purple-700 border-purple-300";
      case "Completed": return "bg-green-100 text-green-700 border-green-300";
      case "Cancelled": return "bg-red-100 text-red-700 border-red-300";
      case "No-Show": return "bg-red-100 text-red-700 border-red-300";
      case "Pending": return "bg-yellow-100 text-yellow-700 border-yellow-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const handleCreateAppointment = () => {
    const newToken = `T${String(appointments.length + 1).padStart(2, '0')}`;
    const newApt: Appointment = {
      id: `APT-${String(appointments.length + 1).padStart(3, '0')}`,
      token: newToken,
      date: newAppointment.date,
      time: newAppointment.time,
      patient: { id: newAppointment.patientId, name: "New Patient", contact: "+91 XXXXX XXXXX" },
      doctor: mockDoctors.find(d => d.id === newAppointment.doctorId) || mockDoctors[0],
      type: newAppointment.type,
      status: "Scheduled",
      priority: newAppointment.priority,
      reason: newAppointment.reason,
      reminderSent: {
        sms: false,
        email: false,
        whatsapp: false
      },
      createdOnline: appointmentType === "online"
    };

    setAppointments([...appointments, newApt]);
    
    if (newAppointment.sendReminder) {
      setTimeout(() => {
        alert(`✅ Reminders Sent Successfully!\n\n${newAppointment.smsReminder ? '📱 SMS: Sent\n' : ''}${newAppointment.emailReminder ? '📧 Email: Sent\n' : ''}${newAppointment.whatsappReminder ? '💬 WhatsApp: Sent' : ''}\n\nAppointment Token: ${newToken}`);
      }, 500);
    }

    alert(`Appointment created successfully!\nToken: ${newToken}\nCreated ${appointmentType}`);
    setShowNewAppointment(false);
  };

  const handleStatusChange = (appointmentId: string, newStatus: Appointment["status"]) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { 
            ...apt, 
            status: newStatus,
            checkedIn: newStatus === "Waiting" ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : apt.checkedIn,
            completedAt: newStatus === "Completed" ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : apt.completedAt
          }
        : apt
    ));
  };

  const handleSendReminder = (appointment: Appointment) => {
    const channels = [];
    if (!appointment.reminderSent.sms) channels.push("SMS");
    if (!appointment.reminderSent.email) channels.push("Email");
    if (!appointment.reminderSent.whatsapp) channels.push("WhatsApp");

    setAppointments(appointments.map(apt =>
      apt.id === appointment.id
        ? { ...apt, reminderSent: { sms: true, email: true, whatsapp: true } }
        : apt
    ));

    alert(`✅ Reminders Sent to ${appointment.patient.name}\n\n📱 SMS: +91 XXXXX ${appointment.patient.contact.slice(-5)}\n📧 Email: ${appointment.patient.email || 'N/A'}\n💬 WhatsApp: Sent\n\nChannels: ${channels.join(', ')}`);
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.token.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || apt.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* AI Smart Scheduling Banner */}
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-lg">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">
              {language === "en" ? "AI Smart Scheduling Assistant" : "AI स्मार्ट शेड्यूलिंग सहायक"}
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-purple-600 mt-1" />
                <div>
                  <p className="text-sm font-medium">
                    {language === "en" ? "Peak Hours Today" : "आज के व्यस्त समय"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" 
                      ? "3-4 PM expected to be busiest (15 appointments)" 
                      : "3-4 PM सबसे व्यस्त (15 अपॉइंटमेंट)"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm font-medium">
                    {language === "en" ? "Auto-Reschedule Available" : "ऑटो-रीशेड्यूल उपलब्ध"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" 
                      ? "AI can reschedule 3 appointments if doctor cancels" 
                      : "यदि डॉक्टर रद्द करते हैं तो AI 3 अपॉइंटमेंट रीशेड्यूल कर सकता है"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-orange-600 mt-1" />
                <div>
                  <p className="text-sm font-medium">
                    {language === "en" ? "No-Show Prediction" : "न आने की भविष्यवाणी"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" 
                      ? "2 appointments have 65% no-show probability" 
                      : "2 अपॉइंटमेंट में 65% न आने की संभावना"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
          >
            <Languages className="w-4 h-4 mr-2" />
            {language === "en" ? "हिंदी" : "English"}
          </Button>
        </div>
      </Card>

      {/* Main Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {language === "en" ? "Appointment & Queue Management" : "अपॉइंटमेंट और कतार प्रबंधन"}
            </h2>
            <p className="text-muted-foreground">
              {language === "en" 
                ? "Token-based queue system with auto reminders" 
                : "ऑटो रिमाइंडर के साथ टोकन-आधारित कतार प्रणाली"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              {language === "en" ? "Refresh Queue" : "कतार रीफ्रेश करें"}
            </Button>
            <Button variant="outline">
              <Printer className="w-4 h-4 mr-2" />
              {language === "en" ? "Print Queue" : "कतार प्रिंट करें"}
            </Button>
            <Button onClick={() => setShowNewAppointment(true)} size="lg">
              <Plus className="w-5 h-5 mr-2" />
              {language === "en" ? "New Appointment" : "नया अपॉइंटमेंट"}
            </Button>
          </div>
        </div>

        {/* Queue Statistics Dashboard */}
        <div className="grid md:grid-cols-4 lg:grid-cols-9 gap-3 mb-6">
          <Card className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="text-center">
              <CalendarIcon className="w-6 h-6 mx-auto mb-1 text-blue-600" />
              <p className="text-2xl font-bold text-blue-600">{queueStats.totalToday}</p>
              <p className="text-xs text-muted-foreground">
                {language === "en" ? "Total Today" : "आज कुल"}
              </p>
            </div>
          </Card>

          <Card className="p-3 bg-gray-50 border-gray-200">
            <div className="text-center">
              <Clock className="w-6 h-6 mx-auto mb-1 text-gray-600" />
              <p className="text-2xl font-bold">{queueStats.scheduled}</p>
              <p className="text-xs text-muted-foreground">
                {language === "en" ? "Scheduled" : "शेड्यूल"}
              </p>
            </div>
          </Card>

          <Card className="p-3 bg-blue-50 border-blue-200">
            <div className="text-center">
              <CheckCircle className="w-6 h-6 mx-auto mb-1 text-blue-600" />
              <p className="text-2xl font-bold text-blue-600">{queueStats.confirmed}</p>
              <p className="text-xs text-muted-foreground">
                {language === "en" ? "Confirmed" : "पुष्टि"}
              </p>
            </div>
          </Card>

          <Card className="p-3 bg-orange-50 border-orange-200">
            <div className="text-center">
              <UserCheck className="w-6 h-6 mx-auto mb-1 text-orange-600" />
              <p className="text-2xl font-bold text-orange-600">{queueStats.waiting}</p>
              <p className="text-xs text-muted-foreground">
                {language === "en" ? "Waiting" : "प्रतीक्षा"}
              </p>
            </div>
          </Card>

          <Card className="p-3 bg-purple-50 border-purple-200">
            <div className="text-center">
              <PlayCircle className="w-6 h-6 mx-auto mb-1 text-purple-600" />
              <p className="text-2xl font-bold text-purple-600">{queueStats.inProgress}</p>
              <p className="text-xs text-muted-foreground">
                {language === "en" ? "In Progress" : "प्रगति में"}
              </p>
            </div>
          </Card>

          <Card className="p-3 bg-yellow-50 border-yellow-200">
            <div className="text-center">
              <PauseCircle className="w-6 h-6 mx-auto mb-1 text-yellow-600" />
              <p className="text-2xl font-bold text-yellow-600">{queueStats.pending}</p>
              <p className="text-xs text-muted-foreground">
                {language === "en" ? "Pending" : "लंबित"}
              </p>
            </div>
          </Card>

          <Card className="p-3 bg-green-50 border-green-200">
            <div className="text-center">
              <CheckCircle className="w-6 h-6 mx-auto mb-1 text-green-600" />
              <p className="text-2xl font-bold text-green-600">{queueStats.completed}</p>
              <p className="text-xs text-muted-foreground">
                {language === "en" ? "Completed" : "पूर्ण"}
              </p>
            </div>
          </Card>

          <Card className="p-3 bg-red-50 border-red-200">
            <div className="text-center">
              <XCircle className="w-6 h-6 mx-auto mb-1 text-red-600" />
              <p className="text-2xl font-bold text-red-600">{queueStats.cancelled}</p>
              <p className="text-xs text-muted-foreground">
                {language === "en" ? "Cancelled" : "रद्द"}
              </p>
            </div>
          </Card>

          <Card className="p-3 bg-indigo-50 border-indigo-200">
            <div className="text-center">
              <Activity className="w-6 h-6 mx-auto mb-1 text-indigo-600" />
              <p className="text-2xl font-bold text-indigo-600">{queueStats.avgWaitTime}</p>
              <p className="text-xs text-muted-foreground">
                {language === "en" ? "Avg Wait (m)" : "औसत प्रतीक्षा"}
              </p>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="queue" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="queue">
                <QrCode className="w-4 h-4 mr-2" />
                {language === "en" ? "Token Queue" : "टोकन कतार"}
              </TabsTrigger>
              <TabsTrigger value="today">
                {language === "en" ? "Today" : "आज"}
              </TabsTrigger>
              <TabsTrigger value="week">
                {language === "en" ? "Weekly View" : "साप्ताहिक"}
              </TabsTrigger>
              <TabsTrigger value="calendar">
                {language === "en" ? "Calendar" : "कैलेंडर"}
              </TabsTrigger>
              <TabsTrigger value="doctors">
                {language === "en" ? "Doctor Schedules" : "डॉक्टर शेड्यूल"}
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={language === "en" ? "Search appointments..." : "अपॉइंटमेंट खोजें..."}
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={language === "en" ? "Filter" : "फ़िल्टर"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === "en" ? "All Status" : "सभी स्थिति"}</SelectItem>
                  <SelectItem value="Scheduled">{language === "en" ? "Scheduled" : "शेड्यूल"}</SelectItem>
                  <SelectItem value="Confirmed">{language === "en" ? "Confirmed" : "पुष्टि"}</SelectItem>
                  <SelectItem value="Waiting">{language === "en" ? "Waiting" : "प्रतीक्षा"}</SelectItem>
                  <SelectItem value="In Progress">{language === "en" ? "In Progress" : "प्रगति में"}</SelectItem>
                  <SelectItem value="Pending">{language === "en" ? "Pending" : "लंबित"}</SelectItem>
                  <SelectItem value="Completed">{language === "en" ? "Completed" : "पूर्ण"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Token Queue Tab */}
          <TabsContent value="queue" className="space-y-4">
            <div className="grid lg:grid-cols-3 gap-4">
              {/* Current Token Display */}
              <Card className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    {language === "en" ? "Current Token" : "वर्तमान टोकन"}
                  </p>
                  <div className="text-6xl font-bold text-pink-600 mb-4">
                    {appointments.find(a => a.status === "In Progress")?.token || "---"}
                  </div>
                  <p className="text-sm font-medium">
                    {appointments.find(a => a.status === "In Progress")?.patient.name || 
                     (language === "en" ? "No active patient" : "कोई सक्रिय रोगी नहीं")}
                  </p>
                  <Badge className="mt-2 bg-purple-600">
                    {appointments.find(a => a.status === "In Progress")?.doctor.name || "---"}
                  </Badge>
                </div>
              </Card>

              {/* Next in Queue */}
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    {language === "en" ? "Next in Queue" : "कतार में अगला"}
                  </p>
                  <div className="text-6xl font-bold text-blue-600 mb-4">
                    {appointments.find(a => a.status === "Waiting")?.token || "---"}
                  </div>
                  <p className="text-sm font-medium">
                    {appointments.find(a => a.status === "Waiting")?.patient.name || 
                     (language === "en" ? "No waiting patients" : "कोई प्रतीक्षा रोगी नहीं")}
                  </p>
                  <Badge className="mt-2 bg-blue-600">
                    {language === "en" ? "Ready" : "तैयार"}
                  </Badge>
                </div>
              </Card>

              {/* Queue Summary */}
              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    {language === "en" ? "Queue Summary" : "कतार सारांश"}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-3xl font-bold text-green-600">{queueStats.waiting}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === "en" ? "In Queue" : "कतार में"}
                      </p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-orange-600">{queueStats.avgWaitTime}</p>
                      <p className="text-xs text-muted-foreground">
                        {language === "en" ? "Avg Wait" : "औसत प्रतीक्षा"}
                      </p>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    {language === "en" ? "Call Next" : "अगला बुलाएं"}
                  </Button>
                </div>
              </Card>
            </div>

            {/* Queue List */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">
                {language === "en" ? "Live Queue Status" : "लाइव कतार स्थिति"}
              </h3>
              <ScrollArea className="h-[500px]">
                <div className="space-y-2">
                  {filteredAppointments
                    .filter(a => ["Waiting", "In Progress", "Scheduled", "Confirmed"].includes(a.status))
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((appointment) => (
                    <Card key={appointment.id} className={`p-4 border-l-4 ${
                      appointment.status === "In Progress" ? "border-l-purple-500 bg-purple-50" :
                      appointment.status === "Waiting" ? "border-l-orange-500 bg-orange-50" :
                      appointment.status === "Confirmed" ? "border-l-blue-500 bg-blue-50" :
                      "border-l-gray-300"
                    }`}>
                      <div className="flex items-center gap-4">
                        {/* Token Display */}
                        <div className={`flex flex-col items-center justify-center w-20 h-20 rounded-lg ${
                          appointment.status === "In Progress" ? "bg-purple-600 text-white" :
                          appointment.status === "Waiting" ? "bg-orange-600 text-white" :
                          appointment.status === "Confirmed" ? "bg-blue-600 text-white" :
                          "bg-gray-200"
                        }`}>
                          <span className="text-3xl font-bold">{appointment.token}</span>
                          <span className="text-xs">{appointment.time}</span>
                        </div>

                        {/* Patient & Doctor Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{appointment.patient.name}</h4>
                                {appointment.priority !== "Normal" && (
                                  <Badge variant="destructive" className="text-xs">
                                    {appointment.priority}
                                  </Badge>
                                )}
                                {appointment.createdOnline && (
                                  <Badge variant="outline" className="text-xs">
                                    <Wifi className="w-3 h-3 mr-1" />
                                    {language === "en" ? "Online" : "ऑनलाइन"}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{appointment.patient.id}</p>
                            </div>
                            <Badge className={`${getStatusColor(appointment.status)} border`}>
                              {appointment.status}
                            </Badge>
                          </div>

                          <div className="grid md:grid-cols-3 gap-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Stethoscope className="w-4 h-4" />
                              <span>{appointment.doctor.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              {appointment.type === "Video" ? <Video className="w-4 h-4" /> :
                               appointment.type === "Phone" ? <Phone className="w-4 h-4" /> :
                               <Building2 className="w-4 h-4" />}
                              <span>{appointment.type}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Activity className="w-4 h-4" />
                              <span>{appointment.reason}</span>
                            </div>
                          </div>

                          {appointment.checkedIn && (
                            <div className="mt-2 text-xs text-muted-foreground">
                              ✓ {language === "en" ? "Checked in at" : "चेक इन समय"}: {appointment.checkedIn}
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2">
                          <Select 
                            value={appointment.status}
                            onValueChange={(value) => handleStatusChange(appointment.id, value as Appointment["status"])}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Scheduled">Scheduled</SelectItem>
                              <SelectItem value="Confirmed">Confirmed</SelectItem>
                              <SelectItem value="Waiting">Waiting</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Completed">Completed</SelectItem>
                              <SelectItem value="Cancelled">Cancelled</SelectItem>
                              <SelectItem value="No-Show">No-Show</SelectItem>
                            </SelectContent>
                          </Select>

                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedAppointment(appointment)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </TabsContent>

          {/* Today's Appointments */}
          <TabsContent value="today" className="space-y-3">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  {/* Token */}
                  <div className="flex flex-col items-center justify-center w-16 h-16 bg-pink-100 rounded-lg">
                    <span className="text-2xl font-bold text-pink-600">{appointment.token}</span>
                    <span className="text-xs text-muted-foreground">{appointment.time}</span>
                  </div>

                  {/* Patient Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{appointment.patient.name}</h4>
                          {appointment.priority !== "Normal" && (
                            <Badge variant="destructive" className="text-xs">
                              {appointment.priority}
                            </Badge>
                          )}
                          {appointment.createdOnline && (
                            <Badge variant="outline" className="text-xs">
                              <Globe className="w-3 h-3 mr-1" />
                              Online
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground font-mono">{appointment.patient.id}</p>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Stethoscope className="w-4 h-4" />
                        <span>{appointment.doctor.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        {appointment.type === "Video" ? <Video className="w-4 h-4" /> :
                         appointment.type === "Phone" ? <Phone className="w-4 h-4" /> :
                         <Building2 className="w-4 h-4" />}
                        <span>{appointment.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{appointment.patient.contact}</span>
                      </div>
                      {appointment.reason && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Activity className="w-4 h-4" />
                          <span>{appointment.reason}</span>
                        </div>
                      )}
                    </div>

                    {/* Reminder Status */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {language === "en" ? "Reminders:" : "रिमाइंडर:"}
                      </span>
                      {appointment.reminderSent.sms && (
                        <Badge variant="outline" className="text-xs">
                          <Smartphone className="w-3 h-3 mr-1" />
                          SMS
                        </Badge>
                      )}
                      {appointment.reminderSent.email && (
                        <Badge variant="outline" className="text-xs">
                          <Mail className="w-3 h-3 mr-1" />
                          Email
                        </Badge>
                      )}
                      {appointment.reminderSent.whatsapp && (
                        <Badge variant="outline" className="text-xs">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          WhatsApp
                        </Badge>
                      )}
                      {!appointment.reminderSent.sms && !appointment.reminderSent.email && !appointment.reminderSent.whatsapp && (
                        <Badge variant="secondary" className="text-xs">
                          {language === "en" ? "Not Sent" : "नहीं भेजा"}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedAppointment(appointment)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSendReminder(appointment)}
                      disabled={appointment.reminderSent.sms && appointment.reminderSent.email && appointment.reminderSent.whatsapp}
                      className="text-xs"
                    >
                      {appointment.reminderSent.sms && appointment.reminderSent.email && appointment.reminderSent.whatsapp ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {language === "en" ? "Sent" : "भेजा"}
                        </>
                      ) : (
                        <>
                          <Send className="w-3 h-3 mr-1" />
                          {language === "en" ? "Send" : "भेजें"}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Weekly View */}
          <TabsContent value="week">
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">
                  {language === "en" ? "Weekly Appointment Trend" : "साप्ताहिक अपॉइंटमेंट ट्रेंड"}
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="appointments" fill="#ec4899" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <div className="grid md:grid-cols-7 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <Card key={day} className="p-4">
                    <h4 className="font-semibold text-center mb-3">{day}</h4>
                    <div className="space-y-1">
                      {[1, 2, 3].map((slot) => (
                        <div key={slot} className="text-xs p-2 bg-pink-100 rounded border border-pink-200">
                          {`${8 + slot}:00 - Dr. ${slot}`}
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Calendar View */}
          <TabsContent value="calendar">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
                <div className="mt-4 space-y-2">
                  <h4 className="font-semibold text-sm">
                    {language === "en" ? "Legend" : "किंवदंती"}
                  </h4>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span>{language === "en" ? "Has Appointments" : "अपॉइंटमेंट हैं"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span>{language === "en" ? "Available" : "उपलब्ध"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span>{language === "en" ? "Fully Booked" : "पूरी तरह बुक"}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4 lg:col-span-2">
                <h4 className="font-semibold mb-4">
                  {language === "en" ? "Available Time Slots - " : "उपलब्ध समय स्लॉट - "}
                  {date?.toLocaleDateString()}
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"].map((time) => {
                    const isBooked = appointments.some(apt => apt.time === time);
                    return (
                      <Button
                        key={time}
                        variant={isBooked ? "secondary" : "outline"}
                        className="w-full"
                        disabled={isBooked}
                      >
                        {time}
                        {isBooked && <CheckCircle className="w-3 h-3 ml-1" />}
                      </Button>
                    );
                  })}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Doctor Schedules */}
          <TabsContent value="doctors">
            <div className="grid md:grid-cols-2 gap-4">
              {mockDoctors.map((doctor) => (
                <Card key={doctor.id} className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback style={{ backgroundColor: doctor.color }}>
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{doctor.name}</h4>
                        <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                      </div>
                    </div>
                    <Badge variant={doctor.available ? "default" : "secondary"}>
                      {doctor.available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>

                  <Separator className="my-3" />

                  <div className="space-y-2">
                    <h5 className="text-sm font-semibold">
                      {language === "en" ? "Today's Schedule" : "आज का शेड्यूल"}
                    </h5>
                    {appointments
                      .filter(apt => apt.doctor.id === doctor.id)
                      .map((apt) => (
                        <div key={apt.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono">{apt.token}</Badge>
                            <span>{apt.time}</span>
                            <span className="text-muted-foreground">{apt.patient.name.split('/')[1] || apt.patient.name}</span>
                          </div>
                          <Badge className={getStatusColor(apt.status)}>
                            {apt.status}
                          </Badge>
                        </div>
                      ))}
                    {appointments.filter(apt => apt.doctor.id === doctor.id).length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        {language === "en" ? "No appointments today" : "आज कोई अपॉइंटमेंट नहीं"}
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* New Appointment Modal */}
      {showNewAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="w-full max-w-3xl bg-white my-8">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">
                    {language === "en" ? "Create New Appointment" : "नया अपॉइंटमेंट बनाएं"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" 
                      ? "Book online or offline appointment with auto reminders" 
                      : "ऑटो रिमाइंडर के साथ ऑनलाइन या ऑफलाइन अपॉइंटमेंट बुक करें"}
                  </p>
                </div>
                <Button variant="ghost" onClick={() => setShowNewAppointment(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Appointment Type Selection */}
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <Label className="mb-3 block">
                    {language === "en" ? "Appointment Creation Type" : "अपॉइंटमेंट बनाने का प्रकार"}
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant={appointmentType === "online" ? "default" : "outline"}
                      onClick={() => setAppointmentType("online")}
                      className="h-auto py-4"
                    >
                      <div className="text-center">
                        <Globe className="w-6 h-6 mx-auto mb-2" />
                        <p className="font-semibold">
                          {language === "en" ? "Online Booking" : "ऑनलाइन बुकिंग"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === "en" ? "Patient booked via app/website" : "ऐप/वेबसाइट से बुक"}
                        </p>
                      </div>
                    </Button>
                    <Button
                      variant={appointmentType === "offline" ? "default" : "outline"}
                      onClick={() => setAppointmentType("offline")}
                      className="h-auto py-4"
                    >
                      <div className="text-center">
                        <Building2 className="w-6 h-6 mx-auto mb-2" />
                        <p className="font-semibold">
                          {language === "en" ? "Offline/Walk-in" : "ऑफलाइन/वॉक-इन"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {language === "en" ? "Patient at clinic counter" : "क्लिनिक काउंटर पर"}
                        </p>
                      </div>
                    </Button>
                  </div>
                </Card>

                {/* Patient Selection */}
                <div>
                  <Label>{language === "en" ? "Patient *" : "रोगी *"}</Label>
                  <Select value={newAppointment.patientId} onValueChange={(val) => setNewAppointment({...newAppointment, patientId: val})}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === "en" ? "Select patient or register new" : "रोगी चुनें या नया पंजीकृत करें"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">
                        <div className="flex items-center gap-2">
                          <UserPlus className="w-4 h-4" />
                          {language === "en" ? "Register New Patient" : "नया रोगी पंजीकृत करें"}
                        </div>
                      </SelectItem>
                      <Separator className="my-1" />
                      <SelectItem value="PAT-001234">रमेश पटेल / Ramesh Patel (PAT-001234)</SelectItem>
                      <SelectItem value="PAT-001235">अंजलि वर्मा / Anjali Verma (PAT-001235)</SelectItem>
                      <SelectItem value="PAT-001236">सुरेश कुमार / Suresh Kumar (PAT-001236)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Doctor Selection */}
                <div>
                  <Label>{language === "en" ? "Doctor *" : "डॉक्टर *"}</Label>
                  <Select value={newAppointment.doctorId} onValueChange={(val) => setNewAppointment({...newAppointment, doctorId: val})}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === "en" ? "Select doctor" : "डॉक्टर चुनें"} />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDoctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id} disabled={!doctor.available}>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: doctor.color }}></div>
                            {doctor.name} - {doctor.specialization} {!doctor.available && "(Unavailable)"}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="link" className="p-0 h-auto text-xs mt-1">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {language === "en" ? "AI Suggest Best Doctor" : "AI सर्वश्रेष्ठ डॉक्टर सुझाएं"}
                  </Button>
                </div>

                {/* Date and Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>{language === "en" ? "Date *" : "तारीख *"}</Label>
                    <Input 
                      type="date" 
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>{language === "en" ? "Time Slot *" : "समय स्लॉट *"}</Label>
                    <Select value={newAppointment.time} onValueChange={(val) => setNewAppointment({...newAppointment, time: val})}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === "en" ? "Select time" : "समय चुनें"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">09:00 AM ({language === "en" ? "Available" : "उपलब्ध"})</SelectItem>
                        <SelectItem value="09:30">09:30 AM ({language === "en" ? "Available" : "उपलब्ध"})</SelectItem>
                        <SelectItem value="10:00" disabled>10:00 AM ({language === "en" ? "Booked" : "बुक"})</SelectItem>
                        <SelectItem value="10:30">10:30 AM ({language === "en" ? "Available" : "उपलब्ध"})</SelectItem>
                        <SelectItem value="11:00">11:00 AM ({language === "en" ? "Available" : "उपलब्ध"})</SelectItem>
                        <SelectItem value="11:30">11:30 AM ({language === "en" ? "Available" : "उपलब्ध"})</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Type and Priority */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>{language === "en" ? "Consultation Type *" : "परामर्श प्रकार *"}</Label>
                    <Select value={newAppointment.type} onValueChange={(val: any) => setNewAppointment({...newAppointment, type: val})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In-Person">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            {language === "en" ? "In-Person" : "व्यक्तिगत"}
                          </div>
                        </SelectItem>
                        <SelectItem value="Video">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            {language === "en" ? "Video Call" : "वीडियो कॉल"}
                          </div>
                        </SelectItem>
                        <SelectItem value="Phone">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {language === "en" ? "Phone Call" : "फोन कॉल"}
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>{language === "en" ? "Priority" : "प्राथमिकता"}</Label>
                    <Select value={newAppointment.priority} onValueChange={(val: any) => setNewAppointment({...newAppointment, priority: val})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Normal">{language === "en" ? "Normal" : "सामान्य"}</SelectItem>
                        <SelectItem value="Urgent">{language === "en" ? "Urgent" : "जरूरी"}</SelectItem>
                        <SelectItem value="Emergency">{language === "en" ? "Emergency" : "आपातकालीन"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <Label>{language === "en" ? "Reason for Visit" : "यात्रा का कारण"}</Label>
                  <Textarea 
                    placeholder={language === "en" ? "Describe symptoms or reason..." : "लक्षण या कारण बताएं..."}
                    value={newAppointment.reason}
                    onChange={(e) => setNewAppointment({...newAppointment, reason: e.target.value})}
                    rows={3}
                  />
                </div>

                <Separator />

                {/* Auto Reminder Settings */}
                <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-semibold">
                          {language === "en" ? "Auto Reminder System" : "ऑटो रिमाइंडर सिस्टम"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {language === "en" 
                            ? "Send automatic reminders to patient" 
                            : "रोगी को स्वचालित रिमाइंडर भेजें"}
                        </p>
                      </div>
                    </div>
                    <Switch 
                      checked={newAppointment.sendReminder}
                      onCheckedChange={(checked) => setNewAppointment({...newAppointment, sendReminder: checked})}
                    />
                  </div>

                  {newAppointment.sendReminder && (
                    <div className="space-y-3 pl-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-blue-600" />
                          <Label htmlFor="sms" className="cursor-pointer">
                            {language === "en" ? "SMS Reminder" : "SMS रिमाइंडर"}
                          </Label>
                        </div>
                        <Switch 
                          id="sms"
                          checked={newAppointment.smsReminder}
                          onCheckedChange={(checked) => setNewAppointment({...newAppointment, smsReminder: checked})}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-purple-600" />
                          <Label htmlFor="email" className="cursor-pointer">
                            {language === "en" ? "Email Reminder" : "ईमेल रिमाइंडर"}
                          </Label>
                        </div>
                        <Switch 
                          id="email"
                          checked={newAppointment.emailReminder}
                          onCheckedChange={(checked) => setNewAppointment({...newAppointment, emailReminder: checked})}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-green-600" />
                          <Label htmlFor="whatsapp" className="cursor-pointer">
                            {language === "en" ? "WhatsApp Reminder" : "WhatsApp रिमाइंडर"}
                          </Label>
                        </div>
                        <Switch 
                          id="whatsapp"
                          checked={newAppointment.whatsappReminder}
                          onCheckedChange={(checked) => setNewAppointment({...newAppointment, whatsappReminder: checked})}
                        />
                      </div>

                      <div className="mt-3 p-3 bg-white rounded-lg border text-sm">
                        <p className="font-medium mb-1">
                          {language === "en" ? "Reminder Schedule:" : "रिमाइंडर शेड्यूल:"}
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• {language === "en" ? "24 hours before appointment" : "अपॉइंटमेंट से 24 घंटे पहले"}</li>
                          <li>• {language === "en" ? "2 hours before appointment" : "अपॉइंटमेंट से 2 घंटे पहले"}</li>
                          <li>• {language === "en" ? "15 minutes before appointment" : "अपॉइंटमेंट से 15 मिनट पहले"}</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1" size="lg" onClick={handleCreateAppointment}>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {language === "en" ? "Create Appointment" : "अपॉइंटमेंट बनाएं"}
                  </Button>
                  <Button variant="outline" size="lg">
                    <Sparkles className="w-5 h-5 mr-2" />
                    {language === "en" ? "AI Suggest" : "AI सुझाव"}
                  </Button>
                  <Button variant="outline" size="lg">
                    <QrCode className="w-5 h-5 mr-2" />
                    {language === "en" ? "Print Token" : "टोकन प्रिंट"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">
                  {language === "en" ? "Appointment Details" : "अपॉइंटमेंट विवरण"}
                </h3>
                <Button variant="ghost" onClick={() => setSelectedAppointment(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {/* Token Display */}
                <div className="flex items-center justify-center p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg border-2 border-pink-200">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      {language === "en" ? "Token Number" : "टोकन नंबर"}
                    </p>
                    <div className="text-6xl font-bold text-pink-600 mb-2">
                      {selectedAppointment.token}
                    </div>
                    <Badge className={getStatusColor(selectedAppointment.status)}>
                      {selectedAppointment.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>{language === "en" ? "Appointment ID" : "अपॉइंटमेंट ID"}</Label>
                    <p className="font-mono font-medium">{selectedAppointment.id}</p>
                  </div>
                  <div>
                    <Label>{language === "en" ? "Date & Time" : "तारीख और समय"}</Label>
                    <p>{selectedAppointment.date} at {selectedAppointment.time}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>{language === "en" ? "Patient" : "रोगी"}</Label>
                    <p className="font-medium">{selectedAppointment.patient.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedAppointment.patient.id}</p>
                    <p className="text-sm text-muted-foreground">{selectedAppointment.patient.contact}</p>
                  </div>
                  <div>
                    <Label>{language === "en" ? "Doctor" : "डॉक्टर"}</Label>
                    <p className="font-medium">{selectedAppointment.doctor.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedAppointment.doctor.specialization}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>{language === "en" ? "Type" : "प्रकार"}</Label>
                    <div className="flex items-center gap-2 mt-1">
                      {selectedAppointment.type === "Video" ? <Video className="w-4 h-4" /> :
                       selectedAppointment.type === "Phone" ? <Phone className="w-4 h-4" /> :
                       <Building2 className="w-4 h-4" />}
                      <span>{selectedAppointment.type}</span>
                    </div>
                  </div>
                  <div>
                    <Label>{language === "en" ? "Created" : "बनाया गया"}</Label>
                    <div className="flex items-center gap-2 mt-1">
                      {selectedAppointment.createdOnline ? (
                        <>
                          <Globe className="w-4 h-4 text-blue-600" />
                          <span>{language === "en" ? "Online Booking" : "ऑनलाइन बुकिंग"}</span>
                        </>
                      ) : (
                        <>
                          <Building2 className="w-4 h-4 text-gray-600" />
                          <span>{language === "en" ? "Offline/Walk-in" : "ऑफलाइन/वॉक-इन"}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {selectedAppointment.reason && (
                  <>
                    <Separator />
                    <div>
                      <Label>{language === "en" ? "Reason" : "कारण"}</Label>
                      <p className="mt-1">{selectedAppointment.reason}</p>
                    </div>
                  </>
                )}

                <Separator />

                {/* Reminder Status */}
                <div>
                  <Label className="mb-2 block">
                    {language === "en" ? "Reminder Status" : "रिमाइंडर स्थिति"}
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    <Card className={`p-3 text-center ${selectedAppointment.reminderSent.sms ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                      <Smartphone className={`w-6 h-6 mx-auto mb-1 ${selectedAppointment.reminderSent.sms ? 'text-green-600' : 'text-gray-400'}`} />
                      <p className="text-xs font-medium">SMS</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedAppointment.reminderSent.sms 
                          ? (language === "en" ? "Sent" : "भेजा") 
                          : (language === "en" ? "Not Sent" : "नहीं भेजा")}
                      </p>
                    </Card>
                    <Card className={`p-3 text-center ${selectedAppointment.reminderSent.email ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                      <Mail className={`w-6 h-6 mx-auto mb-1 ${selectedAppointment.reminderSent.email ? 'text-green-600' : 'text-gray-400'}`} />
                      <p className="text-xs font-medium">Email</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedAppointment.reminderSent.email 
                          ? (language === "en" ? "Sent" : "भेजा") 
                          : (language === "en" ? "Not Sent" : "नहीं भेजा")}
                      </p>
                    </Card>
                    <Card className={`p-3 text-center ${selectedAppointment.reminderSent.whatsapp ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                      <MessageCircle className={`w-6 h-6 mx-auto mb-1 ${selectedAppointment.reminderSent.whatsapp ? 'text-green-600' : 'text-gray-400'}`} />
                      <p className="text-xs font-medium">WhatsApp</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedAppointment.reminderSent.whatsapp 
                          ? (language === "en" ? "Sent" : "भेजा") 
                          : (language === "en" ? "Not Sent" : "नहीं भेजा")}
                      </p>
                    </Card>
                  </div>
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={() => handleStatusChange(selectedAppointment.id, "Waiting")}
                    disabled={selectedAppointment.status === "Waiting"}
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    {language === "en" ? "Check In" : "चेक इन"}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleSendReminder(selectedAppointment)}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {language === "en" ? "Send Reminder" : "रिमाइंडर भेजें"}
                  </Button>
                  <Button variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    {language === "en" ? "Reschedule" : "पुनः शेड्यूल"}
                  </Button>
                  <Button variant="outline">
                    <Printer className="w-4 h-4 mr-2" />
                    {language === "en" ? "Print Token" : "टोकन प्रिंट"}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleStatusChange(selectedAppointment.id, "Completed")}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {language === "en" ? "Mark Complete" : "पूर्ण चिह्नित करें"}
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleStatusChange(selectedAppointment.id, "Cancelled")}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    {language === "en" ? "Cancel" : "रद्द"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
