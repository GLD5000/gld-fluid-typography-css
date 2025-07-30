import { cn } from "../util/tw/twUtils";

interface BannerSectionWrapperProps extends React.ComponentProps<`section`> {
  sfid?: string;
  componentName?: string;
  componentType?: string;
  variantName?: string;
  background?: string;
}

export default function BannerSectionWrapper({
  sfid,
  componentName,
  componentType,
  variantName,
  background,
  className,
  ...props
}: BannerSectionWrapperProps) {
  return (
    <section
      data-sfid={sfid}
      data-component={componentName}
      data-type={componentType}
      data-variant={variantName}
      className={cn(
        "w-full min-w-[320px] h-fit",
        `${background ? background : ""}`,
        className
      )}
      {...props}
    />
  );
}
