// MOAP API Integration for Limarestas
// Connects to the external MOAP platform for materials data and budget management

const MOAP_API_BASE_URL = "https://moap.vercel.app/api/external"
const MOAP_API_KEY = "moap_dev_key_2026_secure_connection"

interface MOAPRequestOptions {
  action?: string
  method?: string
  table?: string
  data?: Record<string, unknown>
  filters?: Record<string, unknown>
}

interface Material {
  id: string
  name: string
  unit: string
  price: number
  category: string
  subcategory?: string
  supplier?: string
  description?: string
}

interface BudgetItem {
  materialId: string
  materialName: string
  unit: string
  quantity: number
  unitPrice: number
  category: string
  margin?: number
  totalPrice?: number
}

interface Budget {
  id?: string
  name: string
  obraName: string
  obraId?: string
  items: BudgetItem[]
  clientEmail?: string
  clientName?: string
  subtotal?: number
  marginPercentage?: number
  marginAmount?: number
  total?: number
  status?: "pending" | "approved" | "rejected"
  createdAt?: string
  approvedAt?: string
}

interface MOAPResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

async function moapRequest<T = unknown>(options: MOAPRequestOptions): Promise<MOAPResponse<T>> {
  try {
    const response = await fetch(MOAP_API_BASE_URL, {
      method: "POST",
      headers: {
        "x-api-key": MOAP_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    })

    if (!response.ok) {
      throw new Error(`MOAP API error: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    return result as MOAPResponse<T>
  } catch (error) {
    console.error("[MOAP API] Request failed:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// Fetch all materials from MOAP database
export async function getMaterials(category?: string): Promise<Material[]> {
  const filters = category ? { category } : {}
  const response = await moapRequest<Material[]>({
    method: "GET",
    table: "materials",
    filters,
  })

  if (response.success && response.data) {
    return response.data
  }
  return []
}

// Sync materials database
export async function syncMaterials(): Promise<MOAPResponse> {
  return moapRequest({
    action: "sync_materials",
  })
}

// Submit a budget for admin approval
export async function submitBudget(budget: Budget): Promise<MOAPResponse<Budget>> {
  return moapRequest<Budget>({
    action: "submit_budget",
    data: {
      name: budget.name,
      obraName: budget.obraName,
      obraId: budget.obraId,
      items: budget.items,
      clientEmail: budget.clientEmail,
      clientName: budget.clientName,
      subtotal: budget.subtotal,
      marginPercentage: budget.marginPercentage,
      marginAmount: budget.marginAmount,
      total: budget.total,
    },
  })
}

// Get approved budgets for client view
export async function getApprovedBudgets(): Promise<Budget[]> {
  const response = await moapRequest<Budget[]>({
    action: "get_approved_budgets",
  })

  if (response.success && response.data) {
    return response.data
  }
  return []
}

// Get all budgets (admin view)
export async function getAllBudgets(): Promise<Budget[]> {
  const response = await moapRequest<Budget[]>({
    method: "GET",
    table: "budgets",
  })

  if (response.success && response.data) {
    return response.data
  }
  return []
}

// Get budget items for a specific budget
export async function getBudgetItems(budgetId: string): Promise<BudgetItem[]> {
  const response = await moapRequest<BudgetItem[]>({
    method: "GET",
    table: "budget_items",
    filters: { budgetId },
  })

  if (response.success && response.data) {
    return response.data
  }
  return []
}

// Calculate budget totals with margin
export function calculateBudgetTotals(
  items: BudgetItem[],
  marginPercentage: number = 0
): {
  subtotal: number
  marginAmount: number
  total: number
  itemsWithTotals: BudgetItem[]
} {
  const itemsWithTotals = items.map((item) => ({
    ...item,
    totalPrice: item.quantity * item.unitPrice,
  }))

  const subtotal = itemsWithTotals.reduce((sum, item) => sum + (item.totalPrice || 0), 0)
  const marginAmount = subtotal * (marginPercentage / 100)
  const total = subtotal + marginAmount

  return {
    subtotal,
    marginAmount,
    total,
    itemsWithTotals,
  }
}

// Register a new user (pending admin approval)
export async function registerUser(userData: {
  email: string
  name: string
  company?: string
  phone?: string
  role: string
}): Promise<MOAPResponse> {
  return moapRequest({
    action: "register_user",
    data: userData,
  })
}

// Export types
export type { Material, BudgetItem, Budget, MOAPResponse }
