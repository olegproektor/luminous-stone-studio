import { trustProofsSeed } from "@/data/trust-proofs.seed";

interface TrustProofStripProps {
  items?: typeof trustProofsSeed;
  className?: string;
}

const TrustProofStrip = ({ items = trustProofsSeed, className = "" }: TrustProofStripProps) => {
  return (
    <section className={`border-y border-border bg-secondary/40 ${className}`}>
      <div className="container-brand px-6 md:px-12 lg:px-24 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="text-center lg:text-left">
              <p className="font-display text-2xl text-foreground">{item.value}</p>
              <p className="font-body text-xs text-muted-foreground mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustProofStrip;
