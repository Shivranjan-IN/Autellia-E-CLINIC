// Extended modules for Doctor Dashboard - Import this in DoctorDashboard.tsx for complete functionality

import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { 
  Video, Wifi, Brain, Target, Package, MessageCircle, Shield, 
  Database, Globe, Mic, FileText, Clock, CheckCircle, XCircle,
  PlayCircle, Download, Send, Eye, Plus, Edit, Trash2, Lock,
  Key, Users, Settings, Bell, Activity, TrendingUp, Zap,
  AlertCircle, FileCheck, CreditCard, Receipt, Archive
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";

// IoT Monitoring Tab Component
export function IoTMonitoringTab({ patients, iotReadings }: any) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">IoT Device Monitoring</h2>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Connect New Device
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 bg-green-50">
            <Wifi className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-2xl font-medium">8</p>
            <p className="text-sm text-muted-foreground">Active Devices</p>
          </Card>
          <Card className="p-4 bg-blue-50">
            <Activity className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-2xl font-medium">234</p>
            <p className="text-sm text-muted-foreground">Readings Today</p>
          </Card>
          <Card className="p-4 bg-orange-50">
            <AlertCircle className="w-8 h-8 text-orange-600 mb-2" />
            <p className="text-2xl font-medium">2</p>
            <p className="text-sm text-muted-foreground">Alerts</p>
          </Card>
        </div>

        <div className="space-y-4">
          {patients.filter((p: any) => p.iotReadings && p.iotReadings.length > 0).map((patient: any) => (
            <Card key={patient.id} className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-sm text-muted-foreground">{patient.iotReadings.length} devices connected</p>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Live Data
                </Button>
              </div>
              <div className="space-y-2">
                {patient.iotReadings.map((reading: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Wifi className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">{reading.device}</p>
                        <p className="text-xs text-muted-foreground">{reading.timestamp}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{reading.reading}</p>
                      <Badge className="bg-green-600 text-xs">Normal</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Telemedicine Sessions Tab Component
export function TelemedicineTab({ sessions }: any) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Telemedicine Sessions</h2>
          <Button>
            <Video className="w-4 h-4 mr-2" />
            Start New Session
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 bg-blue-50">
            <p className="text-sm text-muted-foreground mb-1">Total Sessions</p>
            <p className="text-3xl">45</p>
            <p className="text-sm text-green-600 mt-1">+12 this week</p>
          </Card>
          <Card className="p-4 bg-purple-50">
            <p className="text-sm text-muted-foreground mb-1">Avg Duration</p>
            <p className="text-3xl">28m</p>
            <p className="text-sm text-muted-foreground mt-1">Per session</p>
          </Card>
          <Card className="p-4 bg-green-50">
            <p className="text-sm text-muted-foreground mb-1">Completion Rate</p>
            <p className="text-3xl">98%</p>
            <p className="text-sm text-green-600 mt-1">Excellent</p>
          </Card>
        </div>

        <Tabs defaultValue="completed">
          <TabsList>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="recordings">Recordings</TabsTrigger>
          </TabsList>

          <TabsContent value="completed" className="mt-4 space-y-3">
            {sessions.map((session: any) => (
              <Card key={session.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{session.patient}</p>
                    <p className="text-sm text-muted-foreground">{session.date} • {session.duration}</p>
                    <p className="text-sm text-muted-foreground">{session.notes}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-600">{session.status}</Badge>
                    {session.recording && (
                      <Button variant="outline" size="sm">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Play Recording
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

// AI Predictions Tab Component
export function AIPredictionsTab({ predictions }: any) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">AI Predictions & Risk Analysis</h2>
          <Button>
            <Brain className="w-4 h-4 mr-2" />
            Run New Analysis
          </Button>
        </div>

        <div className="space-y-4">
          {predictions.map((prediction: any, idx: number) => (
            <Card key={idx} className="p-6 border-l-4" style={{
              borderLeftColor: prediction.riskLevel === "High" ? "#ef4444" :
                               prediction.riskLevel === "Medium" ? "#f59e0b" : "#10b981"
            }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">{prediction.patient}</h3>
                  <p className="text-sm text-muted-foreground">{prediction.condition}</p>
                </div>
                <div className="text-right">
                  <Badge className={
                    prediction.riskLevel === "High" ? "bg-red-600" :
                    prediction.riskLevel === "Medium" ? "bg-orange-600" : "bg-green-600"
                  }>
                    {prediction.riskLevel} Risk
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">Score: {prediction.riskScore}/100</p>
                </div>
              </div>

              <div className="mb-4">
                <Label className="text-sm font-medium">Predicted Outcome</Label>
                <p className="text-sm mt-1">{prediction.predictedOutcome}</p>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2">AI Recommendations</Label>
                <ul className="space-y-2">
                  {prediction.recommendations.map((rec: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <Send className="w-4 h-4 mr-2" />
                  Share with Patient
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Partners Integration Tab Component
export function PartnersTab({ pharmacyPartners, labPartners }: any) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl mb-6">Pharmacy & Lab Partners</h2>

        <Tabs defaultValue="pharmacy">
          <TabsList>
            <TabsTrigger value="pharmacy">Pharmacy Partners</TabsTrigger>
            <TabsTrigger value="lab">Lab Partners</TabsTrigger>
          </TabsList>

          <TabsContent value="pharmacy" className="mt-6 space-y-4">
            {pharmacyPartners.map((partner: any) => (
              <Card key={partner.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{partner.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {partner.ordersProcessed} orders • Avg delivery: {partner.avgDeliveryTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-600">{partner.status}</Badge>
                    <Button variant="outline" size="sm">
                      <Send className="w-4 h-4 mr-2" />
                      Send Order
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="lab" className="mt-6 space-y-4">
            {labPartners.map((partner: any) => (
              <Card key={partner.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FileCheck className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">{partner.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {partner.testsOrdered} tests • Turnaround: {partner.avgTurnaround}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-600">{partner.status}</Badge>
                    <Button variant="outline" size="sm">
                      <Send className="w-4 h-4 mr-2" />
                      Order Test
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

// Messages/Chat Tab Component
export function MessagesTab() {
  const messages = [
    { id: 1, patient: "Ramesh Patel", message: "Doctor, my BP is 145/92 today", time: "10 mins ago", unread: true },
    { id: 2, patient: "Anjali Verma", message: "Thank you for the prescription", time: "1 hour ago", unread: false },
    { id: 3, patient: "Suresh Kumar", message: "When should I schedule my next visit?", time: "2 hours ago", unread: true }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Patient Messages</h2>
          <Badge>{messages.filter(m => m.unread).length} unread</Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-2">
            {messages.map(msg => (
              <Card key={msg.id} className={`p-4 cursor-pointer hover:bg-gray-50 ${msg.unread ? 'bg-blue-50 border-blue-200' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium">{msg.patient}</p>
                  {msg.unread && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{msg.message}</p>
                <p className="text-xs text-muted-foreground mt-2">{msg.time}</p>
              </Card>
            ))}
          </div>

          <Card className="lg:col-span-2 p-6">
            <div className="flex flex-col h-[500px]">
              <div className="border-b pb-4 mb-4">
                <p className="font-medium">Ramesh Patel</p>
                <p className="text-sm text-muted-foreground">45 years • Hypertension</p>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
                    <p className="text-sm">Doctor, my BP is 145/92 today</p>
                    <p className="text-xs text-muted-foreground mt-1">10:30 AM</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-pink-600 text-white rounded-lg p-3 max-w-[70%]">
                    <p className="text-sm">Please take your medication as prescribed and rest. Monitor it again in 2 hours.</p>
                    <p className="text-xs opacity-80 mt-1">10:35 AM</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Input placeholder="Type your message..." />
                <Button>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
}

// Notifications Tab Component
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
                notification.type === 'message' ? 'bg-green-100' :
                notification.type === 'admin' ? 'bg-orange-100' :
                notification.type === 'lab' ? 'bg-purple-100' :
                notification.type === 'iot' ? 'bg-red-100' :
                'bg-yellow-100'
              }`}>
                {notification.type === 'appointment' && <Bell className="w-5 h-5 text-blue-600" />}
                {notification.type === 'message' && <MessageCircle className="w-5 h-5 text-green-600" />}
                {notification.type === 'admin' && <AlertCircle className="w-5 h-5 text-orange-600" />}
                {notification.type === 'lab' && <FileCheck className="w-5 h-5 text-purple-600" />}
                {notification.type === 'iot' && <Wifi className="w-5 h-5 text-red-600" />}
                {notification.type === 'review' && <Activity className="w-5 h-5 text-yellow-600" />}
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

// Security & Settings Tab Component
export function SecuritySettingsTab({ doctorProfile }: any) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl mb-6">Security & Privacy Settings</h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Extra security for your account</p>
              </div>
            </div>
            <Switch checked={doctorProfile.twoFactorEnabled} />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">MCI Verification Status</p>
                <p className="text-sm text-muted-foreground">Medical Council of India verified</p>
              </div>
            </div>
            <Badge className="bg-green-600">Verified ✓</Badge>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium">Data Encryption</p>
                <p className="text-sm text-muted-foreground">All patient data is encrypted</p>
              </div>
            </div>
            <Badge className="bg-green-600">Active</Badge>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-orange-600" />
              <div>
                <p className="font-medium">API Access</p>
                <p className="text-sm text-muted-foreground">Integration with external systems</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Manage Keys</Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl mb-4">Role & Permissions</h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground">Role</Label>
              <p className="font-medium">{doctorProfile.role}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Department</Label>
              <p className="font-medium">{doctorProfile.department}</p>
            </div>
          </div>
          <div>
            <Label className="text-muted-foreground">Permissions</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {doctorProfile.permissions.map((perm: string, idx: number) => (
                <Badge key={idx} variant="outline">{perm.replace(/_/g, ' ')}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl mb-4">Audit Log (Recent Activity)</h3>
        <div className="space-y-3">
          {[
            { action: "Login", timestamp: "2025-01-12 09:00 AM", status: "Success" },
            { action: "View Patient Record", timestamp: "2025-01-12 09:15 AM", status: "Success" },
            { action: "Create Prescription", timestamp: "2025-01-12 09:30 AM", status: "Success" }
          ].map((log, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium">{log.action}</p>
                  <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                </div>
              </div>
              <Badge className="bg-green-600">{log.status}</Badge>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          <FileText className="w-4 h-4 mr-2" />
          View Full Audit Log
        </Button>
      </Card>
    </div>
  );
}

// Voice Commands Tab Component
export function VoiceCommandsTab({ voiceCommands }: any) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl">Voice Command History</h2>
        <Button>
          <Mic className="w-4 h-4 mr-2" />
          New Voice Command
        </Button>
      </div>

      <div className="space-y-3">
        {voiceCommands.map((cmd: any, idx: number) => (
          <Card key={idx} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mic className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium">"{cmd.command}"</p>
                  <p className="text-sm text-muted-foreground">{cmd.timestamp}</p>
                </div>
              </div>
              <Badge className={cmd.status === "Success" ? "bg-green-600" : "bg-red-600"}>
                {cmd.status}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 mt-6 bg-blue-50">
        <h4 className="font-medium mb-3">Available Voice Commands</h4>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            "Open patient record",
            "Generate prescription",
            "Schedule appointment",
            "View today's appointments",
            "Check notifications",
            "Start telemedicine session"
          ].map((cmd, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded">
              <Mic className="w-4 h-4 text-blue-600" />
              <p className="text-sm">"{cmd}"</p>
            </div>
          ))}
        </div>
      </Card>
    </Card>
  );
}

// Departments & Services Tab Component
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
                  <p className="text-sm"><span className="font-medium">₹{dept.avgFee}</span> Avg Fee</p>
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

export default {
  IoTMonitoringTab,
  TelemedicineTab,
  AIPredictionsTab,
  PartnersTab,
  MessagesTab,
  NotificationsTab,
  SecuritySettingsTab,
  VoiceCommandsTab,
  DepartmentsTab
};
