import * as React from "react";
import { ChevronDown } from "lucide-react"; // Or use your preferred icon; assuming lucide-react is available

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Adjust path to your DropdownMenu export

// Assuming this is in your component file, with selectedDesignType and setSelectedDesignType from props/state
const DesignTypeFilter = ({ selectedDesignType, setSelectedDesignType, designTypes = [] }) => {
  const [open, setOpen] = React.useState(false);

  // Prep options including "All Designs"
  const allOptions = [
    { id: "", label: "All Designs" },
    ...designTypes.map((dt: any) => ({
      id: dt.id,
      label: dt.data.design_name[0].text,
    })),
  ];

  const selectedLabel = allOptions.find((opt) => opt.id === selectedDesignType)?.label || "All Designs";

  return (
    <div className="flex justify-end mb-8 relative z-30">
      <div className="relative">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="
                px-4 py-2
                rounded-xl
                bg-white
                border border-leather/30
                shadow-sm
                text-leather font-body
                text-sm
                tracking-wide
                transition-all duration-300
                hover:border-rosegold/60
                focus:border-rosegold
                focus:ring-2 focus:ring-rosegold/30
                focus:outline-none
                flex items-center justify-between
              "
            >
              <span className="truncate">{selectedLabel}</span>
              <ChevronDown className="w-4 h-4 text-leather ml-8 pointer-events-none transition-transform duration-300" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="
              w-[var(--radix-dropdown-menu-trigger-width)]
              bg-white
              border border-leather/30
              rounded-xl
              shadow-lg
              max-h-60 overflow-y-auto
              p-0
            "
            sideOffset={4}
          >
            {allOptions.map((option) => (
              <DropdownMenuItem
                key={option.id || "all"}
                onSelect={() => {
                  setSelectedDesignType(option.id || undefined);
                  setOpen(false);
                }}
                className={`
                  px-4 py-2.5
                  text-left
                  text-leather font-body text-sm tracking-wide
                  cursor-pointer
                  hover:bg-rosegold/10
                  focus:bg-rosegold/20 focus:outline-none
                  transition-colors duration-200
                  ${selectedDesignType === option.id ? "bg-rosegold/20 font-semibold" : ""}
                  data-[highlighted]:bg-rosegold/30
                `}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DesignTypeFilter;