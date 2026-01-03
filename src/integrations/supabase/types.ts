export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alliance_applications: {
        Row: {
          company_name: string
          created_at: string
          current_placements_year: string
          email: string
          full_name: string
          honeypot: string | null
          how_heard: string | null
          id: string
          linkedin_url: string | null
          location: string
          phone: string
          specialty_niche: string
          status: string
          tcpa_consent: boolean
          tcpa_timestamp: string | null
          updated_at: string
          website_url: string | null
          why_join: string
          years_experience: number
        }
        Insert: {
          company_name: string
          created_at?: string
          current_placements_year: string
          email: string
          full_name: string
          honeypot?: string | null
          how_heard?: string | null
          id?: string
          linkedin_url?: string | null
          location: string
          phone: string
          specialty_niche: string
          status?: string
          tcpa_consent?: boolean
          tcpa_timestamp?: string | null
          updated_at?: string
          website_url?: string | null
          why_join: string
          years_experience: number
        }
        Update: {
          company_name?: string
          created_at?: string
          current_placements_year?: string
          email?: string
          full_name?: string
          honeypot?: string | null
          how_heard?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string
          phone?: string
          specialty_niche?: string
          status?: string
          tcpa_consent?: boolean
          tcpa_timestamp?: string | null
          updated_at?: string
          website_url?: string | null
          why_join?: string
          years_experience?: number
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string
          category: string
          content: string
          created_at: string
          excerpt: string | null
          featured: boolean | null
          featured_image: string | null
          id: string
          published: boolean | null
          slug: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          category: string
          content: string
          created_at?: string
          excerpt?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          slug?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured?: boolean | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          slug?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_submissions: {
        Row: {
          ats_application_id: string | null
          candidate_id: string | null
          client_feedback: string | null
          id: string
          internal_notes: string | null
          interview_dates: Json | null
          job_order_id: string | null
          last_synced_at: string | null
          offer_details: Json | null
          rejection_reason: string | null
          stage: string | null
          submitted_at: string | null
          submitted_by: string | null
          updated_at: string | null
        }
        Insert: {
          ats_application_id?: string | null
          candidate_id?: string | null
          client_feedback?: string | null
          id?: string
          internal_notes?: string | null
          interview_dates?: Json | null
          job_order_id?: string | null
          last_synced_at?: string | null
          offer_details?: Json | null
          rejection_reason?: string | null
          stage?: string | null
          submitted_at?: string | null
          submitted_by?: string | null
          updated_at?: string | null
        }
        Update: {
          ats_application_id?: string | null
          candidate_id?: string | null
          client_feedback?: string | null
          id?: string
          internal_notes?: string | null
          interview_dates?: Json | null
          job_order_id?: string | null
          last_synced_at?: string | null
          offer_details?: Json | null
          rejection_reason?: string | null
          stage?: string | null
          submitted_at?: string | null
          submitted_by?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_submissions_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_submissions_job_order_id_fkey"
            columns: ["job_order_id"]
            isOneToOne: false
            referencedRelation: "job_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          ats_id: string | null
          ats_platform: string | null
          availability: string | null
          created_at: string | null
          created_by: string | null
          current_company: string | null
          current_title: string | null
          custom_fields: Json | null
          email: string | null
          experience_years: number | null
          first_name: string
          id: string
          last_name: string
          last_synced_at: string | null
          linkedin_url: string | null
          location: string | null
          notes: string | null
          phone: string | null
          resume_url: string | null
          salary_expectation: string | null
          skills: string[] | null
          source: string | null
          source_detail: string | null
          status: string | null
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          ats_id?: string | null
          ats_platform?: string | null
          availability?: string | null
          created_at?: string | null
          created_by?: string | null
          current_company?: string | null
          current_title?: string | null
          custom_fields?: Json | null
          email?: string | null
          experience_years?: number | null
          first_name: string
          id?: string
          last_name: string
          last_synced_at?: string | null
          linkedin_url?: string | null
          location?: string | null
          notes?: string | null
          phone?: string | null
          resume_url?: string | null
          salary_expectation?: string | null
          skills?: string[] | null
          source?: string | null
          source_detail?: string | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          ats_id?: string | null
          ats_platform?: string | null
          availability?: string | null
          created_at?: string | null
          created_by?: string | null
          current_company?: string | null
          current_title?: string | null
          custom_fields?: Json | null
          email?: string | null
          experience_years?: number | null
          first_name?: string
          id?: string
          last_name?: string
          last_synced_at?: string | null
          linkedin_url?: string | null
          location?: string | null
          notes?: string | null
          phone?: string | null
          resume_url?: string | null
          salary_expectation?: string | null
          skills?: string[] | null
          source?: string | null
          source_detail?: string | null
          status?: string | null
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          expires_at: string | null
          honeypot: string | null
          id: string
          inquiry_type: string | null
          ip_address: unknown
          message: string
          name: string
          phone: string | null
          source_page: string | null
          status: string | null
          submission_time_seconds: number | null
          tcpa_consent: boolean
          tcpa_timestamp: string | null
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          expires_at?: string | null
          honeypot?: string | null
          id?: string
          inquiry_type?: string | null
          ip_address?: unknown
          message: string
          name: string
          phone?: string | null
          source_page?: string | null
          status?: string | null
          submission_time_seconds?: number | null
          tcpa_consent?: boolean
          tcpa_timestamp?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          expires_at?: string | null
          honeypot?: string | null
          id?: string
          inquiry_type?: string | null
          ip_address?: unknown
          message?: string
          name?: string
          phone?: string | null
          source_page?: string | null
          status?: string | null
          submission_time_seconds?: number | null
          tcpa_consent?: boolean
          tcpa_timestamp?: string | null
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      conversation_participants: {
        Row: {
          conversation_id: number
          joined_at: string
          profile_id: string
        }
        Insert: {
          conversation_id: number
          joined_at?: string
          profile_id: string
        }
        Update: {
          conversation_id?: number
          joined_at?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_participants_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_participants_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          created_by: string
          id: number
          last_message_at: string
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: never
          last_message_at?: string
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: never
          last_message_at?: string
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      directory_listings: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          is_featured: boolean | null
          is_visible: boolean | null
          listing_description: string | null
          listing_title: string | null
          niche: string
          profile_id: string
          target_market: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          is_visible?: boolean | null
          listing_description?: string | null
          listing_title?: string | null
          niche: string
          profile_id: string
          target_market: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_featured?: boolean | null
          is_visible?: boolean | null
          listing_description?: string | null
          listing_title?: string | null
          niche?: string
          profile_id?: string
          target_market?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "directory_listings_niche_fkey"
            columns: ["niche"]
            isOneToOne: false
            referencedRelation: "niches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "directory_listings_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "directory_listings_target_market_fkey"
            columns: ["target_market"]
            isOneToOne: false
            referencedRelation: "target_markets"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          body: string
          category: string | null
          created_at: string
          created_by: string | null
          id: string
          is_shared: boolean | null
          name: string
          subject: string
          updated_at: string
        }
        Insert: {
          body: string
          category?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_shared?: boolean | null
          name: string
          subject: string
          updated_at?: string
        }
        Update: {
          body?: string
          category?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_shared?: boolean | null
          name?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      global_settings: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          label: string | null
          updated_at: string | null
          updated_by: string | null
          value: string | null
          value_type: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id: string
          label?: string | null
          updated_at?: string | null
          updated_by?: string | null
          value?: string | null
          value_type?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          label?: string | null
          updated_at?: string | null
          updated_by?: string | null
          value?: string | null
          value_type?: string | null
        }
        Relationships: []
      }
      job_orders: {
        Row: {
          assigned_agent: string | null
          ats_id: string | null
          ats_platform: string | null
          candidates_submitted: number | null
          client_company: string
          client_contact_email: string | null
          client_contact_name: string | null
          created_at: string | null
          created_by: string | null
          department: string | null
          description: string | null
          employment_type: string | null
          fee_amount: number | null
          fee_type: string | null
          id: string
          interviews_scheduled: number | null
          job_title: string
          last_synced_at: string | null
          location: string | null
          priority: string | null
          required_skills: string[] | null
          requirements: string | null
          salary_max: number | null
          salary_min: number | null
          salary_type: string | null
          status: string | null
          target_start_date: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_agent?: string | null
          ats_id?: string | null
          ats_platform?: string | null
          candidates_submitted?: number | null
          client_company: string
          client_contact_email?: string | null
          client_contact_name?: string | null
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          description?: string | null
          employment_type?: string | null
          fee_amount?: number | null
          fee_type?: string | null
          id?: string
          interviews_scheduled?: number | null
          job_title: string
          last_synced_at?: string | null
          location?: string | null
          priority?: string | null
          required_skills?: string[] | null
          requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          salary_type?: string | null
          status?: string | null
          target_start_date?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_agent?: string | null
          ats_id?: string | null
          ats_platform?: string | null
          candidates_submitted?: number | null
          client_company?: string
          client_contact_email?: string | null
          client_contact_name?: string | null
          created_at?: string | null
          created_by?: string | null
          department?: string | null
          description?: string | null
          employment_type?: string | null
          fee_amount?: number | null
          fee_type?: string | null
          id?: string
          interviews_scheduled?: number | null
          job_title?: string
          last_synced_at?: string | null
          location?: string | null
          priority?: string | null
          required_skills?: string[] | null
          requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          salary_type?: string | null
          status?: string | null
          target_start_date?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      locations: {
        Row: {
          created_at: string | null
          description: string | null
          display_name: string
          display_order: number | null
          geo_lat: number | null
          geo_lng: number | null
          id: string
          industries: string[] | null
          is_active: boolean | null
          major_companies: string[] | null
          market_type: string | null
          population: string | null
          region: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name: string
          display_order?: number | null
          geo_lat?: number | null
          geo_lng?: number | null
          id: string
          industries?: string[] | null
          is_active?: boolean | null
          major_companies?: string[] | null
          market_type?: string | null
          population?: string | null
          region: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name?: string
          display_order?: number | null
          geo_lat?: number | null
          geo_lng?: number | null
          id?: string
          industries?: string[] | null
          is_active?: boolean | null
          major_companies?: string[] | null
          market_type?: string | null
          population?: string | null
          region?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: number
          created_at: string
          id: number
          is_edited: boolean
          sender_id: string
          updated_at: string
        }
        Insert: {
          content: string
          conversation_id: number
          created_at?: string
          id?: never
          is_edited?: boolean
          sender_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          conversation_id?: number
          created_at?: string
          id?: never
          is_edited?: boolean
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      niches: {
        Row: {
          created_at: string | null
          description: string | null
          display_name: string
          display_order: number | null
          icon: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name: string
          display_order?: number | null
          icon?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name?: string
          display_order?: number | null
          icon?: string | null
          id?: string
        }
        Relationships: []
      }
      page_content: {
        Row: {
          content_key: string
          content_metadata: Json | null
          content_type: string
          content_value: string | null
          created_at: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          page_slug: string
          section_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          content_key: string
          content_metadata?: Json | null
          content_type?: string
          content_value?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          page_slug: string
          section_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          content_key?: string
          content_metadata?: Json | null
          content_type?: string
          content_value?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          page_slug?: string
          section_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      page_seo: {
        Row: {
          canonical_url: string | null
          created_at: string | null
          id: string
          keywords: string[] | null
          meta_description: string | null
          meta_title: string | null
          og_description: string | null
          og_image: string | null
          og_title: string | null
          page_slug: string
          robots: string | null
          structured_data: Json | null
          twitter_description: string | null
          twitter_image: string | null
          twitter_title: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string | null
          id?: string
          keywords?: string[] | null
          meta_description?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          page_slug: string
          robots?: string | null
          structured_data?: Json | null
          twitter_description?: string | null
          twitter_image?: string | null
          twitter_title?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          canonical_url?: string | null
          created_at?: string | null
          id?: string
          keywords?: string[] | null
          meta_description?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          page_slug?: string
          robots?: string | null
          structured_data?: Json | null
          twitter_description?: string | null
          twitter_image?: string | null
          twitter_title?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      placements: {
        Row: {
          agent_id: string | null
          ats_id: string | null
          ats_platform: string | null
          candidate_id: string | null
          candidate_name: string
          client_company: string
          commission_split: Json | null
          contract_end_date: string | null
          created_at: string | null
          fee_flat: number | null
          fee_paid_date: string | null
          fee_percentage: number | null
          fee_status: string | null
          fee_total: number | null
          fee_type: string | null
          guarantee_expires: string | null
          guarantee_period_days: number | null
          id: string
          job_order_id: string | null
          job_title: string
          last_synced_at: string | null
          notes: string | null
          placement_type: string | null
          salary: number | null
          start_date: string | null
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          ats_id?: string | null
          ats_platform?: string | null
          candidate_id?: string | null
          candidate_name: string
          client_company: string
          commission_split?: Json | null
          contract_end_date?: string | null
          created_at?: string | null
          fee_flat?: number | null
          fee_paid_date?: string | null
          fee_percentage?: number | null
          fee_status?: string | null
          fee_total?: number | null
          fee_type?: string | null
          guarantee_expires?: string | null
          guarantee_period_days?: number | null
          id?: string
          job_order_id?: string | null
          job_title: string
          last_synced_at?: string | null
          notes?: string | null
          placement_type?: string | null
          salary?: number | null
          start_date?: string | null
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          ats_id?: string | null
          ats_platform?: string | null
          candidate_id?: string | null
          candidate_name?: string
          client_company?: string
          commission_split?: Json | null
          contract_end_date?: string | null
          created_at?: string | null
          fee_flat?: number | null
          fee_paid_date?: string | null
          fee_percentage?: number | null
          fee_status?: string | null
          fee_total?: number | null
          fee_type?: string | null
          guarantee_expires?: string | null
          guarantee_period_days?: number | null
          id?: string
          job_order_id?: string | null
          job_title?: string
          last_synced_at?: string | null
          notes?: string | null
          placement_type?: string | null
          salary?: number | null
          start_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "placements_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "placements_job_order_id_fkey"
            columns: ["job_order_id"]
            isOneToOne: false
            referencedRelation: "job_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          availability_status: string | null
          avatar_url: string | null
          bio: string | null
          calendly_url: string | null
          company: string | null
          cover_photo_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          headline: string | null
          id: string
          is_active: boolean | null
          linkedin_url: string | null
          location: string | null
          niche: string | null
          phone: string | null
          placements_count: number | null
          rating: number | null
          reviews_count: number | null
          role: string | null
          specialties: string[] | null
          title: string | null
          updated_at: string
          username: string
          website_url: string | null
          years_experience: number | null
        }
        Insert: {
          availability_status?: string | null
          avatar_url?: string | null
          bio?: string | null
          calendly_url?: string | null
          company?: string | null
          cover_photo_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          headline?: string | null
          id: string
          is_active?: boolean | null
          linkedin_url?: string | null
          location?: string | null
          niche?: string | null
          phone?: string | null
          placements_count?: number | null
          rating?: number | null
          reviews_count?: number | null
          role?: string | null
          specialties?: string[] | null
          title?: string | null
          updated_at?: string
          username: string
          website_url?: string | null
          years_experience?: number | null
        }
        Update: {
          availability_status?: string | null
          avatar_url?: string | null
          bio?: string | null
          calendly_url?: string | null
          company?: string | null
          cover_photo_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          headline?: string | null
          id?: string
          is_active?: boolean | null
          linkedin_url?: string | null
          location?: string | null
          niche?: string | null
          phone?: string | null
          placements_count?: number | null
          rating?: number | null
          reviews_count?: number | null
          role?: string | null
          specialties?: string[] | null
          title?: string | null
          updated_at?: string
          username?: string
          website_url?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      prospect_activities: {
        Row: {
          activity_type: string
          created_at: string
          description: string
          id: string
          metadata: Json | null
          new_value: string | null
          old_value: string | null
          prospect_id: string
          user_id: string | null
        }
        Insert: {
          activity_type: string
          created_at?: string
          description: string
          id?: string
          metadata?: Json | null
          new_value?: string | null
          old_value?: string | null
          prospect_id: string
          user_id?: string | null
        }
        Update: {
          activity_type?: string
          created_at?: string
          description?: string
          id?: string
          metadata?: Json | null
          new_value?: string | null
          old_value?: string | null
          prospect_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prospect_activities_prospect_id_fkey"
            columns: ["prospect_id"]
            isOneToOne: false
            referencedRelation: "prospects"
            referencedColumns: ["id"]
          },
        ]
      }
      prospect_reminders: {
        Row: {
          completed_at: string | null
          created_at: string
          created_by: string | null
          id: string
          is_completed: boolean | null
          note: string | null
          prospect_id: string
          reminder_date: string
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_completed?: boolean | null
          note?: string | null
          prospect_id: string
          reminder_date: string
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          is_completed?: boolean | null
          note?: string | null
          prospect_id?: string
          reminder_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "prospect_reminders_prospect_id_fkey"
            columns: ["prospect_id"]
            isOneToOne: false
            referencedRelation: "prospects"
            referencedColumns: ["id"]
          },
        ]
      }
      prospects: {
        Row: {
          company_domain: string | null
          company_industry: string | null
          company_linkedin: string | null
          company_location: string | null
          company_name: string | null
          company_size: string | null
          company_website: string | null
          contact_email: string | null
          contact_linkedin: string | null
          contact_name: string | null
          contact_phone: string | null
          contact_title: string | null
          created_at: string
          created_by: string | null
          enriched_at: string | null
          enrichment_data: Json | null
          enrichment_source: string | null
          id: string
          last_outreach_at: string | null
          notes: string | null
          outreach_campaign: string | null
          outreach_status: string | null
          prospect_type: string
          score: number | null
          source: string | null
          source_url: string | null
          status: string
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          company_domain?: string | null
          company_industry?: string | null
          company_linkedin?: string | null
          company_location?: string | null
          company_name?: string | null
          company_size?: string | null
          company_website?: string | null
          contact_email?: string | null
          contact_linkedin?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contact_title?: string | null
          created_at?: string
          created_by?: string | null
          enriched_at?: string | null
          enrichment_data?: Json | null
          enrichment_source?: string | null
          id?: string
          last_outreach_at?: string | null
          notes?: string | null
          outreach_campaign?: string | null
          outreach_status?: string | null
          prospect_type?: string
          score?: number | null
          source?: string | null
          source_url?: string | null
          status?: string
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          company_domain?: string | null
          company_industry?: string | null
          company_linkedin?: string | null
          company_location?: string | null
          company_name?: string | null
          company_size?: string | null
          company_website?: string | null
          contact_email?: string | null
          contact_linkedin?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contact_title?: string | null
          created_at?: string
          created_by?: string | null
          enriched_at?: string | null
          enrichment_data?: Json | null
          enrichment_source?: string | null
          id?: string
          last_outreach_at?: string | null
          notes?: string | null
          outreach_campaign?: string | null
          outreach_status?: string | null
          prospect_type?: string
          score?: number | null
          source?: string | null
          source_url?: string | null
          status?: string
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      salary_lookups: {
        Row: {
          created_at: string | null
          experience_level: string | null
          id: string
          industry: string | null
          location: string
          result_data: Json | null
          role_title: string
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          experience_level?: string | null
          id?: string
          industry?: string | null
          location: string
          result_data?: Json | null
          role_title: string
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          experience_level?: string | null
          id?: string
          industry?: string | null
          location?: string
          result_data?: Json | null
          role_title?: string
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          email: string
          ghl_contact_id: string | null
          id: string
          is_active: boolean | null
          source_page: string | null
          subscribed_at: string
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          ghl_contact_id?: string | null
          id?: string
          is_active?: boolean | null
          source_page?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          ghl_contact_id?: string | null
          id?: string
          is_active?: boolean | null
          source_page?: string | null
          subscribed_at?: string
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      target_markets: {
        Row: {
          created_at: string | null
          description: string | null
          display_name: string
          display_order: number | null
          id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name: string
          display_order?: number | null
          id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name?: string
          display_order?: number | null
          id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_prospect_score: {
        Args: { prospect_id: string }
        Returns: number
      }
      delete_old_submissions: { Args: never; Returns: undefined }
      generate_slug: { Args: { title: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      update_prospect_score: {
        Args: { prospect_id: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "agent" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "agent", "user"],
    },
  },
} as const
