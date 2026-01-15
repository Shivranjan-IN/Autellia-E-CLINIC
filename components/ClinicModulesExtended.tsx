// Extended Clinic Modules - Additional Features
// Doctor Management, Prescriptions, Billing, Pharmacy, Lab, Reports, AI, IoT, Settings

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
  Stethoscope, Plus, Edit, Eye, X, Download, Upload, Search, Filter,
  CheckCircle, Star, Award, Calendar, Clock, TrendingUp, Users,
  FileText, Printer, Receipt, DollarSign, CreditCard, Wallet,
  Pill, Package, AlertCircle, ShoppingCart, BarChart3,
  FlaskConical, Microscope, TestTube, Syringe, Activity,
  Brain, Sparkles, Mic, Volume2, MessageCircle, Camera,
  Wifi, Smartphone, Heart, Thermometer, Droplet, Monitor,
  Settings, Bell, Mail, Phone, Globe, Lock, Shield, Database,
  HelpCircle, BookOpen, Headphones, Key, Languages, Target
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

// ============================================================================
// SECTION 5: DOCTOR MANAGEMENT
// ============================================================================

export function DoctorManagement() {
  const [doctors, setDoctors] = useState([
    {
      id: "DOC-001",
      name: "Dr. Rajesh Kumar",
      specialization: "Cardiologist",
      qualification: "MBBS, MD (Cardiology)",
      experience: 15,
      rating: 4.8,
      consultations: 245,
      availability: "Mon-Sat: 9 AM - 5 PM",
      status: "Active",
      email: "rajesh@eclinic.com",
      phone: "+91 98765 43210"
    },
    {
      id: "DOC-002",
      name: "Dr. Priya Sharma",
      specialization: "General Physician",
      qualification: "MBBS, MD",
      experience: 10,
      rating: 4.9,
      consultations: 320,
      availability: "Mon-Fri: 10 AM - 6 PM",
      status: "Active",
      email: "priya@eclinic.com",
      phone: "+91 98765 43211"
    },
    {
      id: "DOC-003",
      name: "Dr. Anita Desai",
      specialization: "Pediatrician",
      qualification: "MBBS, MD (Pediatrics)",
      experience: 12,
      rating: 4.7,
      consultations: 189,
      availability: "Mon-Sat: 11 AM - 7 PM",
      status: "On Leave",
      email: "anita@eclinic.com",
      phone: "+91 98765 43212"
    },
  ]);

  const consultationData = [
    { month: "Jan", consultations: 45 },
    { month: "Feb", consultations: 52 },
    { month: "Mar", consultations: 48 },
    { month: "Apr", consultations: 61 },
    { month: "May", consultations: 55 },
    { month: "Jun", consultations: 58 },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Doctor Management</h2>
            <p className="text-muted-foreground">Onboard, verify, and manage doctors</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Doctor
          </Button>
        </div>

        {/* Doctor Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Total Doctors</p>
              </div>
              <Stethoscope className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">10</p>
                <p className="text-sm text-muted-foreground">Active Today</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-4 bg-purple-50 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
              <Star className="w-8 h-8 text-purple-600" />
            </div>
          </Card>

          <Card className="p-4 bg-orange-50 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">754</p>
                <p className="text-sm text-muted-foreground">Total Consultations</p>
              </div>
              <Activity className="w-8 h-8 text-orange-600" />
            </div>
          </Card>
        </div>

        {/* Doctors Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="text-lg">{doctor.name.split(' ')[1][0]}{doctor.name.split(' ')[2]?.[0] || doctor.name.split(' ')[1][1]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                    </div>
                    <Badge variant={doctor.status === "Active" ? "default" : "secondary"}>
                      {doctor.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">{doctor.qualification}</p>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-orange-600" />
                        {doctor.experience} years
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                        {doctor.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-blue-600" />
                        {doctor.consultations} patients
                      </span>
                    </div>
                    <p className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {doctor.availability}
                    </p>
                  </div>

                  <Separator className="my-3" />

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Doctor Performance Chart */}
        <Card className="p-6 mt-6">
          <h3 className="font-semibold mb-4">Consultation Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={consultationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="consultations" stroke="#ec4899" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Card>
    </div>
  );
}

// ============================================================================
// SECTION 6: PRESCRIPTION & MEDICAL RECORDS
// ============================================================================

export function PrescriptionManagement() {
  const [prescriptions, setPrescriptions] = useState([
    {
      id: "PRX-001234",
      patientName: "Ramesh Patel",
      patientId: "PAT-001234",
      doctor: "Dr. Rajesh Kumar",
      date: "2025-01-12",
      diagnosis: "Hypertension",
      medicines: [
        { name: "Amlodipine 5mg", dosage: "1-0-1", duration: "30 days" },
        { name: "Atenolol 50mg", dosage: "1-0-0", duration: "30 days" }
      ],
      tests: ["Blood Sugar", "Lipid Profile"],
      followUp: "2025-02-12",
      status: "Active"
    },
    {
      id: "PRX-001235",
      patientName: "Anjali Verma",
      patientId: "PAT-001235",
      doctor: "Dr. Priya Sharma",
      date: "2025-01-11",
      diagnosis: "Common Cold",
      medicines: [
        { name: "Paracetamol 500mg", dosage: "1-1-1", duration: "5 days" },
        { name: "Cetirizine 10mg", dosage: "0-0-1", duration: "5 days" }
      ],
      tests: [],
      followUp: "2025-01-18",
      status: "Active"
    },
  ]);

  const [showAIPrescription, setShowAIPrescription] = useState(false);

  return (
    <div className="space-y-6">
      {/* AI Prescription Assistant */}
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-purple-600" />
            <div>
              <p className="font-medium">AI Prescription Generator</p>
              <p className="text-sm text-muted-foreground">Get AI-powered medication suggestions with drug interaction checks</p>
            </div>
          </div>
          <Button onClick={() => setShowAIPrescription(true)}>
            <Sparkles className="w-4 h-4 mr-2" />
            Try AI Assistant
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Prescription & Medical Records</h2>
            <p className="text-muted-foreground">View, create, and manage prescriptions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Upload External
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Prescription
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search prescriptions..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Prescriptions List */}
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <Card key={prescription.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{prescription.patientName}</h3>
                    <Badge variant="outline">{prescription.patientId}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Prescription ID: {prescription.id}</span>
                    <span>•</span>
                    <span>Dr. {prescription.doctor}</span>
                    <span>•</span>
                    <span>{prescription.date}</span>
                  </div>
                </div>
                <Badge variant={prescription.status === "Active" ? "default" : "secondary"}>
                  {prescription.status}
                </Badge>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Diagnosis</p>
                    <p className="text-sm text-muted-foreground">{prescription.diagnosis}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Follow-up Date</p>
                    <p className="text-sm text-muted-foreground">{prescription.followUp}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-medium mb-2">Medications</p>
                <div className="space-y-2">
                  {prescription.medicines.map((med, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{med.name}</p>
                        <p className="text-xs text-muted-foreground">Dosage: {med.dosage} • Duration: {med.duration}</p>
                      </div>
                      <Pill className="w-5 h-5 text-blue-600" />
                    </div>
                  ))}
                </div>
              </div>

              {prescription.tests.length > 0 && (
                <div className="mb-4">
                  <p className="font-medium mb-2">Recommended Tests</p>
                  <div className="flex flex-wrap gap-2">
                    {prescription.tests.map((test, idx) => (
                      <Badge key={idx} variant="outline">{test}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <Separator className="my-4" />

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Full
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Share with Patient
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* AI Prescription Assistant Modal */}
      {showAIPrescription && (
        <Card className="fixed inset-4 z-50 bg-white shadow-2xl overflow-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AI Prescription Generator</h3>
                <p className="text-sm text-muted-foreground">Smart medication suggestions with safety checks</p>
              </div>
            </div>
            <Button variant="ghost" onClick={() => setShowAIPrescription(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="max-w-2xl space-y-4">
            <div>
              <Label>Enter Symptoms or Diagnosis</Label>
              <Textarea placeholder="E.g., Patient presents with fever, headache, and body ache..." />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Patient Age</Label>
                <Input type="number" placeholder="Enter age" />
              </div>
              <div>
                <Label>Patient Weight (kg)</Label>
                <Input type="number" placeholder="Enter weight" />
              </div>
            </div>

            <div>
              <Label>Known Allergies</Label>
              <Input placeholder="E.g., Penicillin, Sulfa drugs..." />
            </div>

            <Button className="w-full">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate AI Prescription
            </Button>

            <Card className="p-4 bg-purple-50 border-purple-200">
              <p className="font-medium mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-purple-600" />
                AI Suggestions
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <p className="font-medium text-sm">Paracetamol 500mg</p>
                  <p className="text-xs text-muted-foreground">Dosage: 1-1-1 after meals • Duration: 5 days</p>
                  <Badge variant="outline" className="mt-2 text-xs">Safe - No interactions detected</Badge>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <p className="font-medium text-sm">Cetirizine 10mg</p>
                  <p className="text-xs text-muted-foreground">Dosage: 0-0-1 before sleep • Duration: 5 days</p>
                  <Badge variant="outline" className="mt-2 text-xs">Safe - May cause drowsiness</Badge>
                </div>
              </div>
            </Card>
          </div>
        </Card>
      )}
    </div>
  );
}

// ============================================================================
// SECTION 7: BILLING & PAYMENTS
// ============================================================================

export function BillingPayments() {
  const [bills, setBills] = useState([
    {
      id: "BILL-001234",
      patientName: "Ramesh Patel",
      patientId: "PAT-001234",
      date: "2025-01-12",
      items: [
        { name: "Consultation Fee", quantity: 1, price: 500 },
        { name: "ECG Test", quantity: 1, price: 800 },
        { name: "Medicines", quantity: 1, price: 450 }
      ],
      subtotal: 1750,
      tax: 315,
      total: 2065,
      paid: 2065,
      balance: 0,
      paymentMode: "UPI",
      status: "Paid"
    },
    {
      id: "BILL-001235",
      patientName: "Anjali Verma",
      patientId: "PAT-001235",
      date: "2025-01-12",
      items: [
        { name: "Consultation Fee", quantity: 1, price: 500 },
        { name: "Lab Tests", quantity: 2, price: 1200 }
      ],
      subtotal: 1700,
      tax: 306,
      total: 2006,
      paid: 1000,
      balance: 1006,
      paymentMode: "Partial - Cash",
      status: "Partial"
    },
  ]);

  const revenueData = [
    { date: "Jan 8", amount: 15000 },
    { date: "Jan 9", amount: 18000 },
    { date: "Jan 10", amount: 22000 },
    { date: "Jan 11", amount: 19000 },
    { date: "Jan 12", amount: 25000 },
  ];

  const paymentModeData = [
    { name: "Cash", value: 35, color: "#10b981" },
    { name: "Card", value: 25, color: "#3b82f6" },
    { name: "UPI", value: 30, color: "#8b5cf6" },
    { name: "Insurance", value: 10, color: "#f59e0b" },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Billing & Payments</h2>
            <p className="text-muted-foreground">GST-ready invoices and revenue tracking</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create New Bill
          </Button>
        </div>

        {/* Revenue Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">₹45,250</p>
                <p className="text-sm text-muted-foreground">Today's Revenue</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <Progress value={75} className="mt-2" />
          </Card>

          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">28</p>
                <p className="text-sm text-muted-foreground">Bills Generated</p>
              </div>
              <Receipt className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-4 bg-orange-50 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">₹12,500</p>
                <p className="text-sm text-muted-foreground">Pending Payments</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </Card>

          <Card className="p-4 bg-purple-50 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">₹5,250</p>
                <p className="text-sm text-muted-foreground">Refunds Issued</p>
              </div>
              <Wallet className="w-8 h-8 text-purple-600" />
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Revenue Trend (Last 5 Days)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#10b981" fill="#d1fae5" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-4">Payment Mode Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={paymentModeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentModeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Bills List */}
        <div className="space-y-4">
          {bills.map((bill) => (
            <Card key={bill.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{bill.patientName}</h3>
                    <Badge variant="outline">{bill.patientId}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Bill ID: {bill.id}</span>
                    <span>•</span>
                    <span>{bill.date}</span>
                  </div>
                </div>
                <Badge variant={
                  bill.status === "Paid" ? "default" :
                  bill.status === "Partial" ? "secondary" :
                  "destructive"
                }>
                  {bill.status}
                </Badge>
              </div>

              <div className="border rounded-lg overflow-hidden mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-2 px-4">Item</th>
                      <th className="text-center py-2 px-4">Qty</th>
                      <th className="text-right py-2 px-4">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bill.items.map((item, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="py-2 px-4">{item.name}</td>
                        <td className="py-2 px-4 text-center">{item.quantity}</td>
                        <td className="py-2 px-4 text-right">₹{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{bill.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax (18% GST):</span>
                    <span>₹{bill.tax}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>₹{bill.total}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Paid:</span>
                    <span>₹{bill.paid}</span>
                  </div>
                  {bill.balance > 0 && (
                    <div className="flex justify-between text-orange-600 font-medium">
                      <span>Balance Due:</span>
                      <span>₹{bill.balance}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CreditCard className="w-4 h-4" />
                    <span>Payment Mode: {bill.paymentMode}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Printer className="w-4 h-4 mr-2" />
                  Print Invoice
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                {bill.balance > 0 && (
                  <Button variant="outline" size="sm">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Collect Payment
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Receipt
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ============================================================================
// SECTION 8: PHARMACY & INVENTORY MANAGEMENT
// ============================================================================

export function PharmacyInventory() {
  const [medicines, setMedicines] = useState([
    {
      id: "MED-001",
      name: "Paracetamol 500mg",
      category: "Analgesic",
      manufacturer: "Cipla",
      batch: "BAT123456",
      stock: 250,
      minStock: 50,
      price: 2.5,
      mrp: 3.5,
      expiry: "2026-12-31",
      status: "In Stock"
    },
    {
      id: "MED-002",
      name: "Amoxicillin 250mg",
      category: "Antibiotic",
      manufacturer: "Sun Pharma",
      batch: "BAT123457",
      stock: 35,
      minStock: 50,
      price: 8.5,
      mrp: 12.0,
      expiry: "2025-08-15",
      status: "Low Stock"
    },
    {
      id: "MED-003",
      name: "Cetirizine 10mg",
      category: "Antihistamine",
      manufacturer: "Dr. Reddy's",
      batch: "BAT123458",
      stock: 15,
      minStock: 30,
      price: 1.5,
      mrp: 2.5,
      expiry: "2025-03-20",
      status: "Critical"
    },
  ]);

  const inventoryValue = medicines.reduce((sum, med) => sum + (med.stock * med.price), 0);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Pharmacy & Inventory</h2>
            <p className="text-muted-foreground">Manage medicine stock and inventory</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Medicine
            </Button>
          </div>
        </div>

        {/* Inventory Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">542</p>
                <p className="text-sm text-muted-foreground">Total Items</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-4 bg-orange-50 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">Low Stock</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </Card>

          <Card className="p-4 bg-red-50 border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Near Expiry</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </Card>

          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">₹{inventoryValue.toFixed(0)}</p>
                <p className="text-sm text-muted-foreground">Inventory Value</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search medicines..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="analgesic">Analgesic</SelectItem>
              <SelectItem value="antibiotic">Antibiotic</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="low">Low Stock</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Medicine Table */}
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-semibold">Medicine</th>
                <th className="text-left py-3 px-4 font-semibold">Category</th>
                <th className="text-left py-3 px-4 font-semibold">Batch</th>
                <th className="text-center py-3 px-4 font-semibold">Stock</th>
                <th className="text-right py-3 px-4 font-semibold">Price</th>
                <th className="text-left py-3 px-4 font-semibold">Expiry</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med) => (
                <tr key={med.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{med.name}</p>
                      <p className="text-xs text-muted-foreground">{med.manufacturer}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline">{med.category}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-xs">{med.batch}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div>
                      <p className="font-medium">{med.stock}</p>
                      <Progress 
                        value={(med.stock / med.minStock) * 100} 
                        className="h-1 mt-1"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div>
                      <p className="font-medium">₹{med.price}</p>
                      <p className="text-xs text-muted-foreground">MRP: ₹{med.mrp}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{med.expiry}</td>
                  <td className="py-3 px-4">
                    <Badge variant={
                      med.status === "In Stock" ? "default" :
                      med.status === "Low Stock" ? "secondary" :
                      "destructive"
                    }>
                      {med.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// Export all modules
export {
  DoctorManagement,
  PrescriptionManagement,
  BillingPayments,
  PharmacyInventory
};
