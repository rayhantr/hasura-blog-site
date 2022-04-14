import { useQuery } from "@apollo/client";
import { Blog } from "@components/Blog";
import ArticleLayout from "@components/Layout/ArticleLayout";
import MainLayout from "@components/Layout/MainLayout";
import { GET_HOME_ARTICLES } from "@utils/api";
import Skeleton from "react-loading-skeleton";

export default function Home() {
  const { loading, data } = useQuery(GET_HOME_ARTICLES, { pollInterval: 500 });

  return loading ? (
    <Skeleton className="h-full" containerClassName="block leading-none w-full h-40" inline />
  ) : data?.articles.length > 0 ? (
    data.articles.map((item) => {
      const { id, title, sub_category, user, updated_at } = item;

      return <Blog key={id} articleId={id} title={title} user={user.displayName} time={updated_at} category={sub_category.category_name} subCategory={sub_category.name} />;
    })
  ) : (
    <p>No articles to show!</p>
  );
}

Home.getLayout = (page) => (
  <MainLayout>
    <ArticleLayout>{page}</ArticleLayout>
  </MainLayout>
);
