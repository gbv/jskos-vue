import { describe, it, expect } from "vitest"
import { loadESLint } from "eslint"

const DefaultESLint = await loadESLint()
const eslint = new DefaultESLint()
const results = await eslint.lintFiles([
  "**/*.js",
  "**/*.vue",
])

describe("ESLint Errors", () => {

  results.forEach(result => {
    it(result.filePath, () => {
      expect(
        result.errorCount,
        "\n" + result.messages.map(m => `\t\t${m.line}:${m.column}\terror\t${m.message}\t${m.ruleId}`).join("\n"),
      ).toBe(0)
    })
  })

})
