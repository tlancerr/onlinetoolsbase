import InternalLinkingTool from "@/components/ai/tools/InternalLinkingTool"
import MetaGeneratorTool from "@/components/ai/tools/MetaGeneratorTool"
import SchemaGeneratorTool from "@/components/ai/tools/SchemaGeneratorTool"

export const aiToolRegistry = {
  "internal-linking": InternalLinkingTool,
  "meta-generator": MetaGeneratorTool,
  "schema-generator": SchemaGeneratorTool,
}

export type AiToolSlug = keyof typeof aiToolRegistry
