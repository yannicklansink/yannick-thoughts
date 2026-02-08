type EmbedFrameProps = {
  src: string;
  title: string;
  ratio?: string;
  height?: number;
  maxWidth?: number;
  minWidth?: number;
};

export function EmbedFrame({
  src,
  title,
  ratio = "9 / 16",
  height,
  maxWidth,
  minWidth,
}: EmbedFrameProps) {
  const style = height ? { height: `${height}px` } : { aspectRatio: ratio };

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg bg-black/5"
      style={{
        ...style,
        maxWidth: maxWidth ? `${maxWidth}px` : undefined,
        minWidth: minWidth ? `${minWidth}px` : undefined,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <iframe
        src={src}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

type InstagramProps = {
  id: string;
  kind?: "reel" | "p" | "tv";
  ratio?: string;
  height?: number;
};

export function Instagram({ id, kind = "reel", ratio = "9 / 16", height }: InstagramProps) {
  const src = `https://www.instagram.com/${kind}/${id}/embed/`;
  return (
    <EmbedFrame
      src={src}
      title="Instagram embed"
      ratio={ratio}
      height={height}
      maxWidth={540}
    />
  );
}

type TikTokProps = {
  id: string;
  ratio?: string;
  height?: number;
};

export function TikTok({ id, ratio = "9 / 16", height }: TikTokProps) {
  const src = `https://www.tiktok.com/embed/v2/${id}`;
  const resolvedHeight = height ?? 575;
  return (
    <EmbedFrame
      src={src}
      title="TikTok embed"
      ratio={ratio}
      height={resolvedHeight}
      maxWidth={325}
    />
  );
}

type TweetProps = {
  id: string;
  height?: number;
};

export function Tweet({ id, height = 600 }: TweetProps) {
  const src = `https://platform.twitter.com/embed/Tweet.html?id=${id}`;
  return (
    <EmbedFrame src={src} title="Tweet embed" height={height} minWidth={220} maxWidth={550} />
  );
}
