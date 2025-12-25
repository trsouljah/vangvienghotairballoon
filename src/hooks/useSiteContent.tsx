import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Types
export interface SiteContent {
  id: string;
  section: string;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  service_type: string;
  title: string;
  description: string;
  price: number;
  flight_duration: string | null;
  details: string[];
  inclusions: string[];
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceImage {
  id: string;
  service_id: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Site Content hooks
export function useSiteContent(section?: string) {
  return useQuery({
    queryKey: ["site-content", section],
    queryFn: async () => {
      let query = supabase.from("site_content").select("*");
      if (section) {
        query = query.eq("section", section);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data as SiteContent[];
    },
  });
}

export function useUpdateSiteContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ section, key, value }: { section: string; key: string; value: string }) => {
      const { data, error } = await supabase
        .from("site_content")
        .upsert({ section, key, value }, { onConflict: "section,key" })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
      toast.success("Content updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update content: " + error.message);
    },
  });
}

// Services hooks
export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data as Service[];
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (service: Partial<Service> & { id: string }) => {
      const { data, error } = await supabase
        .from("services")
        .update(service)
        .eq("id", service.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update service: " + error.message);
    },
  });
}

// Service Images hooks
export function useServiceImages(serviceId?: string) {
  return useQuery({
    queryKey: ["service-images", serviceId],
    queryFn: async () => {
      let query = supabase.from("service_images").select("*").order("display_order");
      if (serviceId) {
        query = query.eq("service_id", serviceId);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data as ServiceImage[];
    },
  });
}

export function useAddServiceImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ service_id, image_url, display_order }: { service_id: string; image_url: string; display_order: number }) => {
      const { data, error } = await supabase
        .from("service_images")
        .insert({ service_id, image_url, display_order })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-images"] });
      toast.success("Image added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add image: " + error.message);
    },
  });
}

export function useDeleteServiceImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("service_images").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-images"] });
      toast.success("Image deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete image: " + error.message);
    },
  });
}

// Features hooks
export function useFeatures() {
  return useQuery({
    queryKey: ["features"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("features")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data as Feature[];
    },
  });
}

export function useUpdateFeature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (feature: Partial<Feature> & { id: string }) => {
      const { data, error } = await supabase
        .from("features")
        .update(feature)
        .eq("id", feature.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
      toast.success("Feature updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update feature: " + error.message);
    },
  });
}

export function useAddFeature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (feature: Omit<Feature, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("features")
        .insert(feature)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
      toast.success("Feature added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add feature: " + error.message);
    },
  });
}

export function useDeleteFeature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("features").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
      toast.success("Feature deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete feature: " + error.message);
    },
  });
}

// Upload image to storage
export async function uploadServiceImage(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("service-images")
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("service-images").getPublicUrl(fileName);
  return data.publicUrl;
}
