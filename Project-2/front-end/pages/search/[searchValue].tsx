import { useRouter } from "next/router";
import React from "react";
import Header from "../../components/Header";
import SearchResult from "../../components/SearchResult";
type Props = {};

const SearchValue = (props: Props) => {
  const router = useRouter();
  const searchedValue = router.query.searchValue as string;
  return (
    <>
      <Header />
      <SearchResult value={searchedValue} />
    </>
  );
};

export default SearchValue;
