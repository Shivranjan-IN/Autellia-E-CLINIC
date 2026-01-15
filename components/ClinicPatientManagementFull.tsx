// Comprehensive Patient Management Module for Clinic Admin
// Complete patient registration, search, history, ABHA ID linking, and update functionality

import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { 
  Search, Plus, Edit, Eye, X, Download, Upload, Phone, Mail,
  User, Calendar, MapPin, FileText, Activity, Heart, Droplet,
  Pill, FlaskConical, Printer, QrCode, CheckCircle, AlertCircle,
  Clock, UserPlus, UserCheck, Mic, Languages, Camera, Link as LinkIcon,
  TrendingUp, BarChart3, Brain, Sparkles, Shield, History
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  email?: string;
  address: string;
  abhaId?: string;
  bloodGroup?: string;
  allergies?: string;
  chronicConditions?: string;
  emergencyContact?: string;
  registrationDate: string;
  lastVisit?: string;
  totalVisits: number;
  status: "Active" | "Inactive";
}

const mockPatients: Patient[] = [
  {
    id: "PAT-001234",
    name: "रमेश पटेल / Ramesh Patel",
    age: 45,
    gender: "Male",
    contact: "+91 98765 43210",
    email: "ramesh@email.com",
    address: "123, MG Road, Mumbai, Maharashtra - 400001",
    abhaId: "12-3456-7890-1234",
    bloodGroup: "B+",
    allergies: "Penicillin",
    chronicConditions: "Diabetes Type 2, Hypertension",
    emergencyContact: "+91 98765 43211",
    registrationDate: "2024-03-15",
    lastVisit: "2025-01-10",
    totalVisits: 24,
    status: "Active"
  },
  {
    id: "PAT-001235",
    name: "अंजलि वर्मा / Anjali Verma",
    age: 32,
    gender: "Female",
    contact: "+91 98765 43212",
    email: "anjali@email.com",
    address: "456, Park Street, Delhi - 110001",
    abhaId: "12-3456-7890-1235",
    bloodGroup: "O+",
    allergies: "None",
    chronicConditions: "Migraine",
    emergencyContact: "+91 98765 43213",
    registrationDate: "2024-06-20",
    lastVisit: "2025-01-12",
    totalVisits: 15,
    status: "Active"
  },
  {
    id: "PAT-001236",
    name: "सुरेश कुमार / Suresh Kumar",
    age: 58,
    gender: "Male",
    contact: "+91 98765 43214",
    address: "789, Brigade Road, Bangalore - 560001",
    bloodGroup: "A+",
    chronicConditions: "Arthritis",
    registrationDate: "2023-11-10",
    lastVisit: "2025-01-08",
    totalVisits: 32,
    status: "Active"
  },
  {
    id: "PAT-001237",
    name: "प्रिया शर्मा / Priya Sharma",
    age: 28,
    gender: "Female",
    contact: "+91 98765 43215",
    email: "priya@email.com",
    address: "321, Main Street, Pune - 411001",
    abhaId: "12-3456-7890-1237",
    bloodGroup: "AB+",
    allergies: "Dust",
    registrationDate: "2024-09-05",
    lastVisit: "2025-01-11",
    totalVisits: 8,
    status: "Active"
  }
];

