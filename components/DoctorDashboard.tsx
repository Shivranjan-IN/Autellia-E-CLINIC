import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { 
  Calendar,
  Heart,
  Users,
  TrendingUp,
  Clock,
  Video,
  Phone,
  MessageSquare,
  FileText,
  Brain,
  Pill,
  Download,
  Upload,
  Search,
  Filter,
  LogOut,
  Bell,
  Settings,
  Activity,
  DollarSign,
  CheckCircle2,
  Star,
  MapPin,
  Mail,
  UserPlus,
  Edit,
  Trash2,
  Send,
  Plus,
  X,
  FileUp,
  FlaskConical,
  Package,
  Building2,
  BarChart3,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Printer,
  MoreVertical,
  Mic,
  Volume2,
  Languages,
  Shield,
  Lock,
  Key,
  Database,
  Wifi,
  Smartphone,
  Stethoscope,
  Thermometer,
  Droplet,
  Zap,
  Globe,
  Headphones,
  FileCheck,
  ClipboardList,
  CreditCard,
  Receipt,
  Repeat,
  UserCheck,
  Award,
  Target,
  Lightbulb,
  Sparkles,
  MessageCircle,
  PlayCircle,
  Archive
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import type { User } from "../App";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface DoctorDashboardProps {
  user: User;
  onLogout: () => void;
}

export function DoctorDashboard({ user, onLogout }: DoctorDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [prescriptionPatient, setPrescriptionPatient] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  // Translations
  const translations = {
    en: {
      dashboard: "Dashboard",
      appointments: "Appointments",
      patients: "Patients",
      prescriptions: "Prescriptions",
      analytics: "Analytics",
      settings: "Settings",
      todayAppointments: "Today's Appointments",
      todayEarnings: "Today's Earnings",
      completed: "Completed",
      pending: "Pending"
    },
    hi: {
      dashboard: "डैशबोर्ड",
      appointments: "अपॉइंटमेंट",
      patients: "रोगी",
      prescriptions: "नुस्खे",
      analytics: "विश्लेषण",
      settings: "सेटिंग्स",
      todayAppointments: "आज की अपॉइंटमेंट",
      todayEarnings: "आज की कमाई",
      completed: "पूर्ण",
      pending: "लंबित"
    }
  };

  const t = translations[language];

  // Mock Doctor Profile Data (from registration)
  const doctorProfile = {
    fullName: user.name || "Dr. Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    mobile: "+91 9876543210",
    gender: "Male",
    dateOfBirth: "1985-03-15",
    registrationNumber: "MCI/12345/2010",
    councilName: "Medical Council of India",
    yearOfRegistration: "2010",
    qualifications: "MBBS, MD (Cardiology)",
    university: "AIIMS Delhi",
    graduationYear: "2010",
    specializations: ["Cardiology", "General Medicine"],
    experience: "13 years",
    languages: ["English", "Hindi", "Bengali"],
    clinicName: "Kumar Heart Care Clinic",
    clinicAddress: "123, MG Road, Bangalore - 560001",
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    consultationFeeOffline: "₹800",
    consultationFeeOnline: "₹500",
    consultationModes: ["Online", "In-clinic"],
    expertiseAreas: ["Heart Disease", "Hypertension", "Diabetes"],
    servicesOffered: ["Teleconsultation", "Lab Referral", "Health Checkup"],
    shortBio: "Experienced cardiologist with 13+ years of expertise in treating heart conditions and lifestyle diseases.",
    bankAccount: "XXXX XXXX 1234",
    panNumber: "ABCDE1234F",
    gstNumber: "29ABCDE1234F1Z5",
    rating: 4.8,
    totalReviews: 342,
    patientsServed: 1250,
    avatar: user.avatar || "https://i.pravatar.cc/150?img=33",
    role: "Doctor",
    permissions: ["view_patients", "create_prescription", "manage_appointments", "view_analytics"],
    department: "Cardiology",
    mciVerified: true,
    twoFactorEnabled: true
  };

  // Mock data
  const todayStats = {
    appointments: 12,
    completed: 8,
    pending: 4,
    revenue: 18500,
    avgConsultationTime: 28,
    patientSatisfaction: 4.7
  };

  const patients = [
    {
      id: 1,
      name: "Ramesh Patel",
      age: 45,
      gender: "Male",
      contact: "+91 98765 43210",
      bloodGroup: "O+",
      abhaId: "12-3456-7890-1234",
      lastVisit: "2025-01-10",
      diagnosis: "Hypertension",
      status: "Stable",
      avatar: "https://i.pravatar.cc/150?img=33",
      insurance: {
        provider: "Star Health",
        policyNumber: "STAR/2024/12345",
        validUntil: "2025-12-31",
        coverageAmount: "₹5,00,000"
      },
      vitals: {
        bp: "140/90",
        heartRate: 78,
        temperature: 98.6,
        weight: 75,
        height: 170,
        bmi: 25.9,
        spo2: 97
      },
      iotReadings: [
        { device: "BP Monitor", reading: "138/88", timestamp: "2025-01-12 09:30 AM" },
        { device: "Glucose Monitor", reading: "110 mg/dL", timestamp: "2025-01-12 08:00 AM" }
      ],
      medicalHistory: [
        { date: "2025-01-10", diagnosis: "Hypertension", prescription: "Amlodipine 5mg", doctor: "Dr. Rajesh Kumar" },
        { date: "2024-12-15", diagnosis: "Routine Checkup", prescription: "Multivitamins", doctor: "Dr. Rajesh Kumar" }
      ],
      reports: [
        { name: "Blood Test Report", date: "2025-01-10", type: "Lab", uploadedBy: "Lab Technician", fileUrl: "#" },
        { name: "ECG Report", date: "2024-12-15", type: "Diagnostic", uploadedBy: "Dr. Rajesh Kumar", fileUrl: "#" }
      ],
      visits: 8,
      lastPrescription: "Amlodipine 5mg, Take once daily after breakfast"
    },
    {
      id: 2,
      name: "Anjali Verma",
      age: 32,
      gender: "Female",
      contact: "+91 98765 43211",
      bloodGroup: "A+",
      abhaId: "12-3456-7890-5678",
      lastVisit: "2025-01-11",
      diagnosis: "Migraine",
      status: "Improving",
      avatar: "https://i.pravatar.cc/150?img=45",
      insurance: {
        provider: "HDFC Ergo",
        policyNumber: "HDFC/2024/67890",
        validUntil: "2025-11-30",
        coverageAmount: "₹3,00,000"
      },
      vitals: {
        bp: "120/80",
        heartRate: 72,
        temperature: 98.4,
        weight: 58,
        height: 162,
        bmi: 22.1,
        spo2: 98
      },
      iotReadings: [],
      medicalHistory: [
        { date: "2025-01-11", diagnosis: "Migraine", prescription: "Sumatriptan 50mg", doctor: "Dr. Rajesh Kumar" }
      ],
      reports: [
        { name: "MRI Scan", date: "2025-01-11", type: "Imaging", uploadedBy: "Radiology Dept", fileUrl: "#" }
      ],
      visits: 3,
      lastPrescription: "Sumatriptan 50mg, Take when needed"
    },
    {
      id: 3,
      name: "Suresh Kumar",
      age: 58,
      gender: "Male",
      contact: "+91 98765 43212",
      bloodGroup: "B+",
      abhaId: "12-3456-7890-9012",
      lastVisit: "2025-01-09",
      diagnosis: "Diabetes Type 2",
      status: "Monitoring",
      avatar: "https://i.pravatar.cc/150?img=51",
      insurance: null,
      vitals: {
        bp: "135/85",
        heartRate: 82,
        temperature: 98.6,
        weight: 82,
        height: 175,
        bmi: 26.8,
        spo2: 96
      },
      iotReadings: [
        { device: "Glucose Monitor", reading: "145 mg/dL", timestamp: "2025-01-12 07:30 AM" },
        { device: "Glucose Monitor", reading: "128 mg/dL", timestamp: "2025-01-11 07:30 AM" }
      ],
      medicalHistory: [
        { date: "2025-01-09", diagnosis: "Diabetes Type 2", prescription: "Metformin 500mg", doctor: "Dr. Rajesh Kumar" }
      ],
      reports: [
        { name: "HbA1c Test", date: "2025-01-09", type: "Lab", uploadedBy: "Thyrocare", fileUrl: "#" }
      ],
      visits: 12,
      lastPrescription: "Metformin 500mg, Take twice daily with meals"
    }
  ];

  const todayAppointments = [
    {
      id: 1,
      patient: "Ramesh Patel",
      patientId: 1,
      age: 45,
      time: "10:00 AM",
      duration: 30,
      type: "Video",
      status: "Waiting",
      avatar: "https://i.pravatar.cc/150?img=33",
      fee: 500,
      symptoms: "Chest pain, shortness of breath",
      department: "Cardiology",
      service: "Follow-up Consultation",
      bookingDate: "2025-01-10",
      aiSummary: {
        chiefComplaint: "Chest discomfort for 2 days",
        symptoms: ["Chest pain", "Shortness of breath", "Mild fatigue"],
        riskLevel: "Medium",
        suggestedTests: ["ECG", "Cardiac Enzymes"],
        preliminaryDiagnosis: "Possible Angina - Requires ECG"
      }
    },
    {
      id: 2,
      patient: "Anjali Verma",
      patientId: 2,
      age: 32,
      time: "10:30 AM",
      duration: 30,
      type: "In-Person",
      status: "Confirmed",
      avatar: "https://i.pravatar.cc/150?img=45",
      fee: 800,
      symptoms: "Severe headache, nausea",
      department: "Neurology",
      service: "New Consultation",
      bookingDate: "2025-01-11",
      aiSummary: {
        chiefComplaint: "Recurring migraine episodes",
        symptoms: ["Severe headache", "Nausea", "Light sensitivity"],
        riskLevel: "Low",
        suggestedTests: ["MRI Brain"],
        preliminaryDiagnosis: "Migraine with Aura"
      }
    },
    {
      id: 3,
      patient: "Suresh Kumar",
      patientId: 3,
      age: 58,
      time: "11:00 AM",
      duration: 30,
      type: "Video",
      status: "Confirmed",
      avatar: "https://i.pravatar.cc/150?img=51",
      fee: 500,
      symptoms: "High blood sugar levels",
      department: "Endocrinology",
      service: "Follow-up Consultation",
      bookingDate: "2025-01-09",
      aiSummary: {
        chiefComplaint: "Uncontrolled diabetes",
        symptoms: ["High blood sugar", "Frequent urination", "Increased thirst"],
        riskLevel: "High",
        suggestedTests: ["HbA1c", "Fasting Blood Sugar", "Kidney Function"],
        preliminaryDiagnosis: "Uncontrolled Type 2 Diabetes"
      }
    },
    {
      id: 4,
      patient: "Priya Sharma",
      patientId: 4,
      age: 28,
      time: "11:30 AM",
      duration: 30,
      type: "In-Person",
      status: "Confirmed",
      avatar: "https://i.pravatar.cc/150?img=26",
      fee: 800,
      symptoms: "Fever, body ache",
      department: "General Medicine",
      service: "New Consultation",
      bookingDate: "2025-01-12",
      aiSummary: {
        chiefComplaint: "Fever for 3 days",
        symptoms: ["Fever (101°F)", "Body ache", "Headache"],
        riskLevel: "Low",
        suggestedTests: ["Complete Blood Count", "Dengue NS1"],
        preliminaryDiagnosis: "Viral Fever - Rule out Dengue"
      }
    }
  ];

  const upcomingAppointments = [
    { date: "2025-01-13", count: 15 },
    { date: "2025-01-14", count: 10 },
    { date: "2025-01-15", count: 12 }
  ];

  const revenueData = [
    { name: "Mon", amount: 2400 },
    { name: "Tue", amount: 1800 },
    { name: "Wed", amount: 3200 },
    { name: "Thu", amount: 2800 },
    { name: "Fri", amount: 3500 },
    { name: "Sat", amount: 4200 },
    { name: "Sun", amount: 1900 }
  ];

  const monthlyEarningsData = [
    { month: "Jan", earnings: 45000, consultations: 75 },
    { month: "Feb", earnings: 52000, consultations: 87 },
    { month: "Mar", earnings: 48000, consultations: 80 },
    { month: "Apr", earnings: 61000, consultations: 102 },
    { month: "May", earnings: 55000, consultations: 92 },
    { month: "Jun", earnings: 67000, consultations: 112 }
  ];

  const patientDistribution = [
    { name: "New Patients", value: 35, color: "#ec4899" },
    { name: "Follow-ups", value: 45, color: "#8b5cf6" },
    { name: "Urgent Care", value: 20, color: "#f59e0b" }
  ];

  const treatmentOutcomes = [
    { outcome: "Fully Recovered", value: 65, color: "#10b981" },
    { outcome: "Improving", value: 25, color: "#3b82f6" },
    { outcome: "Ongoing Treatment", value: 10, color: "#f59e0b" }
  ];

  const notifications = [
    { id: 1, type: "appointment", message: "New appointment request from Ramesh Patel", time: "5 mins ago", read: false, priority: "high" },
    { id: 2, type: "message", message: "Patient Anjali Verma sent you a message", time: "15 mins ago", read: false, priority: "medium" },
    { id: 3, type: "admin", message: "System maintenance scheduled for tonight", time: "1 hour ago", read: true, priority: "low" },
    { id: 4, type: "review", message: "New review from Suresh Kumar (5 stars)", time: "2 hours ago", read: true, priority: "low" },
    { id: 5, type: "lab", message: "Lab report ready for Ramesh Patel", time: "3 hours ago", read: false, priority: "high" },
    { id: 6, type: "iot", message: "Abnormal BP reading for Suresh Kumar", time: "4 hours ago", read: false, priority: "critical" }
  ];

  const reviews = [
    {
      id: 1,
      patient: "Ramesh Patel",
      rating: 5,
      comment: "Excellent doctor! Very patient and explains everything clearly.",
      date: "2025-01-10",
      avatar: "https://i.pravatar.cc/150?img=33"
    },
    {
      id: 2,
      patient: "Anjali Verma",
      rating: 5,
      comment: "Highly recommended. Quick diagnosis and effective treatment.",
      date: "2025-01-09",
      avatar: "https://i.pravatar.cc/150?img=45"
    },
    {
      id: 3,
      patient: "Priya Sharma",
      rating: 4,
      comment: "Good experience overall. Would visit again.",
      date: "2025-01-08",
      avatar: "https://i.pravatar.cc/150?img=26"
    }
  ];

  const weeklySchedule = {
    Monday: [
      { time: "09:00 AM - 10:00 AM", mode: "Online", booked: true, patient: "Ramesh Patel" },
      { time: "10:00 AM - 11:00 AM", mode: "Online", booked: true, patient: "Anjali Verma" },
      { time: "11:00 AM - 12:00 PM", mode: "In-clinic", booked: false, patient: null },
      { time: "02:00 PM - 03:00 PM", mode: "In-clinic", booked: true, patient: "Suresh Kumar" },
      { time: "03:00 PM - 04:00 PM", mode: "In-clinic", booked: false, patient: null }
    ],
    Tuesday: [
      { time: "09:00 AM - 10:00 AM", mode: "Online", booked: false, patient: null },
      { time: "10:00 AM - 11:00 AM", mode: "Online", booked: true, patient: "Priya Sharma" },
      { time: "11:00 AM - 12:00 PM", mode: "In-clinic", booked: true, patient: "Ramesh Patel" }
    ]
  };

  const clinics = [
    {
      id: 1,
      name: "Kumar Heart Care Clinic",
      address: "123, MG Road, Bangalore",
      type: "Primary",
      workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      department: "Cardiology"
    },
    {
      id: 2,
      name: "City Hospital",
      address: "456, Brigade Road, Bangalore",
      type: "Visiting",
      workingDays: ["Wed", "Sat"],
      department: "General Medicine"
    }
  ];

  const diseaseAnalytics = [
    { disease: "Hypertension", count: 45, percentage: 30, recovered: 28, ongoing: 17 },
    { disease: "Diabetes", count: 38, percentage: 25, recovered: 20, ongoing: 18 },
    { disease: "Heart Disease", count: 30, percentage: 20, recovered: 18, ongoing: 12 },
    { disease: "Respiratory", count: 22, percentage: 15, recovered: 15, ongoing: 7 },
    { disease: "Others", count: 15, percentage: 10, recovered: 10, ongoing: 5 }
  ];

  const regionAnalytics = [
    { region: "Bangalore North", patients: 85 },
    { region: "Bangalore South", patients: 72 },
    { region: "Bangalore East", patients: 58 },
    { region: "Bangalore West", patients: 45 }
  ];

  const medicineInventory = [
    { id: 1, name: "Amlodipine 5mg", quantity: 150, minStock: 50, expiry: "2026-12-31", status: "In Stock", manufacturer: "Cipla", batchNo: "AM5-2024-001" },
    { id: 2, name: "Metformin 500mg", quantity: 35, minStock: 50, expiry: "2026-08-15", status: "Low Stock", manufacturer: "Sun Pharma", batchNo: "MF5-2024-002" },
    { id: 3, name: "Aspirin 75mg", quantity: 200, minStock: 100, expiry: "2027-03-20", status: "In Stock", manufacturer: "Dr. Reddy's", batchNo: "AS7-2024-003" },
    { id: 4, name: "Paracetamol 500mg", quantity: 15, minStock: 50, expiry: "2026-06-10", status: "Critical", manufacturer: "Mankind", batchNo: "PC5-2024-004" }
  ];

  const transactions = [
    { id: 1, date: "2025-01-12", patient: "Ramesh Patel", amount: 500, type: "Consultation", status: "Completed", paymentMethod: "UPI", transactionId: "TXN12345", invoice: "INV-001" },
    { id: 2, date: "2025-01-12", patient: "Anjali Verma", amount: 800, type: "Consultation", status: "Completed", paymentMethod: "Card", transactionId: "TXN12346", invoice: "INV-002" },
    { id: 3, date: "2025-01-11", patient: "Suresh Kumar", amount: 500, type: "Consultation", status: "Completed", paymentMethod: "Cash", transactionId: "TXN12347", invoice: "INV-003" },
    { id: 4, date: "2025-01-11", patient: "Priya Sharma", amount: 800, type: "Consultation", status: "Pending", paymentMethod: "UPI", transactionId: "TXN12348", invoice: "INV-004" }
  ];

  const telemedicineSessions = [
    { id: 1, patient: "Ramesh Patel", date: "2025-01-10", duration: "28 mins", status: "Completed", recording: true, notes: "Follow-up for BP management" },
    { id: 2, patient: "Suresh Kumar", date: "2025-01-09", duration: "32 mins", status: "Completed", recording: true, notes: "Diabetes management consultation" }
  ];

  const aiPredictions = [
    {
      patient: "Ramesh Patel",
      condition: "Hypertension",
      riskLevel: "Medium",
      riskScore: 65,
      predictedOutcome: "Stable with medication",
      recommendations: ["Continue current medication", "Monitor BP daily", "Reduce salt intake", "Regular exercise"]
    },
    {
      patient: "Suresh Kumar",
      condition: "Diabetes Type 2",
      riskLevel: "High",
      riskScore: 78,
      predictedOutcome: "Requires medication adjustment",
      recommendations: ["Increase Metformin dosage", "Diet modification", "Regular HbA1c monitoring", "Foot care"]
    }
  ];

  const pharmacyPartners = [
    { id: 1, name: "Apollo Pharmacy", status: "Active", ordersProcessed: 45, avgDeliveryTime: "2 hours" },
    { id: 2, name: "MedPlus", status: "Active", ordersProcessed: 32, avgDeliveryTime: "3 hours" },
    { id: 3, name: "1mg", status: "Active", ordersProcessed: 28, avgDeliveryTime: "4 hours" }
  ];

  const labPartners = [
    { id: 1, name: "Thyrocare", status: "Active", testsOrdered: 65, avgTurnaround: "24 hours" },
    { id: 2, name: "Dr. Lal PathLabs", status: "Active", testsOrdered: 52, avgTurnaround: "36 hours" },
    { id: 3, name: "Metropolis", status: "Active", testsOrdered: 38, avgTurnaround: "48 hours" }
  ];

  const voiceCommands = [
    { command: "Open patient record", timestamp: "2025-01-12 10:15 AM", status: "Success" },
    { command: "Generate prescription", timestamp: "2025-01-12 10:30 AM", status: "Success" },
    { command: "Schedule appointment", timestamp: "2025-01-12 11:00 AM", status: "Success" }
  ];

  const auditLogs = [
    { action: "Login", user: "Dr. Rajesh Kumar", timestamp: "2025-01-12 09:00 AM", ipAddress: "192.168.1.1", status: "Success" },
    { action: "View Patient Record", user: "Dr. Rajesh Kumar", timestamp: "2025-01-12 09:15 AM", ipAddress: "192.168.1.1", status: "Success", details: "Patient: Ramesh Patel" },
    { action: "Create Prescription", user: "Dr. Rajesh Kumar", timestamp: "2025-01-12 09:30 AM", ipAddress: "192.168.1.1", status: "Success", details: "Patient: Ramesh Patel" },
    { action: "Failed Login Attempt", user: "Unknown", timestamp: "2025-01-12 08:45 AM", ipAddress: "192.168.1.25", status: "Failed" }
  ];

  const departments = [
    { id: 1, name: "Cardiology", head: "Dr. Rajesh Kumar", doctors: 5, patients: 120, avgFee: 800 },
    { id: 2, name: "Neurology", head: "Dr. Priya Sharma", doctors: 3, patients: 85, avgFee: 1000 },
    { id: 3, name: "Orthopedics", head: "Dr. Amit Patel", doctors: 4, patients: 95, avgFee: 900 }
  ];

  const roles = [
    { role: "Admin", users: 2, permissions: ["all"] },
    { role: "Doctor", users: 15, permissions: ["view_patients", "create_prescription", "manage_appointments"] },
    { role: "Nurse", users: 25, permissions: ["view_patients", "record_vitals"] },
    { role: "Receptionist", users: 8, permissions: ["manage_appointments", "view_schedule"] }
  ];

  const timeManagement = [
    { activity: "Consultations", hours: 6.5, percentage: 65 },
    { activity: "Documentation", hours: 1.5, percentage: 15 },
    { activity: "Administrative", hours: 1.0, percentage: 10 },
    { activity: "Breaks", hours: 1.0, percentage: 10 }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.contact.includes(searchQuery) ||
    patient.id.toString().includes(searchQuery) ||
    (patient.abhaId && patient.abhaId.includes(searchQuery))
  );

  const handleVoiceCommand = () => {
    if ('speechRecognition' in window || 'webkitSpeechRecognition' in window) {
      alert("Voice command activated. Say your command...");
    } else {
      alert("Voice recognition not supported in your browser");
    }
  };

  const handleTextToSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl">E-Clinic</span>
              </div>
              <nav className="hidden lg:flex gap-1">
                {[
                  { id: "dashboard", label: t.dashboard, icon: BarChart3 },
                  { id: "appointments", label: t.appointments, icon: Calendar },
                  { id: "patients", label: t.patients, icon: Users },
                  { id: "prescriptions", label: t.prescriptions, icon: Pill },
                  { id: "analytics", label: t.analytics, icon: TrendingUp }
                ].map(tab => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "secondary" : "ghost"}
                    onClick={() => setActiveTab(tab.id)}
                    className="text-sm"
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </Button>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              >
                <Languages className="w-4 h-4 mr-2" />
                {language === "en" ? "हिंदी" : "English"}
              </Button>

              {/* Voice Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setVoiceEnabled(!voiceEnabled);
                  handleTextToSpeech(voiceEnabled ? "Voice disabled" : "Voice enabled");
                }}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>

              <Button variant="ghost" size="icon" onClick={() => setActiveTab("notifications")}>
                <div className="relative">
                  <Bell className="w-5 h-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </div>
              </Button>

              <Button variant="ghost" size="icon" onClick={() => setActiveTab("messages")}>
                <MessageSquare className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={doctorProfile.avatar} alt={doctorProfile.fullName} />
                  <AvatarFallback>{doctorProfile.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm">{doctorProfile.fullName}</p>
                  <p className="text-xs text-muted-foreground">{doctorProfile.specializations[0]}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setActiveTab("settings")}>
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl mb-2">{language === "en" ? "Welcome back," : "स्वागत है,"} {doctorProfile.fullName}</h1>
                <p className="text-muted-foreground">{language === "en" ? "Here's your practice overview for today" : "आज के लिए आपके अभ्यास का अवलोकन"}</p>
              </div>
              {voiceEnabled && (
                <Button onClick={handleVoiceCommand}>
                  <Mic className="w-4 h-4 mr-2" />
                  {language === "en" ? "Voice Command" : "आवाज कमांड"}
                </Button>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.todayAppointments}</p>
                    <p className="text-3xl mt-1">{todayStats.appointments}</p>
                    <p className="text-sm text-green-600 mt-1">+3 from yesterday</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.completed}</p>
                    <p className="text-3xl mt-1">{todayStats.completed}</p>
                    <p className="text-sm text-muted-foreground mt-1">{todayStats.pending} {t.pending}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.todayEarnings}</p>
                    <p className="text-3xl mt-1">₹{todayStats.revenue.toLocaleString()}</p>
                    <p className="text-sm text-green-600 mt-1">+12% from avg</p>
                  </div>
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-pink-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Consult Time</p>
                    <p className="text-3xl mt-1">{todayStats.avgConsultationTime}m</p>
                    <p className="text-sm text-blue-600 mt-1">Efficiency: {todayStats.patientSatisfaction}/5</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Security Status Banner */}
            {doctorProfile.twoFactorEnabled && (
              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium text-green-900">Account Secured</p>
                    <p className="text-sm text-green-700">Two-factor authentication is enabled • MCI Verified ✓</p>
                  </div>
                  <Badge className="bg-green-600">Secure</Badge>
                </div>
              </Card>
            )}

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="mb-4">Weekly Revenue & Consultations</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="amount" stroke="#ec4899" fill="#ec4899" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4">Patient Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={patientDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {patientDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Today's Appointments with AI Summary */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl">{t.todayAppointments}</h2>
                <div className="flex gap-2">
                  <Badge>{todayAppointments.length} appointments</Badge>
                  <Button variant="outline" size="sm" onClick={() => setShowAIAssistant(!showAIAssistant)}>
                    <Brain className="w-4 h-4 mr-2" />
                    AI Assistant
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id}>
                    <Card className="p-4 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={appointment.avatar} alt={appointment.patient} />
                            <AvatarFallback>{appointment.patient.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{appointment.patient}</p>
                            <p className="text-sm text-muted-foreground">
                              {appointment.age} years • {appointment.time} ({appointment.duration}min) • {appointment.type}
                            </p>
                            <p className="text-sm text-muted-foreground">{appointment.symptoms}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="font-medium">₹{appointment.fee}</p>
                            <Badge className={
                              appointment.aiSummary.riskLevel === "High" ? "bg-red-100 text-red-700" :
                              appointment.aiSummary.riskLevel === "Medium" ? "bg-orange-100 text-orange-700" :
                              "bg-green-100 text-green-700"
                            }>
                              {appointment.aiSummary.riskLevel} Risk
                            </Badge>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button size="sm" onClick={() => setSelectedAppointment(appointment)}>
                              <Brain className="w-4 h-4 mr-2" />
                              AI Summary
                            </Button>
                            {appointment.type === "Video" && (
                              <Button size="sm" variant="outline">
                                <Video className="w-4 h-4 mr-2" />
                                Start Call
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* AI Summary Panel */}
                    {selectedAppointment?.id === appointment.id && (
                      <Card className="mt-2 p-4 bg-blue-50 border-blue-200">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium flex items-center gap-2">
                            <Brain className="w-5 h-5 text-blue-600" />
                            AI Consultation Assistant
                          </h4>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedAppointment(null)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-blue-900">Chief Complaint</Label>
                            <p className="text-sm mt-1">{appointment.aiSummary.chiefComplaint}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-blue-900">Symptoms</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {appointment.aiSummary.symptoms.map((symptom, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">{symptom}</Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-blue-900">Preliminary Diagnosis</Label>
                            <p className="text-sm mt-1">{appointment.aiSummary.preliminaryDiagnosis}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-blue-900">Suggested Tests</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {appointment.aiSummary.suggestedTests.map((test, idx) => (
                                <Badge key={idx} className="bg-blue-600 text-xs">{test}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" onClick={() => {
                            const patient = patients.find(p => p.id === appointment.patientId);
                            setSelectedPatient(patient);
                            setActiveTab("patients");
                          }}>
                            <FileText className="w-4 h-4 mr-2" />
                            View Full History
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => {
                            setPrescriptionPatient(appointment);
                            setActiveTab("prescriptions");
                          }}>
                            <Pill className="w-4 h-4 mr-2" />
                            Generate Prescription
                          </Button>
                        </div>
                      </Card>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Access Cards */}
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => setActiveTab("iot-monitoring")}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg">IoT Monitoring</h3>
                  <Wifi className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-3xl mb-2">3</p>
                <p className="text-sm text-muted-foreground">Active devices connected</p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => setActiveTab("telemedicine")}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg">Telemedicine</h3>
                  <Video className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-3xl mb-2">{telemedicineSessions.length}</p>
                <p className="text-sm text-muted-foreground">Sessions this week</p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => setActiveTab("ai-predictions")}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg">AI Predictions</h3>
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-3xl mb-2">{aiPredictions.length}</p>
                <p className="text-sm text-muted-foreground">High-risk patients identified</p>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => setActiveTab("partners")}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg">Lab & Pharmacy</h3>
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-3xl mb-2">{pharmacyPartners.length + labPartners.length}</p>
                <p className="text-sm text-muted-foreground">Active partners</p>
              </Card>
            </div>
          </div>
        )}

        {/* Enhanced Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">Appointment Management</h2>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Appointment
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="today">
                <TabsList>
                  <TabsTrigger value="today">Today ({todayAppointments.length})</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>

                <TabsContent value="today" className="mt-6 space-y-4">
                  {todayAppointments.map((appointment) => (
                    <Card key={appointment.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={appointment.avatar} alt={appointment.patient} />
                            <AvatarFallback>{appointment.patient.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{appointment.patient}</p>
                            <p className="text-sm text-muted-foreground">
                              {appointment.time} • {appointment.department} • {appointment.service}
                            </p>
                            <p className="text-sm text-muted-foreground">Booked: {appointment.bookingDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge>{appointment.type}</Badge>
                          <Badge variant="secondary">{appointment.status}</Badge>
                          <Button variant="outline" size="sm">
                            <Repeat className="w-4 h-4 mr-2" />
                            Reschedule
                          </Button>
                          {appointment.type === "Video" && (
                            <Button size="sm">
                              <Video className="w-4 h-4 mr-2" />
                              Join
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="upcoming" className="mt-6">
                  <div className="space-y-4">
                    {upcomingAppointments.map((day, idx) => (
                      <Card key={idx} className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{day.date}</p>
                            <p className="text-sm text-muted-foreground">{day.count} appointments scheduled</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Schedule
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        )}

        {/* Enhanced Patients Tab with Full Access */}
        {activeTab === "patients" && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">Patient Data Access</h2>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add New Patient
                </Button>
              </div>

              {/* Search and Filter */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, ID, contact, or ABHA ID"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>

              {/* Patient List */}
              <div className="space-y-4">
                {filteredPatients.map((patient) => (
                  <Card key={patient.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={patient.avatar} alt={patient.name} />
                          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{patient.name}</p>
                            {patient.insurance && (
                              <Badge variant="outline" className="text-xs">
                                <Shield className="w-3 h-3 mr-1" />
                                Insured
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {patient.age} years • {patient.gender} • {patient.bloodGroup} • ABHA: {patient.abhaId}
                          </p>
                          <p className="text-sm text-muted-foreground">{patient.visits} visits • Last: {patient.lastVisit}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <Badge variant="secondary">{patient.status}</Badge>
                          <p className="text-sm text-muted-foreground mt-1">{patient.diagnosis}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Full Access
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Patient Detail with Full Access */}
            {selectedPatient && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl">Patient Details: {selectedPatient.name}</h2>
                  <Button variant="ghost" onClick={() => setSelectedPatient(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <Tabs defaultValue="summary">
                  <TabsList>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="history">Medical History</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                    <TabsTrigger value="vitals">Vitals</TabsTrigger>
                    <TabsTrigger value="iot">IoT Data</TabsTrigger>
                    <TabsTrigger value="insurance">Insurance</TabsTrigger>
                  </TabsList>

                  <TabsContent value="summary" className="mt-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-muted-foreground">Patient ID</Label>
                          <p className="font-medium">PAT-{selectedPatient.id.toString().padStart(5, '0')}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">ABHA ID</Label>
                          <p className="font-medium">{selectedPatient.abhaId}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Contact</Label>
                          <p className="font-medium">{selectedPatient.contact}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Blood Group</Label>
                          <p className="font-medium">{selectedPatient.bloodGroup}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-muted-foreground">Last Diagnosis</Label>
                          <p className="font-medium">{selectedPatient.diagnosis}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Status</Label>
                          <Badge>{selectedPatient.status}</Badge>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Last Visit</Label>
                          <p className="font-medium">{selectedPatient.lastVisit}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Total Visits</Label>
                          <p className="font-medium">{selectedPatient.visits}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="history" className="mt-4">
                    <div className="space-y-4">
                      {selectedPatient.medicalHistory.map((record: any, idx: number) => (
                        <Card key={idx} className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{record.diagnosis}</p>
                              <p className="text-sm text-muted-foreground">{record.date} • Dr. {record.doctor}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Prescription</p>
                              <p className="text-sm">{record.prescription}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="reports" className="mt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedPatient.reports.map((report: any, idx: number) => (
                        <Card key={idx} className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{report.name}</p>
                              <p className="text-sm text-muted-foreground">{report.date} • {report.type}</p>
                              <p className="text-xs text-muted-foreground">Uploaded by: {report.uploadedBy}</p>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                      <Card className="p-4 border-dashed hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center justify-center gap-3 h-full">
                          <Upload className="w-5 h-5 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Upload New Report</p>
                        </div>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="vitals" className="mt-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      {Object.entries(selectedPatient.vitals).map(([key, value]) => (
                        <Card key={key} className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              {key === 'bp' && <Activity className="w-5 h-5 text-purple-600" />}
                              {key === 'heartRate' && <Heart className="w-5 h-5 text-purple-600" />}
                              {key === 'temperature' && <Thermometer className="w-5 h-5 text-purple-600" />}
                              {key === 'weight' && <Users className="w-5 h-5 text-purple-600" />}
                              {key === 'height' && <Users className="w-5 h-5 text-purple-600" />}
                              {key === 'bmi' && <TrendingUp className="w-5 h-5 text-purple-600" />}
                              {key === 'spo2' && <Droplet className="w-5 h-5 text-purple-600" />}
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                              <p className="text-lg font-medium">{value}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="iot" className="mt-4">
                    <div className="space-y-4">
                      {selectedPatient.iotReadings.length > 0 ? (
                        selectedPatient.iotReadings.map((reading: any, idx: number) => (
                          <Card key={idx} className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                  <Wifi className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                  <p className="font-medium">{reading.device}</p>
                                  <p className="text-sm text-muted-foreground">{reading.timestamp}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-medium">{reading.reading}</p>
                                <Badge className="bg-green-600">Normal</Badge>
                              </div>
                            </div>
                          </Card>
                        ))
                      ) : (
                        <Card className="p-8 text-center">
                          <Wifi className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                          <p className="text-muted-foreground">No IoT devices connected</p>
                          <Button className="mt-4" variant="outline">
                            <Plus className="w-4 h-4 mr-2" />
                            Connect Device
                          </Button>
                        </Card>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="insurance" className="mt-4">
                    {selectedPatient.insurance ? (
                      <Card className="p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <Label className="text-muted-foreground">Insurance Provider</Label>
                            <p className="font-medium">{selectedPatient.insurance.provider}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Policy Number</Label>
                            <p className="font-medium">{selectedPatient.insurance.policyNumber}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Coverage Amount</Label>
                            <p className="font-medium">{selectedPatient.insurance.coverageAmount}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Valid Until</Label>
                            <p className="font-medium">{selectedPatient.insurance.validUntil}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-6">
                          <Button size="sm">
                            <FileCheck className="w-4 h-4 mr-2" />
                            Verify Coverage
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download Policy
                          </Button>
                        </div>
                      </Card>
                    ) : (
                      <Card className="p-8 text-center">
                        <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground">No insurance information available</p>
                        <Button className="mt-4" variant="outline">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Insurance Details
                        </Button>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              </Card>
            )}
          </div>
        )}

        {/* Enhanced Prescriptions Tab with AI Generation */}
        {activeTab === "prescriptions" && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">Automated Prescription Generator</h2>
                <Button onClick={() => setPrescriptionPatient({ name: "Select Patient" })}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Prescription
                </Button>
              </div>

              {prescriptionPatient && (
                <Card className="p-6 mb-6 border-pink-200 bg-pink-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg flex items-center gap-2">
                      <Brain className="w-5 h-5 text-pink-600" />
                      AI-Assisted Prescription
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => setPrescriptionPatient(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Patient Name</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select patient" />
                          </SelectTrigger>
                          <SelectContent>
                            {patients.map(patient => (
                              <SelectItem key={patient.id} value={patient.id.toString()}>
                                {patient.name} - {patient.age}y ({patient.diagnosis})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Date</Label>
                        <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                      </div>
                    </div>

                    <div>
                      <Label>Diagnosis</Label>
                      <Input placeholder="Enter diagnosis" />
                      <Button variant="outline" size="sm" className="mt-2">
                        <Brain className="w-4 h-4 mr-2" />
                        AI Suggest Diagnosis
                      </Button>
                    </div>

                    <div>
                      <Label>Clinical Notes & Observations</Label>
                      <Textarea placeholder="Enter clinical notes, examination findings, and observations" rows={3} />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Medicines</Label>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Brain className="w-4 h-4 mr-2" />
                            AI Suggest Medicines
                          </Button>
                          <Button variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Medicine
                          </Button>
                        </div>
                      </div>
                      <Card className="p-4">
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-4 gap-3">
                            <Select>
                              <SelectTrigger className="md:col-span-2">
                                <SelectValue placeholder="Search medicine" />
                              </SelectTrigger>
                              <SelectContent>
                                {medicineInventory.map(med => (
                                  <SelectItem key={med.id} value={med.name}>
                                    {med.name} ({med.quantity} in stock)
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Input placeholder="Dosage (e.g., 5mg)" />
                            <Input placeholder="Duration (e.g., 7 days)" />
                          </div>
                          <Textarea placeholder="Instructions (e.g., Take 1 tablet twice daily after food)" rows={2} />
                        </div>
                      </Card>
                    </div>

                    <div>
                      <Label>Lab Tests Recommended</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {["Complete Blood Count", "Lipid Profile", "HbA1c", "Kidney Function"].map((test, idx) => (
                          <Badge key={idx} variant="outline" className="cursor-pointer hover:bg-blue-100">
                            <Plus className="w-3 h-3 mr-1" />
                            {test}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>General Advice & Lifestyle Instructions</Label>
                      <Textarea placeholder="Dietary advice, exercise recommendations, lifestyle modifications" rows={3} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Follow-up Date</Label>
                        <Input type="date" />
                      </div>
                      <div>
                        <Label>Follow-up Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="video">Video Consultation</SelectItem>
                            <SelectItem value="clinic">In-Clinic Visit</SelectItem>
                            <SelectItem value="phone">Phone Call</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1">
                        <Printer className="w-4 h-4 mr-2" />
                        Generate PDF & Print
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Send className="w-4 h-4 mr-2" />
                        Send to Patient (SMS/Email)
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Package className="w-4 h-4 mr-2" />
                        Send to Pharmacy
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className="space-y-3">
                <h3 className="mb-4">Recent Prescriptions</h3>
                {[
                  { id: 1, patient: "Ramesh Patel", date: "2025-01-12", diagnosis: "Hypertension", medicines: 3, status: "Sent" },
                  { id: 2, patient: "Anjali Verma", date: "2025-01-11", diagnosis: "Migraine", medicines: 2, status: "Sent" },
                  { id: 3, patient: "Suresh Kumar", date: "2025-01-10", diagnosis: "Diabetes Type 2", medicines: 4, status: "Pending" }
                ].map(prescription => (
                  <Card key={prescription.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{prescription.patient}</p>
                        <p className="text-sm text-muted-foreground">
                          {prescription.date} • {prescription.diagnosis}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">{prescription.medicines} medicines</Badge>
                        <Badge className={prescription.status === "Sent" ? "bg-green-600" : "bg-orange-600"}>
                          {prescription.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Analytics Dashboard with Enhanced Insights */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl mb-6">Analytics Dashboard - Practice Insights</h2>

              {/* Key Metrics */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100">
                  <p className="text-sm text-muted-foreground mb-1">Total Patients</p>
                  <p className="text-3xl mb-1">{doctorProfile.patientsServed}</p>
                  <p className="text-sm text-green-600">+45 this month</p>
                </Card>
                <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100">
                  <p className="text-sm text-muted-foreground mb-1">Success Rate</p>
                  <p className="text-3xl mb-1">94%</p>
                  <p className="text-sm text-green-600">Treatment outcomes</p>
                </Card>
                <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100">
                  <p className="text-sm text-muted-foreground mb-1">Avg Consultation</p>
                  <p className="text-3xl mb-1">{todayStats.avgConsultationTime}m</p>
                  <p className="text-sm text-blue-600">Time management</p>
                </Card>
                <Card className="p-4 bg-gradient-to-br from-pink-50 to-pink-100">
                  <p className="text-sm text-muted-foreground mb-1">Patient Satisfaction</p>
                  <p className="text-3xl mb-1">{doctorProfile.rating}/5</p>
                  <p className="text-sm text-green-600">{doctorProfile.totalReviews} reviews</p>
                </Card>
              </div>

              <Tabs defaultValue="trends">
                <TabsList>
                  <TabsTrigger value="trends">Patient Trends</TabsTrigger>
                  <TabsTrigger value="outcomes">Treatment Outcomes</TabsTrigger>
                  <TabsTrigger value="diseases">Disease Analytics</TabsTrigger>
                  <TabsTrigger value="time">Time Management</TabsTrigger>
                  <TabsTrigger value="regions">Regional Data</TabsTrigger>
                </TabsList>

                <TabsContent value="trends" className="mt-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h3 className="mb-4">Monthly Consultation Trends</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyEarningsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="consultations" stroke="#ec4899" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </Card>

                    <Card className="p-6">
                      <h3 className="mb-4">Revenue vs Consultations</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyEarningsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="earnings" fill="#8b5cf6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="outcomes" className="mt-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h3 className="mb-4">Treatment Outcomes Distribution</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={treatmentOutcomes}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(entry) => `${entry.outcome}: ${entry.value}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {treatmentOutcomes.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </Card>

                    <Card className="p-6">
                      <h3 className="mb-4">Outcome by Disease</h3>
                      <div className="space-y-4">
                        {diseaseAnalytics.map((disease, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium">{disease.disease}</span>
                              <span className="text-sm text-muted-foreground">
                                {disease.recovered}/{disease.count} recovered
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-green-600" 
                                  style={{ width: `${(disease.recovered / disease.count) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm w-12 text-right">
                                {Math.round((disease.recovered / disease.count) * 100)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="diseases" className="mt-6">
                  <Card className="p-6">
                    <h3 className="mb-4">Disease Distribution & Statistics</h3>
                    <div className="space-y-4">
                      {diseaseAnalytics.map((disease, idx) => (
                        <Card key={idx} className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{disease.disease}</h4>
                            <Badge>{disease.count} patients</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Total Cases</p>
                              <p className="font-medium">{disease.count}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Recovered</p>
                              <p className="font-medium text-green-600">{disease.recovered}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Ongoing</p>
                              <p className="font-medium text-orange-600">{disease.ongoing}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="time" className="mt-6">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <Card className="p-6">
                      <h3 className="mb-4">Time Allocation</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={timeManagement}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(entry) => `${entry.activity}: ${entry.hours}h`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="hours"
                          >
                            {timeManagement.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={patientDistribution[index % patientDistribution.length].color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </Card>

                    <Card className="p-6">
                      <h3 className="mb-4">Efficiency Metrics</h3>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Consultation Efficiency</span>
                            <span className="text-sm font-medium">85%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-600" style={{ width: '85%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Documentation Speed</span>
                            <span className="text-sm font-medium">92%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600" style={{ width: '92%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Patient Satisfaction</span>
                            <span className="text-sm font-medium">96%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-600" style={{ width: '96%' }} />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="regions" className="mt-6">
                  <Card className="p-6">
                    <h3 className="mb-4">Patients by Region</h3>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={regionAnalytics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="region" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="patients" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        )}

        {/* Continue in next message due to character limit... */}
      </main>
    </div>
  );
}
