function Page(props) {
  return (
    <div className="Page container mt-5" style={{ minHeight: "100vh" }}>
      {props.children}
    </div>
  );
}

export default Page;
