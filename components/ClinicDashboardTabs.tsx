// Extended tabs for Clinic Dashboard - Continuation of ClinicDashboard.tsx
// Import this component to add remaining tabs

import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Switch } from "./ui/switch";
import { 
  Building2, MapPin, Phone, Mail, Globe, Star, Edit, Camera,
  Stethoscope, Users, Calendar, Clock, DollarSign, Plus, Eye,
  Trash2, X, Download, Send, Printer, Receipt, CreditCard,
  Package, FlaskConical, Pill, FileText, UserPlus, Shield,
  Activity, TrendingUp, BarChart3, CheckCircle, AlertCircle,
  Bell, MessageCircle, Settings, Lock, Key, Database, Languages,
  Mic, Brain, Target, Sparkles, Video, Wifi, Search, Filter,
  Upload, MoreVertical, Award, Repeat, FileCheck
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

// Profile Tab Component
export function ClinicProfileTab({ clinicProfile }: any) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Clinic Profile</h2>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Logo and Quick Info */}
          <div className="space-y-4">
            <Card className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={clinicProfile.logo} alt={clinicProfile.clinicName} />
                  <AvatarFallback>{clinicProfile.clinicName.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute bottom-0 right-0 rounded-full" variant="outline">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <h3 className="text-xl mb-1">{clinicProfile.clinicName}</h3>
              <p className="text-sm text-muted-foreground mb-3">{clinicProfile.tagline}</p>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(clinicProfile.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm">{clinicProfile.rating} ({clinicProfile.totalReviews} reviews)</span>
              </div>

              {clinicProfile.verified && (
                <Badge className="bg-green-600 mb-4">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified Clinic
                </Badge>
              )}

              <div className="grid grid-cols-2 gap-3">
                <Card className="p-3 bg-blue-50">
                  <p className="text-2xl text-blue-600">{clinicProfile.totalDoctors}</p>
                  <p className="text-xs text-muted-foreground">Doctors</p>
                </Card>
                <Card className="p-3 bg-green-50">
                  <p className="text-2xl text-green-600">{clinicProfile.totalStaff}</p>
                  <p className="text-xs text-muted-foreground">Staff</p>
                </Card>
                <Card className="p-3 bg-purple-50">
                  <p className="text-2xl text-purple-600">{clinicProfile.totalBeds}</p>
                  <p className="text-xs text-muted-foreground">Beds</p>
                </Card>
                <Card className="p-3 bg-orange-50">
                  <p className="text-2xl text-orange-600">24x7</p>
                  <p className="text-xs text-muted-foreground">Emergency</p>
                </Card>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="mb-3">Working Hours</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weekdays:</span>
                  <span className="font-medium">{clinicProfile.workingHours.weekdays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weekends:</span>
                  <span className="font-medium">{clinicProfile.workingHours.weekends}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Emergency:</span>
                  <span className="font-medium text-green-600">{clinicProfile.workingHours.emergency}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="p-6">
              <h3 className="mb-4">Basic Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Clinic Name</Label>
                  <p className="font-medium">{clinicProfile.clinicName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Legal Entity</Label>
                  <p className="font-medium">{clinicProfile.legalEntity}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Year Established</Label>
                  <p className="font-medium">{clinicProfile.yearEstablished}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Category</Label>
                  <p className="font-medium">{clinicProfile.clinicCategory}</p>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-muted-foreground">About</Label>
                  <p className="text-sm mt-1">{clinicProfile.aboutClinic}</p>
                </div>
              </div>
            </Card>

            {/* Contact & Location */}
            <Card className="p-6">
              <h3 className="mb-4">Contact & Location</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Address</Label>
                  <p className="font-medium flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    {clinicProfile.address}, {clinicProfile.city}, {clinicProfile.state} - {clinicProfile.pincode}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Contact</Label>
                  <p className="font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    {clinicProfile.mobile}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    {clinicProfile.email}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Website</Label>
                  <p className="font-medium flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    {clinicProfile.website}
                  </p>
                </div>
              </div>
            </Card>

            {/* Registration & Legal */}
            <Card className="p-6">
              <h3 className="mb-4">Registration & Legal Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Registration Number</Label>
                  <p className="font-medium">{clinicProfile.regNumber}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">GST Number</Label>
                  <p className="font-medium">{clinicProfile.gstNumber}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">PAN Number</Label>
                  <p className="font-medium">{clinicProfile.panNumber}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Bank Account</Label>
                  <p className="font-medium">{clinicProfile.bankAccount}</p>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-muted-foreground">IFSC Code</Label>
                  <p className="font-medium">{clinicProfile.ifscCode}</p>
                </div>
              </div>
            </Card>

            {/* Specializations & Services */}
            <Card className="p-6">
              <h3 className="mb-4">Specializations & Services</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">Specializations</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {clinicProfile.specializations.map((spec: string, idx: number) => (
                      <Badge key={idx} variant="secondary">{spec}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Services Offered</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {clinicProfile.services.map((service: string, idx: number) => (
                      <Badge key={idx} className="bg-blue-100 text-blue-700">{service}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Facilities</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {clinicProfile.facilities.map((facility: string, idx: number) => (
                      <Badge key={idx} className="bg-green-100 text-green-700">{facility}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Payment Modes</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {clinicProfile.paymentModes.map((mode: string, idx: number) => (
                      <Badge key={idx} variant="outline">{mode}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Languages Supported</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {clinicProfile.languages.map((lang: string, idx: number) => (
                      <Badge key={idx} variant="outline">{lang}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Consultation Fees */}
            <Card className="p-6">
              <h3 className="mb-4">Consultation Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Base Consultation Fee</Label>
                  <p className="font-medium text-2xl">{clinicProfile.consultationFee}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Online Consultation Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">24x7 Emergency Services</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Doctor Management Tab
export function DoctorManagementTab({ doctors, setSelectedDoctor }: any) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Doctor Management</h2>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Doctor
          </Button>
        </div>

        <div className="space-y-4">
          {doctors.map((doctor: any) => (
            <Card key={doctor.id} className="p-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={doctor.avatar} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.charAt(3)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-lg">{doctor.name}</p>
                      <Badge variant="outline">{doctor.specialty}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{doctor.qualification}</p>
                    <p className="text-sm text-muted-foreground">
                      {doctor.experience} experience • MCI: {doctor.mciNumber}
                    </p>
                    <div className="flex gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{doctor.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {doctor.patients} patients • {doctor.appointments} appointments today
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Consultation Fee</p>
                    <p className="text-lg font-medium">₹{doctor.consultationFee}</p>
                    <p className="text-sm text-muted-foreground">Revenue: ₹{doctor.revenue.toLocaleString()}</p>
                  </div>
                  <Badge className={doctor.status === "Active" ? "bg-green-600" : "bg-gray-600"}>
                    {doctor.status}
                  </Badge>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedDoctor(doctor)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Patient Management Tab
export function PatientManagementTab({ patients, selectedPatient, setSelectedPatient }: any) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = patients.filter((patient: any) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.contact.includes(searchQuery) ||
    patient.abhaId.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Patient Management</h2>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Register New Patient
          </Button>
        </div>

        {/* Search */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, contact, or ABHA ID"
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
          {filteredPatients.map((patient: any) => (
            <Card key={patient.id} className="p-4 hover:shadow-md transition-all">
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
                      {patient.age} years • {patient.gender} • {patient.bloodGroup}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ABHA: {patient.abhaId} • {patient.totalVisits} visits
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Last Visit</p>
                    <p className="text-sm">{patient.lastVisit}</p>
                    <Badge variant="secondary" className="mt-1">{patient.status}</Badge>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient)}>
                    <Eye className="w-4 h-4 mr-2" />
                    Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl">Patient Details: {selectedPatient.name}</h3>
            <Button variant="ghost" onClick={() => setSelectedPatient(null)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <Tabs defaultValue="info">
            <TabsList>
              <TabsTrigger value="info">Information</TabsTrigger>
              <TabsTrigger value="history">Medical History</TabsTrigger>
              <TabsTrigger value="insurance">Insurance</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-4">
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
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{selectedPatient.email}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Blood Group</Label>
                    <p className="font-medium">{selectedPatient.bloodGroup}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Address</Label>
                    <p className="font-medium">{selectedPatient.address}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Registration Date</Label>
                    <p className="font-medium">{selectedPatient.registrationDate}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Last Diagnosis</Label>
                    <p className="font-medium">{selectedPatient.diagnosis}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="insurance" className="mt-4">
              {selectedPatient.insurance ? (
                <Card className="p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Provider</Label>
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
                </Card>
              ) : (
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No insurance information</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </div>
  );
}

export default {
  ClinicProfileTab,
  DoctorManagementTab,
  PatientManagementTab
};
