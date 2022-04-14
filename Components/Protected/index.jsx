import { useRouter } from "next/router";
import { useAuthenticationStatus } from "@nhost/nextjs";

export function authProtected(Comp) {
  return function AuthProtected(props) {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAuthenticationStatus();

    if (isLoading) {
      return <p className="text-gradient-primary p-5 text-center">Redirecting...</p>;
    }

    if (!isAuthenticated) {
      router.push("/login");
      return null;
    }

    return <Comp {...props} />;
  };
}

// // protected route for authenticated users. eg: Login, register

// export const authorized = (Comp) => {
// 	return function Authorized(props) {
// 		const router = useRouter();
// 		const { isLoading, isAuthenticated } = useNhostAuth();

// 		if (isLoading) {
// 			return <p className="text-gradient-primary p-5 text-center">Redirecting...</p>;
// 		}
// 		if (!isAuthenticated) {
// 			router.push("/");
// 			return null;
// 		}

// 		return <Comp {...props} />;
// 	};
// };
