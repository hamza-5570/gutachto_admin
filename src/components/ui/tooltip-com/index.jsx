import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../tooltip";


export default function ToolTipCom({ icon, content }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative flex items-center justify-center p-2 rounded-full transition hover:bg-[#E2E8F04D] dark:hover:bg-[#E2E8F080] hover:shadow-[0_1.2px_2px_rgba(0,0,0,0.25)]">
            {icon}
          </div>
        </TooltipTrigger>
        <TooltipContent sideOffset={3} className="dark:bg-[#E2E8F0]">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
