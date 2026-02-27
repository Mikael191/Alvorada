import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandSealProps {
    className?: string;
    size?: number;
    variant?: "solid" | "watermark";
}

export function BrandSeal({ className, size = 120, variant = "solid" }: BrandSealProps) {
    const isWatermark = variant === "watermark";

    return (
        <div
            className={cn(
                "relative flex items-center justify-center rounded-full overflow-hidden",
                isWatermark ? "opacity-5" : "bg-stamp border-4 border-stamp/80 shadow-sm",
                className
            )}
            style={{
                width: size,
                height: size,
            }}
        >
            {/* Texture overlay for solid variant to simulate ink stamp */}
            {!isWatermark && (
                <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-20 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
            )}

            {/* Dragon Logo */}
            <div
                className={cn(
                    "relative flex items-center justify-center rounded-full",
                    !isWatermark && "bg-paper/5 w-[85%] h-[85%]" // Inner border spacing
                )}
            >
                <Image
                    src="/brand/logo-alvorada.png"
                    alt="Grêmio Alvorada Seal"
                    width={size * 0.7}
                    height={size * 0.7}
                    className={cn(
                        "object-contain",
                        !isWatermark && "drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)] brightness-0 invert" // Make logo white/light on red background if not transparent
                    )}
                />
            </div>
        </div>
    );
}
