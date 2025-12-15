export interface Obra {
  id: string
  nome: string
  tipo: string
  localizacao: string
  distrito?: string
  area: string
  orcamento: string
  prazo: string
  descricao: string
  requisitosEspeciais: string
  dataSubmissao: string
  status: "pendente" | "em-analise" | "aprovado" | "rejeitado" | "informacao-adicional"
  observacoes?: string
  etapaAtual?: number
  progresso?: number
}

export interface Documento {
  id: string
  obraId?: string
  nome: string
  tipo: string
  tamanho: number
  dataUpload: string
  url: string
}

export interface Visita {
  id: string
  obraId: string
  obraNome: string
  data: string
  horario: string
  responsavel: string
  contacto: string
  observacoes: string
  status: "pendente" | "confirmada" | "concluida" | "cancelada"
}

export interface Mensagem {
  id: string
  conteudo: string
  remetente: "user" | "support" | "system"
  nomeRemetente: string
  timestamp: string
  lida: boolean
}

export interface TarefaWorkflow {
  id: string
  titulo: string
  descricao: string
  completada: boolean
  pendente: boolean
  prazo?: string
  alertas?: string[]
}

export interface EtapaWorkflow {
  id: number
  obraId: string
  completada: boolean
  tarefas: TarefaWorkflow[]
}

export interface ObraDisponivel {
  id: string
  titulo: string
  tipo: string
  localizacao: string
  distrito: string
  orcamentoMin: number
  orcamentoMax: number
  prazoSubmissao: string
  entidade: string
  descricao: string
  requisitos: string[]
  participantes: number
  candidatado: boolean
}

export interface Convite {
  id: string
  obraId: string
  email: string
  dataEnvio: string
  status: "pendente" | "aceite" | "recusado"
}
