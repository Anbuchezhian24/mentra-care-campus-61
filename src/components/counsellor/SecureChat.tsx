import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageCircle, Send, Paperclip, FileText, Video, Mic, Shield, Clock, CheckCheck } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: number;
  senderId: string;
  senderName: string;
  senderRole: 'counsellor' | 'student';
  content: string;
  timestamp: Date;
  type: 'text' | 'file' | 'resource';
  fileName?: string;
  fileType?: string;
  isRead: boolean;
}

interface ChatUser {
  id: string;
  name: string;
  studentId?: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastSeen: Date;
  unreadCount: number;
  riskLevel: 'low' | 'medium' | 'high';
}

const mockUsers: ChatUser[] = [
  {
    id: 'stu001',
    name: 'Sarah Johnson',
    studentId: 'STU001',
    status: 'online',
    lastSeen: new Date(),
    unreadCount: 2,
    riskLevel: 'medium'
  },
  {
    id: 'stu002',
    name: 'Michael Chen',
    studentId: 'STU002',
    status: 'away',
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 0,
    riskLevel: 'high'
  },
  {
    id: 'stu003',
    name: 'Emma Davis',
    studentId: 'STU003',
    status: 'offline',
    lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000),
    unreadCount: 1,
    riskLevel: 'low'
  }
];

const mockMessages: Message[] = [
  {
    id: 1,
    senderId: 'stu001',
    senderName: 'Sarah Johnson',
    senderRole: 'student',
    content: "Hi, I've been feeling quite anxious about my upcoming exams. The stress is really getting to me.",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    type: 'text',
    isRead: true
  },
  {
    id: 2,
    senderId: 'counsellor',
    senderName: 'Dr. Wilson',
    senderRole: 'counsellor',
    content: "I understand your concern about exam anxiety. This is very common and there are effective strategies we can work on together. Let's schedule a session to discuss some coping techniques.",
    timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
    type: 'text',
    isRead: true
  },
  {
    id: 3,
    senderId: 'counsellor',
    senderName: 'Dr. Wilson',
    senderRole: 'counsellor',
    content: "I'm sharing a helpful resource on managing exam stress.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: 'resource',
    fileName: 'Exam-Stress-Management-Guide.pdf',
    fileType: 'PDF',
    isRead: true
  },
  {
    id: 4,
    senderId: 'stu001',
    senderName: 'Sarah Johnson',
    senderRole: 'student',
    content: "Thank you for the resource. I've read through it and it's really helpful. Could we schedule a session for this week?",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    type: 'text',
    isRead: false
  },
  {
    id: 5,
    senderId: 'stu001',
    senderName: 'Sarah Johnson',
    senderRole: 'student',
    content: "I'm particularly struggling with the breathing exercises mentioned in the guide. Could you show me the proper technique?",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    type: 'text',
    isRead: false
  }
];

const resources = [
  { id: 1, name: 'Anxiety Management Techniques.pdf', type: 'PDF' },
  { id: 2, name: 'Mindfulness Meditation Audio.mp3', type: 'Audio' },
  { id: 3, name: 'Stress Relief Video Guide.mp4', type: 'Video' },
  { id: 4, name: 'Sleep Hygiene Checklist.pdf', type: 'PDF' },
  { id: 5, name: 'Emergency Contacts.pdf', type: 'PDF' }
];

export const SecureChat: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(mockUsers[0]);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [showResourceDialog, setShowResourceDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;

    const message: Message = {
      id: messages.length + 1,
      senderId: 'counsellor',
      senderName: 'Dr. Wilson',
      senderRole: 'counsellor',
      content: newMessage,
      timestamp: new Date(),
      type: 'text',
      isRead: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleShareResource = (resource: typeof resources[0]) => {
    if (!selectedUser) return;

    const message: Message = {
      id: messages.length + 1,
      senderId: 'counsellor',
      senderName: 'Dr. Wilson',
      senderRole: 'counsellor',
      content: `I'm sharing a resource: ${resource.name}`,
      timestamp: new Date(),
      type: 'resource',
      fileName: resource.name,
      fileType: resource.type,
      isRead: false
    };

    setMessages(prev => [...prev, message]);
    setShowResourceDialog(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'away': return 'bg-warning';
      case 'offline': return 'bg-muted-foreground';
      default: return 'bg-muted-foreground';
    }
  };

  const getRiskLevelColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'PDF': return <FileText className="h-4 w-4" />;
      case 'Video': return <Video className="h-4 w-4" />;
      case 'Audio': return <Mic className="h-4 w-4" />;
      default: return <Paperclip className="h-4 w-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      {/* Users List */}
      <div className="lg:col-span-1">
        <Card className="border-0 bg-card/80 backdrop-blur-sm h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Active Chats
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              <div className="space-y-1 p-4">
                {mockUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedUser?.id === user.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(user.status)}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        {user.unreadCount > 0 && (
                          <Badge variant="destructive" className="text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                            {user.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{user.studentId}</p>
                        <Badge variant={getRiskLevelColor(user.riskLevel) as any} className="text-xs">
                          {user.riskLevel}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {user.status === 'online' ? 'Active now' : 
                         user.status === 'away' ? 'Away' :
                         `Last seen ${format(user.lastSeen, 'MMM d')}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-3">
        <Card className="border-0 bg-card/80 backdrop-blur-sm h-full flex flex-col">
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedUser.avatar} />
                        <AvatarFallback>
                          {selectedUser.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(selectedUser.status)}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedUser.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        {selectedUser.studentId}
                        <Badge variant={getRiskLevelColor(selectedUser.riskLevel) as any} className="text-xs">
                          {selectedUser.riskLevel} risk
                        </Badge>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Encrypted
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[350px]">
                  <div className="p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderRole === 'counsellor' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.senderRole === 'counsellor'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          {message.type === 'resource' && (
                            <div className="flex items-center gap-2 mb-2 text-sm">
                              {getFileIcon(message.fileType || '')}
                              <span className="font-medium">{message.fileName}</span>
                              <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                                Download
                              </Button>
                            </div>
                          )}
                          
                          <p className="text-sm">{message.content}</p>
                          
                          <div className={`flex items-center justify-between mt-2 text-xs ${
                            message.senderRole === 'counsellor' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            <span>{format(message.timestamp, 'h:mm a')}</span>
                            {message.senderRole === 'counsellor' && (
                              <CheckCheck className={`h-3 w-3 ${message.isRead ? 'text-primary-foreground' : 'text-primary-foreground/50'}`} />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFileUpload}
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  
                  <Dialog open={showResourceDialog} onOpenChange={setShowResourceDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Share Resource</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {resources.map((resource) => (
                          <div
                            key={resource.id}
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                            onClick={() => handleShareResource(resource)}
                          >
                            <div className="flex items-center gap-2">
                              {getFileIcon(resource.type)}
                              <span className="text-sm font-medium">{resource.name}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {resource.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  All messages are end-to-end encrypted and HIPAA compliant
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => {
                  // Handle file upload
                  console.log('File selected:', e.target.files?.[0]);
                }}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};