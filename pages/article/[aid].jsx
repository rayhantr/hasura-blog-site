import { useQuery } from "@apollo/client";
import { Avatar } from "@components/Avatar";
import MainLayout from "@components/Layout/MainLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import Moment from "react-moment";
import { GET_ARTICLE_BY_ID } from "@utils/api";
import Skeleton from "react-loading-skeleton";

const ArticleData = ({ data }) => {
  const { title, content, updated_at, user, sub_category } = data.articles_by_pk;

  return (
    <>
      <div className="mb-2 text-sm capitalize font-medium text-slate-400 flex gap-2">
        <Link href={`/${sub_category.category_name}`}>
          <a className="text-primary bg-sky-100 px-2 py-1 rounded-md">{sub_category.category_name}</a>
        </Link>
        <Link href={`/${sub_category.category_name}/${sub_category.name}`}>
          <a className="text-violet-500 bg-violet-100 px-2 py-1 rounded-md">{sub_category.name}</a>
        </Link>
      </div>
      <h1 className="text-3xl font-semibold">{title}</h1>
      <div className="flex items-center mt-3 mb-8 text-sm">
        <div className="mr-2">
          <Avatar />
        </div>
        <div>
          <div>{user.displayName}</div>
          <Moment fromNow className="text-slate-400">
            {updated_at}
          </Moment>
        </div>
      </div>
      <p>{content}</p>
    </>
  );
};
function Article() {
  const router = useRouter();
  const { aid } = router.query;
  const { loading, data } = useQuery(GET_ARTICLE_BY_ID, {
    variables: { articleId: aid },
  });

  return (
    <section className="container mx-auto p-5 mt-5">
      {loading ? (
        <div>
          <Skeleton className="h-full w-20" containerClassName="leading-none w-60 h-5 flex gap-2" count={3} inline />
          <Skeleton className="h-10" containerClassName="leading-none w-full" inline />
          <Skeleton className="h-6" containerClassName="leading-none w-full" count={4} inline />
        </div>
      ) : (
        <ArticleData data={data} />
      )}
    </section>
  );
}

Article.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Article;
