# 🛸 imanhibrido2.0: Master Implementation Blueprint (AI Studio Edition)

**Estado:** Especificación de Grado de Producción (Fase 2: High-Ticket Ops)
**Firma:** Artemis - Senior Technical PM & Lead Architect

## 1. Executive PRD & UX Strategy (Cyber-Tactical)
(Sin cambios en sección 1-6, ver versiones anteriores)

## 7. Campaign Orchestrator (Load Balancing Algorithm)
El "Cerebro" que gestiona el enjambre de cuentas.

### 7.1 Lógica de Asignación (Pseudocódigo)
```typescript
function getNextAccount(swarmId: string): Account | null {
  const swarm = getAccounts(swarmId);
  
  // 1. Filtrar cuentas muertas o en cooldown
  const activeAccounts = swarm.filter(acc => 
    acc.status === 'AVAILABLE' && acc.health_score > 50
  );

  // 2. Ordenar por "Menor Uso Diario" (Load Balancing)
  activeAccounts.sort((a, b) => 
    (a.current_usage / a.daily_limit) - (b.current_usage / b.daily_limit)
  );

  // 3. Regla de "Safe Delay" (Jitter Humano)
  // No usar la misma cuenta si actuó hace menos de 5-12 minutos
  const validAccount = activeAccounts.find(acc => 
    (now() - acc.last_action_time) > (random(5, 12) * 60000)
  );

  if (!validAccount) return null; // Todo el enjambre está ocupado/descansando

  return validAccount;
}
```

## 8. Database Schema Updates (New Tables)

### `campaigns`
*   `id`: UUID
*   `swarm_config`: JSON (IDs de cuentas, límites globales)
*   `status`: 'active', 'paused', 'completed'

### `campaign_sequences` (Linked List Logic)
*   `id`: UUID
*   `campaign_id`: UUID
*   `step_order`: INT (1, 2, 3...)
*   `type`: 'MESSAGE', 'DELAY', 'CHECK_REPLY'
*   `content_spintax`: TEXT ("{Hola|Qué tal} [Nombre]...")
*   `delay_minutes`: INT (Base delay)
*   `jitter_factor`: FLOAT (0.2 = +/- 20% random)

### `webhook_endpoints`
*   `id`: UUID
*   `url`: TEXT (Make/n8n URL)
*   `subscribed_events`: ARRAY ['new_reply', 'positive_interest']
*   `secret`: TEXT (HMAC signature)

## 9. Integrations (Payload Specs)

**Event:** `POSITIVE_INTEREST`
**Target:** Make.com / HubSpot
```json
{
  "event": "positive_interest",
  "timestamp": "2023-10-27T10:42:00Z",
  "data": {
    "lead": {
      "username": "@ceo_target",
      "profile_url": "https://instagram.com/...",
      "intent_score": 0.89
    },
    "conversation": {
      "last_message_sent": "Te gustaría escalar...?",
      "reply_received": "Sí, envíame info.",
      "thread_id": "thr_12345"
    },
    "operative": {
      "account_used": "@my_agent_04",
      "proxy_region": "US-East"
    }
  }
}
```
