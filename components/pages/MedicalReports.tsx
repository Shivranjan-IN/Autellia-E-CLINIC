import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Skeleton } from "../ui/skeleton";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { 
  Upload,
  Download,
  Eye,
  Brain,
  FileText,
  Search,
  Loader2,
  X,
  Wand2,
  Sparkles,
  AlertCircle,
  Play,
  MessageSquare,
  Send,
  Languages
} from "lucide-react";
import { format } from "date-fns";

type Message = {
  role: 'user' | 'model';
  content: string;
};

export function MedicalReportsEnhanced() {
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showAIExplanation, setShowAIExplanation] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<any>(null);
  const [language, setLanguage] = useState('en');
  
  // Image analysis states
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  
  // Audio states
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audioData, setAudioData] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Chat states
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [reports, setReports] = useState([
    {
      id: 1,
      name: "Complete Blood Count (CBC)",
      uploadDate: "2025-11-10",
      doctor: "Dr. Sarah Johnson",
      type: "Blood Test",
      fileUrl: "#",
      fileSize: "2.4 MB",
      hasAIAnalysis: true
    },
    {
      id: 2,
      name: "Chest X-Ray Report",
      uploadDate: "2025-11-05",
      doctor: "Dr. Michael Chen",
      type: "Radiology",
      fileUrl: "#",
      fileSize: "3.8 MB",
      hasAIAnalysis: true
    },
    {
      id: 3,
      name: "ECG Report",
      uploadDate: "2025-10-28",
      doctor: "Dr. Rajesh Kumar",
      type: "Cardiology",
      fileUrl: "#",
      fileSize: "1.2 MB",
      hasAIAnalysis: true
    },
    {
      id: 4,
      name: "Lipid Profile",
      uploadDate: "2025-10-15",
      doctor: "Dr. Priya Sharma",
      type: "Blood Test",
      fileUrl: "#",
      fileSize: "1.8 MB",
      hasAIAnalysis: false
    }
  ]);

  useEffect(() => {
    if (audioData && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  }, [audioData]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        toast.error("File too large. Please upload an image smaller than 4MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        setImageData(dataUrl);
        clearAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const clearAnalysis = () => {
    setAiExplanation(null);
    setAudioData(null);
    setChatHistory([]);
  };

  const clearImage = () => {
    setImagePreview(null);
    setImageData(null);
    clearAnalysis();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          Array.from(files).forEach((file) => {
            const newReport = {
              id: reports.length + 1,
              name: file.name.replace(/\.[^/.]+$/, ""),
              uploadDate: format(new Date(), "yyyy-MM-dd"),
              doctor: "Self Uploaded",
              type: "Medical Report",
              fileUrl: "#",
              fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
              hasAIAnalysis: false
            };
            setReports(prev => [newReport, ...prev]);
          });
          
          toast.success(`✅ ${files.length} report(s) uploaded successfully!`);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDownload = (report: any) => {
    toast.success(`📥 Downloading ${report.name}...`);
  };

  const handleView = (report: any) => {
    toast.info(`👁️ Opening ${report.name}...`);
  };

  const generateAIExplanation = (report: any) => {
    setSelectedReport(report);
    setGeneratingAI(true);
    setShowAIExplanation(true);
    setLanguage('en');
    clearAnalysis();

    setTimeout(() => {
      let explanation;
      
      if (report.name.includes("Blood Count") || report.name.includes("CBC")) {
        explanation = {
          reportType: "Complete Blood Count (CBC)",
          summary: "Your Complete Blood Count (CBC) results show all parameters within normal ranges, indicating good overall health.",
          keyFindings: [
            {
              parameter: "Hemoglobin",
              value: "14.2 g/dL",
              normalRange: "13.5-17.5 g/dL",
              status: "Normal",
              explanation: "Your hemoglobin level is healthy, indicating good oxygen-carrying capacity in your blood."
            },
            {
              parameter: "White Blood Cells",
              value: "7,200 cells/μL",
              normalRange: "4,000-11,000 cells/μL",
              status: "Normal",
              explanation: "Your white blood cell count is within normal limits, suggesting a healthy immune system."
            },
            {
              parameter: "Platelets",
              value: "245,000/μL",
              normalRange: "150,000-400,000/μL",
              status: "Normal",
              explanation: "Your platelet count is normal, indicating proper blood clotting function."
            }
          ],
          recommendations: [
            "Continue maintaining a balanced diet rich in iron and vitamins",
            "Stay hydrated and maintain regular physical activity",
            "Schedule routine check-ups every 6 months"
          ]
        };
      } else if (report.name.includes("X-Ray")) {
        explanation = {
          reportType: "Chest X-Ray",
          summary: "The chest X-ray shows clear lung fields with no significant abnormalities detected.",
          keyFindings: [
            {
              parameter: "Lung Fields",
              value: "Clear bilaterally",
              normalRange: "N/A",
              status: "Normal",
              explanation: "Both lungs appear clear without any signs of infection, fluid, or masses."
            },
            {
              parameter: "Heart Size",
              value: "Normal",
              normalRange: "N/A",
              status: "Normal",
              explanation: "The cardiac silhouette is within normal limits."
            }
          ],
          recommendations: [
            "No immediate action required based on imaging",
            "Maintain regular health check-ups"
          ]
        };
      } else if (report.name.includes("ECG")) {
        explanation = {
          reportType: "Electrocardiogram (ECG)",
          summary: "Your ECG shows a normal sinus rhythm with no significant abnormalities.",
          keyFindings: [
            {
              parameter: "Heart Rate",
              value: "72 bpm",
              normalRange: "60-100 bpm",
              status: "Normal",
              explanation: "Your heart rate is within the healthy range for adults at rest."
            },
            {
              parameter: "Rhythm",
              value: "Regular sinus rhythm",
              normalRange: "N/A",
              status: "Normal",
              explanation: "Your heart beats in a normal, regular pattern."
            }
          ],
          recommendations: [
            "Continue current cardiovascular health practices",
            "Maintain regular exercise routine"
          ]
        };
      } else {
        explanation = {
          reportType: report.type,
          summary: "This report has been analyzed and appears to show results within expected parameters.",
          keyFindings: [
            {
              parameter: "Overall Assessment",
              value: "Normal",
              normalRange: "N/A",
              status: "Normal",
              explanation: "The test results appear to be within normal ranges."
            }
          ],
          recommendations: [
            "Discuss results with your healthcare provider",
            "Follow recommended treatment plans if any"
          ]
        };
      }

      setAiExplanation(explanation);
      const initialContext: Message = {
        role: 'user',
        content: `Here is the medical report analysis. Please answer my questions based on this information only. Analysis: ${JSON.stringify(explanation)}`,
      };
      setChatHistory([initialContext]);
      setGeneratingAI(false);
    }, 2500);
  };

  const handlePlayAudio = async () => {
    if (!aiExplanation) return;
    setIsAudioLoading(true);
    
    // Simulate audio generation
    setTimeout(() => {
      toast.success("🔊 Audio playback ready!");
      setIsAudioLoading(false);
      // In production, this would be actual audio data from text-to-speech API
    }, 1500);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const newUserMessage: Message = { role: 'user', content: chatInput };
    setChatHistory(prev => [...prev, newUserMessage]);
    setIsChatLoading(true);
    setChatInput('');

    // Simulate AI bot response
    setTimeout(() => {
      const responses = [
        "Based on your report, everything appears normal. Is there a specific parameter you're concerned about?",
        "That's a great question! Let me explain: The values shown are within healthy ranges which is positive.",
        "Yes, these results indicate good health. Make sure to follow the recommendations provided.",
        "I understand your concern. The test shows normal function. However, always consult your doctor for personalized advice."
      ];
      
      const botResponse = responses[Math.floor(Math.random() * responses.length)];
      const newBotMessage: Message = { role: 'model', content: botResponse };
      setChatHistory(prev => [...prev, newBotMessage]);
      setIsChatLoading(false);
    }, 1000);
  };

  const filteredReports = reports.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Medical Reports</h1>
          <p className="text-muted-foreground">Upload, view, and get AI-powered explanations of your medical reports</p>
        </div>
      </div>

      {/* Upload Section */}
      <Card className="p-6">
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="mb-4">Upload Medical Reports (PDF, JPG, PNG)</p>
          <Input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="hidden"
            id="report-upload"
          />
          <Button variant="outline" className="cursor-pointer" onClick={() => document.getElementById('report-upload')?.click()}>
            Choose Files
          </Button>
          <p className="text-sm text-muted-foreground mt-2">Max file size: 10MB per file</p>
        </div>

        {isUploading && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Uploading reports...</span>
              <span className="text-sm">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} />
          </div>
        )}
      </Card>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search reports by name, doctor, or type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Reports</p>
          <p className="text-2xl">{reports.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">This Month</p>
          <p className="text-2xl text-blue-600">2</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">AI Analyzed</p>
          <p className="text-2xl text-purple-600">
            {reports.filter(r => r.hasAIAnalysis).length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Pending Review</p>
          <p className="text-2xl text-orange-600">
            {reports.filter(r => !r.hasAIAnalysis).length}
          </p>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>File</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No reports found
                </TableCell>
              </TableRow>
            ) : (
              filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">{report.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(report.uploadDate), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>{report.doctor}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{report.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{report.fileSize}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => generateAIExplanation(report)}
                        className="gap-2"
                      >
                        <Brain className="w-4 h-4" />
                        AI Explain
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(report)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(report)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Enhanced AI Explanation Dialog */}
      <Dialog open={showAIExplanation} onOpenChange={setShowAIExplanation}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-600" />
                AI Report Analysis
              </DialogTitle>
              <Tabs value={language} onValueChange={setLanguage}>
                <TabsList>
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="hi">हिंदी</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <DialogDescription>
              {selectedReport?.name} - Patient-friendly AI analysis
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            {generatingAI ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-12 h-12 animate-spin text-purple-600 mb-4" />
                <p className="text-muted-foreground">Analyzing your report with AI...</p>
              </div>
            ) : aiExplanation && (
              <div className="space-y-6 pr-2">
                {/* Header with Audio */}
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-lg px-4 py-2">
                    🩻 {aiExplanation.reportType}
                  </Badge>
                  <Button onClick={handlePlayAudio} size="sm" variant="outline" disabled={isAudioLoading}>
                    {isAudioLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                    {language === 'hi' ? 'ऑडियो में सुनें' : 'Listen to Audio'}
                  </Button>
                </div>

                {/* Summary */}
                <Card className="p-4 bg-purple-50 border-purple-200">
                  <h3 className="text-lg mb-2">🧠 {language === 'hi' ? 'सारांश' : 'Summary'}</h3>
                  <p>{aiExplanation.summary}</p>
                </Card>

                {/* Key Findings */}
                <div>
                  <h3 className="text-lg mb-3">🧩 {language === 'hi' ? 'मुख्य निष्कर्ष' : 'Key Findings'}</h3>
                  <div className="space-y-3">
                    {aiExplanation.keyFindings.map((finding: any, index: number) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium">{finding.parameter}</p>
                            <p className="text-sm text-muted-foreground">{finding.normalRange}</p>
                          </div>
                          <Badge 
                            variant={finding.status === "Normal" ? "outline" : "destructive"}
                            className={finding.status === "Normal" ? "bg-green-50 text-green-700 border-green-200" : ""}
                          >
                            {finding.status}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2"><strong>{language === 'hi' ? 'मान' : 'Value'}:</strong> {finding.value}</p>
                        <p className="text-sm text-muted-foreground">{finding.explanation}</p>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-lg mb-3">💊 {language === 'hi' ? 'सिफारिशें' : 'Recommendations'}</h3>
                  <Card className="p-4">
                    <ul className="space-y-2">
                      {aiExplanation.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-purple-600 mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                {/* Chat Section */}
                {chatHistory.length > 1 && (
                  <Card className="p-4">
                    <h3 className="text-lg mb-3 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      {language === 'hi' ? 'प्रश्न पूछें' : 'Ask Questions'}
                    </h3>
                    <div className="space-y-4 h-48 overflow-y-auto mb-4 p-4 border rounded-md bg-muted/30">
                      {chatHistory.slice(1).map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                            {msg.content}
                          </div>
                        </div>
                      ))}
                      {isChatLoading && <div className="flex justify-start"><div className="p-3 rounded-lg bg-secondary"><Loader2 className="h-5 h-5 animate-spin" /></div></div>}
                    </div>
                    <form onSubmit={handleChatSubmit} className="flex gap-2">
                      <Textarea
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder={language === 'hi' ? 'अपना सवाल यहाँ लिखें...' : 'Type your question here...'}
                        className="flex-1"
                        disabled={isChatLoading}
                        rows={2}
                      />
                      <Button type="submit" disabled={isChatLoading || !chatInput.trim()}>
                        {isChatLoading ? <Loader2 className="h-4 w-4 animate-spin"/> : <Send className="h-4 w-4" />}
                      </Button>
                    </form>
                  </Card>
                )}

                {/* Disclaimer */}
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{language === 'hi' ? 'चेतावनी' : 'Disclaimer'}</AlertTitle>
                  <AlertDescription>
                    {language === 'hi' 
                      ? 'यह AI विश्लेषण केवल सूचना के उद्देश्यों के लिए है और पेशेवर चिकित्सा सलाह का विकल्प नहीं है। हमेशा एक योग्य डॉक्टर से परामर्श करें।'
                      : 'This AI analysis is for informational purposes only and is not a substitute for professional medical advice. Always consult a qualified doctor.'}
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>

          {audioData && <audio ref={audioRef} src={audioData} className="hidden" />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
