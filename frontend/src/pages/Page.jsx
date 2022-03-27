function Page(props) {
  return (
    <div
      className="d-flex justify-content-center"
      style={{ minHeight: "100vh", maxWidth: "100vw" }}
    >
      {props.children}
    </div>
  );
}

export default Page;
