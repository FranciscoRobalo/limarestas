"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@/contexts/auth-context"
import type { ActivityLog } from "@/lib/types"

const STORAGE_KEY = "limarestas_activity_logs"

export function useActivityLog() {
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setLogs(JSON.parse(stored))
    }
  }, [])

  const saveLogs = useCallback((newLogs: ActivityLog[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newLogs))
    setLogs(newLogs)
  }, [])

  const addLog = useCallback(
    (action: string, details: string, entityType: ActivityLog["entityType"], entityId?: string) => {
      if (!user) return

      const newLog: ActivityLog = {
        id: Date.now().toString(),
        userId: user.username,
        userName: user.name,
        userRole: user.role,
        action,
        details,
        entityType,
        entityId,
        timestamp: new Date().toISOString(),
      }

      const updated = [newLog, ...logs].slice(0, 500) // Keep last 500 logs
      saveLogs(updated)
    },
    [user, logs, saveLogs],
  )

  const getLogsByEntity = useCallback(
    (entityType: ActivityLog["entityType"]) => {
      return logs.filter((log) => log.entityType === entityType)
    },
    [logs],
  )

  const getLogsByUser = useCallback(
    (userId: string) => {
      return logs.filter((log) => log.userId === userId)
    },
    [logs],
  )

  const clearLogs = useCallback(() => {
    saveLogs([])
  }, [saveLogs])

  return {
    logs,
    addLog,
    getLogsByEntity,
    getLogsByUser,
    clearLogs,
  }
}
