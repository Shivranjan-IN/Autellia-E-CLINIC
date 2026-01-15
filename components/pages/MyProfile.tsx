import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { toast } from "sonner";
import { 
  User, 
  Calendar as CalendarIcon, 
  Upload, 
  FileText, 
  Save,
  Brain,
  Heart,
  Activity,
  Loader2
} from "lucide-react";
import { format } from "date-fns";

interface MyProfileProps {
  user: any;
}

export function MyProfile({ user }: MyProfileProps) {
  const [activeSection, setActiveSection] = useState("personal");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showAISummary, setShowAISummary] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [aiSummary, setAiSummary] = useState<any>(null);
  
  // Personal Details State
  const [personalDetails, setPersonalDetails] = useState({
    fullName: user?.name || "John Doe",
    dob: new Date(1990, 0, 1),
    gender: "male",
    contact: "+91 9876543210",
    email: user?.email || "john.doe@example.com",
    address: "123 Main Street, Mumbai, Maharashtra 400001"
  });

  // Medical Details State
  const [medicalDetails, setMedicalDetails] = useState({
    abhaId: "12-3456-7890-1234",
    bloodGroup: "O+",
    allergies: "Penicillin, Peanuts",
    ongoingMedications: "Metformin 500mg",
    chronicDiseases: ["Diabetes Type 2", "Hypertension"]
  });

  const [uploadedDocs, setUploadedDocs] = useState([
    { name: "Insurance_Card.pdf", type: "Insurance", date: "2025-01-10", size: "2.4 MB" },
    { name: "Medical_Record_2024.pdf", type: "Medical Record", date: "2024-12-15", size: "1.8 MB" }
  ]);

  const handleSavePersonal = () => {
    // TODO: API call to save personal details
    toast.success("✅ Personal details saved successfully!");
    console.log("Saving personal details:", personalDetails);
  };

  const handleSaveMedical = () => {
    // TODO: API call to save medical details
    toast.success("✅ Medical details saved successfully!");
    console.log("Saving medical details:", medicalDetails);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Add to uploaded docs
          Array.from(files).forEach(file => {
            setUploadedDocs(prev => [...prev, {
              name: file.name,
              type: "Medical Record",
              date: format(new Date(), "yyyy-MM-dd"),
              size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
            }]);
          });
          
          toast.success(`✅ ${files.length} file(s) uploaded successfully!`);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const generateAIHealthSummary = () => {
    setGeneratingAI(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const summary = {
        personalInfo: {
          name: personalDetails.fullName,
          age: new Date().getFullYear() - personalDetails.dob.getFullYear(),
          gender: personalDetails.gender,
          bloodGroup: medicalDetails.bloodGroup,
          abhaId: medicalDetails.abhaId
        },
        medicalInfo: {
          chronicConditions: medicalDetails.chronicDiseases,
          allergies: medicalDetails.allergies.split(",").map(a => a.trim()),
          currentMedications: medicalDetails.ongoingMedications.split(",").map(m => m.trim())
        },
        diagnosticData: {
          recentTests: uploadedDocs.filter(d => d.type === "Medical Record").length,
          lastCheckup: "2025-01-10",
          healthScore: 85
        },
        aiRecommendations: [
          "Monitor blood sugar levels regularly",
          "Maintain consistent medication schedule",
          "Schedule quarterly check-ups with your physician",
          "Consider adding cardiovascular exercise to your routine"
        ],
        riskAssessment: {
          cardiovascular: "Moderate",
          diabetes: "Controlled",
          overall: "Good"
        }
      };
      
      setAiSummary(summary);
      setGeneratingAI(false);
      setShowAISummary(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and medical records</p>
        </div>
        <Button onClick={generateAIHealthSummary} variant="outline" className="gap-2">
          <Brain className="w-4 h-4" />
          Generate AI Health Summary
        </Button>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveSection("personal")}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeSection === "personal"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Personal Details
        </button>
        <button
          onClick={() => setActiveSection("medical")}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeSection === "medical"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Medical Details
        </button>
        <button
          onClick={() => setActiveSection("documents")}
          className={`px-4 py-2 border-b-2 transition-colors ${
            activeSection === "documents"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Documents
        </button>
      </div>

      {/* Personal Details Section */}
      {activeSection === "personal" && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-xl">Personal Information</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={personalDetails.fullName}
                onChange={(e) => setPersonalDetails({ ...personalDetails, fullName: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="dob">Date of Birth *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(personalDetails.dob, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={personalDetails.dob}
                    onSelect={(date) => date && setPersonalDetails({ ...personalDetails, dob: date })}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="gender">Gender *</Label>
              <Select value={personalDetails.gender} onValueChange={(value) => setPersonalDetails({ ...personalDetails, gender: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="contact">Contact Number *</Label>
              <Input
                id="contact"
                value={personalDetails.contact}
                onChange={(e) => setPersonalDetails({ ...personalDetails, contact: e.target.value })}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={personalDetails.email}
                onChange={(e) => setPersonalDetails({ ...personalDetails, email: e.target.value })}
                placeholder="your.email@example.com"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={personalDetails.address}
                onChange={(e) => setPersonalDetails({ ...personalDetails, address: e.target.value })}
                placeholder="Enter your complete address"
                rows={3}
              />
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={handleSavePersonal} className="gap-2">
              <Save className="w-4 h-4" />
              Save Personal Details
            </Button>
          </div>
        </Card>
      )}

      {/* Medical Details Section */}
      {activeSection === "medical" && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-5 h-5 text-primary" />
            <h2 className="text-xl">Medical Information</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="abhaId">ABHA ID</Label>
              <Input
                id="abhaId"
                value={medicalDetails.abhaId}
                onChange={(e) => setMedicalDetails({ ...medicalDetails, abhaId: e.target.value })}
                placeholder="XX-XXXX-XXXX-XXXX"
              />
            </div>

            <div>
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Select value={medicalDetails.bloodGroup} onValueChange={(value) => setMedicalDetails({ ...medicalDetails, bloodGroup: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Input
                id="allergies"
                value={medicalDetails.allergies}
                onChange={(e) => setMedicalDetails({ ...medicalDetails, allergies: e.target.value })}
                placeholder="Enter allergies separated by commas"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="medications">Ongoing Medications</Label>
              <Textarea
                id="medications"
                value={medicalDetails.ongoingMedications}
                onChange={(e) => setMedicalDetails({ ...medicalDetails, ongoingMedications: e.target.value })}
                placeholder="Enter current medications"
                rows={3}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Chronic Diseases</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {medicalDetails.chronicDiseases.map((disease, index) => (
                  <Badge key={index} variant="secondary">
                    {disease}
                  </Badge>
                ))}
              </div>
              <Input
                className="mt-2"
                placeholder="Add chronic disease and press Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value) {
                    setMedicalDetails({
                      ...medicalDetails,
                      chronicDiseases: [...medicalDetails.chronicDiseases, e.currentTarget.value]
                    });
                    e.currentTarget.value = "";
                  }
                }}
              />
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={handleSaveMedical} className="gap-2">
              <Save className="w-4 h-4" />
              Save Medical Details
            </Button>
          </div>
        </Card>
      )}

      {/* Documents Section */}
      {activeSection === "documents" && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-xl">Upload Documents</h2>
          </div>
          
          <div className="border-2 border-dashed rounded-lg p-8 text-center mb-6">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="mb-4">Upload Medical Records, Insurance Card, or other documents</p>
            <Input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <Button variant="outline" className="cursor-pointer" onClick={() => document.getElementById('file-upload')?.click()}>
              Choose Files
            </Button>
            <p className="text-sm text-muted-foreground mt-2">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
          </div>

          {isUploading && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Uploading...</span>
                <span className="text-sm">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          <div className="space-y-3">
            {uploadedDocs.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-primary" />
                  <div>
                    <p>{doc.name}</p>
                    <p className="text-sm text-muted-foreground">{doc.type} • {doc.date} • {doc.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* AI Summary Dialog */}
      <Dialog open={showAISummary} onOpenChange={setShowAISummary}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              AI Health Summary
            </DialogTitle>
          </DialogHeader>
          
          {generatingAI ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Analyzing your health data...</p>
            </div>
          ) : aiSummary && (
            <div className="space-y-6">
              {/* Personal Info */}
              <Card className="p-4">
                <h3 className="text-lg mb-3 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Name:</span> {aiSummary.personalInfo.name}</div>
                  <div><span className="text-muted-foreground">Age:</span> {aiSummary.personalInfo.age} years</div>
                  <div><span className="text-muted-foreground">Gender:</span> {aiSummary.personalInfo.gender}</div>
                  <div><span className="text-muted-foreground">Blood Group:</span> {aiSummary.personalInfo.bloodGroup}</div>
                  <div className="md:col-span-2"><span className="text-muted-foreground">ABHA ID:</span> {aiSummary.personalInfo.abhaId}</div>
                </div>
              </Card>

              {/* Medical Info */}
              <Card className="p-4">
                <h3 className="text-lg mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Medical Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Chronic Conditions:</p>
                    <div className="flex flex-wrap gap-2">
                      {aiSummary.medicalInfo.chronicConditions.map((c: string, i: number) => (
                        <Badge key={i} variant="secondary">{c}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Allergies:</p>
                    <div className="flex flex-wrap gap-2">
                      {aiSummary.medicalInfo.allergies.map((a: string, i: number) => (
                        <Badge key={i} variant="outline">{a}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Current Medications:</p>
                    <div className="flex flex-wrap gap-2">
                      {aiSummary.medicalInfo.currentMedications.map((m: string, i: number) => (
                        <Badge key={i}>{m}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Diagnostic Data */}
              <Card className="p-4">
                <h3 className="text-lg mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Diagnostic Data
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-2xl mb-1">{aiSummary.diagnosticData.recentTests}</p>
                    <p className="text-sm text-muted-foreground">Recent Tests</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-2xl mb-1">{aiSummary.diagnosticData.healthScore}%</p>
                    <p className="text-sm text-muted-foreground">Health Score</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <p className="text-sm mb-1">{aiSummary.diagnosticData.lastCheckup}</p>
                    <p className="text-sm text-muted-foreground">Last Checkup</p>
                  </div>
                </div>
              </Card>

              {/* AI Recommendations */}
              <Card className="p-4">
                <h3 className="text-lg mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Recommendations
                </h3>
                <ul className="space-y-2">
                  {aiSummary.aiRecommendations.map((rec: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Risk Assessment */}
              <Card className="p-4">
                <h3 className="text-lg mb-3">Risk Assessment</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Cardiovascular</p>
                    <Badge variant="outline" className="bg-yellow-50">{aiSummary.riskAssessment.cardiovascular}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Diabetes</p>
                    <Badge variant="outline" className="bg-green-50">{aiSummary.riskAssessment.diabetes}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Overall</p>
                    <Badge variant="outline" className="bg-green-50">{aiSummary.riskAssessment.overall}</Badge>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