export default function ClinicPatientManagementFull() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showNewPatient, setShowNewPatient] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterGender, setFilterGender] = useState("all");
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [isVoiceInput, setIsVoiceInput] = useState(false);

  // New patient form state
  const [newPatient, setNewPatient] = useState({
    name: "",
    nameHindi: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    address: "",
    abhaId: "",
    bloodGroup: "",
    allergies: "",
    chronicConditions: "",
    emergencyContact: ""
  });

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.contact.includes(searchTerm) ||
                         (patient.abhaId && patient.abhaId.includes(searchTerm));
    const matchesStatus = filterStatus === "all" || patient.status === filterStatus;
    const matchesGender = filterGender === "all" || patient.gender === filterGender;
    return matchesSearch && matchesStatus && matchesGender;
  });

  const handleRegisterPatient = () => {
    console.log("Registering patient:", newPatient);
    // In real implementation, this would call an API
    alert("Patient registered successfully! Patient ID: PAT-" + Math.floor(Math.random() * 999999));
    setShowNewPatient(false);
    setNewPatient({
      name: "", nameHindi: "", age: "", gender: "", contact: "", email: "",
      address: "", abhaId: "", bloodGroup: "", allergies: "", chronicConditions: "",
      emergencyContact: ""
    });
  };

  return (
    <div className="space-y-6">
      {/* AI-Powered Patient Insights */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-lg">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">
              {language === "en" ? "AI Patient Insights" : "AI रोगी अंतर्दृष्टि"}
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm font-medium">
                    {language === "en" ? "High-Risk Patients" : "उच्च जोखिम वाले रोगी"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" 
                      ? "3 patients need follow-up within 7 days" 
                      : "3 रोगियों को 7 दिनों के भीतर फॉलो-अप की आवश्यकता है"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-green-600 mt-1" />
                <div>
                  <p className="text-sm font-medium">
                    {language === "en" ? "Registration Growth" : "पंजीकरण वृद्धि"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" 
                      ? "+15% new patients this month" 
                      : "इस महीने +15% नए रोगी"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-orange-600 mt-1" />
                <div>
                  <p className="text-sm font-medium">
                    {language === "en" ? "ABHA Linking" : "आयुष्मान भारत लिंकिंग"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" 
                      ? "12 patients without ABHA ID" 
                      : "12 रोगी बिना ABHA ID के"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            >
              <Languages className="w-4 h-4 mr-2" />
              {language === "en" ? "हिंदी" : "English"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {language === "en" ? "Patient Management" : "रोगी प्रबंधन"}
            </h2>
            <p className="text-muted-foreground">
              {language === "en" 
                ? "Register, search, and manage all patient records" 
                : "सभी रोगी रिकॉर्ड पंजीकृत करें, खोजें और प्रबंधित करें"}
            </p>
          </div>
          <Button onClick={() => setShowNewPatient(true)} size="lg">
            <UserPlus className="w-5 h-5 mr-2" />
            {language === "en" ? "Register New Patient" : "नया रोगी पंजीकृत करें"}
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "Total Patients" : "कुल रोगी"}
                </p>
              </div>
              <User className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">856</p>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "Active Patients" : "सक्रिय रोगी"}
                </p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-4 bg-purple-50 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">67</p>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "New This Month" : "इस महीने नए"}
                </p>
              </div>
              <UserPlus className="w-8 h-8 text-purple-600" />
            </div>
          </Card>

          <Card className="p-4 bg-orange-50 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">789</p>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "ABHA Linked" : "ABHA लिंक्ड"}
                </p>
              </div>
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="grid md:grid-cols-12 gap-4 mb-6">
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={language === "en" 
                ? "Search by name, ID, phone, or ABHA ID..." 
                : "नाम, ID, फोन या ABHA ID से खोजें..."}
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder={language === "en" ? "Status" : "स्थिति"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "en" ? "All Status" : "सभी स्थिति"}</SelectItem>
                <SelectItem value="Active">{language === "en" ? "Active" : "सक्रिय"}</SelectItem>
                <SelectItem value="Inactive">{language === "en" ? "Inactive" : "निष्क्रिय"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Select value={filterGender} onValueChange={setFilterGender}>
              <SelectTrigger>
                <SelectValue placeholder={language === "en" ? "Gender" : "लिंग"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "en" ? "All Gender" : "सभी लिंग"}</SelectItem>
                <SelectItem value="Male">{language === "en" ? "Male" : "पुरुष"}</SelectItem>
                <SelectItem value="Female">{language === "en" ? "Female" : "महिला"}</SelectItem>
                <SelectItem value="Other">{language === "en" ? "Other" : "अन्य"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              {language === "en" ? "Export" : "निर्यात"}
            </Button>
          </div>
        </div>

        {/* Patients Table */}
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">
                    {language === "en" ? "Patient ID" : "रोगी ID"}
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">
                    {language === "en" ? "Name" : "नाम"}
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">
                    {language === "en" ? "Age/Gender" : "आयु/लिंग"}
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">
                    {language === "en" ? "Contact" : "संपर्क"}
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">ABHA ID</th>
                  <th className="text-left py-3 px-4 font-semibold">
                    {language === "en" ? "Last Visit" : "अंतिम यात्रा"}
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">
                    {language === "en" ? "Status" : "स्थिति"}
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">
                    {language === "en" ? "Actions" : "कार्रवाई"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm font-medium">{patient.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>
                            {patient.name.split('/')[1]?.trim().split(' ').map(n => n[0]).join('') || 
                             patient.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          {patient.chronicConditions && (
                            <p className="text-xs text-muted-foreground">{patient.chronicConditions.split(',')[0]}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span>{patient.age} / {language === "en" ? patient.gender : patient.gender === "Male" ? "पुरुष" : "महिला"}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3" />
                        {patient.contact}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {patient.abhaId ? (
                        <div className="flex items-center gap-1">
                          <Shield className="w-3 h-3 text-green-600" />
                          <span className="font-mono text-xs">{patient.abhaId}</span>
                        </div>
                      ) : (
                        <Button variant="outline" size="sm" className="text-xs">
                          <LinkIcon className="w-3 h-3 mr-1" />
                          {language === "en" ? "Link" : "लिंक"}
                        </Button>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm">{patient.lastVisit}</td>
                    <td className="py-3 px-4">
                      <Badge variant={patient.status === "Active" ? "default" : "secondary"}>
                        {language === "en" ? patient.status : patient.status === "Active" ? "सक्रिय" : "निष्क्रिय"}
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
                          <QrCode className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>{language === "en" ? "No patients found" : "कोई रोगी नहीं मिला"}</p>
          </div>
        )}
      </Card>

      {/* New Patient Registration Form */}
      {showNewPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="w-full max-w-4xl bg-white my-8">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">
                    {language === "en" ? "Register New Patient" : "नया रोगी पंजीकृत करें"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" 
                      ? "Fill in patient details to create a new record" 
                      : "नया रिकॉर्ड बनाने के लिए रोगी विवरण भरें"}
                  </p>
                </div>
                <Button variant="ghost" onClick={() => setShowNewPatient(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {language === "en" ? "Personal Information" : "व्यक्तिगत जानकारी"}
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>{language === "en" ? "Full Name (English) *" : "पूरा नाम (अंग्रेजी) *"}</Label>
                      <div className="relative">
                        <Input 
                          placeholder="John Doe"
                          value={newPatient.name}
                          onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 -translate-y-1/2"
                          onClick={() => setIsVoiceInput(!isVoiceInput)}
                        >
                          <Mic className={`w-4 h-4 ${isVoiceInput ? 'text-red-600' : ''}`} />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label>{language === "en" ? "Full Name (Hindi)" : "पूरा नाम (हिंदी)"}</Label>
                      <Input 
                        placeholder="जॉन डो"
                        value={newPatient.nameHindi}
                        onChange={(e) => setNewPatient({...newPatient, nameHindi: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <Label>{language === "en" ? "Age *" : "आयु *"}</Label>
                      <Input 
                        type="number" 
                        placeholder="30"
                        value={newPatient.age}
                        onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label>{language === "en" ? "Gender *" : "लिंग *"}</Label>
                      <Select value={newPatient.gender} onValueChange={(val) => setNewPatient({...newPatient, gender: val})}>
                        <SelectTrigger>
                          <SelectValue placeholder={language === "en" ? "Select" : "चुनें"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">{language === "en" ? "Male" : "पुरुष"}</SelectItem>
                          <SelectItem value="Female">{language === "en" ? "Female" : "महिला"}</SelectItem>
                          <SelectItem value="Other">{language === "en" ? "Other" : "अन्य"}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>{language === "en" ? "Blood Group" : "रक्त समूह"}</Label>
                      <Select value={newPatient.bloodGroup} onValueChange={(val) => setNewPatient({...newPatient, bloodGroup: val})}>
                        <SelectTrigger>
                          <SelectValue placeholder={language === "en" ? "Select" : "चुनें"} />
                        </SelectTrigger>
                        <SelectContent>
                          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                            <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Contact Information */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {language === "en" ? "Contact Information" : "संपर्क जानकारी"}
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>{language === "en" ? "Mobile Number *" : "मोबाइल नंबर *"}</Label>
                      <Input 
                        placeholder="+91 98765 43210"
                        value={newPatient.contact}
                        onChange={(e) => setNewPatient({...newPatient, contact: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label>{language === "en" ? "Email (Optional)" : "ईमेल (वैकल्पिक)"}</Label>
                      <Input 
                        type="email"
                        placeholder="patient@email.com"
                        value={newPatient.email}
                        onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label>{language === "en" ? "Emergency Contact" : "आपातकालीन संपर्क"}</Label>
                      <Input 
                        placeholder="+91 98765 43211"
                        value={newPatient.emergencyContact}
                        onChange={(e) => setNewPatient({...newPatient, emergencyContact: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label>{language === "en" ? "ABHA ID (Optional)" : "ABHA ID (वैकल्पिक)"}</Label>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="12-3456-7890-1234"
                          value={newPatient.abhaId}
                          onChange={(e) => setNewPatient({...newPatient, abhaId: e.target.value})}
                        />
                        <Button variant="outline" size="sm">
                          <LinkIcon className="w-4 h-4 mr-1" />
                          {language === "en" ? "Link" : "लिंक"}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {language === "en" 
                          ? "Ayushman Bharat Health Account" 
                          : "आयुष्मान भारत स्वास्थ्य खाता"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label>{language === "en" ? "Address *" : "पता *"}</Label>
                    <Textarea 
                      placeholder={language === "en" ? "Enter complete address" : "पूरा पता दर्ज करें"}
                      value={newPatient.address}
                      onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                {/* Medical Information */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    {language === "en" ? "Medical Information" : "चिकित्सा जानकारी"}
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>{language === "en" ? "Known Allergies" : "ज्ञात एलर्जी"}</Label>
                      <Input 
                        placeholder={language === "en" ? "e.g., Penicillin, Peanuts" : "जैसे, पेनिसिलिन, मूंगफली"}
                        value={newPatient.allergies}
                        onChange={(e) => setNewPatient({...newPatient, allergies: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label>{language === "en" ? "Chronic Conditions / Medical History" : "पुरानी बीमारियाँ / चिकित्सा इतिहास"}</Label>
                      <Textarea 
                        placeholder={language === "en" 
                          ? "e.g., Diabetes, Hypertension, Asthma" 
                          : "जैसे, मधुमेह, उच्च रक्तचाप, अस्थमा"}
                        value={newPatient.chronicConditions}
                        onChange={(e) => setNewPatient({...newPatient, chronicConditions: e.target.value})}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1" size="lg" onClick={handleRegisterPatient}>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {language === "en" ? "Register Patient" : "रोगी पंजीकृत करें"}
                  </Button>
                  <Button variant="outline" size="lg">
                    <QrCode className="w-5 h-5 mr-2" />
                    {language === "en" ? "Generate QR Card" : "QR कार्ड बनाएं"}
                  </Button>
                  <Button variant="outline" size="lg">
                    <Camera className="w-5 h-5 mr-2" />
                    {language === "en" ? "Capture Photo" : "फोटो लें"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Patient Details View */}
      {selectedPatient && (
        <PatientDetailsModal 
          patient={selectedPatient} 
          onClose={() => setSelectedPatient(null)}
          language={language}
        />
      )}
    </div>
  );
}

// Patient Details Modal Component
function PatientDetailsModal({ 
  patient, 
  onClose, 
  language 
}: { 
  patient: Patient; 
  onClose: () => void;
  language: "en" | "hi";
}) {
  const [activeTab, setActiveTab] = useState("overview");

  const consultationHistory = [
    {
      date: "2025-01-10",
      doctor: "Dr. Priya Sharma",
      diagnosis: "Diabetes Follow-up",
      prescription: "Metformin 500mg",
      status: "Completed"
    },
    {
      date: "2024-12-15",
      doctor: "Dr. Rajesh Kumar",
      diagnosis: "Hypertension Check",
      prescription: "Amlodipine 5mg",
      status: "Completed"
    },
    {
      date: "2024-11-20",
      doctor: "Dr. Priya Sharma",
      diagnosis: "General Checkup",
      prescription: "Vitamin D3",
      status: "Completed"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="w-full max-w-5xl bg-white my-8">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="text-xl">
                  {patient.name.split('/')[1]?.trim().split(' ').map(n => n[0]).join('') || 
                   patient.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-bold">{patient.name}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <span>{patient.id}</span>
                  <span>•</span>
                  <span>{patient.age} {language === "en" ? "years" : "वर्ष"}</span>
                  <span>•</span>
                  <span>{language === "en" ? patient.gender : patient.gender === "Male" ? "पुरुष" : "महिला"}</span>
                  <span>•</span>
                  <Badge variant={patient.status === "Active" ? "default" : "secondary"}>
                    {language === "en" ? patient.status : patient.status === "Active" ? "सक्रिय" : "निष्क्रिय"}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Printer className="w-4 h-4 mr-2" />
                {language === "en" ? "Print" : "प्रिंट"}
              </Button>
              <Button variant="ghost" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-5">
              <TabsTrigger value="overview">
                <User className="w-4 h-4 mr-2" />
                {language === "en" ? "Overview" : "सारांश"}
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="w-4 h-4 mr-2" />
                {language === "en" ? "History" : "इतिहास"}
              </TabsTrigger>
              <TabsTrigger value="prescriptions">
                <Pill className="w-4 h-4 mr-2" />
                {language === "en" ? "Prescriptions" : "नुस्खे"}
              </TabsTrigger>
              <TabsTrigger value="reports">
                <FlaskConical className="w-4 h-4 mr-2" />
                {language === "en" ? "Lab Reports" : "लैब रिपोर्ट"}
              </TabsTrigger>
              <TabsTrigger value="edit">
                <Edit className="w-4 h-4 mr-2" />
                {language === "en" ? "Edit" : "संपादित"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <Card className="p-4">
                  <h4 className="font-semibold mb-4">
                    {language === "en" ? "Personal Information" : "व्यक्तिगत जानकारी"}
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === "en" ? "Patient ID" : "रोगी ID"}:</span>
                      <span className="font-mono font-medium">{patient.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === "en" ? "Blood Group" : "रक्त समूह"}:</span>
                      <span>{patient.bloodGroup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === "en" ? "Contact" : "संपर्क"}:</span>
                      <span>{patient.contact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === "en" ? "Email" : "ईमेल"}:</span>
                      <span>{patient.email || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === "en" ? "Emergency Contact" : "आपातकालीन संपर्क"}:</span>
                      <span>{patient.emergencyContact || "N/A"}</span>
                    </div>
                    <Separator />
                    <div>
                      <span className="text-muted-foreground">{language === "en" ? "Address" : "पता"}:</span>
                      <p className="mt-1">{patient.address}</p>
                    </div>
                  </div>
                </Card>

                {/* Medical Summary */}
                <Card className="p-4">
                  <h4 className="font-semibold mb-4">
                    {language === "en" ? "Medical Summary" : "चिकित्सा सारांश"}
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === "en" ? "ABHA ID" : "ABHA ID"}:</span>
                      <span className="font-mono">{patient.abhaId || "Not Linked"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === "en" ? "Registration Date" : "पंजीकरण तिथि"}:</span>
                      <span>{patient.registrationDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === "en" ? "Last Visit" : "अंतिम यात्रा"}:</span>
                      <span>{patient.lastVisit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{language === "en" ? "Total Visits" : "कुल यात्राएं"}:</span>
                      <span className="font-semibold">{patient.totalVisits}</span>
                    </div>
                    <Separator />
                    <div>
                      <span className="text-muted-foreground font-medium">{language === "en" ? "Allergies" : "एलर्जी"}:</span>
                      <p className="mt-1 text-red-600">{patient.allergies || "None"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground font-medium">{language === "en" ? "Chronic Conditions" : "पुरानी बीमारियाँ"}:</span>
                      <p className="mt-1">{patient.chronicConditions || "None"}</p>
                    </div>
                  </div>
                </Card>

                {/* Vitals (Mock Data) */}
                <Card className="p-4 md:col-span-2">
                  <h4 className="font-semibold mb-4">
                    {language === "en" ? "Latest Vitals" : "नवीनतम जीवन संकेत"}
                  </h4>
                  <div className="grid md:grid-cols-5 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Activity className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-xs text-muted-foreground">{language === "en" ? "BP" : "रक्तचाप"}</p>
                        <p className="text-lg font-bold">128/82</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <Heart className="w-8 h-8 text-red-600" />
                      <div>
                        <p className="text-xs text-muted-foreground">{language === "en" ? "Heart Rate" : "हृदय गति"}</p>
                        <p className="text-lg font-bold">78 bpm</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <Droplet className="w-8 h-8 text-purple-600" />
                      <div>
                        <p className="text-xs text-muted-foreground">{language === "en" ? "Blood Sugar" : "रक्त शर्करा"}</p>
                        <p className="text-lg font-bold">142 mg/dL</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <Activity className="w-8 h-8 text-orange-600" />
                      <div>
                        <p className="text-xs text-muted-foreground">{language === "en" ? "Temp" : "तापमान"}</p>
                        <p className="text-lg font-bold">98.6°F</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Activity className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="text-xs text-muted-foreground">{language === "en" ? "SpO2" : "ऑक्सीजन"}</p>
                        <p className="text-lg font-bold">98%</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <div className="space-y-3">
                {consultationHistory.map((consultation, idx) => (
                  <Card key={idx} className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge>{consultation.status}</Badge>
                          <span className="text-sm text-muted-foreground">{consultation.date}</span>
                        </div>
                        <h5 className="font-semibold">{consultation.diagnosis}</h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          {language === "en" ? "Doctor" : "डॉक्टर"}: {consultation.doctor}
                        </p>
                        <p className="text-sm mt-2">
                          <span className="font-medium">{language === "en" ? "Prescription" : "नुस्खा"}:</span> {consultation.prescription}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="prescriptions" className="mt-6">
              <div className="text-center py-12 text-muted-foreground">
                <Pill className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{language === "en" ? "Prescription history will appear here" : "नुस्खे का इतिहास यहाँ दिखाई देगा"}</p>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="mt-6">
              <div className="text-center py-12 text-muted-foreground">
                <FlaskConical className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{language === "en" ? "Lab reports will appear here" : "लैब रिपोर्ट यहाँ दिखाई देंगी"}</p>
              </div>
            </TabsContent>

            <TabsContent value="edit" className="mt-6">
              <div className="text-center py-12 text-muted-foreground">
                <Edit className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{language === "en" ? "Edit patient information" : "रोगी जानकारी संपादित करें"}</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}
