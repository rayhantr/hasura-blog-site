import { authProtected } from "@components/Protected";

function ProfileLayout({ children }) {
  return <>{children}</>;
}

export default authProtected(ProfileLayout);
