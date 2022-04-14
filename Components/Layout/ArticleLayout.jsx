import { useQuery } from "@apollo/client";
import { Categories } from "@components/Categories";
import Link from "next/link";
import { useRouter } from "next/router";
import { GET_SUB_CATEGORIES } from "@utils/api";

function ArticleLayout({ children }) {
  const router = useRouter();
  const { categoryName } = router.query;
  const { data: subCategories } = useQuery(GET_SUB_CATEGORIES, {
    variables: { categoryName: categoryName ? categoryName : "" },
  });

  return (
    <>
      {/* <section className="bg-sky-700 py-10">
				<div className="container mx-auto flex flex-col gap-5 items-center justify-center">
					<h1 className="text-6xl font-extrabold text-white">BLOG</h1>
					<div>
						<input type="search" className="bg-white p-3 rounded-md shadow-md" placeholder="Search for articles" />
						<button className="inline-flex items-center text-white hover:text-primary border-2 border-white py-2.5 px-5 ml-4 focus:outline-none hover:bg-white rounded-md shadow-md transition">
							Search
						</button>
					</div>
				</div>
			</section> */}
      <section className="container mx-auto p-5">
        <Categories />
        {router.asPath !== "/" && (
          <div className="flex gap-2 mt-5 items-center flex-wrap">
            <h2 className="border-r-2 pr-2">
              More from <span className="font-semibold">{categoryName}</span>
            </h2>
            {subCategories?.sub_category.map((item) => (
              <Link key={item.name} href={`/${categoryName}/${item.name}`}>
                <a className="bg-slate-50 text-slate-700 hover:text-violet-500 hover:bg-violet-100 px-2 py-1 rounded-md transition">{item.name}</a>
              </Link>
            ))}
          </div>
        )}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">{children}</div>
      </section>
    </>
  );
}

export default ArticleLayout;
