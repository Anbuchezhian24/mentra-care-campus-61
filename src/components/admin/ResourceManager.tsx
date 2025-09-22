import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Upload, FileText, Video, Mic, Download, Edit3, Trash2, Eye, Globe, Users, TrendingUp } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'PDF' | 'Video' | 'Audio' | 'Interactive';
  category: 'stress' | 'anxiety' | 'depression' | 'sleep' | 'emergency' | 'general';
  language: 'English' | 'Hindi' | 'Regional';
  fileSize: string;
  uploadDate: string;
  downloadCount: number;
  views: number;
  rating: number;
  status: 'active' | 'inactive' | 'pending';
  isPublic: boolean;
  tags: string[];
  counsellorOnly: boolean;
}

const mockResources: Resource[] = [
  {
    id: 1,
    title: "Comprehensive Stress Management Guide",
    description: "A detailed guide covering various stress management techniques including breathing exercises, time management, and cognitive restructuring.",
    type: "PDF",
    category: "stress",
    language: "English",
    fileSize: "2.4 MB",
    uploadDate: "2024-01-10",
    downloadCount: 234,
    views: 567,
    rating: 4.7,
    status: "active",
    isPublic: true,
    tags: ["stress", "management", "breathing", "relaxation"],
    counsellorOnly: false
  },
  {
    id: 2,
    title: "Mindfulness Meditation Series",
    description: "A collection of guided meditation audio sessions for beginners and intermediate practitioners.",
    type: "Audio",
    category: "anxiety",
    language: "English",
    fileSize: "45.2 MB",
    uploadDate: "2024-01-08",
    downloadCount: 156,
    views: 298,
    rating: 4.9,
    status: "active",
    isPublic: true,
    tags: ["mindfulness", "meditation", "anxiety", "guided"],
    counsellorOnly: false
  },
  {
    id: 3,
    title: "तनाव प्रबंधन तकनीकें",
    description: "हिंदी में तनाव प्रबंधन की व्यापक गाइड जिसमें व्यावहारिक तकनीकें और अभ्यास शामिल हैं।",
    type: "PDF",
    category: "stress",
    language: "Hindi",
    fileSize: "1.8 MB",
    uploadDate: "2024-01-05",
    downloadCount: 89,
    views: 145,
    rating: 4.5,
    status: "active",
    isPublic: true,
    tags: ["तनाव", "प्रबंधन", "हिंदी", "व्यावहारिक"],
    counsellorOnly: false
  },
  {
    id: 4,
    title: "Crisis Intervention Protocols",
    description: "Professional guidelines and protocols for handling mental health crises and emergency situations.",
    type: "PDF",
    category: "emergency",
    language: "English",
    fileSize: "3.1 MB",
    uploadDate: "2024-01-12",
    downloadCount: 67,
    views: 89,
    rating: 4.8,
    status: "active",
    isPublic: false,
    tags: ["crisis", "emergency", "protocols", "professional"],
    counsellorOnly: true
  },
  {
    id: 5,
    title: "Sleep Hygiene Video Guide",
    description: "Comprehensive video guide on establishing healthy sleep patterns and overcoming sleep disorders.",
    type: "Video",
    category: "sleep",
    language: "English",
    fileSize: "128.5 MB",
    uploadDate: "2024-01-03",
    downloadCount: 123,
    views: 234,
    rating: 4.6,
    status: "pending",
    isPublic: true,
    tags: ["sleep", "hygiene", "insomnia", "health"],
    counsellorOnly: false
  }
];

const categories = [
  { value: 'stress', label: 'Stress Management', color: 'destructive' },
  { value: 'anxiety', label: 'Anxiety Relief', color: 'warning' },
  { value: 'depression', label: 'Depression Support', color: 'secondary' },
  { value: 'sleep', label: 'Sleep Health', color: 'primary' },
  { value: 'emergency', label: 'Emergency Resources', color: 'destructive' },
  { value: 'general', label: 'General Wellness', color: 'success' }
];

