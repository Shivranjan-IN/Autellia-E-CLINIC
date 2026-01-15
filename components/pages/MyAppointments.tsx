import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { AppointmentBookingEnhanced } from "../AppointmentBookingEnhanced";
import { TelemedicineConsultationEnhanced } from "../TelemedicineConsultationEnhanced";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  MapPin,
  Plus,
  X,
  Check,
  MoreVertical,
  Search
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { format } from "date-fns";

interface MyAppointmentsProps {
  onBookAppointment?: () => void;
}

export function MyAppointments({ onBookAppointment }: MyAppointmentsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showTelemedicine, setShowTelemedicine] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState<Date>();
  
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: "2025-11-15",
      time: "10:00 AM",
      doctor: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      type: "Video Consultation",
      status: "Scheduled",
      clinic: "Heart Care Center",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
      id: 2,
      date: "2025-11-20",
      time: "2:30 PM",
      doctor: "Dr. Rajesh Kumar",
      specialization: "General Physician",
      type: "In-Clinic",
      status: "Scheduled",
      clinic: "City Medical Center",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
      id: 3,
      date: "2025-11-08",
      time: "11:00 AM",
      doctor: "Dr. Priya Sharma",
      specialization: "Dermatologist",
      type: "Video Consultation",
      status: "Completed",
      clinic: "Skin Clinic",
      avatar: "https://i.pravatar.cc/150?img=8"
    },
    {
      id: 4,
      date: "2025-10-25",
      time: "9:00 AM",
      doctor: "Dr. Michael Chen",
      specialization: "Orthopedic",
      type: "In-Clinic",
      status: "Cancelled",
      clinic: "Bone & Joint Hospital",
      avatar: "https://i.pravatar.cc/150?img=15"
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case "Completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "Cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleReschedule = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowReschedule(true);
  };

  const confirmReschedule = () => {
    if (!rescheduleDate) {
      toast.error("Please select a new date");
      return;
    }

    setAppointments(appointments.map(apt => 
      apt.id === selectedAppointment.id 
        ? { ...apt, date: format(rescheduleDate, "yyyy-MM-dd") }
        : apt
    ));

    toast.success(`✅ Appointment rescheduled to ${format(rescheduleDate, "PPP")}`);
    setShowReschedule(false);
    setRescheduleDate(undefined);
  };

  const handleCancel = (appointmentId: number) => {
    setAppointments(appointments.map(apt =>
      apt.id === appointmentId
        ? { ...apt, status: "Cancelled" }
        : apt
    ));
    toast.success("❌ Appointment cancelled successfully");
  };

  const filteredAppointments = appointments.filter(apt =>
    apt.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.clinic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">My Appointments</h1>
          <p className="text-muted-foreground">Manage and track all your appointments</p>
        </div>
        <Button onClick={() => setShowBooking(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Book New Appointment
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search appointments by doctor, specialization, or clinic..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total</p>
          <p className="text-2xl">{appointments.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Scheduled</p>
          <p className="text-2xl text-blue-600">
            {appointments.filter(a => a.status === "Scheduled").length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Completed</p>
          <p className="text-2xl text-green-600">
            {appointments.filter(a => a.status === "Completed").length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Cancelled</p>
          <p className="text-2xl text-red-600">
            {appointments.filter(a => a.status === "Cancelled").length}
          </p>
        </Card>
      </div>

      {/* Appointments Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No appointments found
                </TableCell>
              </TableRow>
            ) : (
              filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{format(new Date(appointment.date), "MMM dd, yyyy")}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {appointment.time}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img 
                        src={appointment.avatar} 
                        alt={appointment.doctor}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{appointment.doctor}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {appointment.clinic}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{appointment.specialization}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {appointment.type === "Video Consultation" ? (
                        <Video className="w-4 h-4 text-blue-600" />
                      ) : (
                        <MapPin className="w-4 h-4 text-green-600" />
                      )}
                      <span className="text-sm">{appointment.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {appointment.type === "Video Consultation" && appointment.status === "Scheduled" && (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowTelemedicine(true);
                          }}
                          className="bg-gradient-to-r from-pink-600 to-purple-600"
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Join Call
                        </Button>
                      )}
                      {appointment.status === "Scheduled" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleReschedule(appointment)}>
                              <CalendarIcon className="w-4 h-4 mr-2" />
                              Reschedule
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleCancel(appointment.id)}
                              className="text-red-600"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Reschedule Dialog */}
      <Dialog open={showReschedule} onOpenChange={setShowReschedule}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Choose a new date for your appointment
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Doctor</p>
              <p className="font-medium">{selectedAppointment?.doctor}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Date</p>
              <p className="font-medium">
                {selectedAppointment && format(new Date(selectedAppointment.date), "PPP")} at {selectedAppointment?.time}
              </p>
            </div>

            <div>
              <Label>Select New Date</Label>
              <Calendar
                mode="single"
                selected={rescheduleDate}
                onSelect={setRescheduleDate}
                disabled={(date) => date < new Date()}
                className="rounded-md border mt-2"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={confirmReschedule} className="flex-1">
                <Check className="w-4 h-4 mr-2" />
                Confirm Reschedule
              </Button>
              <Button variant="outline" onClick={() => setShowReschedule(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Appointment Booking Dialog */}
      {showBooking && (
        <AppointmentBookingEnhanced 
          onClose={() => setShowBooking(false)}
          onBookingComplete={() => {
            // Refresh appointments list
            toast.success("Appointment booked successfully!");
          }}
        />
      )}

      {/* Telemedicine Consultation Dialog */}
      {showTelemedicine && (
        <TelemedicineConsultationEnhanced 
          onClose={() => setShowTelemedicine(false)}
          appointmentId={selectedAppointment?.id}
        />
      )}
    </div>
  );
}
