import { Suspense } from "react"
import { ComparePageContent } from "./ComparePageContent"
import { Loader2 } from "lucide-react"

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <ComparePageContent />
    </Suspense>
  )
}

