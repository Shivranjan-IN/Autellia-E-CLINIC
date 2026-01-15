import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
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
  Download, 
  Eye, 
  Trash2,
  Printer,
  MoreVertical,
  Search,
  FileText,
  Pill
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { format } from "date-fns";

export function MyPrescriptions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      date: "2025-11-10",
      doctor: "Dr. Sarah Johnson",
      medication: "Metformin 500mg, Aspirin 75mg",
      status: "Active",
      validity: "2026-02-10",
      dosage: "1-0-1 for 90 days"
    },
    {
      id: 2,
      date: "2025-11-05",
      doctor: "Dr. Rajesh Kumar",
      medication: "Amoxicillin 500mg",
      status: "Active",
      validity: "2025-11-20",
      dosage: "1-1-1 for 7 days"
    },
    {
      id: 3,
      date: "2025-10-28",
      doctor: "Dr. Priya Sharma",
      medication: "Vitamin D3, Calcium",
      status: "Active",
      validity: "2026-01-28",
      dosage: "0-0-1 for 60 days"
    },
    {
      id: 4,
      date: "2025-09-15",
      doctor: "Dr. Michael Chen",
      medication: "Ibuprofen 400mg",
      status: "Expired",
      validity: "2025-10-15",
      dosage: "1-0-1 when needed"
    },
    {
      id: 5,
      date: "2025-08-20",
      doctor: "Dr. Sarah Johnson",
      medication: "Omeprazole 20mg",
      status: "Expired",
      validity: "2025-09-20",
      dosage: "0-0-1 for 30 days"
    }
  ]);

  const handleView = (prescription: any) => {
    toast.info("Opening prescription viewer...");
    // TODO: Implement prescription viewer
  };

  const handleDownload = (prescription: any) => {
    toast.success(`📥 Downloading prescription from ${prescription.doctor}...`);
    // TODO: Implement actual download
  };

  const handlePrint = (prescription: any) => {
    toast.info("🖨️ Preparing to print...");
    // TODO: Implement print functionality
  };

  const handleDelete = (id: number) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id));
    toast.success("🗑️ Prescription deleted successfully");
    setDeleteId(null);
  };

  const handleExportAll = () => {
    toast.success("📤 Exporting all prescriptions as PDF...");
    // TODO: Implement export all functionality
  };

  const filteredPrescriptions = prescriptions.filter(p =>
    p.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.medication.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    return status === "Active" 
      ? <Badge className="bg-green-500">Active</Badge>
      : <Badge variant="secondary">Expired</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">My Prescriptions</h1>
          <p className="text-muted-foreground">Access, download, and manage all your electronic prescriptions</p>
        </div>
        <Button onClick={handleExportAll} variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export All
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search prescriptions by doctor or medication..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Prescriptions</p>
              <p className="text-2xl">{prescriptions.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Pill className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl text-green-600">
                {prescriptions.filter(p => p.status === "Active").length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expired</p>
              <p className="text-2xl text-gray-600">
                {prescriptions.filter(p => p.status === "Expired").length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Prescriptions Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Medication</TableHead>
              <TableHead>Dosage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrescriptions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No prescriptions found
                </TableCell>
              </TableRow>
            ) : (
              filteredPrescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell>
                    {format(new Date(prescription.date), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{prescription.doctor}</p>
                  </TableCell>
                  <TableCell>
                    <p className="max-w-xs truncate">{prescription.medication}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
                  </TableCell>
                  <TableCell>{getStatusBadge(prescription.status)}</TableCell>
                  <TableCell>
                    <p className={`text-sm ${
                      new Date(prescription.validity) < new Date() 
                        ? "text-red-600" 
                        : "text-muted-foreground"
                    }`}>
                      {format(new Date(prescription.validity), "MMM dd, yyyy")}
                    </p>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleDownload(prescription)}
                        className="bg-gradient-to-r from-pink-600 to-purple-600"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(prescription)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePrint(prescription)}>
                            <Printer className="w-4 h-4 mr-2" />
                            Print
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(prescription.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Prescription</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this prescription? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
