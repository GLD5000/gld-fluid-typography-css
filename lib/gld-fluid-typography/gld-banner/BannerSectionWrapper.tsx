import { cn } from "../util/tw/twUtils";



export default function BannerSectionWrapper({
  className,
  ...props
}: React.ComponentProps<`section`>) {
  return (
    <section
      className={cn(
        "w-full min-w-[320px] h-fit",
        className
      )}
      {...props}
    />
  );
}
