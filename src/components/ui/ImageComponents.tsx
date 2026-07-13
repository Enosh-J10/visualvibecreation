"use client";

import React from "react";
import Image from "next/image";
import { Camera, ShieldCheck, Play, Image as ImageIcon } from "lucide-react";
import { ASSET_REGISTRY, checkAssetKey } from "@/data/assets";

interface PlaceholderProps {
  label: string;
  dimensions: string;
  className?: string;
}

// Stable placeholder with one DOM structure for both server and client.
// process.env.NODE_ENV is a build-time constant inlined by Turbopack —
// identical on server and client, so no hydration mismatch occurs.
const IS_DEV = process.env.NODE_ENV !== "production";

export function DevAssetPlaceholder({ label, dimensions, className = "" }: PlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-6 rounded-xl border border-border-subtle bg-bg-secondary/20 text-center select-none ${className}`}
      role="status"
      aria-label="Media content is being prepared"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.01] text-text-muted/40">
        <ImageIcon className="h-4 w-4" />
      </div>

      <div className="space-y-1">
        {IS_DEV ? (
          <>
            <span className="font-display text-xs font-bold text-text-secondary block">
              {label}
            </span>
            <span className="text-[10px] font-mono text-text-muted block">
              {dimensions}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 mt-1.5 rounded border border-yellow-500/20 bg-yellow-500/5 text-yellow-500 text-[9px] font-mono uppercase tracking-wider">
              Missing Asset
            </span>
          </>
        ) : (
          <span className="font-display text-[11px] font-medium text-text-muted block mt-1">
            Creative media is being prepared
          </span>
        )}
      </div>
    </div>
  );
}

// 1. Portrait Image
export function PortraitImage({ className = "" }: { src?: string; alt: string; className?: string }) {
  const assetKey = "portrait";
  checkAssetKey(assetKey);
  const entry = ASSET_REGISTRY[assetKey];

  if (!entry || entry.status === "missing") {
    return (
      <DevAssetPlaceholder
        label={entry?.label || "Professional Portrait"}
        dimensions={entry?.dimensions || "800 x 1000 px · 4:5 Aspect"}
        className={`aspect-[4/5] w-full ${className}`}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-bg-secondary ${className}`}>
      <Image
        src={entry.intendedPath}
        alt={entry.alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover object-center"
      />
    </div>
  );
}

// 2. Landscape Image
export function LandscapeImage({ className = "", src = "" }: { src?: string; alt: string; className?: string }) {
  const assetKey = src.includes("goa") ? "goaLandscape" : "";
  if (assetKey) checkAssetKey(assetKey);
  const entry = assetKey ? ASSET_REGISTRY[assetKey] : null;

  if (!entry || entry.status === "missing") {
    return (
      <DevAssetPlaceholder
        label={entry?.label || "Landscape Photograph"}
        dimensions={entry?.dimensions || "1200 x 800 px · 3:2 Aspect"}
        className={`aspect-[3/2] w-full ${className}`}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-xl bg-bg-secondary ${className}`}>
      <Image
        src={entry.intendedPath}
        alt={entry.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-center"
      />
    </div>
  );
}

// 3. Phone Mockup
export function PhoneMockup({ className = "" }: { src?: string; alt: string; className?: string }) {
  const assetKey = "fincalcMockup";
  checkAssetKey(assetKey);
  const entry = ASSET_REGISTRY[assetKey];

  return (
    <div className={`relative mx-auto max-w-[280px] w-full aspect-[9/19.5] rounded-[36px] border-[8px] border-bg-secondary bg-black shadow-xl shadow-black/60 ring-1 ring-white/10 overflow-hidden flex items-center justify-center p-4 ${className}`}>
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-28 bg-bg-secondary rounded-b-xl z-20" />
      
      {!entry || entry.status === "missing" ? (
        <DevAssetPlaceholder
          label={entry?.label || "FinCalc Android Screen"}
          dimensions={entry?.dimensions || "1080 x 2400 px"}
          className="w-full h-full border-none bg-transparent"
        />
      ) : (
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <Image
            src={entry.intendedPath}
            alt={entry.alt}
            fill
            sizes="260px"
            className="object-cover object-center"
          />
        </div>
      )}
    </div>
  );
}

// 4. Laptop Mockup
export function LaptopMockup({ className = "" }: { src?: string; alt: string; className?: string }) {
  return (
    <div className={`relative w-full max-w-[640px] mx-auto ${className}`}>
      <div className="relative aspect-[16/10] w-full bg-black rounded-t-xl border-[6px] border-bg-secondary overflow-hidden shadow-xl ring-1 ring-white/10 flex items-center justify-center p-6">
        <DevAssetPlaceholder
          label="Desktop App Screenshot"
          dimensions="2880 x 1800 px · 16:10 Aspect"
          className="w-full h-full border-none bg-transparent"
        />
      </div>
      <div className="relative w-[108%] -left-[4%] h-3 bg-bg-secondary rounded-b-xl border-t border-white/10 shadow-lg shadow-black/50" />
      <div className="relative w-[20%] mx-auto h-1.5 bg-text-muted/20 rounded-b" />
    </div>
  );
}

// 5. Certificate Preview
export function CertificatePreview({
  title,
  issuer,
}: {
  src?: string;
  alt: string;
  title: string;
  issuer: string;
}) {
  return (
    <div className="group relative rounded-xl border border-border-subtle bg-bg-secondary/40 p-4 space-y-4">
      <DevAssetPlaceholder
        label={`${title} Certificate`}
        dimensions="1600 x 1200 px"
        className="aspect-[4/3] w-full"
      />
      <div className="flex gap-2.5 items-start">
        <ShieldCheck className="h-4 w-4 text-accent-teal shrink-0 mt-0.5" />
        <div>
          <h5 className="text-xs font-bold text-white leading-tight">{title}</h5>
          <span className="text-[10px] text-text-secondary block mt-0.5">{issuer}</span>
        </div>
      </div>
    </div>
  );
}

// 6. Photography Preview
export function PhotographyPreview({
  camera = "Sony Alpha",
  settings = "f/2.8 · 1/160s · ISO 100",
  category = "Nature",
}: {
  src?: string;
  alt: string;
  camera?: string;
  settings?: string;
  category?: string;
}) {
  return (
    <div className="group relative rounded-xl border border-border-subtle p-4 space-y-4">
      <DevAssetPlaceholder
        label={`Photography: ${category}`}
        dimensions="1200 x 800 px · 3:2 Aspect"
        className="aspect-[3/2] w-full"
      />
      <div className="flex gap-2.5 items-start">
        <Camera className="h-4 w-4 text-accent-cyan shrink-0 mt-0.5" />
        <div>
          <h5 className="text-xs font-bold text-white leading-tight">{camera}</h5>
          <span className="text-[10px] text-text-secondary block mt-0.5">{settings}</span>
        </div>
      </div>
    </div>
  );
}

// 7. Video Thumbnail
export function VideoThumbnail({
  duration = "02:45",
  title,
}: {
  src?: string;
  alt: string;
  duration?: string;
  title: string;
}) {
  return (
    <div className="group relative rounded-xl border border-border-subtle p-4 space-y-4">
      <div className="relative aspect-video w-full">
        <DevAssetPlaceholder
          label={`Video Reel: ${title}`}
          dimensions="1920 x 1080 px · 16:9 Aspect"
          className="w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-bg-primary shadow-lg">
            <Play className="h-4 w-4 fill-current ml-0.5 text-bg-primary" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold text-white truncate max-w-[70%]">{title}</span>
        <span className="font-mono text-accent-cyan">{duration}</span>
      </div>
    </div>
  );
}
