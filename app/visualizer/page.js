import { Suspense } from "react";
import VisualizerPage from "../../components/AIVisualizer/VisualizerPage";

export const metadata = {
  title: "AI Fabric Visualizer | Helm Textile Mills",
  description:
    "Visualise any Helmtex fabric on furniture in seconds. Pick a fabric from our catalog, choose a furniture piece, and let AI generate a photorealistic preview.",
};

export default function Page() {
  return (
    <div className="pt-24">
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center text-slate-400">
            Loading visualizer…
          </div>
        }
      >
        <VisualizerPage />
      </Suspense>
    </div>
  );
}
