import MainLayout from "@components/Layout/MainLayout";
import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { CREATE_NEW_ARTICLE, GET_CATEGORIES } from "@utils/api";
import toast from "react-hot-toast";
import { Button } from "@components/Button";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery } from "@tanstack/react-query";

const SelectInput = ({ selectData, subCategory, setSubCategory, loading }) => {
  return (
    <div className="w-full md:w-72">
      <Listbox value={subCategory} onChange={setSubCategory}>
        <Listbox.Label className="block mb-2">Category</Listbox.Label>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-sky-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 border border-slate-300">
            <span className="block truncate">
              {subCategory === "" ? "Select a category" : subCategory}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FiChevronDown aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* show categories and their sub categories list */}
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
              {loading ? (
                <Skeleton
                  className="h-9"
                  containerClassName="leading-none w-full"
                  count={3}
                  inline
                />
              ) : (
                selectData?.map((category) => (
                  <div key={category.name}>
                    <li className="px-4 py-2 text-sm text-medium text-slate-400">
                      {category.name}
                    </li>
                    {/* sub categories */}
                    {category.sub_categories.map((subCat) => (
                      <Listbox.Option
                        key={subCat.name}
                        className={({ active }) =>
                          `${
                            active ? "text-sky-900 bg-sky-100" : "text-gray-900"
                          }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                        }
                        value={subCat.name}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`${
                                selected ? "font-medium" : "font-normal"
                              } block truncate`}
                            >
                              {subCat.name}
                            </span>
                            {selected ? (
                              <span
                                className={`${
                                  active ? "text-sky-600" : "text-sky-600"
                                }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                              >
                                <FaCheck aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </div>
                ))
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

function Create() {
  const {
    isLoading: loading,
    data,
    error,
  } = useQuery({ queryKey: ["categories"], queryFn: GET_CATEGORIES });
  const { mutate: postArticle } = useMutation({
    mutationFn: async (vars) => await CREATE_NEW_ARTICLE(vars),
  });

  // form data
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [message, setMessage] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  // form submission handler for posting article
  async function handleSubmit(e) {
    e.preventDefault();
    setBtnLoading(true);

    try {
      postArticle({ title, content, sub_category_name: subCategory });

      if (error) {
        setBtnLoading(false);
        setMessage(error.message);
      } else {
        toast.success("Article Posted!");
        setTitle("");
        setContent("");
        setSubCategory("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Cannot post article! Something went wrong.");
    }
  }

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-2xl font-medium text-slate-700 my-4">
        Something on your mind? Share your thoughts.
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-auto">
            <label htmlFor="title" className="block mb-2">
              Title
            </label>
            <input
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title of your article"
              className="bg-white border border-slate-300 rounded-md py-2 px-3 w-full"
              required
            />
          </div>
          <SelectInput
            selectData={data}
            subCategory={subCategory}
            setSubCategory={setSubCategory}
            loading={loading}
          />
        </div>
        <textarea
          name="content"
          rows={20}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts..."
          className="bg-white border border-slate-300 rounded-md py-2 px-3 w-full"
          required
        />
        <div className="text-center mt-3">
          <Button type="submit" disabled={btnLoading}>
            Post
          </Button>
        </div>
      </form>
    </section>
  );
}

Create.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Create;
