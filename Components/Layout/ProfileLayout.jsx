import { authorized } from "@components/Protected";

function ProfileLayout({ children }) {
	return <>{children}</>;
}

export default authorized(ProfileLayout);
