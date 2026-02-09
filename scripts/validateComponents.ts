import components from "../components.json";
import { validateShadcnConfig } from "../src/schema/shadcnConfigSchema";

try {
  validateShadcnConfig(components);
  console.log("✅ components.json validation passed");
} catch (error) {
  console.error("❌ components.json validation failed");
  console.error(error);
  process.exit(1);
}