export enum SubscriptionTier {
  BASE = 'base',
  SCALING = 'scaling',
  WHALE = 'whale'
}

export enum AccountStatus {
  AVAILABLE = 'available',
  BUSY = 'busy', // Active in a task
  COOLDOWN = 'cooldown', // Resting logic
  IN_ESCROW = 'in_escrow',
  SOLD = 'sold',
  DEAD = 'dead'
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  credits: number;
  subscription_tier: SubscriptionTier;
  created_at: string;
}

export interface VaultAccount {
  id: string;
  ig_username: string;
  age_months: number;
  status: AccountStatus;
  price: number;
  daily_limit: number;
  current_usage: number;
  proxy_ip: string;
  health_score: number;
}

export interface ActiveAgent {
  id: string;
  name: string;
  status: 'active' | 'break' | 'idle';
  current_task: string;
  time_elapsed: string;
  efficiency_score: number; // 0-100
  avatar_url: string;
  target_account?: string; // The account being messaged
  last_log?: string;
}

export interface Metric {
  label: string;
  value: string | number;
  trend: number;
  trendDirection: 'up' | 'down' | 'neutral';
  color: 'primary' | 'secondary' | 'alert';
}

// --- NEW CAMPAIGN TYPES ---

export type NodeType = 'message' | 'delay' | 'condition' | 'action';

export interface SequenceNode {
  id: string;
  type: NodeType;
  content?: string; // Spintax allowed
  delayMinutes?: number;
  delayJitter?: number; // Random +/- minutes
  condition?: string; // e.g., "If Replied"
  nextId?: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'running' | 'paused' | 'completed';
  leads_total: number;
  leads_contacted: number;
  leads_replied: number;
  swarm_accounts: string[]; // IDs of accounts used
  sequence: SequenceNode[];
}

// --- WEBHOOK TYPES ---

export type WebhookEvent = 'new_reply' | 'positive_interest' | 'appointment_booked' | 'account_ban';

export interface WebhookConfig {
  id: string;
  url: string;
  name: string;
  events: WebhookEvent[];
  isActive: boolean;
}

export type ViewType = 'dashboard' | 'vault' | 'agents' | 'campaigns' | 'integrations' | 'escrow' | 'crm' | 'security' | 'settings';
