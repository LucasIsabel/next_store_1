async function SearchPage() {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  return (
    <div>
      <h1>Search Page</h1>
    </div>
  );
}

export default SearchPage;
