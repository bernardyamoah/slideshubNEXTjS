"use client";

import { Button } from "@/components/ui/button";
import { CloudArrowDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { toast } from "sonner";

function DownloadBtn({ Fileurl, filename }) {
	return (
		<>
			<Link
				href={Fileurl}
				download={filename}
				onClick={() => {
					toast("Download started!", {
						icon: "📥",
					});
				}}
			>
				<CloudArrowDownIcon strokeWidth={2} className="w-5 h-5" />
			</Link>
		</>
	);
}

export default DownloadBtn;
