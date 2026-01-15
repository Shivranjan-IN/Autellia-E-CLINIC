// Additional comprehensive modules for Clinic Dashboard
// Billing, Pharmacy, Lab, Staff, Analytics, AI Features, etc.

import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { 
  Receipt, CreditCard, DollarSign, Download, Printer, Send,
  Package, Pill, AlertCircle, Plus, Edit, Eye, Trash2,
  FlaskConical, FileCheck, Clock, CheckCircle, XCircle,
  Users, UserCheck, Shield, Lock, Key, Database,
  BarChart3, TrendingUp, PieChart as PieChartIcon, Activity,
  Brain, Target, Sparkles, Lightbulb, Mic, MessageCircle,
  Bell, Settings, Calendar, Phone, Mail, Search, Filter,
  Building2, Stethoscope, Heart, Award, Star, Globe,
  Video, Wifi, Smartphone, Camera, Upload, X, MoreVertical
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

// Billing & Payments Tab
export function BillingTab({ billingTransactions, setShowBillingForm, showBillingForm }: any) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Billing & Payments</h2>
          <Button onClick={() => setShowBillingForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Bill
          </Button>
        </div>

        {showBillingForm && (
          <Card className="p-6 mb-6 border-blue-200 bg-blue-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg">New Bill</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowBillingForm(false)}>
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
                      <SelectItem value="1">Ramesh Patel</SelectItem>
                      <SelectItem value="2">Anjali Verma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Bill Date</Label>
                  <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
              </div>

              <div>
                <Label>Items / Services</Label>
                <div className="space-y-2 mt-2">
                  <div className="grid grid-cols-4 gap-2">
                    <Input placeholder="Item name" className="col-span-2" />
                    <Input placeholder="Quantity" type="number" />
                    <Input placeholder="Price" type="number" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Subtotal</Label>
                  <Input type="number" placeholder="0.00" readOnly />
                </div>
                <div>
                  <Label>Tax (18% GST)</Label>
                  <Input type="number" placeholder="0.00" readOnly />
                </div>
                <div>
                  <Label>Total Amount</Label>
                  <Input type="number" placeholder="0.00" readOnly className="font-bold" />
                </div>
              </div>

              <div>
                <Label>Payment Mode</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1">
                  <Printer className="w-4 h-4 mr-2" />
                  Print Invoice
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Send to Patient
                </Button>
              </div>
            </div>
          </Card>
        )}

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-3">
            {billingTransactions.map((transaction: any) => (
              <Card key={transaction.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{transaction.invoiceNo}</p>
                      <Badge variant="outline">{transaction.date}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{transaction.patient}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {transaction.items.map((item: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{item}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="text-lg font-medium">₹{transaction.total.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">
                        (Tax: ₹{transaction.tax})
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={transaction.status === "Paid" ? "bg-green-600" : "bg-orange-600"}>
                        {transaction.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {transaction.paymentMode}
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <Card className="p-4 mt-6 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Today's Collection</p>
              <p className="text-2xl font-medium">₹{(145000).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-medium">₹{(2450000).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending Payments</p>
              <p className="text-2xl font-medium text-orange-600">₹{(35000).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Invoices</p>
              <p className="text-2xl font-medium">{billingTransactions.length}</p>
            </div>
          </div>
        </Card>
      </Card>
    </div>
  );
}

// Pharmacy & Inventory Tab
export function PharmacyTab({ medicineInventory }: any) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Pharmacy & Inventory</h2>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Medicine
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-blue-50">
            <p className="text-sm text-muted-foreground mb-1">Total Items</p>
            <p className="text-2xl">{medicineInventory.length}</p>
          </Card>
          <Card className="p-4 bg-green-50">
            <p className="text-sm text-muted-foreground mb-1">In Stock</p>
            <p className="text-2xl">{medicineInventory.filter((m: any) => m.status === "In Stock").length}</p>
          </Card>
          <Card className="p-4 bg-orange-50">
            <p className="text-sm text-muted-foreground mb-1">Low Stock</p>
            <p className="text-2xl">{medicineInventory.filter((m: any) => m.status === "Low Stock").length}</p>
          </Card>
          <Card className="p-4 bg-red-50">
            <p className="text-sm text-muted-foreground mb-1">Critical</p>
            <p className="text-2xl">{medicineInventory.filter((m: any) => m.status === "Critical").length}</p>
          </Card>
        </div>

        <div className="space-y-3">
          {medicineInventory.map((medicine: any) => (
            <Card key={medicine.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{medicine.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {medicine.manufacturer} • Expiry: {medicine.expiry}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="font-medium">{medicine.quantity}</p>
                    <p className="text-xs text-muted-foreground">Min: {medicine.minStock}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">₹{medicine.price}</p>
                  </div>
                  <Badge variant={
                    medicine.status === "In Stock" ? "default" :
                    medicine.status === "Low Stock" ? "secondary" : "destructive"
                  }>
                    {medicine.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Lab Tests & Diagnostics Tab
export function LabTab({ labTests, labOrders }: any) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl mb-6">Lab Tests & Diagnostics</h2>

        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders">Lab Orders</TabsTrigger>
            <TabsTrigger value="tests">Available Tests</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg">Recent Lab Orders</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Lab Order
              </Button>
            </div>

            <div className="space-y-3">
              {labOrders.map((order: any) => (
                <Card key={order.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{order.patient}</p>
                      <p className="text-sm text-muted-foreground">{order.test}</p>
                      <p className="text-sm text-muted-foreground">Order Date: {order.orderDate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {order.result && (
                        <Badge className="bg-green-600">{order.result}</Badge>
                      )}
                      <Badge className={
                        order.status === "Completed" ? "bg-green-600" :
                        order.status === "Processing" ? "bg-blue-600" : "bg-orange-600"
                      }>
                        {order.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tests" className="mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              {labTests.map((test: any) => (
                <Card key={test.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{test.name}</p>
                      <p className="text-sm text-muted-foreground">{test.category}</p>
                      <p className="text-sm text-muted-foreground">Turnaround: {test.turnaroundTime}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-medium">₹{test.price}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Plus className="w-4 h-4 mr-2" />
                        Order
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

// Staff & Role Management Tab
export function StaffTab({ staff }: any) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Staff & Role Management</h2>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Staff Member
          </Button>
        </div>

        <div className="space-y-4">
          {staff.map((member: any) => (
            <Card key={member.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role} • {member.department}</p>
                  <div className="flex gap-4 mt-2">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {member.email}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {member.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-600">{member.status}</Badge>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Key className="w-4 h-4 mr-2" />
                      Permissions
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 mt-6 bg-blue-50">
          <h3 className="mb-4">Role & Permission Matrix</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {["Admin", "Doctor", "Nurse", "Receptionist"].map((role, idx) => (
              <Card key={idx} className="p-4 bg-white">
                <p className="font-medium mb-2">{role}</p>
                <p className="text-sm text-muted-foreground">Full permissions</p>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  Manage
                </Button>
              </Card>
            ))}
          </div>
        </Card>
      </Card>
    </div>
  );
}

// Analytics & Reports Tab
export function AnalyticsTab({ departmentRevenue, revenueData }: any) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl mb-6">Analytics & Reports</h2>

        <Tabs defaultValue="revenue">
          <TabsList>
            <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
            <TabsTrigger value="patients">Patient Analytics</TabsTrigger>
            <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="mb-4">Monthly Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#ec4899" fill="#ec4899" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="mb-4">Department-wise Revenue</h3>
                <div className="space-y-3">
                  {departmentRevenue.map((dept: any, idx: number) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{dept.name}</span>
                        <span className="text-sm">₹{dept.amount.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full" 
                          style={{ width: `${dept.value}%`, backgroundColor: dept.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patients" className="mt-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Total Patients</p>
                <p className="text-3xl mb-1">1,248</p>
                <p className="text-sm text-green-600">+8.3% growth</p>
              </Card>
              <Card className="p-6">
                <p className="text-sm text-muted-foreground mb-2">New Registrations</p>
                <p className="text-3xl mb-1">45</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </Card>
              <Card className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Avg Visits/Patient</p>
                <p className="text-3xl mb-1">3.2</p>
                <p className="text-sm text-blue-600">Per year</p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-6">
                  <h4 className="mb-4">Doctor Performance</h4>
                  <div className="space-y-3">
                    {["Dr. Priya Sharma", "Dr. Rajesh Kumar", "Dr. Anita Desai"].map((doc, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{doc}</span>
                          <span className="text-sm font-medium">{95 - idx * 5}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-600" 
                            style={{ width: `${95 - idx * 5}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="mb-4">Department Efficiency</h4>
                  <div className="space-y-3">
                    {departmentRevenue.slice(0, 3).map((dept: any, idx: number) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{dept.name}</span>
                          <span className="text-sm font-medium">{dept.patients} patients</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full" 
                            style={{ width: `${dept.value}%`, backgroundColor: dept.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Patient Satisfaction</p>
                    <p className="text-2xl font-medium">4.6/5</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Wait Time</p>
                    <p className="text-2xl font-medium">15 min</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bed Occupancy</p>
                    <p className="text-2xl font-medium">78%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Staff Utilization</p>
                    <p className="text-2xl font-medium">92%</p>
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

// Departments Management Tab
export function DepartmentsTab({ departments }: any) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl">Departments & Services</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Button>
      </div>

      <div className="space-y-4">
        {departments.map((dept: any) => (
          <Card key={dept.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-lg">{dept.name}</h3>
                <p className="text-sm text-muted-foreground">Head: {dept.head}</p>
                <div className="flex gap-4 mt-2">
                  <p className="text-sm"><span className="font-medium">{dept.doctors}</span> Doctors</p>
                  <p className="text-sm"><span className="font-medium">{dept.patients}</span> Patients</p>
                  <p className="text-sm"><span className="font-medium">{dept.rooms}</span> Rooms</p>
                  <p className="text-sm"><span className="font-medium">₹{dept.consultationFee}</span> Consultation Fee</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}

// AI Features Tab
export function AIFeaturesTab() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Brain className="w-8 h-8 text-purple-600" />
          <h2 className="text-2xl">AI-Powered Features</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Brain, title: "AI Appointment Assistant", desc: "Smart scheduling & slot optimization", color: "blue" },
            { icon: MessageCircle, title: "Virtual Receptionist", desc: "24/7 chatbot for patient queries", color: "green" },
            { icon: Activity, title: "Symptom Checker", desc: "Pre-diagnosis & triage assistance", color: "red" },
            { icon: FileCheck, title: "Prescription AI", desc: "Smart prescription suggestions", color: "purple" },
            { icon: BarChart3, title: "Predictive Analytics", desc: "Forecast appointments & revenue", color: "orange" },
            { icon: FileCheck, title: "Report Summarizer", desc: "AI summary of medical reports", color: "pink" }
          ].map((feature, idx) => (
            <Card key={idx} className={`p-6 hover:shadow-lg transition-all cursor-pointer bg-${feature.color}-50`}>
              <feature.icon className={`w-8 h-8 text-${feature.color}-600 mb-3`} />
              <h3 className="font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Activate
              </Button>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Notifications Tab
export function NotificationsTab({ notifications }: any) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl">Notifications & Alerts</h2>
        <Button variant="outline" size="sm">Mark All as Read</Button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification: any) => (
          <Card key={notification.id} className={`p-4 ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}>
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                notification.type === 'appointment' ? 'bg-blue-100' :
                notification.type === 'inventory' ? 'bg-red-100' :
                notification.type === 'payment' ? 'bg-green-100' :
                notification.type === 'staff' ? 'bg-purple-100' :
                'bg-orange-100'
              }`}>
                {notification.type === 'appointment' && <Calendar className="w-5 h-5 text-blue-600" />}
                {notification.type === 'inventory' && <AlertCircle className="w-5 h-5 text-red-600" />}
                {notification.type === 'payment' && <DollarSign className="w-5 h-5 text-green-600" />}
                {notification.type === 'staff' && <Users className="w-5 h-5 text-purple-600" />}
                {notification.type === 'lab' && <FlaskConical className="w-5 h-5 text-orange-600" />}
              </div>
              <div className="flex-1">
                <p className="font-medium mb-1">{notification.message}</p>
                <p className="text-sm text-muted-foreground">{notification.time}</p>
              </div>
              <div className="flex items-center gap-2">
                {!notification.read && <Badge className="bg-blue-600">New</Badge>}
                {notification.priority === "critical" && <Badge className="bg-red-600">Critical</Badge>}
                {notification.priority === "high" && <Badge className="bg-orange-600">High</Badge>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}

export default {
  BillingTab,
  PharmacyTab,
  LabTab,
  StaffTab,
  AnalyticsTab,
  DepartmentsTab,
  AIFeaturesTab,
  NotificationsTab
};
