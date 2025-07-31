import { cn } from "../util/tw/twUtils";
import type { FluidTypographySettingsType } from "../util/fluidTypography";

interface BannerSectionWrapperProps extends React.ComponentProps<`section`> {
  fluidTypographySettings?: FluidTypographySettingsType;
}
/**
 * Pass null to fluidTypography Settings to prevent fluid typography
 */
export default function BannerSectionWrapper({
  fluidTypographySettings,
  className,
  ...props
}: BannerSectionWrapperProps) {
  return (
    <section
      className={cn("w-full min-w-[320px] h-fit", className)}
      {...props}
    />
  );
}
