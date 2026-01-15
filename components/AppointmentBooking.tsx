import { useState } from 'react';
import { Heart, Search, Calendar, Clock, Video, MapPin, ChevronRight, ChevronLeft, Star, Filter, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

interface AppointmentBookingEnhancedProps {
  onClose: () => void;
  onBookingComplete?: () => void;
}

export function AppointmentBookingEnhanced({ onClose, onBookingComplete }: AppointmentBookingEnhancedProps) {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState('in-person');

  const specialties = [
    { id: 'all', name: 'All Specialties', icon: '🏥' },
    { id: 'cardiology', name: 'Cardiology', icon: '❤️' },
    { id: 'orthopedics', name: 'Orthopedics', icon: '🦴' },
    { id: 'general', name: 'General Medicine', icon: '🩺' },
    { id: 'pediatrics', name: 'Pediatrics', icon: '👶' },
    { id: 'dermatology', name: 'Dermatology', icon: '💆' }
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      specialty: 'Cardiology',
      experience: '15 years',
      rating: 4.9,
      reviews: 234,
      fee: 500,
      nextAvailable: 'Today',
      image: '👩‍⚕️',
      qualifications: 'MBBS, MD (Cardiology)',
      languages: ['Hindi', 'English'],
      consultationType: ['video', 'in-person']
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      specialty: 'General Medicine',
      experience: '12 years',
      rating: 4.8,
      reviews: 189,
      fee: 400,
      nextAvailable: 'Tomorrow',
      image: '👨‍⚕️',
      qualifications: 'MBBS, MD',
      languages: ['Hindi', 'English', 'Punjabi'],
      consultationType: ['video', 'in-person']
    },
    {
      id: 3,
      name: 'Dr. Sneha Patel',
      specialty: 'Pediatrics',
      experience: '10 years',
      rating: 4.9,
      reviews: 156,
      fee: 450,
      nextAvailable: 'Today',
      image: '👩‍⚕️',
      qualifications: 'MBBS, MD (Pediatrics)',
      languages: ['Hindi', 'English', 'Gujarati'],
      consultationType: ['video', 'in-person']
    },
    {
      id: 4,
      name: 'Dr. Amit Singh',
      specialty: 'Orthopedics',
      experience: '18 years',
      rating: 4.7,
      reviews: 201,
      fee: 600,
      nextAvailable: 'Nov 8',
      image: '👨‍⚕️',
      qualifications: 'MBBS, MS (Orthopedics)',
      languages: ['Hindi', 'English'],
      consultationType: ['in-person']
    }
  ];

  const dates = [
    { date: '15', day: 'Wed', month: 'Nov', available: true },
    { date: '16', day: 'Thu', month: 'Nov', available: true },
    { date: '17', day: 'Fri', month: 'Nov', available: true },
    { date: '18', day: 'Sat', month: 'Nov', available: true },
    { date: '19', day: 'Sun', month: 'Nov', available: false },
    { date: '20', day: 'Mon', month: 'Nov', available: true },
    { date: '21', day: 'Tue', month: 'Nov', available: true }
  ];

  const timeSlots = {
    morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    afternoon: ['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'],
    evening: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM']
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || 
                            doctor.specialty.toLowerCase().includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor);
    setStep(2);
  };

  const handleDateSelect = (date: any) => {
    if (date.available) {
      setSelectedDate(date);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
  };

  const handleBooking = () => {
    toast.success('🎉 Appointment booked successfully!');
    onBookingComplete?.();
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-xl">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl">Book Appointment</h1>
                  <p className="text-sm text-muted-foreground">Find and book with the best doctors</p>
                </div>
              </div>
              <Button variant="outline" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[
                { num: 1, label: 'Select Doctor' },
                { num: 2, label: 'Choose Date & Time' },
                { num: 3, label: 'Confirm Booking' }
              ].map((s, idx) => (
                <div key={s.num} className="flex items-center">
                  <div className={`flex items-center space-x-3 ${step >= s.num ? 'opacity-100' : 'opacity-40'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= s.num 
                        ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                    </div>
                    <span className="hidden md:block">{s.label}</span>
                  </div>
                  {idx < 2 && <ChevronRight className="w-5 h-5 mx-4 text-gray-400" />}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Select Doctor */}
          {step === 1 && (
            <div>
              {/* Search and Filters */}
              <Card className="p-6 mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search doctors by name or specialty..."
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-700">Filter by:</span>
                    <select 
                      value={consultationType}
                      onChange={(e) => setConsultationType(e.target.value)}
                      className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-pink-600 focus:outline-none"
                    >
                      <option value="all">All Types</option>
                      <option value="video">Video Only</option>
                      <option value="in-person">In-Person Only</option>
                    </select>
                  </div>
                </div>

                {/* Specialty Pills */}
                <div className="flex flex-wrap gap-3 mt-4">
                  {specialties.map((spec) => (
                    <Button
                      key={spec.id}
                      onClick={() => setSelectedSpecialty(spec.id)}
                      variant={selectedSpecialty === spec.id ? "default" : "outline"}
                      size="sm"
                    >
                      {spec.icon} {spec.name}
                    </Button>
                  ))}
                </div>
              </Card>

              {/* Doctors List */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredDoctors.map((doctor) => (
                  <Card key={doctor.id} className="p-6 hover:shadow-xl transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-6xl">{doctor.image}</div>
                        <div>
                          <h3 className="text-xl">{doctor.name}</h3>
                          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                          <p className="text-xs text-muted-foreground mt-1">{doctor.qualifications}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-yellow-500 mb-1">
                          <Star className="w-4 h-4 fill-current" />
                          <span>{doctor.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">({doctor.reviews} reviews)</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Experience</p>
                        <p>{doctor.experience}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Fee</p>
                        <p className="text-green-600">₹{doctor.fee}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Languages</p>
                        <p>{doctor.languages.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Next Available</p>
                        <p className="text-pink-600">{doctor.nextAvailable}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      {doctor.consultationType.includes('video') && (
                        <Badge variant="outline" className="bg-blue-50">
                          <Video className="w-3 h-3 mr-1" />
                          Video
                        </Badge>
                      )}
                      {doctor.consultationType.includes('in-person') && (
                        <Badge variant="outline" className="bg-green-50">
                          <MapPin className="w-3 h-3 mr-1" />
                          In-Person
                        </Badge>
                      )}
                    </div>

                    <Button
                      onClick={() => handleDoctorSelect(doctor)}
                      className="w-full"
                    >
                      Book Appointment
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Choose Date & Time */}
          {step === 2 && selectedDoctor && (
            <div className="max-w-4xl mx-auto">
              <Button
                onClick={() => setStep(1)}
                variant="ghost"
                className="mb-6"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back to Doctors
              </Button>

              <Card className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-6xl">{selectedDoctor.image}</div>
                  <div>
                    <h3 className="text-2xl">{selectedDoctor.name}</h3>
                    <p className="text-muted-foreground">{selectedDoctor.specialty}</p>
                    <p className="text-sm text-muted-foreground mt-1">Fee: ₹{selectedDoctor.fee}</p>
                  </div>
                </div>

                {/* Consultation Type Selection */}
                <div className="mb-6">
                  <h4 className="mb-3">Select Consultation Type</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedDoctor.consultationType.includes('video') && (
                      <button
                        onClick={() => setConsultationType('video')}
                        className={`p-4 border-2 rounded-xl transition-all ${
                          consultationType === 'video'
                            ? 'border-pink-600 bg-pink-50'
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                      >
                        <Video className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                        <p>Video Consultation</p>
                        <p className="text-xs text-muted-foreground mt-1">From anywhere</p>
                      </button>
                    )}
                    {selectedDoctor.consultationType.includes('in-person') && (
                      <button
                        onClick={() => setConsultationType('in-person')}
                        className={`p-4 border-2 rounded-xl transition-all ${
                          consultationType === 'in-person'
                            ? 'border-pink-600 bg-pink-50'
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                      >
                        <MapPin className="w-6 h-6 mx-auto mb-2 text-green-600" />
                        <p>In-Person Visit</p>
                        <p className="text-xs text-muted-foreground mt-1">At clinic</p>
                      </button>
                    )}
                  </div>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <h4 className="mb-3">Select Date</h4>
                  <div className="grid grid-cols-7 gap-2">
                    {dates.map((date, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDateSelect(date)}
                        disabled={!date.available}
                        className={`p-3 rounded-xl text-center transition-all ${
                          selectedDate?.date === date.date
                            ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
                            : date.available
                            ? 'border-2 border-gray-200 hover:border-pink-300'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <p className="text-xs">{date.day}</p>
                        <p className="text-lg">{date.date}</p>
                        <p className="text-xs">{date.month}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <h4 className="mb-3">Select Time Slot</h4>
                    {Object.entries(timeSlots).map(([period, slots]) => (
                      <div key={period} className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2 capitalize">{period}</p>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                          {slots.map((time) => (
                            <Button
                              key={time}
                              onClick={() => handleTimeSelect(time)}
                              variant={selectedTime === time ? "default" : "outline"}
                              size="sm"
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* Step 3: Confirm Booking */}
          {step === 3 && selectedDoctor && selectedDate && selectedTime && (
            <div className="max-w-2xl mx-auto">
              <Button
                onClick={() => setStep(2)}
                variant="ghost"
                className="mb-6"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back
              </Button>

              <Card className="p-8">
                <h2 className="text-2xl mb-6 text-center">Confirm Your Appointment</h2>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <span className="text-muted-foreground">Doctor</span>
                    <span>{selectedDoctor.name}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <span className="text-muted-foreground">Specialty</span>
                    <span>{selectedDoctor.specialty}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <span className="text-muted-foreground">Date</span>
                    <span>{selectedDate.day}, {selectedDate.date} {selectedDate.month}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <span className="text-muted-foreground">Time</span>
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                    <span className="text-muted-foreground">Type</span>
                    <span className="capitalize">{consultationType}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-pink-50 rounded-xl">
                    <span className="text-gray-700">Consultation Fee</span>
                    <span className="text-2xl text-pink-600">₹{selectedDoctor.fee}</span>
                  </div>
                </div>

                <Button
                  onClick={handleBooking}
                  className="w-full py-6 text-lg"
                >
                  Confirm & Pay ₹{selectedDoctor.fee}
                </Button>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
