import type { ReactNode } from "react";

import type { Publication } from "@/lib/model";

import { AppLink } from "./app-link";

interface PublicationLinkProps {
	publication: Publication;
	className?: string;
	children?: ReactNode;
}

export function PublicationLink(props: PublicationLinkProps) {
	return (
		<AppLink className={props.className} href={`/publications/${props.publication.id}`}>
			{props.children ?? props.publication.title}
		</AppLink>
	);
}
