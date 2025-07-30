import { cn } from "../util/tw/twUtils";

type dataAttributeProps = Record<string,string>

interface BannerSectionWrapperProps extends React.ComponentProps<`section`> {
  dataAttributes?: dataAttributeProps;
  background?: string;
}

export default function BannerSectionWrapper({
  dataAttributes = {'data-sfid': 'example-sfid'},
  background,
  className,
  ...props
}: BannerSectionWrapperProps) {
  return (
    <section
      {...dataAttributes}
      className={cn(
        "w-full min-w-[320px] h-fit",
        `${background ? background : ""}`,
        className
      )}
      {...props}
    />
  );
}
