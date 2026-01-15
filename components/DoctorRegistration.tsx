import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { 
  ArrowLeft, ArrowRight, Check, Upload, Stethoscope, 
  Phone, Mail, Calendar, CreditCard, Shield, User
} from "lucide-react";

interface DoctorRegistrationProps {
  onComplete: () => void;
  onBack: () => void;
}

export function DoctorRegistration({ onComplete, onBack }: DoctorRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Step 1: Personal Info
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileVerified, setMobileVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  // Step 2: Professional Details
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [councilName, setCouncilName] = useState("");
  const [yearOfRegistration, setYearOfRegistration] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [university, setUniversity] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);

  // Step 3: Documents
  const [medicalCertificate, setMedicalCertificate] = useState<File | null>(null);
  const [degreeCertificate, setDegreeCertificate] = useState<File | null>(null);
  const [governmentId, setGovernmentId] = useState<File | null>(null);
  const [clinicLetter, setClinicLetter] = useState<File | null>(null);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);

  // Step 4: Practice Details
  const [clinicName, setClinicName] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [workingDays, setWorkingDays] = useState<string[]>([]);
  const [consultationFeeOffline, setConsultationFeeOffline] = useState("");
  const [consultationFeeOnline, setConsultationFeeOnline] = useState("");
  const [consultationModes, setConsultationModes] = useState<string[]>([]);
  const [expertiseAreas, setExpertiseAreas] = useState<string[]>([]);
  const [servicesOffered, setServicesOffered] = useState<string[]>([]);

  // Step 5: Financial & Compliance
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [shortBio, setShortBio] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const specializationOptions = [
    "General Medicine", "Cardiology", "Pediatrics", "Dermatology",
    "Orthopedics", "ENT", "Gynecology", "Ophthalmology",
    "Dentistry", "Physiotherapy", "Psychiatry", "Neurology"
  ];

  const expertiseOptions = [
    "Diabetes", "Hypertension", "Asthma", "Arthritis", "Heart Disease",
    "Skin Problems", "Hair Loss", "Fever & Infection", "Pregnancy Care",
    "Child Health", "Mental Health", "Pain Management"
  ];

  const serviceOptions = [
    "Teleconsultation", "Lab Referral", "Prescription Renewal",
    "Health Checkup", "Vaccination", "Home Visit", "Emergency Care"
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
    alert(`OTP sent to ${mobileNumber}`);
    setMobileVerified(true);
  };

  const handleVerifyEmail = () => {
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
    alert("Doctor registration submitted successfully! Your profile will be verified within 24-48 hours.");
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
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl mb-2">Doctor Registration</h1>
            <p className="text-muted-foreground">Join E-Clinic as a verified medical practitioner</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step 
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step ? <Check className="w-5 h-5" /> : step}
                  </div>
                  {step < 5 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      currentStep > step ? 'bg-pink-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Personal</span>
              <span>Professional</span>
              <span>Documents</span>
              <span>Practice</span>
              <span>Financial</span>
            </div>
          </div>

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl mb-4">Personal Information</h3>
              
              <div>
                <Label htmlFor="fullName">Full Name (as per medical license) *</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Dr. Full Name"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:border-pink-600 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="pl-10"
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="profilePhoto">Professional Profile Photo *</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                  <input
                    id="profilePhoto"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload(setProfilePhoto)}
                    className="hidden"
                  />
                  <label htmlFor="profilePhoto" className="cursor-pointer">
                    {profilePhoto ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <Check className="w-5 h-5" />
                        <span>{profilePhoto.name}</span>
                      </div>
                    ) : (
                      <>
                        <User className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">Upload passport-style professional photo</p>
                        <p className="text-xs text-muted-foreground mt-1">JPG, PNG (Max 2MB)</p>
                      </>
                    )}
                  </label>
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
                      placeholder="doctor@example.com"
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
                      Verify
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl mb-4">Professional Details</h3>
              
              <div>
                <Label htmlFor="registrationNumber">Medical Registration Number *</Label>
                <Input
                  id="registrationNumber"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  placeholder="MCI / State Medical Council Registration No."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  🏷️ This is mandatory for verification
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="councilName">Issuing Medical Council *</Label>
                  <Input
                    id="councilName"
                    value={councilName}
                    onChange={(e) => setCouncilName(e.target.value)}
                    placeholder="e.g., Maharashtra Medical Council"
                  />
                </div>

                <div>
                  <Label htmlFor="yearOfRegistration">Year of Registration *</Label>
                  <Input
                    id="yearOfRegistration"
                    type="number"
                    value={yearOfRegistration}
                    onChange={(e) => setYearOfRegistration(e.target.value)}
                    placeholder="e.g., 2015"
                    min="1980"
                    max="2025"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="qualifications">Qualifications *</Label>
                <Input
                  id="qualifications"
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                  placeholder="MBBS, MD, BDS, etc. (comma-separated)"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="university">University / College Name *</Label>
                  <Input
                    id="university"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="University name"
                  />
                </div>

                <div>
                  <Label htmlFor="graduationYear">Year of Graduation *</Label>
                  <Input
                    id="graduationYear"
                    type="number"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    placeholder="e.g., 2010"
                    min="1980"
                    max="2025"
                  />
                </div>
              </div>

              <div>
                <Label>Specialization(s) *</Label>
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
                <Label htmlFor="experience">Total Years of Experience *</Label>
                <Input
                  id="experience"
                  type="number"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g., 10"
                  min="0"
                  max="60"
                />
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

          {/* Step 3: Verification Documents */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl mb-4">Verification Documents</h3>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
                <p className="text-sm text-blue-800">
                  📄 Upload clear copies. All mandatory documents must be submitted for verification.
                </p>
              </div>

              <div>
                <Label htmlFor="medicalCertificate">Medical Registration Certificate *</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                  <input
                    id="medicalCertificate"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload(setMedicalCertificate)}
                    className="hidden"
                  />
                  <label htmlFor="medicalCertificate" className="cursor-pointer">
                    {medicalCertificate ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <Check className="w-5 h-5" />
                        <span>{medicalCertificate.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">Upload Medical Council Registration</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 5MB)</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="degreeCertificate">Degree Certificate (MBBS/MD/BDS) *</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                  <input
                    id="degreeCertificate"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload(setDegreeCertificate)}
                    className="hidden"
                  />
                  <label htmlFor="degreeCertificate" className="cursor-pointer">
                    {degreeCertificate ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <Check className="w-5 h-5" />
                        <span>{degreeCertificate.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">Upload Degree Certificate</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="governmentId">Government ID Proof (Aadhaar/PAN/Passport) *</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                  <input
                    id="governmentId"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload(setGovernmentId)}
                    className="hidden"
                  />
                  <label htmlFor="governmentId" className="cursor-pointer">
                    {governmentId ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <Check className="w-5 h-5" />
                        <span>{governmentId.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">Upload Government ID</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="clinicLetter">Clinic Association Letter / Hospital ID (Optional)</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                  <input
                    id="clinicLetter"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload(setClinicLetter)}
                    className="hidden"
                  />
                  <label htmlFor="clinicLetter" className="cursor-pointer">
                    {clinicLetter ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <Check className="w-5 h-5" />
                        <span>{clinicLetter.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">Upload Clinic Letter (if attached to clinic)</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="signatureFile">Digital Signature (Optional - for e-prescriptions)</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                  <input
                    id="signatureFile"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload(setSignatureFile)}
                    className="hidden"
                  />
                  <label htmlFor="signatureFile" className="cursor-pointer">
                    {signatureFile ? (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <Check className="w-5 h-5" />
                        <span>{signatureFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm">Upload signature image (transparent background preferred)</p>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Practice Details */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl mb-4">Practice Details</h3>
              
              <div>
                <Label htmlFor="clinicName">Current Practicing Clinic / Hospital Name(s)</Label>
                <Input
                  id="clinicName"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  placeholder="Clinic or Hospital name"
                />
              </div>

              <div>
                <Label htmlFor="clinicAddress">Clinic Address</Label>
                <Textarea
                  id="clinicAddress"
                  value={clinicAddress}
                  onChange={(e) => setClinicAddress(e.target.value)}
                  placeholder="Complete address with city, state, PIN"
                  rows={3}
                />
              </div>

              <div>
                <Label>Working Days</Label>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mt-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={`day-${day}`}
                        checked={workingDays.includes(day)}
                        onCheckedChange={() => toggleArrayItem(workingDays, setWorkingDays, day)}
                      />
                      <label htmlFor={`day-${day}`} className="text-sm cursor-pointer">
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="consultationFeeOffline">In-Person Consultation Fee (₹)</Label>
                  <Input
                    id="consultationFeeOffline"
                    type="number"
                    value={consultationFeeOffline}
                    onChange={(e) => setConsultationFeeOffline(e.target.value)}
                    placeholder="e.g., 500"
                  />
                </div>

                <div>
                  <Label htmlFor="consultationFeeOnline">Online Consultation Fee (₹)</Label>
                  <Input
                    id="consultationFeeOnline"
                    type="number"
                    value={consultationFeeOnline}
                    onChange={(e) => setConsultationFeeOnline(e.target.value)}
                    placeholder="e.g., 300"
                  />
                </div>
              </div>

              <div>
                <Label>Modes of Consultation</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {["Walk-in", "Video Call", "Chat", "Home Visit"].map((mode) => (
                    <div key={mode} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mode-${mode}`}
                        checked={consultationModes.includes(mode)}
                        onCheckedChange={() => toggleArrayItem(consultationModes, setConsultationModes, mode)}
                      />
                      <label htmlFor={`mode-${mode}`} className="text-sm cursor-pointer">
                        {mode}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Conditions Treated / Expertise Areas</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {expertiseOptions.map((expertise) => (
                    <div key={expertise} className="flex items-center space-x-2">
                      <Checkbox
                        id={`exp-${expertise}`}
                        checked={expertiseAreas.includes(expertise)}
                        onCheckedChange={() => toggleArrayItem(expertiseAreas, setExpertiseAreas, expertise)}
                      />
                      <label htmlFor={`exp-${expertise}`} className="text-sm cursor-pointer">
                        {expertise}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Services Offered</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {serviceOptions.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={`service-${service}`}
                        checked={servicesOffered.includes(service)}
                        onCheckedChange={() => toggleArrayItem(servicesOffered, setServicesOffered, service)}
                      />
                      <label htmlFor={`service-${service}`} className="text-sm cursor-pointer">
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Financial Details & Compliance */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h3 className="text-xl mb-4">Financial Details & Compliance</h3>
              
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mb-4">
                <p className="text-sm text-yellow-800">
                  💰 Bank details required for receiving consultation payments
                </p>
              </div>

              <div>
                <Label htmlFor="bankAccountName">Bank Account Holder Name</Label>
                <Input
                  id="bankAccountName"
                  value={bankAccountName}
                  onChange={(e) => setBankAccountName(e.target.value)}
                  placeholder="As per bank records"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bankAccountNo">Bank Account Number</Label>
                  <Input
                    id="bankAccountNo"
                    value={bankAccountNo}
                    onChange={(e) => setBankAccountNo(e.target.value)}
                    placeholder="Account number"
                  />
                </div>

                <div>
                  <Label htmlFor="ifscCode">IFSC Code</Label>
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
                  <Label htmlFor="panNumber">PAN Number</Label>
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

              <div>
                <Label htmlFor="shortBio">Short Bio (for public profile)</Label>
                <Textarea
                  id="shortBio"
                  value={shortBio}
                  onChange={(e) => setShortBio(e.target.value)}
                  placeholder="Write a brief introduction about yourself, your expertise, and approach to patient care..."
                  rows={4}
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground mt-1">{shortBio.length}/200 characters</p>
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
                      I accept the <span className="text-pink-600 underline">Terms & Conditions</span> and <span className="text-pink-600 underline">Privacy Policy</span>
                    </label>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-pink-50 rounded-lg">
                    <Checkbox
                      id="declaration"
                      checked={declarationAccepted}
                      onCheckedChange={(checked) => setDeclarationAccepted(checked as boolean)}
                    />
                    <label htmlFor="declaration" className="text-sm cursor-pointer">
                      ✅ I confirm that I am a registered medical practitioner authorized to provide medical consultations
                    </label>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-pink-50 rounded-lg">
                    <Checkbox
                      id="privacy"
                      checked={privacyAccepted}
                      onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                    />
                    <label htmlFor="privacy" className="text-sm cursor-pointer">
                      ✅ I consent to E-Clinic verifying my uploaded documents and credentials
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-green-800 mb-2">
                      <strong>Verification Process:</strong>
                    </p>
                    <ol className="text-sm text-green-700 space-y-1 list-decimal list-inside">
                      <li>Documents reviewed by verification team (24-48 hours)</li>
                      <li>Email/SMS updates on verification status</li>
                      <li>Once verified → "✅ Verified Doctor" badge on profile</li>
                      <li>Your profile goes live on E-Clinic platform</li>
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
                disabled={!termsAccepted || !declarationAccepted || !privacyAccepted}
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
