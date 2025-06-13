import { describe, it, expect, vi, beforeEach } from 'vitest'
import { analyzeCode } from '../ai_analysis'

// Mock do OpenAI
vi.mock('openai', () => ({
  default: vi.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: vi.fn().mockResolvedValue({
          choices: [{
            message: {
              content: 'Análise detalhada do código...'
            }
          }]
        })
      }
    }
  }))
}))

describe('AI Analysis', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve analisar código com sucesso', async () => {
    const code = `
class No:
    def
