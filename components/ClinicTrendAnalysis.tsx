// Comprehensive Trend Analysis Module for Clinic Admin
// Advanced analytics with predictive insights and trend tracking

import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { 
  TrendingUp, TrendingDown, Activity, Users, Calendar, DollarSign,
  Package, FlaskConical, Stethoscope, Clock, AlertCircle, CheckCircle,
  BarChart3, PieChart as PieChartIcon, Download, Filter, Brain,
  Sparkles, Target, Zap, Eye, ArrowUp, ArrowDown, Minus,
  Heart, Pill, Receipt, UserPlus, Phone, Mail, FileText
} from "lucide-react";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  AreaChart, Area, ComposedChart, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, Scatter, ScatterChart
} from "recharts";

// ============================================================================
// PATIENT TRENDS ANALYSIS
// ============================================================================

export function PatientTrendsAnalysis() {
  const patientRegistrationTrend = [
    { month: "Jan", newPatients: 45, returningPatients: 120, total: 165 },
    { month: "Feb", newPatients: 52, returningPatients: 135, total: 187 },
    { month: "Mar", newPatients: 48, returningPatients: 142, total: 190 },
    { month: "Apr", newPatients: 61, returningPatients: 150, total: 211 },
    { month: "May", newPatients: 55, returningPatients: 165, total: 220 },
    { month: "Jun", newPatients: 58, returningPatients: 178, total: 236 },
    { month: "Jul", newPatients: 67, returningPatients: 189, total: 256 },
  ];

  const patientDemographics = [
    { age: "0-18", male: 45, female: 38, total: 83 },
    { age: "19-35", male: 165, female: 175, total: 340 },
    { age: "36-50", male: 142, female: 138, total: 280 },
    { age: "51-65", male: 98, female: 97, total: 195 },
    { age: "65+", male: 68, female: 77, total: 145 },
  ];

  const visitFrequency = [
    { name: "First Visit", value: 280, color: "#3b82f6" },
    { name: "2-5 Visits", value: 425, color: "#10b981" },
    { name: "6-10 Visits", value: 215, color: "#f59e0b" },
    { name: "10+ Visits", value: 123, color: "#ec4899" },
  ];

  const patientRetentionRate = [
    { month: "Jan", retention: 72 },
    { month: "Feb", retention: 75 },
    { month: "Mar", retention: 74 },
    { month: "Apr", retention: 78 },
    { month: "May", retention: 80 },
    { month: "Jun", retention: 82 },
    { month: "Jul", retention: 85 },
  ];

  return (
    <div className="space-y-6">
      {/* AI Insights Banner */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-lg">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">AI-Powered Patient Insights</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm font-medium">Growth Prediction</p>
                  <p className="text-sm text-muted-foreground">Expected 15% increase in new patient registrations next month based on current trends.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 text-green-600 mt-1" />
                <div>
                  <p className="text-sm font-medium">Retention Improvement</p>
                  <p className="text-sm text-muted-foreground">Patient retention up by 13% compared to last quarter. Excellent progress!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserPlus className="w-5 h-5 text-blue-600" />
            </div>
            <Badge variant="default" className="bg-green-100 text-green-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12%
            </Badge>
          </div>
          <p className="text-2xl font-bold">1,043</p>
          <p className="text-sm text-muted-foreground">Total Patients</p>
          <p className="text-xs text-muted-foreground mt-1">67 new this month</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Repeat className="w-5 h-5 text-green-600" />
            </div>
            <Badge variant="default" className="bg-green-100 text-green-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              +3%
            </Badge>
          </div>
          <p className="text-2xl font-bold">85%</p>
          <p className="text-sm text-muted-foreground">Retention Rate</p>
          <p className="text-xs text-muted-foreground mt-1">Up from 82% last month</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Activity className="w-5 h-5 text-purple-600" />
            </div>
            <Badge variant="default" className="bg-blue-100 text-blue-700">
              <Minus className="w-3 h-3 mr-1" />
              0%
            </Badge>
          </div>
          <p className="text-2xl font-bold">3.2</p>
          <p className="text-sm text-muted-foreground">Avg Visits/Patient</p>
          <p className="text-xs text-muted-foreground mt-1">Stable trend</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <Badge variant="default" className="bg-green-100 text-green-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8%
            </Badge>
          </div>
          <p className="text-2xl font-bold">23</p>
          <p className="text-sm text-muted-foreground">Daily Avg Visits</p>
          <p className="text-xs text-muted-foreground mt-1">Increased from 21</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Patient Registration Trend */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Patient Registration Trend (7 Months)</h3>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={patientRegistrationTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="newPatients" fill="#3b82f6" name="New Patients" />
              <Bar dataKey="returningPatients" fill="#10b981" name="Returning Patients" />
              <Line type="monotone" dataKey="total" stroke="#ec4899" strokeWidth={2} name="Total" />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        {/* Patient Demographics */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Patient Demographics by Age & Gender</h3>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Details
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={patientDemographics} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="age" />
              <Tooltip />
              <Legend />
              <Bar dataKey="male" fill="#3b82f6" name="Male" />
              <Bar dataKey="female" fill="#ec4899" name="Female" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Visit Frequency Distribution */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Visit Frequency Distribution</h3>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={visitFrequency}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {visitFrequency.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Patient Retention Rate */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Patient Retention Rate Trend</h3>
            <Badge variant="default" className="bg-green-100 text-green-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              Improving
            </Badge>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={patientRetentionRate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Area type="monotone" dataKey="retention" stroke="#10b981" fill="#d1fae5" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-green-800">
              ✓ 13% improvement in patient retention over the last quarter
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ============================================================================
// APPOINTMENT TRENDS ANALYSIS
// ============================================================================

export function AppointmentTrendsAnalysis() {
  const appointmentTrends = [
    { date: "Mon", scheduled: 35, completed: 32, cancelled: 2, noShow: 1 },
    { date: "Tue", scheduled: 42, completed: 38, cancelled: 3, noShow: 1 },
    { date: "Wed", scheduled: 38, completed: 35, cancelled: 2, noShow: 1 },
    { date: "Thu", scheduled: 45, completed: 41, cancelled: 3, noShow: 1 },
    { date: "Fri", scheduled: 48, completed: 44, cancelled: 3, noShow: 1 },
    { date: "Sat", scheduled: 52, completed: 48, cancelled: 3, noShow: 1 },
  ];

  const peakHoursAnalysis = [
    { hour: "9 AM", count: 8, avgWait: 5 },
    { hour: "10 AM", count: 15, avgWait: 12 },
    { hour: "11 AM", count: 22, avgWait: 18 },
    { hour: "12 PM", count: 18, avgWait: 15 },
    { hour: "1 PM", count: 10, avgWait: 8 },
    { hour: "2 PM", count: 16, avgWait: 14 },
    { hour: "3 PM", count: 25, avgWait: 20 },
    { hour: "4 PM", count: 20, avgWait: 16 },
    { hour: "5 PM", count: 14, avgWait: 10 },
  ];

  const appointmentTypes = [
    { name: "In-Person", value: 520, color: "#3b82f6" },
    { name: "Video Consultation", value: 280, color: "#10b981" },
    { name: "Phone Consultation", value: 85, color: "#f59e0b" },
    { name: "Emergency", value: 42, color: "#ef4444" },
  ];

  const doctorWiseAppointments = [
    { doctor: "Dr. Rajesh", scheduled: 245, completed: 235, rating: 4.8 },
    { doctor: "Dr. Priya", scheduled: 320, completed: 310, rating: 4.9 },
    { doctor: "Dr. Anita", scheduled: 189, completed: 180, rating: 4.7 },
    { doctor: "Dr. Suresh", scheduled: 156, completed: 148, rating: 4.6 },
  ];

  return (
    <div className="space-y-6">
      {/* AI Predictions */}
      <Card className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 border-orange-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-lg">
            <Brain className="w-6 h-6 text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">AI Appointment Predictions</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-orange-600 mt-1" />
                <div>
                  <p className="text-sm font-medium">Tomorrow's Load</p>
                  <p className="text-sm text-muted-foreground">Expected 48 appointments (High volume day)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-purple-600 mt-1" />
                <div>
                  <p className="text-sm font-medium">Peak Hour</p>
                  <p className="text-sm text-muted-foreground">3-4 PM will be busiest. Add staff support.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 mt-1" />
                <div>
                  <p className="text-sm font-medium">No-Show Risk</p>
                  <p className="text-sm text-muted-foreground">3 appointments have high no-show probability</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <Badge variant="default" className="bg-green-100 text-green-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8%
            </Badge>
          </div>
          <p className="text-2xl font-bold">260</p>
          <p className="text-sm text-muted-foreground">This Week</p>
          <p className="text-xs text-muted-foreground mt-1">Up from 240 last week</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <Badge variant="default" className="bg-green-100 text-green-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2%
            </Badge>
          </div>
          <p className="text-2xl font-bold">92%</p>
          <p className="text-sm text-muted-foreground">Completion Rate</p>
          <p className="text-xs text-muted-foreground mt-1">238 completed</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <Badge variant="default" className="bg-red-100 text-red-700">
              <TrendingDown className="w-3 h-3 mr-1" />
              -1%
            </Badge>
          </div>
          <p className="text-2xl font-bold">3.5%</p>
          <p className="text-sm text-muted-foreground">No-Show Rate</p>
          <p className="text-xs text-muted-foreground mt-1">9 no-shows</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <Badge variant="default" className="bg-green-100 text-green-700">
              <TrendingDown className="w-3 h-3 mr-1" />
              -5%
            </Badge>
          </div>
          <p className="text-2xl font-bold">14 min</p>
          <p className="text-sm text-muted-foreground">Avg Wait Time</p>
          <p className="text-xs text-muted-foreground mt-1">Down from 18 min</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Appointment Trends */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Weekly Appointment Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" />
              <Bar dataKey="cancelled" stackId="a" fill="#f59e0b" name="Cancelled" />
              <Bar dataKey="noShow" stackId="a" fill="#ef4444" name="No-Show" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Peak Hours Analysis */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Peak Hours & Wait Time Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={peakHoursAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="count" fill="#3b82f6" name="Appointments" />
              <Line yAxisId="right" type="monotone" dataKey="avgWait" stroke="#ef4444" strokeWidth={2} name="Avg Wait (min)" />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        {/* Appointment Types */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Appointment Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={appointmentTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {appointmentTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Doctor-wise Performance */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Doctor-wise Appointment Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={doctorWiseAppointments} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="doctor" />
              <Tooltip />
              <Legend />
              <Bar dataKey="scheduled" fill="#3b82f6" name="Scheduled" />
              <Bar dataKey="completed" fill="#10b981" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

// ============================================================================
// REVENUE & FINANCIAL TRENDS
// ============================================================================

export function RevenueTrendsAnalysis() {
  const monthlyRevenue = [
    { month: "Jan", revenue: 450000, expenses: 280000, profit: 170000, target: 420000 },
    { month: "Feb", revenue: 520000, expenses: 290000, profit: 230000, target: 480000 },
    { month: "Mar", revenue: 580000, expenses: 310000, profit: 270000, target: 520000 },
    { month: "Apr", revenue: 550000, expenses: 305000, profit: 245000, target: 500000 },
    { month: "May", revenue: 620000, expenses: 320000, profit: 300000, target: 560000 },
    { month: "Jun", revenue: 590000, expenses: 315000, profit: 275000, target: 540000 },
    { month: "Jul", revenue: 680000, expenses: 335000, profit: 345000, target: 600000 },
  ];

  const revenueByService = [
    { name: "Consultations", value: 285000, percentage: 42, color: "#3b82f6" },
    { name: "Lab Tests", value: 175000, percentage: 26, color: "#10b981" },
    { name: "Pharmacy", value: 145000, percentage: 21, color: "#f59e0b" },
    { name: "Procedures", value: 75000, percentage: 11, color: "#ec4899" },
  ];

  const paymentModesTrend = [
    { month: "Jan", cash: 120000, card: 150000, upi: 130000, insurance: 50000 },
    { month: "Feb", cash: 110000, card: 165000, upi: 180000, insurance: 65000 },
    { month: "Mar", cash: 95000, card: 175000, upi: 225000, insurance: 85000 },
    { month: "Apr", cash: 85000, card: 165000, upi: 210000, insurance: 90000 },
    { month: "May", cash: 80000, card: 180000, upi: 265000, insurance: 95000 },
    { month: "Jun", cash: 70000, card: 175000, upi: 250000, insurance: 95000 },
    { month: "Jul", cash: 65000, card: 190000, upi: 315000, insurance: 110000 },
  ];

  const dailyRevenuePattern = [
    { day: "Mon", revenue: 95000 },
    { day: "Tue", revenue: 105000 },
    { day: "Wed", revenue: 98000 },
    { day: "Thu", revenue: 112000 },
    { day: "Fri", revenue: 118000 },
    { day: "Sat", revenue: 125000 },
  ];

  return (
    <div className="space-y-6">
      {/* AI Financial Insights */}
      <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-lg">
            <Brain className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">AI Financial Forecasting</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-green-600 mt-1" />
                <div>
                  <p className="text-sm font-medium">Revenue Forecast</p>
                  <p className="text-sm text-muted-foreground">Projected ₹7.2L next month (+6% growth)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm font-medium">Target Achievement</p>
                  <p className="text-sm text-muted-foreground">On track to exceed monthly target by 13%</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 mt-1" />
                <div>
                  <p className="text-sm font-medium">Optimization Tip</p>
                  <p className="text-sm text-muted-foreground">Increase lab test packages for +₹50K revenue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Key Financial Metrics */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <Badge variant="default" className="bg-green-100 text-green-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              +13%
            </Badge>
          </div>
          <p className="text-2xl font-bold">₹6.8L</p>
          <p className="text-sm text-muted-foreground">This Month</p>
          <p className="text-xs text-muted-foreground mt-1">vs ₹5.9L last month</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <Badge variant="default" className="bg-green-100 text-green-700">
              <TrendingUp className="w-3 h-3 mr-1" />
              +9%
            </Badge>
          </div>
          <p className="text-2xl font-bold">₹3.45L</p>
          <p className="text-sm text-muted-foreground">Profit</p>
          <p className="text-xs text-muted-foreground mt-1">50.7% margin</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Receipt className="w-5 h-5 text-purple-600" />
            </div>
            <Badge variant="default" className="bg-blue-100 text-blue-700">
              <Minus className="w-3 h-3 mr-1" />
              0%
            </Badge>
          </div>
          <p className="text-2xl font-bold">₹2,654</p>
          <p className="text-sm text-muted-foreground">Avg Transaction</p>
          <p className="text-xs text-muted-foreground mt-1">256 transactions</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <Badge variant="default" className="bg-green-100 text-green-700">
              <TrendingDown className="w-3 h-3 mr-1" />
              -8%
            </Badge>
          </div>
          <p className="text-2xl font-bold">₹45K</p>
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-xs text-muted-foreground mt-1">18 invoices</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Target className="w-5 h-5 text-pink-600" />
            </div>
            <Badge variant="default" className="bg-green-100 text-green-700">
              <CheckCircle className="w-3 h-3 mr-1" />
              113%
            </Badge>
          </div>
          <p className="text-2xl font-bold">₹6.0L</p>
          <p className="text-sm text-muted-foreground">Monthly Target</p>
          <p className="text-xs text-muted-foreground mt-1">Exceeded!</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Revenue, Expenses & Profit Trend (7 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} name="Profit" />
              <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="Target" />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue by Service */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Revenue Distribution by Service Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueByService}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {revenueByService.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {revenueByService.map((service, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">{service.name}</span>
                <span className="text-sm font-semibold">₹{(service.value / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Payment Modes Trend */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Payment Modes Trend (7 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={paymentModesTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="upi" stackId="1" stroke="#8b5cf6" fill="#ddd6fe" name="UPI" />
              <Area type="monotone" dataKey="card" stackId="1" stroke="#3b82f6" fill="#dbeafe" name="Card" />
              <Area type="monotone" dataKey="insurance" stackId="1" stroke="#10b981" fill="#d1fae5" name="Insurance" />
              <Area type="monotone" dataKey="cash" stackId="1" stroke="#f59e0b" fill="#fed7aa" name="Cash" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm font-medium text-purple-800">
              📊 UPI payments increased by 385% over 7 months - Digital adoption growing!
            </p>
          </div>
        </Card>

        {/* Daily Revenue Pattern */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Average Daily Revenue Pattern (Weekly)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyRevenuePattern}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#ec4899" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-pink-50 rounded-lg border border-pink-200">
            <p className="text-sm font-medium text-pink-800">
              💡 Saturdays generate highest revenue - Consider extended hours
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ============================================================================
// COMPREHENSIVE TREND ANALYSIS HUB
// ============================================================================

export default function ClinicTrendAnalysis() {
  const [activeTab, setActiveTab] = useState("patients");

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Comprehensive Trend Analysis</h2>
            <p className="text-muted-foreground">Advanced analytics with AI-powered insights and predictive forecasting</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="7months">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="7months">Last 7 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="patients">
              <Users className="w-4 h-4 mr-2" />
              Patients
            </TabsTrigger>
            <TabsTrigger value="appointments">
              <Calendar className="w-4 h-4 mr-2" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="revenue">
              <DollarSign className="w-4 h-4 mr-2" />
              Revenue
            </TabsTrigger>
            <TabsTrigger value="inventory">
              <Package className="w-4 h-4 mr-2" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="lab">
              <FlaskConical className="w-4 h-4 mr-2" />
              Lab Tests
            </TabsTrigger>
            <TabsTrigger value="doctors">
              <Stethoscope className="w-4 h-4 mr-2" />
              Doctors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="mt-6">
            <PatientTrendsAnalysis />
          </TabsContent>

          <TabsContent value="appointments" className="mt-6">
            <AppointmentTrendsAnalysis />
          </TabsContent>

          <TabsContent value="revenue" className="mt-6">
            <RevenueTrendsAnalysis />
          </TabsContent>

          <TabsContent value="inventory" className="mt-6">
            <div className="text-center py-12 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-4" />
              <p>Inventory trend analysis coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="lab" className="mt-6">
            <div className="text-center py-12 text-muted-foreground">
              <FlaskConical className="w-12 h-12 mx-auto mb-4" />
              <p>Lab test trend analysis coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="doctors" className="mt-6">
            <div className="text-center py-12 text-muted-foreground">
              <Stethoscope className="w-12 h-12 mx-auto mb-4" />
              <p>Doctor performance trend analysis coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
