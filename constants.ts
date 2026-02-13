import { LayoutDashboard, Users, Database, Ghost, ShieldAlert, Settings, Layers, Workflow, Network } from 'lucide-react';
import { ViewType } from './types';

export const APP_NAME = "imanhibrido2.0";

export const NAV_ITEMS: { label: string; icon: any; id: ViewType }[] = [
  { label: 'Tablero Táctico', icon: LayoutDashboard, id: 'dashboard' },
  { label: 'Orquestador (War Room)', icon: Workflow, id: 'campaigns' },
  { label: 'Agentes Fantasma', icon: Ghost, id: 'agents' },
  { label: 'La Bóveda (Marketplace)', icon: Database, id: 'vault' },
  { label: 'Tratos en Escrow', icon: Layers, id: 'escrow' },
  { label: 'CRM / Bandeja', icon: Users, id: 'crm' },
];

export const SETTINGS_NAV: { label: string; icon: any; id: ViewType }[] = [
  { label: 'Integraciones (Webhooks)', icon: Network, id: 'integrations' },
  { label: 'Seguridad', icon: ShieldAlert, id: 'security' },
  { label: 'Sistema', icon: Settings, id: 'settings' },
];

export const MOCK_CHART_DATA = [
  { time: '07:00', value: 2400 },
  { time: '08:00', value: 1398 },
  { time: '09:00', value: 9800 },
  { time: '10:00', value: 3908 },
  { time: '11:00', value: 4800 },
  { time: '12:00', value: 3800 },
  { time: '13:00', value: 4300 },
  { time: '14:00', value: 9800 }, // Spike
  { time: '15:00', value: 3908 },
  { time: '16:00', value: 4800 },
  { time: '17:00', value: 5800 },
  { time: '18:00', value: 4300 },
];