export const ResourceManager: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Form states for upload/edit
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'PDF' as Resource['type'],
    category: 'general' as Resource['category'],
    language: 'English' as Resource['language'],
    tags: '',
    isPublic: true,
    counsellorOnly: false
  });

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage;
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;

    return matchesSearch && matchesType && matchesLanguage && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="h-4 w-4" />;
      case 'Video': return <Video className="h-4 w-4" />;
      case 'Audio': return <Mic className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat?.color || 'secondary';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'secondary';
      case 'pending': return 'warning';
      default: return 'secondary';
    }
  };

  const handleUpload = () => {
    const newResource: Resource = {
      id: Math.max(...resources.map(r => r.id)) + 1,
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      fileSize: '0 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      downloadCount: 0,
      views: 0,
      rating: 0,
      status: 'pending'
    };

    setResources([...resources, newResource]);
    setFormData({
      title: '',
      description: '',
      type: 'PDF',
      category: 'general',
      language: 'English',
      tags: '',
      isPublic: true,
      counsellorOnly: false
    });
    setShowUploadDialog(false);
  };

  const handleEdit = (resource: Resource) => {
    setSelectedResource(resource);
    setFormData({
      title: resource.title,
      description: resource.description,
      type: resource.type,
      category: resource.category,
      language: resource.language,
      tags: resource.tags.join(', '),
      isPublic: resource.isPublic,
      counsellorOnly: resource.counsellorOnly
    });
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (!selectedResource) return;

    const updatedResources = resources.map(resource => 
      resource.id === selectedResource.id 
        ? {
            ...resource,
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim())
          }
        : resource
    );

    setResources(updatedResources);
    setShowEditDialog(false);
    setSelectedResource(null);
  };

  const handleStatusToggle = (id: number) => {
    const updatedResources = resources.map(resource =>
      resource.id === id
        ? { ...resource, status: resource.status === 'active' ? 'inactive' : 'active' as Resource['status'] }
        : resource
    );
    setResources(updatedResources);
  };

  const handleDelete = (id: number) => {
    setResources(resources.filter(resource => resource.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header with Upload Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Resource Management</h2>
          <p className="text-muted-foreground">Upload and manage mental health resources for students and counsellors</p>
        </div>
        
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Upload New Resource</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter resource title"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Brief description of the resource"
                  className="min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Type</Label>
                  <Select value={formData.type} onValueChange={(value: Resource['type']) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF Document</SelectItem>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Audio">Audio</SelectItem>
                      <SelectItem value="Interactive">Interactive Tool</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Language</Label>
                  <Select value={formData.language} onValueChange={(value: Resource['language']) => setFormData({...formData, language: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="Regional">Regional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(value: Resource['category']) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  placeholder="stress, anxiety, management"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="public">Make Public</Label>
                  <Switch
                    id="public"
                    checked={formData.isPublic}
                    onCheckedChange={(checked) => setFormData({...formData, isPublic: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="counsellor">Counsellors Only</Label>
                  <Switch
                    id="counsellor"
                    checked={formData.counsellorOnly}
                    onCheckedChange={(checked) => setFormData({...formData, counsellorOnly: checked})}
                  />
                </div>
              </div>

              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PDF, MP4, MP3 up to 100MB</p>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleUpload} className="flex-1">
                  Upload Resource
                </Button>
                <Button variant="outline" onClick={() => setShowUploadDialog(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="border-0 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:col-span-2"
            />
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="Video">Video</SelectItem>
                <SelectItem value="Audio">Audio</SelectItem>
                <SelectItem value="Interactive">Interactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="All Languages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Hindi">Hindi</SelectItem>
                <SelectItem value="Regional">Regional</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Resources Grid */}
      <div className="grid gap-4">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(resource.type)}
                      <h3 className="font-semibold">{resource.title}</h3>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={getCategoryColor(resource.category) as any} className="text-xs">
                        {categories.find(c => c.value === resource.category)?.label}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {resource.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {resource.language}
                      </Badge>
                      <Badge variant={getStatusColor(resource.status) as any} className="text-xs">
                        {resource.status}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {resource.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {resource.downloadCount} downloads
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {resource.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {resource.rating}/5.0 rating
                    </span>
                    <span>{resource.fileSize}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    {resource.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Uploaded: {resource.uploadDate}</span>
                    {resource.isPublic && (
                      <span className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        Public
                      </span>
                    )}
                    {resource.counsellorOnly && (
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        Counsellors Only
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(resource)}>
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={resource.status === 'active' ? 'destructive' : 'default'}
                    onClick={() => handleStatusToggle(resource.id)}
                  >
                    {resource.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(resource.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Resource</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="min-h-[80px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(value: Resource['category']) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Language</Label>
                <Select value={formData.language} onValueChange={(value: Resource['language']) => setFormData({...formData, language: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Regional">Regional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-tags">Tags (comma-separated)</Label>
              <Input
                id="edit-tags"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Make Public</Label>
                <Switch
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => setFormData({...formData, isPublic: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label>Counsellors Only</Label>
                <Switch
                  checked={formData.counsellorOnly}
                  onCheckedChange={(checked) => setFormData({...formData, counsellorOnly: checked})}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSaveEdit} className="flex-1">
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setShowEditDialog(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {filteredResources.length === 0 && (
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">No resources found matching your criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};