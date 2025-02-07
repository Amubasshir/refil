"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileUploader } from "@/components/FileUploader"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bell, MessageSquare, Upload, Download, Edit, CheckCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data - in a real application, this would come from your backend
const initialLoanStatus = {
  status: "In Progress",
  progress: 20,
  currentStage: "Application Review",
  stages: [
    { name: "Application Submitted", completed: true },
    { name: "Application Review", completed: false },
    { name: "Document Verification", completed: false },
    { name: "Lender Assessment", completed: false },
    { name: "Final Approval", completed: false },
    { name: "Settlement", completed: false },
  ],
}

const mockDocumentsToSign = [
  { id: 1, name: "Loan Agreement", status: "Pending", type: "Digital" },
  { id: 2, name: "Property Valuation Consent", status: "Pending", type: "Upload" },
  { id: 3, name: "Privacy Statement", status: "Signed", type: "Digital" },
  { id: 4, name: "Mortgage Transfer", status: "Pending", type: "Download" },
]

export default function LoanProgressTracker() {
  const [loanStatus, setLoanStatus] = useState(initialLoanStatus)
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState<{ sender: string; message: string; timestamp: string }[]>([
    {
      sender: "Refii Team",
      message:
        "Welcome to your loan progress tracker. We've received your application and our team is reviewing it. We'll keep you updated here and may request additional information if needed.",
      timestamp: new Date().toLocaleString(),
    },
  ])
  const [notifications, setNotifications] = useState<string[]>([
    "Application received and under review",
    "Please upload your latest pay slip",
  ])

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        sender: "You",
        message: message.trim(),
        timestamp: new Date().toLocaleString(),
      }
      setChat([...chat, newMessage])
      setMessage("")
      // Simulate a response from the Refii team
      setTimeout(() => {
        setChat((prev) => [
          ...prev,
          {
            sender: "Refii Team",
            message: "Thank you for your message. We'll get back to you shortly.",
            timestamp: new Date().toLocaleString(),
          },
        ])
      }, 1000)
    }
  }

  const handleFileUpload = (file: File) => {
    // In a real application, you would handle the file upload here
    console.log("File uploaded:", file.name)
    setNotifications([`Document uploaded: ${file.name}`, ...notifications])
  }

  const handleSignDocument = (documentId: number, signatureType: string) => {
    // In a real application, this would trigger the appropriate signing process
    console.log(`Signing document ${documentId} with ${signatureType} signature`)
  }

  // Simulate progress updates
  useEffect(() => {
    const timer = setInterval(() => {
      setLoanStatus((prev) => {
        const nextStageIndex = prev.stages.findIndex((stage) => !stage.completed)
        if (nextStageIndex !== -1 && prev.progress < 100) {
          const newStages = [...prev.stages]
          newStages[nextStageIndex].completed = true
          return {
            ...prev,
            progress: Math.min(prev.progress + 20, 100),
            currentStage: newStages[nextStageIndex + 1]?.name || "Completed",
            stages: newStages,
          }
        }
        return prev
      })
    }, 30000) // Update every 30 seconds for demo purposes

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Loan Progress Tracker</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-6 w-6 text-blue-500" />
              Loan Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Status:</span>
                <Badge variant={loanStatus.status === "Completed" ? "success" : "default"}>{loanStatus.status}</Badge>
              </div>
              <Progress value={loanStatus.progress} className="w-full" />
              <p>Current Stage: {loanStatus.currentStage}</p>
              <ul className="space-y-2">
                {loanStatus.stages.map((stage, index) => (
                  <li key={index} className="flex items-center">
                    <span className={`mr-2 ${stage.completed ? "text-green-500" : "text-gray-400"}`}>
                      {stage.completed ? "✓" : "○"}
                    </span>
                    <span className={stage.completed ? "text-gray-900" : "text-gray-500"}>{stage.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-6 w-6 text-yellow-500" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-2">
                {notifications.map((notification, index) => (
                  <li key={index} className="text-sm">
                    {notification}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-6 w-6 text-green-500" />
            Communication with Refii Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] mb-4">
            {chat.map((msg, index) => (
              <div key={index} className={`mb-4 ${msg.sender === "You" ? "text-right" : ""}`}>
                <div className={`inline-block p-2 rounded-lg ${msg.sender === "You" ? "bg-blue-100" : "bg-gray-100"}`}>
                  <p className="font-semibold">{msg.sender}</p>
                  <p>{msg.message}</p>
                  <p className="text-xs text-gray-500">{msg.timestamp}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex space-x-2">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-grow"
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Edit className="mr-2 h-6 w-6 text-purple-500" />
            Documents to Sign
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Signature Type</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDocumentsToSign.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>{doc.status}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>
                    {doc.status === "Pending" && (
                      <>
                        {doc.type === "Digital" && (
                          <Button onClick={() => handleSignDocument(doc.id, "digital")}>Sign Digitally</Button>
                        )}
                        {doc.type === "Upload" && (
                          <FileUploader
                            onFileSelect={(file) => handleFileUpload(file)}
                            acceptedFileTypes=".pdf,.jpg,.png"
                            maxFileSize={5 * 1024 * 1024} // 5MB
                          />
                        )}
                        {doc.type === "Download" && (
                          <Button asChild>
                            <a href={`/api/documents/${doc.id}/download`} download>
                              <Download className="mr-2 h-4 w-4" />
                              Download & Sign
                            </a>
                          </Button>
                        )}
                      </>
                    )}
                    {doc.status === "Signed" && <span className="text-green-500">Completed</span>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-teal-50 to-cyan-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="mr-2 h-6 w-6 text-teal-500" />
            Document Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FileUploader
            onFileSelect={handleFileUpload}
            acceptedFileTypes=".pdf,.doc,.docx,.jpg,.png"
            maxFileSize={10 * 1024 * 1024} // 10MB
          />
          <p className="text-sm text-gray-500 mt-2">
            Upload any additional documents requested by the Refii team here.
          </p>
        </CardContent>
      </Card>

      <Alert>
        <AlertTitle>Next Steps</AlertTitle>
        <AlertDescription>
          Keep an eye on this page for updates on your loan progress. We'll notify you here if we need any additional
          information or documents.
        </AlertDescription>
      </Alert>
    </div>
  )
}

