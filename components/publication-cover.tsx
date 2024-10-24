import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import type { Publication } from "@/lib/model";

import { PublicationLink } from "./publication-link";

interface PublicationCoverProps {
	publication: Publication;
}

export function PublicationCover(props: PublicationCoverProps): ReactNode {
	const t = useTranslations("PublicationCover");
	return (
		<Image
			alt={props.publication.images[0] ? `${t("alt_text")} ${props.publication.title}` : ""}
			className="object-contain"
			fill={true}
			sizes={"88rem"}
			src={
				props.publication.images[0]
					? `/covers/${props.publication.images[0].id}.jpg`
					: "/covers/cover_missing.jpg"
			}
		/>
	);
}

export function ClickablePublicationThumbnail(props: PublicationCoverProps) {
	return (
		<PublicationLink
			className="relative block h-full object-contain hover:outline"
			publication={props.publication}
		>
			<PublicationCover publication={props.publication} />
			<span className="sr-only">
				{props.publication.title} ({props.publication.year})
			</span>
		</PublicationLink>
	);
}
