import { useQuery } from "@apollo/client";
import { Blog } from "@components/Blog";
import MainLayout from "@components/Layout/MainLayout";
import { GET_FILTERED_ARTICLES_BY_USER } from "@utils/api";
import { getNhostSession, useUserData } from "@nhost/nextjs";

function User() {
  const user = useUserData();
  const { loading, data } = useQuery(GET_FILTERED_ARTICLES_BY_USER, {
    variables: { id: user?.id },
  });

  return (
    <div className="container mx-auto p-5 mt-5">
      <section>
        <h2 className="text-xl font-medium border-b-2 pb-2">Profile Information</h2>
        <div className="mt-3">
          <p className="py-1">Name: {user?.displayName}</p>
          <p className="py-1">Email: {user?.email}</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-medium border-b-2 pb-2">My Articles</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-3">
          {loading ? (
            <p>Loading...</p>
          ) : (
            data?.user.articles.map((item) => {
              const { id, title, sub_category, updated_at } = item;

              return <Blog key={id} articleId={id} title={title} user={user.displayName} time={updated_at} category={sub_category.category_name} subCategory={sub_category.name} />;
            })
          )}
        </div>
      </section>
    </div>
  );
}

User.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default User;

export async function getServerSideProps(context) {
  const nhostSession = await getNhostSession(process.env.NEXT_PUBLIC_NHOST_BACKEND, context);

  if (!nhostSession) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: {
      nhostSession,
    },
  };
}
