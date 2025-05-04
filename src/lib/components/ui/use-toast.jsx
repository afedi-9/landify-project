// Simplified toast implementation for src/lib/components/ui/use-toast.ts
const toast = ({ title, description, variant = "default", duration = 5000 }) => {
  console.log(`Toast: ${title} - ${description}`)
  // In a real implementation, this would show a toast notification
}

export { toast }
