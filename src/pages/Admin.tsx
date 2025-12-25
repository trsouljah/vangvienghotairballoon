import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, LogOut, Save, Plus, Trash2, Upload, X } from "lucide-react";
import {
  useServices,
  useUpdateService,
  useFeatures,
  useUpdateFeature,
  useAddFeature,
  useDeleteFeature,
  useServiceImages,
  useAddServiceImage,
  useDeleteServiceImage,
  useSiteContent,
  useUpdateSiteContent,
  uploadServiceImage,
  Service,
  Feature,
} from "@/hooks/useSiteContent";

export default function Admin() {
  const { user, isAdmin, loading, adminLoading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Only redirect if we're done checking both auth and admin status
    if (!loading && !adminLoading && user && !isAdmin) {
      toast.error("You don't have admin access");
      navigate("/");
    }
  }, [user, isAdmin, loading, adminLoading, navigate]);

  // Show loading while checking auth OR admin status
  if (loading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold gradient-text">Admin Dashboard</h1>
          <p className="text-foreground/70 mt-2">Manage your website content</p>
        </div>
        <Button variant="outline" onClick={signOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="flex flex-wrap gap-2 h-auto p-2 bg-background/50">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="features">Why Choose Us</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <HeroEditor />
        </TabsContent>

        <TabsContent value="services">
          <ServicesEditor />
        </TabsContent>

        <TabsContent value="features">
          <FeaturesEditor />
        </TabsContent>

        <TabsContent value="images">
          <ImagesEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function HeroEditor() {
  const { data: content, isLoading } = useSiteContent("hero");
  const updateContent = useUpdateSiteContent();
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
  });

  useEffect(() => {
    if (content) {
      const contentMap = content.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, string>);

      setFormData({
        title: contentMap.title || "Soar Above Vang Vieng",
        subtitle: contentMap.subtitle || "",
        description: contentMap.description || "Experience breathtaking views from hot air balloons and paramotor flights over the stunning landscapes of Vang Vieng, Laos.",
      });
    }
  }, [content]);

  const handleSave = async () => {
    await Promise.all([
      updateContent.mutateAsync({ section: "hero", key: "title", value: formData.title }),
      updateContent.mutateAsync({ section: "hero", key: "description", value: formData.description }),
    ]);
  };

  if (isLoading) {
    return <Loader2 className="h-6 w-6 animate-spin mx-auto" />;
  }

  return (
    <Card className="glass-card border-primary/20">
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
        <CardDescription>Edit the main hero section on the home page</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="hero-title">Title</Label>
          <Input
            id="hero-title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="bg-background/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hero-description">Description</Label>
          <Textarea
            id="hero-description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-background/50"
            rows={3}
          />
        </div>
        <Button onClick={handleSave} disabled={updateContent.isPending} className="gradient-bg">
          {updateContent.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}

function ServicesEditor() {
  const { data: services, isLoading } = useServices();
  const updateService = useUpdateService();
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    flight_duration: "",
    details: [] as string[],
    inclusions: [] as string[],
  });

  useEffect(() => {
    if (editingService) {
      setFormData({
        title: editingService.title,
        description: editingService.description,
        price: editingService.price,
        flight_duration: editingService.flight_duration || "",
        details: editingService.details || [],
        inclusions: editingService.inclusions || [],
      });
    }
  }, [editingService]);

  const handleSave = async () => {
    if (!editingService) return;
    await updateService.mutateAsync({
      id: editingService.id,
      ...formData,
    });
    setEditingService(null);
  };

  const addArrayItem = (field: "details" | "inclusions") => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  const updateArrayItem = (field: "details" | "inclusions", index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const removeArrayItem = (field: "details" | "inclusions", index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  if (isLoading) {
    return <Loader2 className="h-6 w-6 animate-spin mx-auto" />;
  }

  if (editingService) {
    return (
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Edit {editingService.title}
            <Button variant="ghost" size="sm" onClick={() => setEditingService(null)}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label>Price ($)</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="bg-background/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Flight Duration</Label>
            <Input
              value={formData.flight_duration}
              onChange={(e) => setFormData({ ...formData, flight_duration: e.target.value })}
              className="bg-background/50"
              placeholder="e.g., 30-45 minutes"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-background/50"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Flight Details</Label>
              <Button size="sm" variant="outline" onClick={() => addArrayItem("details")}>
                <Plus className="h-3 w-3 mr-1" /> Add
              </Button>
            </div>
            {formData.details.map((detail, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={detail}
                  onChange={(e) => updateArrayItem("details", index, e.target.value)}
                  className="bg-background/50"
                />
                <Button variant="ghost" size="icon" onClick={() => removeArrayItem("details", index)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>What's Included</Label>
              <Button size="sm" variant="outline" onClick={() => addArrayItem("inclusions")}>
                <Plus className="h-3 w-3 mr-1" /> Add
              </Button>
            </div>
            {formData.inclusions.map((inclusion, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={inclusion}
                  onChange={(e) => updateArrayItem("inclusions", index, e.target.value)}
                  className="bg-background/50"
                />
                <Button variant="ghost" size="icon" onClick={() => removeArrayItem("inclusions", index)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={updateService.isPending} className="gradient-bg">
              {updateService.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Save Changes
            </Button>
            <Button variant="outline" onClick={() => setEditingService(null)}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {services?.map((service) => (
        <Card key={service.id} className="glass-card border-primary/20">
          <CardHeader>
            <CardTitle>{service.title}</CardTitle>
            <CardDescription>${service.price} per person</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{service.description}</p>
            <Button onClick={() => setEditingService(service)} className="w-full">
              Edit Service
            </Button>
          </CardContent>
        </Card>
      ))}

      {(!services || services.length === 0) && (
        <Card className="glass-card border-primary/20 col-span-2">
          <CardContent className="py-8 text-center text-foreground/70">
            No services found. Services will appear here once data is seeded.
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function FeaturesEditor() {
  const { data: features, isLoading } = useFeatures();
  const updateFeature = useUpdateFeature();
  const addFeature = useAddFeature();
  const deleteFeature = useDeleteFeature();
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    icon: "Shield",
    title: "",
    description: "",
    display_order: 0,
  });

  useEffect(() => {
    if (editingFeature) {
      setFormData({
        icon: editingFeature.icon,
        title: editingFeature.title,
        description: editingFeature.description,
        display_order: editingFeature.display_order,
      });
    }
  }, [editingFeature]);

  const iconOptions = ["Shield", "Clock", "Users", "Star", "Award", "Heart", "Check", "Zap"];

  const handleSave = async () => {
    if (editingFeature) {
      await updateFeature.mutateAsync({ id: editingFeature.id, ...formData });
      setEditingFeature(null);
    } else if (isAdding) {
      await addFeature.mutateAsync(formData);
      setIsAdding(false);
      setFormData({ icon: "Shield", title: "", description: "", display_order: (features?.length || 0) + 1 });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this feature?")) {
      await deleteFeature.mutateAsync(id);
    }
  };

  if (isLoading) {
    return <Loader2 className="h-6 w-6 animate-spin mx-auto" />;
  }

  if (editingFeature || isAdding) {
    return (
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {isAdding ? "Add Feature" : `Edit ${editingFeature?.title}`}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setEditingFeature(null);
                setIsAdding(false);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Icon</Label>
            <select
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full p-2 rounded-md border bg-background/50"
            >
              {iconOptions.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-background/50"
              rows={2}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={updateFeature.isPending || addFeature.isPending} className="gradient-bg">
              <Save className="h-4 w-4 mr-2" />
              {isAdding ? "Add Feature" : "Save Changes"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setEditingFeature(null);
                setIsAdding(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setIsAdding(true);
            setFormData({ icon: "Shield", title: "", description: "", display_order: (features?.length || 0) + 1 });
          }}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Feature
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features?.map((feature) => (
          <Card key={feature.id} className="glass-card border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/70 mb-4">{feature.description}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => setEditingFeature(feature)}>
                  Edit
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(feature.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!features || features.length === 0) && (
        <Card className="glass-card border-primary/20">
          <CardContent className="py-8 text-center text-foreground/70">
            No features found. Click "Add Feature" to create one.
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ImagesEditor() {
  const { data: services } = useServices();
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const { data: images, isLoading } = useServiceImages(selectedServiceId || undefined);
  const addImage = useAddServiceImage();
  const deleteImage = useDeleteServiceImage();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (services && services.length > 0 && !selectedServiceId) {
      setSelectedServiceId(services[0].id);
    }
  }, [services, selectedServiceId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedServiceId) return;

    setUploading(true);
    try {
      const imageUrl = await uploadServiceImage(file);
      const displayOrder = images?.length || 0;
      await addImage.mutateAsync({
        service_id: selectedServiceId,
        image_url: imageUrl,
        display_order: displayOrder,
      });
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      await deleteImage.mutateAsync(id);
    }
  };

  return (
    <Card className="glass-card border-primary/20">
      <CardHeader>
        <CardTitle>Service Images</CardTitle>
        <CardDescription>Manage gallery images for each service</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 items-end">
          <div className="flex-1 space-y-2">
            <Label>Select Service</Label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full p-2 rounded-md border bg-background/50"
            >
              {services?.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="image-upload" className="cursor-pointer">
              <div className="flex items-center gap-2 px-4 py-2 rounded-md gradient-bg text-white hover:opacity-90 transition-opacity">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                Upload Image
              </div>
            </Label>
            <input id="image-upload" type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </div>
        </div>

        {isLoading ? (
          <Loader2 className="h-6 w-6 animate-spin mx-auto" />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images?.map((image) => (
              <div key={image.id} className="relative group">
                <img src={image.image_url} alt="Service" className="w-full h-32 object-cover rounded-lg" />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                  onClick={() => handleDelete(image.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {(!images || images.length === 0) && !isLoading && (
          <p className="text-center text-foreground/70 py-8">No images uploaded yet. Use the upload button above.</p>
        )}
      </CardContent>
    </Card>
  );
}
