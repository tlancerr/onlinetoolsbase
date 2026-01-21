import React, { Suspense } from "react";
import ToolLayout from "../../../components/ToolLayout";

const AgeCalculator = React.lazy(() => import("./AgeCalculator"));

export const dynamic = "force-static";

export default function AgeCalculatorPage() {
  return (
    <ToolLayout
      title="Age Calculator"
      category="Time and Age Tools"
      description="Calculate your exact age in years, months, and days."
      slug="age-calculator"
    >
      <Suspense fallback={<div>Loading tool…</div>}>
        <AgeCalculator />
      </Suspense>
    </ToolLayout>
  );
}


