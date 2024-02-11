import { createClient } from "@supabase/supabase-js";
import { PUBLIC_DB_KEY, PUBLIC_DB_URL } from "$env/static/public";

export const supabase = createClient(
    PUBLIC_DB_URL,
    PUBLIC_DB_KEY
);

export type Blog = Tables<"blogs">;
export type Comment = Tables<"comments">;
export type Contact = Tables<"contact">;
export type UniqueVisitor = Tables<"unique_visitors">;
export type Award = Tables<"awards"> & { data: string[] };
export type DailyUniqueVisitorCount = Tables<"daily_unique_visitor_count">;

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      awards: {
        Row: {
          created_at: string
          data: Json
          date: string
          from: string
          id: number
          title: string
        }
        Insert: {
          created_at?: string
          data: Json
          date: string
          from: string
          id?: number
          title: string
        }
        Update: {
          created_at?: string
          data?: Json
          date?: string
          from?: string
          id?: number
          title?: string
        }
        Relationships: []
      }
      blogs: {
        Row: {
          content: string
          created_at: string
          dislikes: number
          id: string
          image: string | null
          likes: number
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          dislikes?: number
          id?: string
          image?: string | null
          likes?: number
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          dislikes?: number
          id?: string
          image?: string | null
          likes?: number
          title?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          author: string
          b_id: string
          content: string
          created_at: string
          id: string
        }
        Insert: {
          author: string
          b_id: string
          content: string
          created_at?: string
          id?: string
        }
        Update: {
          author?: string
          b_id?: string
          content?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_b_id_fkey"
            columns: ["b_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["id"]
          }
        ]
      }
      contact: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          read: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          read?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          read?: string | null
        }
        Relationships: []
      }
      unique_visitors: {
        Row: {
          created_at: string
          date: string
          hash: string
          id: string
          isDisplay: boolean
          location: Json | null
        }
        Insert: {
          created_at?: string
          date: string
          hash: string
          id?: string
          isDisplay?: boolean
          location?: Json | null
        }
        Update: {
          created_at?: string
          date?: string
          hash?: string
          id?: string
          isDisplay?: boolean
          location?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      daily_unique_visitor_count: {
        Row: {
          unique_visitors: number | null
          visit_date: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      random_uuids: {
        Args: {
          num_uuids: number
        }
        Returns: {
          hash: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
