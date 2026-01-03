-- Fix function security issues by setting search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

CREATE OR REPLACE FUNCTION public.generate_slug(title text)
RETURNS text AS $$
BEGIN
  RETURN lower(trim(regexp_replace(title, '[^a-zA-Z0-9\s]', '', 'g')));
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

CREATE OR REPLACE FUNCTION public.handle_blog_post_slug()
RETURNS trigger AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug = public.generate_slug(NEW.title) || '-' || substr(NEW.id::text, 1, 8);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

-- Add missing RLS policies for conversations, messages, and conversation_participants tables
CREATE POLICY "Users can view conversations they participate in" 
ON public.conversations 
FOR SELECT 
USING (
  created_by = auth.uid() OR 
  id IN (
    SELECT conversation_id 
    FROM public.conversation_participants 
    WHERE profile_id = auth.uid()
  )
);

CREATE POLICY "Users can create conversations" 
ON public.conversations 
FOR INSERT 
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update conversations they created" 
ON public.conversations 
FOR UPDATE 
USING (created_by = auth.uid());

CREATE POLICY "Users can view messages in their conversations" 
ON public.messages 
FOR SELECT 
USING (
  conversation_id IN (
    SELECT id FROM public.conversations 
    WHERE created_by = auth.uid() OR 
    id IN (
      SELECT conversation_id 
      FROM public.conversation_participants 
      WHERE profile_id = auth.uid()
    )
  )
);

CREATE POLICY "Users can send messages to their conversations" 
ON public.messages 
FOR INSERT 
WITH CHECK (
  sender_id = auth.uid() AND
  conversation_id IN (
    SELECT id FROM public.conversations 
    WHERE created_by = auth.uid() OR 
    id IN (
      SELECT conversation_id 
      FROM public.conversation_participants 
      WHERE profile_id = auth.uid()
    )
  )
);

CREATE POLICY "Users can update their own messages" 
ON public.messages 
FOR UPDATE 
USING (sender_id = auth.uid());

CREATE POLICY "Users can view conversation participants for their conversations" 
ON public.conversation_participants 
FOR SELECT 
USING (
  conversation_id IN (
    SELECT id FROM public.conversations 
    WHERE created_by = auth.uid() OR 
    id IN (
      SELECT conversation_id 
      FROM public.conversation_participants 
      WHERE profile_id = auth.uid()
    )
  )
);

CREATE POLICY "Users can join conversations they're invited to" 
ON public.conversation_participants 
FOR INSERT 
WITH CHECK (profile_id = auth.uid());