"use client"
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { useParams, usePathname, useRouter } from "next/navigation";
import { generateUniqueId } from "@/lib/utils";

const PlayType = () => {
  const [value, setValue] = useState();
  const router = useRouter();
  const {invitedId} = useParams();
  
  const handleSelect = (e) => {
    if (e === "ONLINE-FRIEND") {
      const uniqueId = generateUniqueId();
      router.push("/" + uniqueId);
      setValue(e);
      return;
    }
    if(invitedId){
      router.replace('/')
      setValue(e);
      return;
    }
    setValue(e)
  };

  return (
    <div className="flex items-center justify-between">
      <Select size="sm" defaultValue={invitedId ? "ONLINE-FRIEND" : 'FRIEND'} onValueChange={handleSelect}>
        <SelectTrigger className="w-auto gap-1 border-0 focus:ring-0 flex-row-reverse">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="EASY">Easy</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="IMPOSSIBLE">Impossible</SelectItem>
          <SelectItem value="FRIEND">Play against a friend</SelectItem>
          <SelectItem value="ONLINE-FRIEND">Online Friend</SelectItem>
        </SelectContent>
      </Select>

      {value === "ONLINE-FRIEND" && (
        <div>
          <Button variant="outline" size="icon">
            <Share2 className="size-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PlayType;
