import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Download, Eye, CreditCard, Search, DollarSign, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";

export function MyBilling() {
  const [searchQuery, setSearchQuery] = useState("");

  const [invoices, setInvoices] = useState([
    {
      id: "INV-2025-001",
      date: "2025-11-10",
      service: "Cardiology Consultation",
      doctor: "Dr. Sarah Johnson",
      amount: 1500,
      status: "Paid",
      paymentMethod: "Card"
    },
    {
      id: "INV-2025-002",
      date: "2025-11-05",
      service: "Blood Test - CBC",
      doctor: "Lab Services",
      amount: 800,
      status: "Pending",
      paymentMethod: null
    },
    {
      id: "INV-2025-003",
      date: "2025-10-28",
      service: "General Checkup",
      doctor: "Dr. Rajesh Kumar",
      amount: 500,
      status: "Paid",
      paymentMethod: "UPI"
    },
    {
      id: "INV-2025-004",
      date: "2025-10-15",
      service: "X-Ray Chest",
      doctor: "Radiology Dept",
      amount: 1200,
      status: "Paid",
      paymentMethod: "Cash"
    },
    {
      id: "INV-2025-005",
      date: "2025-11-12",
      service: "Medicine Purchase",
      doctor: "E-Clinic Pharmacy",
      amount: 650,
      status: "Pending",
      paymentMethod: null
    }
  ]);

  const handleViewInvoice = (invoiceId: string) => {
    toast.info(`📄 Opening invoice ${invoiceId}...`);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast.success(`📥 Downloading invoice ${invoiceId}...`);
  };

  const handlePayNow = (invoiceId: string, amount: number) => {
    toast.info("💳 Opening payment gateway...");
    // Simulate payment
    setTimeout(() => {
      setInvoices(invoices.map(inv =>
        inv.id === invoiceId
          ? { ...inv, status: "Paid", paymentMethod: "Card" }
          : inv
      ));
      toast.success(`✅ Payment of ₹${amount} successful!`);
    }, 2000);
  };

  const filteredInvoices = invoices.filter(inv =>
    inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPaid = invoices.filter(i => i.status === "Paid").reduce((sum, i) => sum + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === "Pending").reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">My Billing</h1>
        <p className="text-muted-foreground">View your invoices and pay your bills securely online</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search invoices..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Paid</p>
              <p className="text-2xl">₹{totalPaid.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl text-orange-600">₹{totalPending.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl">{invoices.filter(i => i.status === "Paid").length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{format(new Date(invoice.date), "MMM dd, yyyy")}</TableCell>
                <TableCell>{invoice.service}</TableCell>
                <TableCell>{invoice.doctor}</TableCell>
                <TableCell>₹{invoice.amount.toLocaleString()}</TableCell>
                <TableCell>
                  {invoice.status === "Paid" ? (
                    <Badge className="bg-green-500">Paid</Badge>
                  ) : (
                    <Badge className="bg-orange-500">Pending</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {invoice.status === "Pending" && (
                      <Button
                        size="sm"
                        onClick={() => handlePayNow(invoice.id, invoice.amount)}
                        className="gap-2"
                      >
                        <CreditCard className="w-4 h-4" />
                        Pay Now
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => handleViewInvoice(invoice.id)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDownloadInvoice(invoice.id)}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
