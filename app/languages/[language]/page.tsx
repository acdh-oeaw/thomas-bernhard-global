import { FacetedListing } from "@/components/faceted-listing";

export default function LanguagesPage() {
	return <FacetedListing queryArgsToMenuFields={{ language: "language" }} />;
}
