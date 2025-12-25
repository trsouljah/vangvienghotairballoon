-- Add unique constraint to site_content for upsert to work properly
ALTER TABLE public.site_content ADD CONSTRAINT site_content_section_key_unique UNIQUE (section, key);