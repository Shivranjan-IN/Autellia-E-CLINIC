import { useState } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { PageView } from "../App";
import { FlaskConical, Home, FileText, TruckIcon, Search, Filter, Clock, Star, CheckCircle, Calendar, Shield } from "lucide-react";

interface LabTestsProps {
  onNavigate: (view: PageView) => void;
}

export function LabTests({ onNavigate }: LabTestsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Tests" },
    { id: "blood", name: "Blood Tests" },
    { id: "imaging", name: "Imaging" },
    { id: "diabetes", name: "Diabetes" },
    { id: "thyroid", name: "Thyroid" },
    { id: "liver", name: "Liver" },
  ];

  const tests = [
    { 
      id: 1,
      name: "Complete Blood Count (CBC)", 
      price: 299, 
      mrp: 500, 
      category: "blood",
      type: "Blood Test", 
      turnaround: "24 hours", 
      discount: 40,
      rating: 4.8,
      reviews: 1234,
      parameters: 28,
      description: "Comprehensive blood analysis including RBC, WBC, hemoglobin, and platelets"
    },
    { 
      id: 2,
      name: "Lipid Profile", 
      price: 399, 
      mrp: 700, 
      category: "blood",
      type: "Blood Test", 
      turnaround: "24 hours", 
      discount: 43,
      rating: 4.7,
      reviews: 892,
      parameters: 8,
      description: "Cholesterol, triglycerides, HDL, LDL levels"
    },
    { 
      id: 3,
      name: "HbA1c (Diabetes)", 
      price: 449, 
      mrp: 800, 
      category: "diabetes",
      type: "Blood Test", 
      turnaround: "48 hours", 
      discount: 44,
      rating: 4.9,
      reviews: 756,
      parameters: 1,
      description: "3-month average blood sugar levels"
    },
    { 
      id: 4,
      name: "Thyroid Profile", 
      price: 499, 
      mrp: 1000, 
      category: "thyroid",
      type: "Blood Test", 
      turnaround: "48 hours", 
      discount: 50,
      rating: 4.8,
      reviews: 1456,
      parameters: 3,
      description: "T3, T4, and TSH levels"
    },
    { 
      id: 5,
      name: "Liver Function Test", 
      price: 599, 
      mrp: 1200, 
      category: "liver",
      type: "Blood Test", 
      turnaround: "24 hours", 
      discount: 50,
      rating: 4.6,
      reviews: 543,
      parameters: 12,
      description: "Complete liver health assessment"
    },
    { 
      id: 6,
      name: "X-Ray Chest", 
      price: 350, 
      mrp: 600, 
      category: "imaging",
      type: "Imaging", 
      turnaround: "Same day", 
      discount: 42,
      rating: 4.7,
      reviews: 321,
      parameters: 1,
      description: "Digital chest X-ray with radiologist report"
    },
    { 
      id: 7,
      name: "Vitamin D Test", 
      price: 799, 
      mrp: 1500, 
      category: "blood",
      type: "Blood Test", 
      turnaround: "48 hours", 
      discount: 47,
      rating: 4.8,
      reviews: 678,
      parameters: 1,
      description: "Vitamin D3 (25-OH) levels"
    },
    { 
      id: 8,
      name: "Kidney Function Test", 
      price: 549, 
      mrp: 1000, 
      category: "blood",
      type: "Blood Test", 
      turnaround: "24 hours", 
      discount: 45,
      rating: 4.7,
      reviews: 432,
      parameters: 8,
      description: "Creatinine, urea, BUN analysis"
    },
  ];

  const packages = [
    {
      id: 1,
      name: "Full Body Checkup",
      price: 1999,
      mrp: 4000,
      tests: 70,
      discount: 50,
      popular: true,
      includes: ["CBC", "Lipid Profile", "Liver", "Kidney", "Thyroid", "Diabetes"]
    },
    {
      id: 2,
      name: "Diabetes Package",
      price: 899,
      mrp: 1500,
      tests: 8,
      discount: 40,
      popular: false,
      includes: ["HbA1c", "Fasting Glucose", "PP Glucose", "Lipid Profile"]
    },
    {
      id: 3,
      name: "Senior Citizen Package",
      price: 2499,
      mrp: 5000,
      tests: 90,
      discount: 50,
      popular: true,
      includes: ["Full Body", "Cardiac", "Arthritis", "Vitamin D"]
    },
  ];

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Navigation onNavigate={onNavigate} onGetStarted={() => onNavigate("login")} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl mb-6">Book Lab Tests at Home</h1>
            <p className="text-xl mb-8 opacity-90">
              Save up to 70% on lab tests with free home sample collection
            </p>
            <Badge className="text-lg px-6 py-2 bg-green-500 mb-8">UPTO 70% OFF</Badge>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for lab tests..."
                  className="pl-12 pr-4 py-6 text-lg bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto">
            <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Health Packages */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Popular Health Packages</h2>
            <p className="text-xl text-muted-foreground">Comprehensive health checkups at amazing prices</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card key={pkg.id} className={`p-6 hover:shadow-xl transition-all ${pkg.popular ? 'border-2 border-pink-600' : ''}`}>
                {pkg.popular && (
                  <Badge className="mb-4 bg-pink-600">MOST POPULAR</Badge>
                )}
                <h3 className="text-2xl mb-3">{pkg.name}</h3>
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl text-pink-600 font-semibold">₹{pkg.price}</span>
                    <span className="text-lg text-muted-foreground line-through">₹{pkg.mrp}</span>
                  </div>
                  <Badge className="bg-green-500">{pkg.discount}% OFF</Badge>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">{pkg.tests} Parameters Included</p>
                  <div className="flex flex-wrap gap-2">
                    {pkg.includes.slice(0, 3).map((item, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                    {pkg.includes.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{pkg.includes.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Free home sample collection</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Digital reports in 24-48 hrs</span>
                  </div>
                </div>

                <Button className="w-full" onClick={() => onNavigate("login")}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Package
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Tests */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl mb-2">Popular Lab Tests</h2>
              <p className="text-muted-foreground">
                Showing {filteredTests.length} {filteredTests.length === 1 ? 'test' : 'tests'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <Card key={test.id} className="p-6 hover:shadow-xl transition-all">
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className="bg-purple-500">{test.type}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{test.rating}</span>
                    </div>
                  </div>
                  <h3 className="mb-2">{test.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{test.description}</p>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl text-pink-600 font-semibold">₹{test.price}</span>
                    <span className="text-sm text-muted-foreground line-through">₹{test.mrp}</span>
                  </div>
                  <Badge className="bg-green-500 text-xs">{test.discount}% OFF</Badge>
                </div>

                <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Report in {test.turnaround}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>{test.parameters} Parameters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    <span>Free home collection</span>
                  </div>
                </div>

                <Button className="w-full" onClick={() => onNavigate("login")}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
              </Card>
            ))}
          </div>

          {filteredTests.length === 0 && (
            <div className="text-center py-16">
              <FlaskConical className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl mb-2">No tests found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters
              </p>
              <Button onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Why Book Lab Tests with E-Clinic?</h2>
            <p className="text-xl text-muted-foreground">Trusted by thousands for reliable lab services</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="p-6 text-center hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-pink-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Home className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="mb-2">Home Collection</h3>
              <p className="text-sm text-muted-foreground">Free sample pickup from your doorstep</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FlaskConical className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mb-2">NABL Certified</h3>
              <p className="text-sm text-muted-foreground">Trusted partner labs with certifications</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="mb-2">Digital Reports</h3>
              <p className="text-sm text-muted-foreground">Get reports directly in the app</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="mb-2">Fast Results</h3>
              <p className="text-sm text-muted-foreground">Quick turnaround time</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl text-pink-600 mb-2">50K+</div>
              <p className="text-lg">Tests Conducted</p>
            </div>
            <div>
              <div className="text-5xl text-purple-600 mb-2">4.8★</div>
              <p className="text-lg">Average Rating</p>
            </div>
            <div>
              <div className="text-5xl text-blue-600 mb-2">100%</div>
              <p className="text-lg">Certified Labs</p>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
