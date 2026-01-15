import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { 
  ArrowLeft, ArrowRight, Check, Upload, Building2, 
  Phone, Mail, MapPin, FileText, Camera, CreditCard,
  Clock, Users, Shield, Star, X
} from "lucide-react";

interface ClinicRegistrationProps {
  onComplete: () => void;
  onBack: () => void;
}

export function ClinicRegistration({ onComplete, onBack }: ClinicRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Form state - Basic Info
  const [clinicName, setClinicName] = useState("");
  const [legalEntity, setLegalEntity] = useState("");
  const [yearEstablished, setYearEstablished] = useState("");
  const [clinicCategory, setClinicCategory] = useState("");
  const [tagline, setTagline] = useState("");
  const [aboutClinic, setAboutClinic] = useState("");

  // Contact & Location
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileVerified, setMobileVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [website, setWebsite] = useState("");

  // Documents
  const [regCertificate, setRegCertificate] = useState<File | null>(null);
  const [doctorRegNo, setDoctorRegNo] = useState("");
  const [ownerIdProof, setOwnerIdProof] = useState<File | null>(null);
  const [addressProof, setAddressProof] = useState<File | null>(null);
  const [gstCertificate, setGstCertificate] = useState<File | null>(null);

  // Staff & Operations
  const [doctorName, setDoctorName] = useState("");
  const [doctorQualification, setDoctorQualification] = useState("");
  const [doctorRegNumber, setDoctorRegNumber] = useState("");
  const [doctorExperience, setDoctorExperience] = useState("");
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  // Clinic Operations
  const [emergencyAvailable, setEmergencyAvailable] = useState(false);
  const [onlineConsultation, setOnlineConsultation] = useState(false);
  const [consultationFee, setConsultationFee] = useState("");
  const [appointmentModes, setAppointmentModes] = useState<string[]>([]);

  // Services & Facilities
  const [services, setServices] = useState<string[]>([]);
  const [facilities, setFacilities] = useState<string[]>([]);
  const [paymentModes, setPaymentModes] = useState<string[]>([]);

  // Financial
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  // Compliance
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  const specializationOptions = [
    "General Medicine", "Cardiology", "Pediatrics", "Dermatology",
    "Orthopedics", "ENT", "Gynecology", "Ophthalmology",
    "Dentistry", "Physiotherapy", "Pathology", "Radiology"
  ];

  const serviceOptions = [
    "General Checkup", "Blood Test", "ECG", "X-Ray", "Ultrasound",
    "Vaccination", "Minor Surgery", "Physiotherapy", "Dental Care",
    "Eye Checkup", "Pregnancy Care", "Emergency Care"
  ];

  const facilityOptions = [
    "Wi-Fi", "Parking", "Wheelchair Access", "Pharmacy", "Laboratory",
    "24/7 Emergency", "Ambulance", "Cafeteria", "Waiting Room", "AC"
  ];

  const handleFileUpload = (setter: (file: File | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const toggleArrayItem = (array: string[], setter: (arr: string[]) => void, item: string) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  const handleVerifyMobile = () => {
    // Mock OTP verification
    alert(`OTP sent to ${mobileNumber}`);
    setMobileVerified(true);
  };

  const handleVerifyEmail = () => {
    // Mock email verification
    alert(`Verification link sent to ${email}`);
    setEmailVerified(true);
  };

  const handleNext = () => {
    setCurrentStep(Math.min(currentStep + 1, totalSteps));
  };

  const handlePrevious = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  const handleSubmit = () => {
    alert("Clinic registration submitted successfully! Our team will verify your documents within 24-48 hours.");
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl mb-2">Clinic Registration</h1>
            <p className="text-muted-foreground">Complete all steps to register your clinic</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step 
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step ? <Check className="w-5 h-5" /> : step}
                  </div>
                  {step < 6 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      currentStep > step ? 'bg-pink-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Basic Info</span>
              <span>Contact</span>
              <span>Documents</span>
              <span>Staff</span>
              <span>Services</span>
              <span>Financial</span>
            </div>
          </div>

          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl mb-4">Basic Information</h3>
              
              <div>
                <Label htmlFor="clinicName">Clinic Name (Official) *</Label>
                <Input
                  id="clinicName"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  placeholder="As per registration certificate"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="legalEntity">Legal Entity Type *</Label>
                  <select
                    id="legalEntity"
                    value={legalEntity}
                    onChange={(e) => setLegalEntity(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:border-pink-600 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="individual">Individual</option>
                    <option value="partnership">Partnership</option>
                    <option value="pvt-ltd">Private Limited</option>
                    <option value="trust">Trust</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="yearEstablished">Year of Establishment *</Label>
                  <Input
                    id="yearEstablished"
                    type="number"
                    value={yearEstablished}
                    onChange={(e) => setYearEstablished(e.target.value)}
                    placeholder="e.g., 2010"
                    min="1900"
                    max="2025"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="clinicCategory">Clinic Category *</Label>
                <select
                  id="clinicCategory"
                  value={clinicCategory}
                  onChange={(e) => setClinicCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:border-pink-600 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="hospital">Hospital</option>
                  <option value="polyclinic">Polyclinic</option>
                  <option value="diagnostic">Diagnostic Center</option>
                  <option value="pharmacy">Pharmacy</option>
                  <option value="individual">Individual Practice</option>
                </select>
              </div>

              <div>
                <Label htmlFor="tagline">Tagline (Short Description)</Label>
                <Input
                  id="tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g., Your Health, Our Priority"
                  maxLength={100}
                />
              </div>

              <div>
                <Label htmlFor="aboutClinic">About Clinic</Label>
                <Textarea
                  id="aboutClinic"
                  value={aboutClinic}
                  onChange={(e) => setAboutClinic(e.target.value)}
                  placeholder="Describe your clinic, specialties, vision, facilities..."
                  rows={4}
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground mt-1">{aboutClinic.length}/500 characters</p>
              </div>
            </div>
          )}

          {/* Step 2: Contact & Location */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl mb-4">Contact & Location</h3>
              
              <div>
                <Label htmlFor="address">Clinic Address *</Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Complete address with landmark"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="pincode">PIN Code *</Label>
                  <Input
                    id="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="6-digit PIN"
                    maxLength={6}
                  />
                </div>

                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City name"
                  />
                </div>

                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="mobile">Mobile Number *</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="mobile"
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="10-digit mobile"
                      className="pl-10"
                      maxLength={10}
                    />
                  </div>
                  {mobileVerified ? (
                    <Badge className="bg-green-100 text-green-600">
                      <Check className="w-4 h-4 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Button 
                      onClick={handleVerifyMobile}
                      disabled={mobileNumber.length !== 10}
                    >
                      Verify OTP
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email ID *</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="clinic@example.com"
                      className="pl-10"
                    />
                  </div>
                  {emailVerified ? (
                    <Badge className="bg-green-100 text-green-600">
                      <Check className="w-4 h-4 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Button 
                      onClick={handleVerifyEmail}
                      disabled={!email.includes('@')}
                    >
                      Verify Email
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="website">Website / Social Links (Optional)</Label>
                <Input
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://www.yourclinic.com"
                />
              </div>
            </div>
          )}

          {/* Step 3: Verification Documents */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl mb-4">Verification Documents</h3>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
                <p className="text-sm text-blue-800">
                  📄 Upload clear images or PDFs. All documents are mandatory for verification.
                </p>
              </div>

              <div>
                <Label htmlFor="regCertificate">Clinic Registration Certificate / License *</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                  <input
                    id="regCertificate"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload(setRegCertificate)}
                    className="hidden"
                  />
                  <label htmlFor="regCertificate" className="cursor-pointer">
                    {regCertificate ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <Check className="w-5 h-5" />
                        <span>{regCertificate.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">Click to upload or drag & drop</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 5MB)</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="doctorRegNo">Doctor's Medical Council Registration Number *</Label>
                <Input
                  id="doctorRegNo"
                  value={doctorRegNo}
                  onChange={(e) => setDoctorRegNo(e.target.value)}
                  placeholder="MCI / State Medical Council Registration No."
                />
              </div>

              <div>
                <Label htmlFor="ownerIdProof">Owner / Admin ID Proof (Aadhaar / PAN) *</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                  <input
                    id="ownerIdProof"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload(setOwnerIdProof)}
                    className="hidden"
                  />
                  <label htmlFor="ownerIdProof" className="cursor-pointer">
                    {ownerIdProof ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <Check className="w-5 h-5" />
                        <span>{ownerIdProof.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">Upload ID Proof</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="addressProof">Clinic Address Proof *</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                  <input
                    id="addressProof"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload(setAddressProof)}
                    className="hidden"
                  />
                  <label htmlFor="addressProof" className="cursor-pointer">
                    {addressProof ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <Check className="w-5 h-5" />
                        <span>{addressProof.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">Utility Bill / Rent Agreement / Clinic Photo</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="gstCertificate">GST Certificate (Optional)</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                  <input
                    id="gstCertificate"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload(setGstCertificate)}
                    className="hidden"
                  />
                  <label htmlFor="gstCertificate" className="cursor-pointer">
                    {gstCertificate ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <Check className="w-5 h-5" />
                        <span>{gstCertificate.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">Upload GST Certificate (if applicable)</p>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Doctor / Staff Details */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl mb-4">Doctor / Staff Details</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="doctorName">Doctor's Full Name *</Label>
                  <Input
                    id="doctorName"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    placeholder="Dr. Full Name"
                  />
                </div>

                <div>
                  <Label htmlFor="doctorQualification">Qualification *</Label>
                  <Input
                    id="doctorQualification"
                    value={doctorQualification}
                    onChange={(e) => setDoctorQualification(e.target.value)}
                    placeholder="MBBS, MD, BDS, etc."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="doctorRegNumber">Medical Registration No. *</Label>
                  <Input
                    id="doctorRegNumber"
                    value={doctorRegNumber}
                    onChange={(e) => setDoctorRegNumber(e.target.value)}
                    placeholder="MCI / State Council No."
                  />
                </div>

                <div>
                  <Label htmlFor="doctorExperience">Years of Experience *</Label>
                  <Input
                    id="doctorExperience"
                    type="number"
                    value={doctorExperience}
                    onChange={(e) => setDoctorExperience(e.target.value)}
                    placeholder="e.g., 10"
                  />
                </div>
              </div>

              <div>
                <Label>Specializations *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {specializationOptions.map((spec) => (
                    <div key={spec} className="flex items-center space-x-2">
                      <Checkbox
                        id={`spec-${spec}`}
                        checked={specializations.includes(spec)}
                        onCheckedChange={() => toggleArrayItem(specializations, setSpecializations, spec)}
                      />
                      <label htmlFor={`spec-${spec}`} className="text-sm cursor-pointer">
                        {spec}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Languages Spoken *</Label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                  {["Hindi", "English", "Marathi", "Bengali", "Tamil", "Telugu", "Gujarati", "Punjabi"].map((lang) => (
                    <div key={lang} className="flex items-center space-x-2">
                      <Checkbox
                        id={`lang-${lang}`}
                        checked={languages.includes(lang)}
                        onCheckedChange={() => toggleArrayItem(languages, setLanguages, lang)}
                      />
                      <label htmlFor={`lang-${lang}`} className="text-sm cursor-pointer">
                        {lang}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Services & Facilities */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h3 className="text-xl mb-4">Services & Facilities</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="emergency"
                    checked={emergencyAvailable}
                    onCheckedChange={(checked) => setEmergencyAvailable(checked as boolean)}
                  />
                  <label htmlFor="emergency" className="text-sm cursor-pointer">
                    24/7 Emergency Services Available
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="online"
                    checked={onlineConsultation}
                    onCheckedChange={(checked) => setOnlineConsultation(checked as boolean)}
                  />
                  <label htmlFor="online" className="text-sm cursor-pointer">
                    Online Consultation Available
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="consultationFee">Average Consultation Fee (₹) *</Label>
                <Input
                  id="consultationFee"
                  type="number"
                  value={consultationFee}
                  onChange={(e) => setConsultationFee(e.target.value)}
                  placeholder="e.g., 500"
                />
              </div>

              <div>
                <Label>Appointment Modes *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {["Walk-in", "Call Booking", "Online Booking"].map((mode) => (
                    <div key={mode} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mode-${mode}`}
                        checked={appointmentModes.includes(mode)}
                        onCheckedChange={() => toggleArrayItem(appointmentModes, setAppointmentModes, mode)}
                      />
                      <label htmlFor={`mode-${mode}`} className="text-sm cursor-pointer">
                        {mode}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Services Offered *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {serviceOptions.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={`service-${service}`}
                        checked={services.includes(service)}
                        onCheckedChange={() => toggleArrayItem(services, setServices, service)}
                      />
                      <label htmlFor={`service-${service}`} className="text-sm cursor-pointer">
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Facilities Available</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {facilityOptions.map((facility) => (
                    <div key={facility} className="flex items-center space-x-2">
                      <Checkbox
                        id={`facility-${facility}`}
                        checked={facilities.includes(facility)}
                        onCheckedChange={() => toggleArrayItem(facilities, setFacilities, facility)}
                      />
                      <label htmlFor={`facility-${facility}`} className="text-sm cursor-pointer">
                        {facility}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Payment Modes Accepted *</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {["Cash", "UPI", "Card", "Insurance"].map((payment) => (
                    <div key={payment} className="flex items-center space-x-2">
                      <Checkbox
                        id={`payment-${payment}`}
                        checked={paymentModes.includes(payment)}
                        onCheckedChange={() => toggleArrayItem(paymentModes, setPaymentModes, payment)}
                      />
                      <label htmlFor={`payment-${payment}`} className="text-sm cursor-pointer">
                        {payment}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Financial & Compliance */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <h3 className="text-xl mb-4">Financial Details & Compliance</h3>
              
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mb-4">
                <p className="text-sm text-yellow-800">
                  💰 Bank details are required for receiving payouts from online consultations
                </p>
              </div>

              <div>
                <Label htmlFor="bankAccountName">Bank Account Holder Name *</Label>
                <Input
                  id="bankAccountName"
                  value={bankAccountName}
                  onChange={(e) => setBankAccountName(e.target.value)}
                  placeholder="As per bank records"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bankAccountNo">Bank Account Number *</Label>
                  <Input
                    id="bankAccountNo"
                    value={bankAccountNo}
                    onChange={(e) => setBankAccountNo(e.target.value)}
                    placeholder="Account number"
                  />
                </div>

                <div>
                  <Label htmlFor="ifscCode">IFSC Code *</Label>
                  <Input
                    id="ifscCode"
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                    placeholder="e.g., SBIN0001234"
                    maxLength={11}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="panNumber">PAN Number *</Label>
                  <Input
                    id="panNumber"
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                    placeholder="e.g., ABCDE1234F"
                    maxLength={10}
                  />
                </div>

                <div>
                  <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                  <Input
                    id="gstNumber"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                    placeholder="15-digit GSTIN"
                    maxLength={15}
                  />
                </div>
              </div>

              <div className="pt-6 border-t">
                <h4 className="mb-4">Compliance & Declaration</h4>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-pink-50 rounded-lg">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                    />
                    <label htmlFor="terms" className="text-sm cursor-pointer">
                      I accept the <span className="text-pink-600 underline">Terms & Conditions</span> and <span className="text-pink-600 underline">Privacy Policy</span> of E-Clinic
                    </label>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-pink-50 rounded-lg">
                    <Checkbox
                      id="declaration"
                      checked={declarationAccepted}
                      onCheckedChange={(checked) => setDeclarationAccepted(checked as boolean)}
                    />
                    <label htmlFor="declaration" className="text-sm cursor-pointer">
                      ✅ I confirm that all the information provided is true and accurate. I understand that E-Clinic is not meant for collecting PII or securing sensitive data beyond what is necessary for healthcare services.
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-green-800 mb-2">
                      <strong>What happens next?</strong>
                    </p>
                    <ol className="text-sm text-green-700 space-y-1 list-decimal list-inside">
                      <li>Our verification team will review your documents (24-48 hours)</li>
                      <li>You'll receive email/SMS updates on verification status</li>
                      <li>Once approved, you'll get a "✅ Verified Clinic" badge</li>
                      <li>Your clinic profile will go live on E-Clinic platform</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            ) : (
              <div></div>
            )}

            {currentStep < totalSteps ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={!termsAccepted || !declarationAccepted}
                className="bg-gradient-to-r from-pink-600 to-purple-600"
              >
                <Check className="w-4 h-4 mr-2" />
                Submit for Verification
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
